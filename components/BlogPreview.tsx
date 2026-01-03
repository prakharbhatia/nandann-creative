import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage?: string;
}

const featuredPosts: BlogPost[] = [
  {
    slug: 'tanstack-ai-switzerland-of-ai-tooling',
    title: 'TanStack AI: The Switzerland of AI Tooling (And Why That\'s Awesome)',
    excerpt: 'The most comprehensive guide to TanStack AI - the open-source, type-safe, provider-agnostic AI SDK. Learn everything from basic setup to isomorphic tools, streaming, DevTools, and real-world projects with runnable examples.',
    date: 'Jan 3, 2026',
    readTime: '30 min read',
    category: 'AI & Development',
    coverImage: '/images/thumbnail-tanstack.webp'
  },
  {
    slug: 'nextjs-16-release-comprehensive-guide',
    title: 'Next.js 16: Complete Guide to Cache Components, Turbopack, and Revolutionary Features',
    excerpt: 'Comprehensive deep-dive into Next.js 16 featuring Cache Components with PPR, stable Turbopack with 5-10x faster builds, proxy.ts replacing middleware, and all breaking changes explained with code examples.',
    date: 'Oct 22, 2025',
    readTime: '35 min read',
    category: 'Technology & Development',
    coverImage: '/images/nextjs-16-nandann-creative-tablet.webp'
  },
  {
    slug: 'php-8-5-launch-major-updates',
    title: 'PHP 8.5 Launch: Major Updates in This Version That Will Actually Make Life Easier',
    excerpt: 'Discover the major updates in PHP 8.5 that simplify development. Pipe operator, property hooks, get_exception_handler, new DOM API, and more with detailed code examples.',
    date: 'Oct 18, 2025',
    readTime: '22 min read',
    category: 'Technology & Development',
    coverImage: '/images/php-8-5-nandann-creative-agency(1)-tablet.webp'
  },
  {
    slug: 'ace-core-web-vitals-2025-inp-requirements',
    title: '7 Ways to Ace Core Web Vitals in 2025 Without Rebuilding Your Entire Website (New INP Requirements)',
    excerpt: 'Master Google\'s latest Core Web Vitals updates including the new INP metric. Learn 7 proven techniques to improve LCP, CLS, FCP, and INP scores without rebuilding your website.',
    date: 'Oct 15, 2025',
    readTime: '18 min read',
    category: 'Performance & Optimization',
    coverImage: '/images/core-web-vitals-improve-nandann-creative-tablet.webp'
  },
  {
    slug: 'struggling-with-scalability-accelerate-time-to-market-nextjs',
    title: 'Struggling with Scalability? Accelerate Time to Market with Next.js',
    excerpt: 'Discover how Next.js transforms scalability challenges into competitive advantages. Learn about performance optimization, cost reduction, and faster development cycles that accelerate your time to market.',
    date: 'Oct 6, 2025',
    readTime: '18 min read',
    category: 'Performance & Optimization',
    coverImage: '/images/optimized/next-js-scale-nandann-creative-agency-tablet.webp'
  },
  {
    slug: 'get-ready-2025-holiday-sales-traffic',
    title: 'Get Ready for 2025 Holiday Sales Traffic: Site Optimization Guide',
    excerpt: 'Prepare your website for the busiest shopping season. Learn about page speed optimization, WordPress to Next.js migration, and headless solutions for peak holiday performance.',
    date: 'Oct 3, 2025',
    readTime: '15 min read',
    category: 'Performance & Optimization',
    coverImage: '/images/holidays-2025-nandann-creative-agency-tablet.webp'
  },
  {
    slug: 'apple-iphone-17-ios-26-event-2025',
    title: 'Apple iPhone 17, iOS 26, and Apple Event 2025: What Developers Need to Know',
    excerpt: 'Comprehensive guide to Apple iPhone 17, iOS 26 release date, and Apple Event 2025. Learn about new APIs, SwiftUI enhancements, Core ML updates, and developer opportunities.',
    date: 'Sep 3, 2025',
    readTime: '12 min read',
    category: 'Technology & Development',
    coverImage: '/images/apple-iphone-17-ios-26-event-2025-lg.webp'
  },
  {
    slug: 'high-performance-websites-business-case',
    title: 'The Business Case for High-Performance Websites',
    excerpt: 'Discover why high-performance websites are crucial for business success in 2025. Speed, trust, and performance directly impact conversions.',
    date: 'Aug 21, 2025',
    readTime: '15 min read',
    category: 'Performance & SEO',
    coverImage: '/images/high-performance-websites-banner.webp'
  },
  {
    slug: 'ai-powered-website-fixes-local-businesses',
    title: '5 AI-Powered Website Fixes for Local Businesses',
    excerpt: 'Transform your website into a lead-generating machine with AI-powered optimization, smart CTAs, and voice search.',
    date: 'Aug 20, 2025',
    readTime: '12 min read',
    category: 'AI & SEO',
    coverImage: '/images/ai-powered-website-fixes.webp'
  },
  {
    slug: 'ai-seo-optimizing-for-ai-recommendations',
    title: 'AI‑SEO: Optimizing for AI Recommendations',
    excerpt: 'Appear in ChatGPT, Gemini, and Perplexity answers with JSON‑LD, datasets, APIs, and embeddings.',
    date: 'Aug 18, 2025',
    readTime: '18 min read',
    category: 'SEO',
    coverImage: '/images/ai-seo-banner.webp'
  },
  {
    slug: 'gpt5-review-raising-the-floor',
    title: 'GPT‑5 Is Here: Why Raising the Floor Matters Most',
    excerpt: 'A practical review focused on GPT‑5\'s biggest win: fewer hallucinations and more reliable answers.',
    date: 'Aug 13, 2025',
    readTime: '18 min read',
    category: 'AI & Tech',
    coverImage: '/images/gpt5-header.svg'
  },
  {
    slug: 'ai-web-development-2025',
    title: 'How AI Is Transforming Web Development in 2025',
    excerpt: 'Discover the latest AI tools and techniques that are transforming how we build websites, improving speed and quality.',
    date: 'Aug 12, 2025',
    readTime: '18 min read',
    category: 'AI & Tech',
    coverImage: '/images/ai-powered-website-fixes.webp'
  }
];

export default function BlogPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Latest Insights
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert insights on web development, AI tools, and digital strategies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              prefetch={false}
              className="block group"
            >
              <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                {post.coverImage && (
                  <div className="relative h-48 w-full bg-gradient-to-br from-gray-900 to-gray-800">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className={
                        post.slug === 'nextjs-16-release-comprehensive-guide' ||
                          post.slug === 'tanstack-ai-switzerland-of-ai-tooling'
                          ? 'object-contain p-4'
                          : 'object-cover'
                      }
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-200 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{post.date}</span>
                    <span className="text-blue-400 group-hover:text-blue-300 font-medium transition-colors duration-200">
                      Read More →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            prefetch={false}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}