import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🎬 Starting Pennsylvania video optimization...\n');

// Create output directory
const outputDir = 'public/pennsylvania';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const videoSrc = '4687380-uhd_3840_2160_24fps.mp4';
const videoName = 'pennsylvania-web-development-nandann-creative';
const resolutions = [
  { suffix: 'sd', width: 854, height: 480 },
  { suffix: 'mobile', width: 640, height: 360 },
  { suffix: 'hd', width: 1280, height: 720 }
];

try {
  // Create MP4 versions
  for (const res of resolutions) {
    const outputPath = path.join(outputDir, `${videoName}-${res.suffix}.mp4`);
    
    console.log(`📹 Creating ${res.width}x${res.height} MP4...`);
    
    const command = `ffmpeg -i "${videoSrc}" -vf "scale=${res.width}:${res.height}" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k "${outputPath}" -y`;
    
    execSync(command, { stdio: 'inherit' });
    
    const stats = fs.statSync(outputPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`  ✅ ${res.width}x${res.height}: ${sizeInMB} MB`);
  }
  
  // Create WebM version (highest quality)
  const webmOutput = path.join(outputDir, `${videoName}-hd.webm`);
  console.log(`📹 Creating WebM version...`);
  
  const webmCommand = `ffmpeg -i "${videoSrc}" -vf "scale=1280:720" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k "${webmOutput}" -y`;
  
  execSync(webmCommand, { stdio: 'inherit' });
  
  const webmStats = fs.statSync(webmOutput);
  const webmSizeInMB = (webmStats.size / (1024 * 1024)).toFixed(2);
  console.log(`  ✅ WebM 1280x720: ${webmSizeInMB} MB`);
  
} catch (error) {
  console.error('❌ Error during video optimization:', error.message);
}

console.log('\n🎉 Pennsylvania video optimization complete!\n'); 