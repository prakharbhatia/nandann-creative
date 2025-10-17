import { useEffect, useRef, useState } from 'react';

interface GameStats {
  score: number;
  highScore: number;
}

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStats, setGameStats] = useState<GameStats>({ score: 0, highScore: 0 });
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const gameLoopRef = useRef<number>();
  const gameDataRef = useRef({
    bird: { x: 100, y: 250, velocity: 0, radius: 20 },
    pipes: [] as Array<{ x: number; topHeight: number; scored: boolean }>,
    score: 0,
    frameCount: 0
  });

  // Game constants (much easier settings)
  const GRAVITY = 0.25;
  const JUMP_VELOCITY = -6;
  const PIPE_SPEED = 1.5;
  const PIPE_GAP = 250;
  const PIPE_WIDTH = 60;
  const PIPE_SPACING = 300;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    if (savedHighScore) {
      setGameStats(prev => ({ ...prev, highScore: parseInt(savedHighScore, 10) }));
    }
  }, []);

  // Initialize game
  const initGame = () => {
    const data = gameDataRef.current;
    data.bird = { x: 100, y: 250, velocity: 0, radius: 20 };
    data.pipes = [];
    data.score = 0;
    data.frameCount = 0;
    setGameStats(prev => ({ ...prev, score: 0 }));
    setGameState('ready');
  };

  // Start game
  const startGame = () => {
    if (gameState === 'ready' || gameState === 'gameover') {
      initGame();
      setGameState('playing');
    }
  };

  // Jump
  const jump = () => {
    if (gameState === 'playing') {
      gameDataRef.current.bird.velocity = JUMP_VELOCITY;
    } else if (gameState === 'ready' || gameState === 'gameover') {
      startGame();
    }
  };

  // Handle click and keyboard
  useEffect(() => {
    const handleClick = () => jump();
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = gameDataRef.current;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#87CEEB'; // Sky blue
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (gameState === 'ready') {
        // Draw bird
        drawBird(ctx);
        
        // Draw start message
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT / 2 - 60, 300, 120);
        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Click or Press Space', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.fillText('to Start!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 35);
      } else if (gameState === 'playing') {
        // Update bird
        data.bird.velocity += GRAVITY;
        data.bird.y += data.bird.velocity;

        // Generate pipes
        data.frameCount++;
        if (data.frameCount % Math.floor(PIPE_SPACING / PIPE_SPEED) === 0) {
          const minHeight = 50;
          const maxHeight = CANVAS_HEIGHT - PIPE_GAP - 50;
          const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
          data.pipes.push({ x: CANVAS_WIDTH, topHeight, scored: false });
        }

        // Update and draw pipes
        for (let i = data.pipes.length - 1; i >= 0; i--) {
          const pipe = data.pipes[i];
          pipe.x -= PIPE_SPEED;

          // Draw pipes
          ctx.fillStyle = '#22c55e'; // Green
          // Top pipe
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
          // Bottom pipe
          ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, CANVAS_HEIGHT - pipe.topHeight - PIPE_GAP);

          // Pipe caps (darker green)
          ctx.fillStyle = '#16a34a';
          ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
          ctx.fillRect(pipe.x - 5, pipe.topHeight + PIPE_GAP, PIPE_WIDTH + 10, 20);

          // Check collision
          const birdLeft = data.bird.x - data.bird.radius;
          const birdRight = data.bird.x + data.bird.radius;
          const birdTop = data.bird.y - data.bird.radius;
          const birdBottom = data.bird.y + data.bird.radius;

          if (
            birdRight > pipe.x &&
            birdLeft < pipe.x + PIPE_WIDTH &&
            (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP)
          ) {
            endGame();
          }

          // Update score
          if (!pipe.scored && pipe.x + PIPE_WIDTH < data.bird.x) {
            pipe.scored = true;
            data.score++;
            setGameStats(prev => ({ ...prev, score: data.score }));
          }

          // Remove off-screen pipes
          if (pipe.x + PIPE_WIDTH < 0) {
            data.pipes.splice(i, 1);
          }
        }

        // Check ground/ceiling collision
        if (data.bird.y + data.bird.radius > CANVAS_HEIGHT || data.bird.y - data.bird.radius < 0) {
          endGame();
        }

        // Draw bird
        drawBird(ctx);
      } else if (gameState === 'gameover') {
        // Draw final state
        drawBird(ctx);
        
        // Draw pipes (static)
        data.pipes.forEach(pipe => {
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
          ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, CANVAS_HEIGHT - pipe.topHeight - PIPE_GAP);
        });

        // Draw game over overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(CANVAS_WIDTH / 2 - 180, CANVAS_HEIGHT / 2 - 100, 360, 200);
        
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${data.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
        ctx.fillText(`High Score: ${gameStats.highScore}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 45);
        
        ctx.fillStyle = '#2563eb';
        ctx.font = '20px Arial';
        ctx.fillText('Click to Try Again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 85);
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    const drawBird = (ctx: CanvasRenderingContext2D) => {
      const { x, y, radius } = data.bird;
      
      // Bird shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(x + 3, y + 3, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird body (gradient)
      const gradient = ctx.createRadialGradient(x - 5, y - 5, 5, x, y, radius);
      gradient.addColorStop(0, '#60a5fa'); // Light blue
      gradient.addColorStop(1, '#2563eb'); // Dark blue
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Bird outline
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Eye
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x + 8, y - 5, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x + 10, y - 5, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + radius + 10, y - 5);
      ctx.lineTo(x + radius + 10, y + 5);
      ctx.closePath();
      ctx.fill();
    };

    const endGame = () => {
      setGameState('gameover');
      const currentScore = data.score;
      const currentHighScore = gameStats.highScore;
      
      if (currentScore > currentHighScore) {
        localStorage.setItem('flappyBirdHighScore', currentScore.toString());
        setGameStats(prev => ({ ...prev, highScore: currentScore }));
      }
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameStats.highScore]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Score display */}
      <div className="mb-4 flex items-center gap-6">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Score</div>
          <div className="text-4xl font-bold text-blue-600">{gameStats.score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">🏆 High Score</div>
          <div className="text-4xl font-bold text-purple-600">{gameStats.highScore}</div>
        </div>
      </div>

      {/* Game canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-blue-300 rounded-xl shadow-2xl cursor-pointer bg-sky-200 max-w-full h-auto"
        style={{ maxWidth: '100%', height: 'auto' }}
        aria-label="Flappy Bird Game"
      />

      {/* Instructions */}
      <div className="mt-6 text-center">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Controls:</span> Click or press{' '}
          <kbd className="px-2 py-1 bg-gray-200 border border-gray-300 rounded text-sm font-mono">Space</kbd>{' '}
          to jump!
        </p>
      </div>
    </div>
  );
}

