/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Compiler optimizations for modern browsers
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // SWC configuration for modern browsers only
  experimental: {
    swcPlugins: [],
  },
  
  // SWC configuration to disable polyfills
  swcMinify: true,
  
  // Webpack optimizations for modern browsers
  webpack: (config, { dev, isServer }) => {
    // Modern JavaScript target - no polyfills needed
    if (!isServer) {
      config.target = ['web', 'es2020'];
      
      // Disable polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
      
      // Disable specific polyfills that are causing issues
      config.resolve.alias = {
        ...config.resolve.alias,
        // Disable polyfills for modern JavaScript features
        'core-js/modules/es.array.at': false,
        'core-js/modules/es.array.flat': false,
        'core-js/modules/es.array.flat-map': false,
        'core-js/modules/es.object.from-entries': false,
        'core-js/modules/es.object.has-own': false,
        'core-js/modules/es.string.trim-end': false,
        'core-js/modules/es.string.trim-start': false,
        // Additional polyfill disabling
        'core-js': false,
        'core-js/': false,
        '@babel/polyfill': false,
        'babel-polyfill': false,
      };
      
      // Disable polyfill injection completely
      config.optimization = {
        ...config.optimization,
        providedExports: false,
        usedExports: false,
      };
      
      // Add plugin to remove polyfills
      const webpack = require('webpack');
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^core-js$/,
        }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^core-js\/modules\/es\./,
        })
      );
    }
    
    return config;
  },
  
  // SEO optimizations
  async headers() {
    return [
      {
        source: '/_next/static/:path*.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Add redirects here if needed
    ]
  },
}

module.exports = nextConfig