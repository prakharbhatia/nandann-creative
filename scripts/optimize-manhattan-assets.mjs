import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outputDir = 'public/manhattan';
const inputImagePath = 'public/manhattan/manhattan.jpg';
const baseName = 'manhattan-web-development-nandann-creative';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage() {
  try {
    console.log('Starting Manhattan image optimization...');
    
    // Read the input image
    const inputBuffer = fs.readFileSync(inputImagePath);
    
    // Create different sizes
    const sizes = [
      { suffix: 'sm', width: 400, height: 300 },
      { suffix: 'md', width: 800, height: 600 },
      { suffix: 'lg', width: 1200, height: 900 },
      { suffix: 'xl', width: 1600, height: 1200 }
    ];
    
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `${baseName}-${size.suffix}.webp`);
      
      await sharp(inputBuffer)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`Created ${outputPath}`);
    }
    
    console.log('Manhattan image optimization completed!');
  } catch (error) {
    console.error('Error optimizing Manhattan image:', error);
  }
}

optimizeImage();