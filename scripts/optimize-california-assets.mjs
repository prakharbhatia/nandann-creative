import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Create output directory if it doesn't exist
const outputDir = 'public/california';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image configurations with multiple sizes
const imageConfigs = [
  {
    name: 'pexels-picjumbo-com-55570-196642',
    src: 'california/pexels-picjumbo-com-55570-196642.jpg',
    sizes: [
      { width: 400, height: 300, suffix: '-sm' },
      { width: 800, height: 600, suffix: '-md' },
      { width: 1200, height: 900, suffix: '-lg' },
      { width: 1600, height: 1200, suffix: '-xl' }
    ]
  },
  {
    name: 'pexels-pixabay-462331',
    src: 'california/pexels-pixabay-462331.jpg',
    sizes: [
      { width: 400, height: 300, suffix: '-sm' },
      { width: 800, height: 600, suffix: '-md' },
      { width: 1200, height: 900, suffix: '-lg' },
      { width: 1600, height: 1200, suffix: '-xl' }
    ]
  },
  {
    name: 'pexels-pixabay-208745',
    src: 'california/pexels-pixabay-208745.jpg',
    sizes: [
      { width: 400, height: 300, suffix: '-sm' },
      { width: 800, height: 600, suffix: '-md' },
      { width: 1200, height: 900, suffix: '-lg' },
      { width: 1600, height: 1200, suffix: '-xl' }
    ]
  }
];

async function optimizeImages() {
  console.log('🚀 Starting California image optimization...\n');

  for (const config of imageConfigs) {
    console.log(`📸 Processing ${config.name}...`);
    
    try {
      // Create original size WebP version
      const originalOutput = path.join(outputDir, `${config.name}.webp`);
      await sharp(config.src)
        .webp({ quality: 85, effort: 6 })
        .toFile(originalOutput);
      
      const originalStats = fs.statSync(originalOutput);
      const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
      console.log(`  ✅ Original: ${originalSize} MB`);

      // Create responsive sizes
      for (const size of config.sizes) {
        const outputName = `${config.name}${size.suffix}.webp`;
        const outputPath = path.join(outputDir, outputName);
        
        await sharp(config.src)
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        const fileSize = (stats.size / 1024).toFixed(2);
        console.log(`  ✅ ${size.width}x${size.height}: ${fileSize} KB`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`  ❌ Error processing ${config.name}:`, error.message);
    }
  }
  
  console.log('🎉 California image optimization complete!');
}

optimizeImages().catch(console.error); 