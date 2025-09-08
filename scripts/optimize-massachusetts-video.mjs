import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

const inputVideoPath = 'public/massachusetts/11960240-hd_1920_1080_24fps.mp4';
const outputDir = 'public/massachusetts';
const baseName = 'massachusetts-web-development-nandann-creative';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const resolutions = {
  sd: { width: 640, height: 360 },
  mobile: { width: 480, height: 270 },
  hd: { width: 1280, height: 720 }
};

async function optimizeVideo() {
  console.log(`Processing ${inputVideoPath}...`);
  
  try {
    // Create MP4 versions
    for (const [quality, dimensions] of Object.entries(resolutions)) {
      const outputFile = `${baseName}-${quality}.mp4`;
      const outputPath = path.join(outputDir, outputFile);
      
      const command = `ffmpeg -i "${inputVideoPath}" -vf "scale=${dimensions.width}:${dimensions.height}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "${outputPath}"`;
      
      console.log(`Creating ${outputFile}...`);
      await execAsync(command);
      console.log(`Created ${outputFile}`);
    }
    
    // Create WebM version (HD only)
    const webmOutputFile = `${baseName}-hd.webm`;
    const webmOutputPath = path.join(outputDir, webmOutputFile);
    
    const webmCommand = `ffmpeg -i "${inputVideoPath}" -vf "scale=1280:720" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k "${webmOutputPath}"`;
    
    console.log(`Creating ${webmOutputFile}...`);
    await execAsync(webmCommand);
    console.log(`Created ${webmOutputFile}`);
    
  } catch (error) {
    console.error(`Error processing video:`, error);
  }
}

async function main() {
  await optimizeVideo();
  console.log('Massachusetts video optimization complete!');
}

main().catch(console.error);