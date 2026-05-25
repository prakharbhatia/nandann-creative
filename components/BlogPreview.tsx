import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, BlogPost as DataBlogPost } from '../data/blogPosts';
import { projects, Project } from '../data/projects';

interface UnifiedPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage?: string;
  href?: string;
}

// Utility to format date string to "MMM DD, YYYY"
const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};

// Merge and sort data
const getUnifiedPosts = (): UnifiedPost[] => {
  const unifiedBlogPosts: UnifiedPost[] = blogPosts.map((post: DataBlogPost) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    coverImage: post.coverImage,
    href: `/blog/${post.slug}`
  }));

  const unifiedProjects: UnifiedPost[] = projects.map((proj: Project) => {
    const category = Array.isArray(proj.category) ? proj.category[0] : proj.category;
    const displayCategory = category === 'plugin' ? 'WordPress Plugin' : 
                          category.charAt(0).toUpperCase() + category.slice(1);
    
    return {
      slug: proj.id,
      title: proj.title,
      excerpt: proj.description,
      date: proj.date,
      readTime: category === 'plugin' ? 'Free Plugin' : 'Case Study',
      category: displayCategory,
      coverImage: proj.images[0] || '/images/nandann-social-card.png',
      href: proj.link || `/portfolio/${proj.id}`
    };
  });

  return [...unifiedBlogPosts, ...unifiedProjects]
    .sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
    })
    .slice(0, 27);
};

const featuredPosts = getUnifiedPosts();

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
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={post.href || `/blog/${post.slug}`}
              prefetch={false}
              className="block group"
            >
              <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-200 cursor-pointer h-full flex flex-col">
                {post.coverImage && (
                  <div className="relative h-48 w-full bg-gradient-to-br from-gray-900 to-gray-800">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={
                        post.slug === 'nextjs-16-release-comprehensive-guide' ||
                          post.slug === 'tanstack-ai-switzerland-of-ai-tooling'
                          ? 'object-contain p-4'
                          : 'object-cover'
                      }
                    />
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
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

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{formatDate(post.date)}</span>
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