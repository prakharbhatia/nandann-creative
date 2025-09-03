import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = '.';
const outputDir = 'public/images';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

async function optimizeImage(inputFile, outputPrefix) {
  console.log(`Processing ${inputFile}...`);
  
  try {
    const inputPath = path.join(inputDir, inputFile);
    const image = sharp(inputPath);
    
    for (const [size, width] of Object.entries(sizes)) {
      const outputFile = `${outputPrefix}-${size}.webp`;
      const outputPath = path.join(outputDir, outputFile);
      
      await image
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Created ${outputFile}`);
    }
  } catch (error) {
    console.error(`Error processing ${inputFile}:`, error);
  }
}

async function main() {
  const images = [
    'apple-invite.jpg'
  ];
  
  for (const image of images) {
    const baseName = path.parse(image).name;
    const outputPrefix = 'apple-iphone-17-ios-26-event-2025';
    await optimizeImage(image, outputPrefix);
  }
  
  console.log('Blog image optimization complete!');
}

main().catch(console.error); 