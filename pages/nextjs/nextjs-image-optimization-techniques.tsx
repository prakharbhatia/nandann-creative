import Head from 'next/head';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import StructuredData from '../../components/StructuredData';

export default function NextJSImageOptimizationTechniques() {
  const faqs = [
    {
      question: "What is the Next.js Image component and how does it optimize images?",
      answer: "The Next.js Image component automatically optimizes images by providing lazy loading, automatic format conversion (WebP, AVIF), responsive sizing, and priority loading. It reduces image file sizes by 30-50% and improves loading performance by 2-3x compared to standard HTML img tags."
    },
    {
      question: "How do I implement responsive images with Next.js?",
      answer: "Use the Next.js Image component with the 'fill' prop for responsive containers or specify 'sizes' prop for different screen sizes. The component automatically generates multiple image sizes and serves the appropriate one based on device and screen resolution."
    },
    {
      question: "What image formats does Next.js support for optimization?",
      answer: "Next.js automatically converts images to modern formats like WebP and AVIF when supported by the browser, falling back to JPEG/PNG for older browsers. AVIF provides 50% better compression than JPEG, while WebP offers 25-35% better compression."
    },
    {
      question: "How do I optimize images for Core Web Vitals?",
      answer: "Use the Next.js Image component with proper sizing, implement lazy loading for below-the-fold images, use priority loading for above-the-fold images, and optimize image dimensions to prevent layout shift. This improves LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift) scores."
    },
    {
      question: "Can I use external image sources with Next.js Image component?",
      answer: "Yes, but you need to configure the 'domains' or 'remotePatterns' in next.config.js to allow external image sources. This is important for security and performance optimization. Always use HTTPS sources and consider using a CDN for better performance."
    },
    {
      question: "How do I implement image lazy loading in Next.js?",
      answer: "The Next.js Image component includes lazy loading by default. Images load only when they're about to enter the viewport. You can disable lazy loading by setting 'priority={true}' for above-the-fold images or use the 'loading' prop to control the behavior."
    },
    {
      question: "What's the difference between static and dynamic image optimization?",
      answer: "Static optimization happens at build time for images in the public folder, while dynamic optimization happens at request time for external images or images processed through the Next.js Image Optimization API. Static optimization is faster but requires build-time processing."
    },
    {
      question: "How do I optimize images for different screen densities?",
      answer: "Next.js automatically handles different screen densities by generating multiple image sizes. Use the 'sizes' prop to specify how the image will be displayed at different breakpoints, and the component will serve the appropriate size for each device's pixel density."
    }
  ];

  return (
    <>
      <Head>
        <title>Next.js Image Optimization Techniques 2025 | Performance Guide | Nandann Creative</title>
        <meta name="description" content="Complete guide to Next.js image optimization techniques 2025. Learn advanced strategies for Core Web Vitals, lazy loading, responsive images, and performance optimization with code examples." />
        <meta name="keywords" content="Next.js image optimization, Next.js Image component, image performance, Core Web Vitals, lazy loading, responsive images, WebP, AVIF" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/nextjs/nextjs-image-optimization-techniques" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Next.js Image Optimization Techniques 2025 | Performance Guide" />
        <meta property="og:description" content="Complete guide to Next.js image optimization techniques 2025. Learn advanced strategies for Core Web Vitals, lazy loading, responsive images, and performance optimization with code examples." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.nandann.com/nextjs/nextjs-image-optimization-techniques" />
        <meta property="og:image" content="https://www.nandann.com/api/og?title=Next.js%20Image%20Optimization%20Techniques%202025&subtitle=Performance%20Guide%20%26%20Core%20Web%20Vitals" />
        <meta property="og:site_name" content="Nandann Creative" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next.js Image Optimization Techniques 2025 | Performance Guide" />
        <meta name="twitter:description" content="Complete guide to Next.js image optimization techniques 2025. Learn advanced strategies for Core Web Vitals, lazy loading, responsive images, and performance optimization with code examples." />
        <meta name="twitter:image" content="https://www.nandann.com/api/og?title=Next.js%20Image%20Optimization%20Techniques%202025&subtitle=Performance%20Guide%20%26%20Core%20Web%20Vitals" />
        
        {/* Additional SEO */}
        <meta name="author" content="Nandann Creative" />
        <meta name="publisher" content="Nandann Creative" />
        <meta name="language" content="en-US" />
        <meta name="article:published_time" content="2025-01-27T00:00:00Z" />
        <meta name="article:modified_time" content="2025-01-27T00:00:00Z" />
        <meta name="article:section" content="Performance" />
        <meta name="article:tag" content="Next.js, Image Optimization, Performance, Core Web Vitals, WebP, AVIF" />
      </Head>

      <StructuredData 
        type="website"
        pageUrl="https://www.nandann.com/nextjs/nextjs-image-optimization-techniques"
        pageTitle="Next.js Image Optimization Techniques 2025 | Performance Guide"
        pageDescription="Complete guide to Next.js image optimization techniques 2025. Learn advanced strategies for Core Web Vitals, lazy loading, responsive images, and performance optimization with code examples."
      />

      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                Next.js <span className="text-gradient">Image Optimization</span> Techniques 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Complete guide to Next.js image optimization techniques for maximum performance. 
                Learn advanced strategies for Core Web Vitals, lazy loading, responsive images, and performance optimization.
              </p>
            </div>

            {/* Optimization Overview */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Image Optimization Overview</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Automatic Optimization</h3>
                  <p className="text-gray-300 text-sm">Built-in image optimization with format conversion and size reduction.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🖼️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Responsive Images</h3>
                  <p className="text-gray-300 text-sm">Automatic responsive sizing and multiple image generation.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🚀</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Lazy Loading</h3>
                  <p className="text-gray-300 text-sm">Intelligent lazy loading for improved page performance.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Core Web Vitals</h3>
                  <p className="text-gray-300 text-sm">Optimized for LCP, CLS, and other performance metrics.</p>
                </div>
              </div>
            </div>

            {/* Basic Implementation */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Basic Image Component Implementation</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Basic Usage</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`import Image from 'next/image'

// Basic image with optimization
<Image
  src="/hero-image.jpg"
  alt="Hero image description"
  width={800}
  height={600}
  priority
/>

// Responsive image with sizes
<Image
  src="/product-image.jpg"
  alt="Product image"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
                    </pre>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Automatic format conversion (WebP, AVIF)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Lazy loading by default</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Responsive image generation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Advanced Configuration</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}`}
                    </pre>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Custom device sizes and image sizes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Cache TTL configuration</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>SVG support with security policies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Responsive Images */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Responsive Image Techniques</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Fill Container</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Responsive image that fills container
<div className="relative w-full h-64">
  <Image
    src="/landscape-image.jpg"
    alt="Landscape image"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>

// With object-fit variations
<Image
  src="/portrait-image.jpg"
  alt="Portrait image"
  fill
  className="object-contain"
  sizes="(max-width: 768px) 100vw, 33vw"
/>`}
                    </pre>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Use 'fill' prop for responsive containers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Combine with object-fit CSS classes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Specify sizes for different breakpoints</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Sizes Prop Strategy</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Optimized sizes for different layouts
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  priority
/>

// Grid layout images
<Image
  src="/grid-item.jpg"
  alt="Grid item"
  width={400}
  height={300}
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>`}
                    </pre>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Define sizes based on layout breakpoints</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Use priority for above-the-fold images</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Optimize for different screen densities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Performance Optimization Strategies</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Priority Loading</h3>
                  <p className="text-gray-300 text-sm mb-4">Use priority prop for above-the-fold images to improve LCP scores.</p>
                  <div className="bg-black/20 rounded-lg p-3">
                    <pre className="text-gray-300 text-xs overflow-x-auto">
{`<Image
  src="/hero.jpg"
  priority
  alt="Hero"
/>`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🖼️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Format Optimization</h3>
                  <p className="text-gray-300 text-sm mb-4">Automatic WebP/AVIF conversion for 30-50% smaller file sizes.</p>
                  <div className="bg-black/20 rounded-lg p-3">
                    <pre className="text-gray-300 text-xs overflow-x-auto">
{`// Automatic format detection
// Serves AVIF → WebP → JPEG/PNG`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Responsive Sizing</h3>
                  <p className="text-gray-300 text-sm mb-4">Generate multiple sizes for different devices and screen densities.</p>
                  <div className="bg-black/20 rounded-lg p-3">
                    <pre className="text-gray-300 text-xs overflow-x-auto">
{`sizes="(max-width: 768px) 100vw, 50vw"`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🚀</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Lazy Loading</h3>
                  <p className="text-gray-300 text-sm mb-4">Images load only when entering viewport, reducing initial page weight.</p>
                  <div className="bg-black/20 rounded-lg p-3">
                    <pre className="text-gray-300 text-xs overflow-x-auto">
{`// Default behavior
// loading="lazy"`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🔧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Quality Optimization</h3>
                  <p className="text-gray-300 text-sm mb-4">Adjust quality settings for optimal balance between size and visual quality.</p>
                  <div className="bg-black/20 rounded-lg p-3">
                    <pre className="text-gray-300 text-xs overflow-x-auto">
{`<Image
  quality={75}
  src="/image.jpg"
/>`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">CDN Integration</h3>
                  <p className="text-gray-300 text-sm mb-4">Serve optimized images from global CDN for faster delivery.</p>
                  <div className="bg-black/20 rounded-lg p-3">
                    <pre className="text-gray-300 text-xs overflow-x-auto">
{`// Automatic CDN optimization
// Built into Next.js Image component`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Web Vitals Optimization */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Core Web Vitals Optimization</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">LCP (Largest Contentful Paint)</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Optimize hero image for LCP
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
  quality={85}
  sizes="(max-width: 768px) 100vw, 1200px"
/>

// Preload critical images
<link
  rel="preload"
  as="image"
  href="/hero-image.jpg"
/>`}
                    </pre>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Use priority prop for above-the-fold images</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Optimize image dimensions and quality</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Preload critical images in document head</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">CLS (Cumulative Layout Shift)</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Prevent layout shift with explicit dimensions
<div className="relative w-full h-64">
  <Image
    src="/responsive-image.jpg"
    alt="Responsive image"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>

// Or use explicit width/height
<Image
  src="/fixed-image.jpg"
  alt="Fixed image"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 400px"
/>`}
                    </pre>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Always specify width and height</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Use aspect-ratio CSS for responsive containers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Avoid images without dimensions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Advanced Techniques */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Advanced Optimization Techniques</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">External Image Sources</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

// Usage
<Image
  src="https://example.com/images/product.jpg"
  alt="Product image"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Image Placeholders and Blur</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Blur placeholder
<Image
  src="/image.jpg"
  alt="Image with blur"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>

// Dynamic blur generation
import { getPlaiceholder } from 'plaiceholder'

const { base64 } = await getPlaiceholder('/image.jpg')

<Image
  src="/image.jpg"
  alt="Image with dynamic blur"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL={base64}
/>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Custom Image Loader</h3>
                  <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`// Custom loader for external services
const customLoader = ({ src, width, quality }) => {
  return \`https://example.com/image?url=\${encodeURIComponent(src)}&w=\${width}&q=\${quality || 75}\`
}

// Usage
<Image
  loader={customLoader}
  src="/image.jpg"
  alt="Custom loaded image"
  width={400}
  height={300}
/>

// next.config.js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './my-loader.js',
  },
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Performance Impact</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">30-50%</div>
                  <div className="text-gray-300">Smaller File Sizes</div>
                  <div className="text-sm text-gray-400 mt-2">WebP/AVIF conversion</div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2-3x</div>
                  <div className="text-gray-300">Faster Loading</div>
                  <div className="text-sm text-gray-400 mt-2">Lazy loading + optimization</div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">40%</div>
                  <div className="text-gray-300">Better LCP</div>
                  <div className="text-sm text-gray-400 mt-2">Largest Contentful Paint</div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">90%</div>
                  <div className="text-gray-300">Reduced CLS</div>
                  <div className="text-sm text-gray-400 mt-2">Cumulative Layout Shift</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="glass rounded-2xl p-12">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Need Help with Image Optimization?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get expert help implementing Next.js image optimization techniques. 
                  Improve your Core Web Vitals and site performance with professional optimization services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Get Optimization Help
                  </Link>
                  <Link
                    href="/nextjs/wordpress-to-nextjs-migration-service"
                    className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    View Migration Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          title="Image Optimization FAQ"
          faqs={faqs}
        />
      </main>

      <Footer />
    </>
  );
}
