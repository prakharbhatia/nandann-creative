import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

console.log('🎨 Starting Pennsylvania image optimization...\n');

// Create output directory
const outputDir = 'public/pennsylvania';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image configurations
const imageConfigs = [
  {
    name: 'pexels-ken123films-635018',
    src: 'pexels-ken123films-635018.jpg',
    sizes: [
      { suffix: 'sm', width: 640, height: 480 },
      { suffix: 'md', width: 1024, height: 768 },
      { suffix: 'lg', width: 1280, height: 960 },
      { suffix: 'xl', width: 1920, height: 1440 }
    ]
  }
];

// Process each image
for (const config of imageConfigs) {
  console.log(`📸 Processing ${config.name}...`);
  
  try {
    const inputPath = config.src;
    const inputBuffer = fs.readFileSync(inputPath);
    
    // Process each size
    for (const size of config.sizes) {
      const outputName = `pennsylvania-web-development-nandann-creative-${size.suffix}.webp`;
      const outputPath = path.join(outputDir, outputName);
      
      await sharp(inputBuffer)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`  ✅ ${size.suffix}: ${sizeInMB} MB`);
    }
    
    console.log('');
  } catch (error) {
    console.error(`❌ Error processing ${config.name}:`, error.message);
  }
}

console.log('🎉 Pennsylvania image optimization complete!\n'); 