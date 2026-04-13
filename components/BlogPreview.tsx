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
  href?: string;
}

const featuredPosts: BlogPost[] = [
  {
    slug: 'ai-coding-assistants-cant-read-code',
    title: "AI Coding Assistants Are Creating a Generation of Developers Who Can't Read Code",
    excerpt: "GitHub reported that developers using Copilot complete tasks 55% faster. But here's the number nobody's tracking: how many of those developers can actually read the code they ship? Speed of output is not speed of understanding.",
    date: 'Apr 13, 2026',
    readTime: '15 min read',
    category: 'Engineering',
    coverImage: '/images/ai-coding-assistants-banner.webp'
  },
  {
    slug: 'python-free-threading-2026',
    title: "Python's Free-Threading Mode: Is It Time to Care?",
    excerpt: "Python 3.13 shipped with something people argued about for two decades: the ability to disable the GIL. Python 3.14 made it officially supported. But officially supported doesn't mean deploy it on Friday. Here are the real benchmark numbers.",
    date: 'Apr 11, 2026',
    readTime: '12 min read',
    category: 'Engineering',
    coverImage: '/images/python_freethreading_banner.png'
  },
  {
    slug: 'rust-wasm-production-2026',
    title: "Rust WASM in 2026: From Toy Demos to Real Production Apps",
    excerpt: "Rust-to-WASM is shipping in products people actually use. From Figma to Shopify, the tooling has caught up and the production evidence is piling up. Here are the numbers, the pain points, and when to reach for it.",
    date: 'Apr 11, 2026',
    readTime: '14 min read',
    category: 'Engineering',
    coverImage: '/images/rust_wasm_banner.png'
  },
  {
    slug: 'salesforce-flow-vs-apex-2026',
    title: "Salesforce Flow vs Apex in 2026: The Decision Framework Nobody Gave You",
    excerpt: "Every Salesforce team hits the same wall. Flow or Apex? Nobody gives a straight answer. This isn't a religious debate — it's a tooling decision, and the landscape just shifted with Workflow Rules and Process Builder now dead.",
    date: 'Apr 11, 2026',
    readTime: '11 min read',
    category: 'Salesforce',
    coverImage: '/images/salesforce_flow_apex_banner.png'
  },
  {
    slug: 'wordpress-losing-customers-nextjs-blog-post',
    title: "Why Your WordPress Site Is Losing Customers (And How Next.js Fixes It)",
    excerpt: "Your WordPress site worked fine at 10,000 visitors a month. Now you're hitting 50,000. And it's crawling. Here is exactly why your WordPress site is losing customers and how Next.js fixes the underlying architecture problem.",
    date: 'Apr 9, 2026',
    readTime: '10 min read',
    category: 'Engineering',
    coverImage: '/images/wordpress-vs-next-js-nandann-creative.webp'
  },
  {
    slug: 'typescript-vs-deno-vs-bun-2026-performance-comparison',
    title: "TypeScript vs Deno vs Bun (2026): Performance, Features, and When to Use Each",
    excerpt: "If you're building scalable web applications, choosing the right runtime is crucial. Let's look at TypeScript vs Deno vs Bun to see which modern JavaScript ecosystem actually delivers. This isn't just about syntactical quirks — we're doing a deep dive into real-world performance, native capabilities, and overall latency. In this comprehensive comparison, we'll analyze the trade-offs of each platform in 2026 so you know exactly which tool to adopt.",
    date: 'Apr 5, 2026',
    readTime: '12 min read',
    category: 'Engineering',
    coverImage: '/images/typescript-bun-deno-nandann-creative.webp'
  },
  {
    slug: 'axios-npm-backdoored-supply-chain-attack',
    title: "Axios Was Backdoored! Your App & Client Data Could Be Exposed. Let’s Audit & Fix It",
    excerpt: "On March 31, 2026, axios — downloaded 100 million times a week — was backdoored via a compromised maintainer account. A Remote Access Trojan was silently installed on developer machines and CI runners. Here's exactly what happened, how to check if you were affected, and what to do.",
    date: 'Apr 1, 2026',
    readTime: '11 min read',
    category: 'Security',
    coverImage: '/images/axios-nandann-creative-thumbnail.webp'
  },
  {
    slug: 'voice-ai-agentic-ai-customer-support-guide',
    title: "Voice AI and Agentic AI Are Replacing Customer Support.",
    excerpt: "How voice AI and agentic AI actually work in customer support — the STT/LLM/TTS pipeline, latency optimization, platform comparison, real costs, and a 7-step developer implementation playbook.",
    date: 'Mar 29, 2026',
    readTime: '26 min read',
    category: 'Agentic AI',
    coverImage: '/images/voice-ai-agentic-ai-nandann-creative.png'
  },
  {
    slug: 'typescript-6-0-release-features-go-compiler-7-0',
    title: 'TypeScript 6.0 Is Here, And Microsoft Is Rebuilding the Entire Compiler in Go for 7.0',
    excerpt: "TypeScript 6.0 landed March 23, 2026 with strict mode on by default, ESM as the new default, and 9 changed compiler settings. Plus: Microsoft's Go-powered compiler hits 10x faster builds. Full migration guide inside.",
    date: 'Mar 27, 2026',
    readTime: '16 min read',
    category: 'TypeScript',
    coverImage: '/images/typescript-6-nandann-creative-thumbnail.webp'
  },
  {
    slug: 'nextjs-16-2-complete-guide',
    title: 'Next.js 16.2: Everything You Need to Know About use cache, Turbopack, and the New Proxy API',
    excerpt: 'Next.js 16.2 ships with the use cache directive, proxy.ts replacing middleware.ts, Turbopack as default bundler, and React 19.2. This guide covers every change with working code examples and a migration checklist.',
    date: 'Mar 25, 2026',
    readTime: '25 min read',
    category: 'Next.js',
    coverImage: '/images/nextjs-16.2-nandann-creative-thumbnail.webp'
  },
  {
    slug: 'rust-aws-lambda-production-guide',
    title: 'Rust on AWS Lambda: The Production Guide to Cold Starts, cargo-lambda, and Managed Instances',
    excerpt: 'Rust on AWS Lambda went GA in November 2025. This guide covers cargo-lambda, cold start benchmarks (16ms), ARM64 vs x86_64, Lambda Managed Instances, and everything you need to ship Rust functions to production.',
    date: 'Mar 22, 2026',
    readTime: '28 min read',
    category: 'Rust',
    coverImage: '/images/rust-aws-lambda-thumbnail.webp'
  },
  {
    slug: 'rust-pyo3-python-extensions-guide',
    title: 'PyO3 v0.28 and maturin: Writing Python Extensions in Rust That Actually Ship',
    excerpt: 'PyO3 v0.28 adds full support for free-threaded Python 3.14 and the GIL release API. This guide covers building, packaging, and shipping Python extensions in Rust with maturin — from first function to published PyPI wheel.',
    date: 'Mar 21, 2026',
    readTime: '26 min read',
    category: 'Rust',
    coverImage: '/images/rust-pyo3-python-nandann-creative.webp'
  },
  {
    slug: 'wordpress-7-developer-guide',
    title: 'WordPress 7.0: The Complete Developer Guide to Every Breaking Change and New API',
    excerpt: 'WordPress 7.0 ships April 9, 2026. Complete developer guide to WP AI Client, Connectors API, Abilities API, MCP Adapter, always-on iframed editor, PHP 7.4 minimum, DataViews, real-time collaboration, and the 14-step migration checklist.',
    date: 'Mar 19, 2026',
    readTime: '35 min read',
    category: 'WordPress',
    coverImage: '/images/wordpress-7-0-complete-developer-guide-nandann-creative-thumbnail.webp'
  },
  {
    slug: 'hungry-resource-monitor',
    title: 'Hungry Resource Monitor - WordPress Performance Plugin',
    excerpt: 'Monitor memory, CPU, and resource usage in WordPress. Detect bloat from plugins, themes, and database. Database cleanup, cron management, and weekly performance reports.',
    date: 'Jan 12, 2026',
    readTime: 'Free Plugin',
    category: 'WordPress Plugin',
    coverImage: '/images/hungry-resource-monitor-banner.webp',
    href: '/hungry-resource-monitor'
  },
  {
    slug: 'rewriting-in-rust-when-it-makes-sense',
    title: 'Rewriting in Rust: When It Makes Sense (With Real Examples from Discord, Cloudflare & Amazon)',
    excerpt: 'Should you rewrite in Rust? Learn from Discord, Cloudflare & Dropbox\'s real migrations. Complete guide to benefits, risks, and when Rust makes business sense.',
    date: 'Jan 10, 2026',
    readTime: '35 min read',
    category: 'Engineering',
    coverImage: '/images/rewriting-in-rust-thumbnail.webp'
  },
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
              href={post.href || `/blog/${post.slug}`}
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