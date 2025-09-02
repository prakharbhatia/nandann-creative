import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

const inputDir = '.';
const outputDir = 'public/washington';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const resolutions = {
  sd: { width: 854, height: 480 },
  mobile: { width: 1280, height: 720 },
  hd: { width: 1920, height: 1080 }
};

async function optimizeVideo(inputFile, outputPrefix) {
  console.log(`Processing ${inputFile}...`);
  
  try {
    const inputPath = path.join(inputDir, inputFile);
    
    // Create MP4 versions
    for (const [quality, dimensions] of Object.entries(resolutions)) {
      const outputFile = `${outputPrefix}-${quality}.mp4`;
      const outputPath = path.join(outputDir, outputFile);
      
      const command = `ffmpeg -i "${inputPath}" -vf "scale=${dimensions.width}:${dimensions.height}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "${outputPath}"`;
      
      console.log(`Creating ${outputFile}...`);
      await execAsync(command);
      console.log(`Created ${outputFile}`);
    }
    
    // Create WebM version (HD only)
    const webmOutputFile = `${outputPrefix}-hd.webm`;
    const webmOutputPath = path.join(outputDir, webmOutputFile);
    
    const webmCommand = `ffmpeg -i "${inputPath}" -vf "scale=1920:1080" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k "${webmOutputPath}"`;
    
    console.log(`Creating ${webmOutputFile}...`);
    await execAsync(webmCommand);
    console.log(`Created ${webmOutputFile}`);
    
  } catch (error) {
    console.error(`Error processing ${inputFile}:`, error);
  }
}

async function main() {
  const videos = [
    '2257258-hd_1920_1080_24fps.mp4'
  ];
  
  for (const video of videos) {
    const outputPrefix = 'washington-web-development-nandann-creative';
    await optimizeVideo(video, outputPrefix);
  }
  
  console.log('Washington video optimization complete!');
}

main().catch(console.error); 