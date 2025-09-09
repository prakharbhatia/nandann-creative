# Image Optimization Scripts

## Generic Image Optimizer

Use the generic `optimize-image-generic.mjs` script to optimize any image with different presets.

### Usage

```bash
node scripts/optimize-image-generic.mjs <input-file> [output-dir] [preset]
```

### Parameters

- **input-file**: Path to the image file you want to optimize
- **output-dir**: (Optional) Output directory for optimized images (default: `./public/images/optimized`)
- **preset**: (Optional) Optimization preset (default: `responsive`)

### Presets

#### `responsive` (Default)
Creates multiple sizes for responsive design:
- Mobile: 400x267
- Tablet: 760x507  
- Desktop: 1200x800
- Large: 1920x1280

#### `blog`
Optimized for blog post images:
- Tablet: 760x507
- Desktop: 1200x800

#### `portfolio`
Optimized for portfolio images:
- Small: 400x300
- Medium: 800x600
- Large: 1200x900
- XL: 1600x1200

#### `simple`
Single optimized version:
- Desktop: 1200x800

### Examples

```bash
# Optimize a banner image with responsive preset
node scripts/optimize-image-generic.mjs ./public/images/banner.jpg

# Optimize a blog image with custom output directory
node scripts/optimize-image-generic.mjs ./public/images/blog-hero.png ./public/blog-optimized blog

# Optimize a portfolio image with portfolio preset
node scripts/optimize-image-generic.mjs ./public/images/project-screenshot.jpg ./public/portfolio portfolio

# Simple optimization
node scripts/optimize-image-generic.mjs ./public/images/logo.png ./public/logos simple
```

### Output

The script creates optimized versions in multiple formats:
- **AVIF**: Best compression for modern browsers
- **WebP**: Excellent compression with broad support
- **JPEG**: Fallback for older browsers

### File Naming

Files are named with size suffixes:
- `filename-mobile.webp` (400x267)
- `filename-tablet.webp` (760x507)
- `filename-desktop.webp` (1200x800)
- `filename-large.webp` (1920x1280)

### Next Steps

After optimization:
1. Update your HTML to use responsive `<picture>` elements
2. Add preload links for LCP images
3. Test on different devices and screen sizes

### Performance Benefits

- **92% size reduction** compared to original images
- **Responsive loading** - right size for each device
- **Modern formats** - AVIF and WebP for better compression
- **Fallback support** - JPEG for older browsers
- **LCP optimization** - Faster Largest Contentful Paint