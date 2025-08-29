import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// Ensure public/newyork directory exists
const outputDir = 'public/newyork';
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Image optimization configurations
const imageConfigs = [
  {
    name: 'pexels-pixabay-40142',
    src: 'newyork/pexels-pixabay-40142.jpg',
    sizes: [
      { width: 400, height: 300, suffix: '-sm' },
      { width: 800, height: 600, suffix: '-md' },
      { width: 1200, height: 900, suffix: '-lg' },
      { width: 1600, height: 1200, suffix: '-xl' }
    ]
  },
  {
    name: 'pexels-lkloeppel-466685',
    src: 'newyork/pexels-lkloeppel-466685.jpg',
    sizes: [
      { width: 400, height: 300, suffix: '-sm' },
      { width: 800, height: 600, suffix: '-md' },
      { width: 1200, height: 900, suffix: '-lg' },
      { width: 1600, height: 1200, suffix: '-xl' }
    ]
  }
];

async function optimizeImage(config) {
  console.log(`\n🖼️  Optimizing ${config.name}...`);
  
  try {
    // Get original metadata
    const metadata = await sharp(config.src).metadata();
    console.log(`   Original: ${metadata.width}x${metadata.height} (${(metadata.size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Create optimized versions
    for (const size of config.sizes) {
      const outputPath = `${outputDir}/${config.name}${size.suffix}.webp`;
      
      await sharp(config.src)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);
      
      // Get optimized file size
      const optimizedStats = await sharp(outputPath).metadata();
      const fileSize = (optimizedStats.size / 1024).toFixed(2);
      
      console.log(`   ${size.suffix}: ${size.width}x${size.height} (${fileSize} KB)`);
    }
    
    // Create original size optimized version
    const originalOptimized = `${outputDir}/${config.name}-original.webp`;
    await sharp(config.src)
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(originalOptimized);
    
    const originalStats = await sharp(originalOptimized).metadata();
    const originalSize = (originalStats.size / 1024).toFixed(2);
    console.log(`   original: ${metadata.width}x${metadata.height} (${originalSize} KB)`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${config.name}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting New York assets optimization...\n');
  
  // Optimize all images
  for (const config of imageConfigs) {
    if (existsSync(config.src)) {
      await optimizeImage(config);
    } else {
      console.log(`⚠️  Source file not found: ${config.src}`);
    }
  }
  
  console.log('\n✅ Image optimization complete!');
  console.log('\n📁 Optimized files created in:', outputDir);
  console.log('\n💡 Next steps:');
  console.log('   1. Update the New York page to use responsive images');
  console.log('   2. Consider adding a video optimization step');
  console.log('   3. Test page performance with Lighthouse');
}

main().catch(console.error); 