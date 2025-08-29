import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

// Ensure public/newyork directory exists
const outputDir = 'public/newyork';
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const videoSrc = 'newyork/3202634-hd_1920_1080_30fps.mp4';

async function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

async function optimizeVideo() {
  console.log('🎬 Starting video optimization...\n');
  
  if (!existsSync(videoSrc)) {
    console.error(`❌ Video source not found: ${videoSrc}`);
    return;
  }
  
  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    console.log('⚠️  FFmpeg not found. Please install FFmpeg to optimize videos.');
    console.log('   macOS: brew install ffmpeg');
    console.log('   Ubuntu: sudo apt install ffmpeg');
    console.log('   Windows: Download from https://ffmpeg.org/download.html');
    return;
  }
  
  try {
    console.log('📹 Creating optimized video versions...\n');
    
    // Create multiple resolutions for responsive design
    const resolutions = [
      { width: 1280, height: 720, suffix: '-hd', crf: 28 },
      { width: 854, height: 480, suffix: '-sd', crf: 30 },
      { width: 640, height: 360, suffix: '-mobile', crf: 32 }
    ];
    
    for (const res of resolutions) {
      const outputPath = `${outputDir}/newyork-skyline${res.suffix}.mp4`;
      
      console.log(`   Creating ${res.width}x${res.height} version...`);
      
      const command = `ffmpeg -i "${videoSrc}" -vf "scale=${res.width}:${res.height}" -c:v libx264 -crf ${res.crf} -preset medium -c:a aac -b:a 128k -movflags +faststart "${outputPath}" -y`;
      
      execSync(command, { stdio: 'pipe' });
      
      // Get file size
      const stats = execSync(`ls -lh "${outputPath}"`, { encoding: 'utf8' });
      const size = stats.split(/\s+/)[4];
      
      console.log(`   ✅ ${res.suffix}: ${res.width}x${res.height} (${size})`);
    }
    
    // Create WebM version for better compression
    console.log('\n   Creating WebM version...');
    const webmPath = `${outputDir}/newyork-skyline.webm`;
    const webmCommand = `ffmpeg -i "${videoSrc}" -vf "scale=1280:720" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k "${webmPath}" -y`;
    
    execSync(webmCommand, { stdio: 'pipe' });
    
    const webmStats = execSync(`ls -lh "${webmPath}"`, { encoding: 'utf8' });
    const webmSize = webmStats.split(/\s+/)[4];
    console.log(`   ✅ WebM: 1280x720 (${webmSize})`);
    
    console.log('\n✅ Video optimization complete!');
    console.log('\n📁 Optimized videos created in:', outputDir);
    console.log('\n💡 Next steps:');
    console.log('   1. Update the New York page to use responsive videos');
    console.log('   2. Add video preloading for better performance');
    console.log('   3. Test video loading performance');
    
  } catch (error) {
    console.error('❌ Error during video optimization:', error.message);
  }
}

optimizeVideo(); 