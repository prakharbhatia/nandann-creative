import sharp from 'sharp';
import { existsSync } from 'fs';

const src = process.argv[2];
const dest = process.argv[3] || 'public/images/ai-seo-banner.webp';

if (!src || !existsSync(src)) {
  console.error('Usage: node scripts/optimize-image.mjs <src> [dest]');
  process.exit(1);
}

// Get original dimensions and preserve them
const metadata = await sharp(src).metadata();
console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

await sharp(src)
  .webp({ quality: 85 })
  .toFile(dest);

console.log('Optimized image written to', dest);

