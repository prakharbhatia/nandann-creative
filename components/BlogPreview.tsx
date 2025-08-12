import React from 'react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const featuredPosts: BlogPost[] = [
  {
    slug: 'ai-web-development-2025',
    title: 'How AI Is Transforming Web Development in 2025',
    excerpt: 'Discover the latest AI tools and techniques that are transforming how we build websites, improving speed and quality.',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
    category: 'AI & Tech'
  },
  {
    slug: 'same-day-website-delivery',
    title: 'Same-Day Website Delivery: How We Make It Possible',
    excerpt: 'Behind the scenes of our rapid delivery process and the tools that enable 24-hour website launches.',
    date: 'Jan 10, 2025',
    readTime: '4 min read',
    category: 'Process'
  },
  {
    slug: 'web-performance-optimization-guide',
    title: 'Complete Guide to Web Performance Optimization',
    excerpt: 'Advanced techniques to make your website lightning-fast and improve search rankings.',
    date: 'Jan 5, 2025',
    readTime: '7 min read',
    category: 'Performance'
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
            <article key={post.slug} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{post.date}</span>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}