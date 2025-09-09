#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = './public/images/mobile-first-design-principles-nandann-creative.jpg';
const outputDir = './public/images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage() {
  try {
    console.log('🖼️  Optimizing mobile-first design image...');
    
    // Get original image info
    const originalInfo = await sharp(inputPath).metadata();
    console.log(`📏 Original dimensions: ${originalInfo.width}x${originalInfo.height}`);
    console.log(`📦 Original size: ${(fs.statSync(inputPath).size / 1024).toFixed(1)} KB`);
    
    // Create multiple optimized versions
    const sizes = [
      { width: 400, height: 267, suffix: '-mobile' },
      { width: 760, height: 507, suffix: '-tablet' },
      { width: 1200, height: 800, suffix: '-desktop' },
      { width: 1920, height: 1280, suffix: '-large' }
    ];
    
    for (const size of sizes) {
      // WebP version
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, `mobile-first-design-principles-nandann-creative${size.suffix}.webp`));
      
      // AVIF version
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .avif({ quality: 80 })
        .toFile(path.join(outputDir, `mobile-first-design-principles-nandann-creative${size.suffix}.avif`));
      
      console.log(`✅ Created ${size.width}x${size.height} versions (WebP + AVIF)`);
    }
    
    // Create a fallback JPEG version for the tablet size (most common)
    await sharp(inputPath)
      .resize(760, 507, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, 'mobile-first-design-principles-nandann-creative-tablet.jpg'));
    
    console.log('✅ Created fallback JPEG version');
    
    // Get file sizes
    const files = fs.readdirSync(outputDir);
    console.log('\n📊 Optimized file sizes:');
    
    for (const file of files) {
      if (file.includes('mobile-first-design-principles')) {
        const filePath = path.join(outputDir, file);
        const sizeKB = (fs.statSync(filePath).size / 1024).toFixed(1);
        console.log(`   ${file}: ${sizeKB} KB`);
      }
    }
    
    console.log('\n🎉 Image optimization complete!');
    console.log('💡 Next: Update blog post content to use responsive images');
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();