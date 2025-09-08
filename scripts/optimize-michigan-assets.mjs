import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const inputImagePath = 'public/michigan/pexels-pixabay-161963(1).jpg';
const outputDir = 'public/michigan';
const baseName = 'michigan-web-development-nandann-creative';

const sizes = {
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1800,
};

async function optimizeImage() {
  try {
    await fs.access(inputImagePath);
  } catch (error) {
    console.error(`Input image not found at ${inputImagePath}. Please ensure the file exists.`);
    return;
  }

  await fs.mkdir(outputDir, { recursive: true });

  for (const size in sizes) {
    const width = sizes[size];
    const outputPath = path.join(outputDir, `${baseName}-${size}.webp`);
    console.log(`Optimizing ${inputImagePath} to ${outputPath} with width ${width}...`);
    await sharp(inputImagePath)
      .resize(width)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Generated ${outputPath}`);
  }
  console.log('Image optimization complete for Michigan.');
}

optimizeImage().catch(console.error);