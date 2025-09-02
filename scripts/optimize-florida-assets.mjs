import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Create output directory if it doesn't exist
const outputDir = 'public/florida';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image configurations with multiple sizes
const imageConfigs = [
  {
    name: 'pexels-nextvoyage-2225499',
    src: 'pexels-nextvoyage-2225499(1).jpg',
    sizes: [
      { width: 400, height: 300, suffix: '-sm' },
      { width: 800, height: 600, suffix: '-md' },
      { width: 1200, height: 900, suffix: '-lg' },
      { width: 1600, height: 1200, suffix: '-xl' }
    ]
  },
  {
    name: 'pexels-pixabay-373543',
    src: 'pexels-pixabay-373543.jpg',
    sizes: [
      { width: 400, height: 300, suffix: '-sm' },
      { width: 800, height: 600, suffix: '-md' },
      { width: 1200, height: 900, suffix: '-lg' },
      { width: 1600, height: 1200, suffix: '-xl' }
    ]
  }
];

async function optimizeImages() {
  console.log('🚀 Starting Florida image optimization...\n');

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
  
  console.log('🎉 Florida image optimization complete!');
}

optimizeImages().catch(console.error); 