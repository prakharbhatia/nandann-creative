import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Check if ffmpeg is installed
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ ffmpeg is not installed. Please install it first:');
  console.error('   macOS: brew install ffmpeg');
  console.error('   Ubuntu: sudo apt install ffmpeg');
  console.error('   Windows: Download from https://ffmpeg.org/');
  process.exit(1);
}

// Create output directory if it doesn't exist
const outputDir = 'public/florida';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Video configurations
const videoSrc = '5079159-uhd_3840_2160_24fps.mp4';
const videoName = 'florida-web-development-nandann-creative';

const resolutions = [
  { width: 1280, height: 720, crf: 23, suffix: '-hd' },
  { width: 854, height: 480, crf: 25, suffix: '-sd' },
  { width: 640, height: 360, crf: 27, suffix: '-mobile' }
];

async function optimizeVideo() {
  console.log('🎬 Starting Florida video optimization...\n');
  
  try {
    // Create MP4 versions with different resolutions
    for (const res of resolutions) {
      const outputPath = path.join(outputDir, `${videoName}${res.suffix}.mp4`);
      console.log(`📹 Creating ${res.width}x${res.height} MP4...`);
      
      const command = `ffmpeg -i "${videoSrc}" -vf "scale=${res.width}:${res.height}" -c:v libx264 -crf ${res.crf} -preset medium -c:a aac -b:a 128k -movflags +faststart "${outputPath}" -y`;
      
      execSync(command, { stdio: 'pipe' });
      
      const stats = fs.statSync(outputPath);
      const fileSize = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`  ✅ ${res.width}x${res.height}: ${fileSize} MB`);
    }
    
    // Create WebM version (1280x720)
    const webmOutput = path.join(outputDir, `${videoName}-hd.webm`);
    console.log('📹 Creating WebM version...');
    
    const webmCommand = `ffmpeg -i "${videoSrc}" -vf "scale=1280:720" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k "${webmOutput}" -y`;
    
    execSync(webmCommand, { stdio: 'pipe' });
    
    const webmStats = fs.statSync(webmOutput);
    const webmSize = (webmStats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ WebM 1280x720: ${webmSize} MB`);
    
    console.log('\n🎉 Florida video optimization complete!');
    
  } catch (error) {
    console.error('❌ Error during video optimization:', error.message);
  }
}

optimizeVideo(); 