#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Parse command line arguments
const args = process.argv.slice(2);
const inputFile = args[0];
const outputDir = args[1] || './public/images/optimized';
const preset = args[2] || 'responsive'; // responsive, blog, portfolio, simple

// Validate input
if (!inputFile) {
  console.error('❌ Usage: node scripts/optimize-image-generic.mjs <input-file> [output-dir] [preset]');
  console.error('');
  console.error('📋 Presets:');
  console.error('  responsive - Multiple sizes for responsive design (mobile, tablet, desktop, large)');
  console.error('  blog       - Blog post images (tablet + desktop)');
  console.error('  portfolio  - Portfolio images (small, medium, large, xl)');
  console.error('  simple     - Single optimized version');
  console.error('');
  console.error('💡 Examples:');
  console.error('  node scripts/optimize-image-generic.mjs ./public/images/banner.jpg');
  console.error('  node scripts/optimize-image-generic.mjs ./public/images/hero.png ./public/optimized blog');
  process.exit(1);
}

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Input file not found: ${inputFile}`);
  process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define presets
const presets = {
  responsive: [
    { width: 400, height: 267, suffix: '-mobile' },
    { width: 760, height: 507, suffix: '-tablet' },
    { width: 1200, height: 800, suffix: '-desktop' },
    { width: 1920, height: 1280, suffix: '-large' }
  ],
  blog: [
    { width: 760, height: 507, suffix: '-tablet' },
    { width: 1200, height: 800, suffix: '-desktop' }
  ],
  portfolio: [
    { width: 400, height: 300, suffix: '-sm' },
    { width: 800, height: 600, suffix: '-md' },
    { width: 1200, height: 900, suffix: '-lg' },
    { width: 1600, height: 1200, suffix: '-xl' }
  ],
  simple: [
    { width: 1200, height: 800, suffix: '' }
  ]
};

// Get file info
const fileName = path.basename(inputFile, path.extname(inputFile));
const fileExt = path.extname(inputFile);

async function optimizeImage() {
  try {
    console.log(`🖼️  Optimizing: ${path.basename(inputFile)}`);
    console.log(`📁 Output directory: ${outputDir}`);
    console.log(`⚙️  Preset: ${preset}`);
    console.log('');
    
    // Get original image info
    const originalInfo = await sharp(inputFile).metadata();
    console.log(`📏 Original dimensions: ${originalInfo.width}x${originalInfo.height}`);
    console.log(`📦 Original size: ${(fs.statSync(inputFile).size / 1024).toFixed(1)} KB`);
    console.log('');
    
    const sizes = presets[preset];
    if (!sizes) {
      console.error(`❌ Unknown preset: ${preset}`);
      console.error(`Available presets: ${Object.keys(presets).join(', ')}`);
      process.exit(1);
    }
    
    console.log(`🎯 Creating ${sizes.length} optimized versions...`);
    
    // Create optimized versions
    for (const size of sizes) {
      const outputName = `${fileName}${size.suffix}`;
      
      // WebP version
      await sharp(inputFile)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, `${outputName}.webp`));
      
      // AVIF version
      await sharp(inputFile)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center'
        })
        .avif({ quality: 80 })
        .toFile(path.join(outputDir, `${outputName}.avif`));
      
      console.log(`✅ Created ${size.width}x${size.height} versions (WebP + AVIF)`);
    }
    
    // Create fallback JPEG version (use first size for simple, tablet for others)
    const fallbackSize = preset === 'simple' ? sizes[0] : sizes.find(s => s.suffix === '-tablet') || sizes[0];
    const fallbackName = `${fileName}${fallbackSize.suffix}`;
    
    await sharp(inputFile)
      .resize(fallbackSize.width, fallbackSize.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, `${fallbackName}.jpg`));
    
    console.log(`✅ Created fallback JPEG version`);
    console.log('');
    
    // Get file sizes
    const files = fs.readdirSync(outputDir);
    console.log('📊 Optimized file sizes:');
    
    for (const file of files) {
      if (file.includes(fileName)) {
        const filePath = path.join(outputDir, file);
        const sizeKB = (fs.statSync(filePath).size / 1024).toFixed(1);
        console.log(`   ${file}: ${sizeKB} KB`);
      }
    }
    
    console.log('');
    console.log('🎉 Image optimization complete!');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Update your HTML to use responsive <picture> elements');
    console.log('   2. Add preload links for LCP images');
    console.log('   3. Test on different devices and screen sizes');
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
    process.exit(1);
  }
}

optimizeImage();