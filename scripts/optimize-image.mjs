import sharp from 'sharp';
import { existsSync } from 'fs';

const src = process.argv[2];
const dest = process.argv[3] || 'public/images/ai-seo-banner.webp';

if (!src || !existsSync(src)) {
  console.error('Usage: node scripts/optimize-image.mjs <src> [dest]');
  process.exit(1);
}

const width = 1200;
const height = 630;

await sharp(src)
  .resize(width, height, { fit: 'cover' })
  .webp({ quality: 82 })
  .toFile(dest);

console.log('Optimized image written to', dest);

