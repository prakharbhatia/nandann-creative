import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { getAllPosts, getAllCategories } from '../../data/blogPosts';
import { slugify } from '../../lib/slugify';

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts;
  const canonicalUrl = 'https://www.nandann.com/blog';

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Nandann Creative Blog',
    url: canonicalUrl,
    description: 'Insights on AI‑enhanced development, performance, SEO, and rapid delivery.',
  };

  return (
    <>
      <Head>
        <title>Blog - Nandann Creative Agency</title>
        <meta name="description" content="Insights on AI‑enhanced web development, performance optimization, SEO, and same‑day delivery." />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Latest Articles</h1>
            <p className="text-gray-300 text-lg">Practical strategies to build, launch, and scale high‑performing websites.</p>
          </header>

          {/* Category filter bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === null
                  ? 'bg-blue-500/30 text-blue-200 border-blue-400/50'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              All ({posts.length})
            </button>
            {categories.map((cat) => {
              const count = posts.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    activeCategory === cat
                      ? 'bg-blue-500/30 text-blue-200 border-blue-400/50'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {activeCategory && (
            <p className="text-center text-gray-400 text-sm mb-8">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''} in{' '}
              <Link href={`/blog/category/${slugify(activeCategory)}`} className="text-blue-400 hover:text-blue-300">
                {activeCategory}
              </Link>
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="block group"
              >
                <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-200 h-full flex flex-col cursor-pointer">
                  {post.coverImage && (
                    <div className="relative h-48 w-full bg-gradient-to-br from-gray-900 to-gray-800">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={post.slug === 'nextjs-16-release-comprehensive-guide' ? 'object-contain p-4' : 'object-cover'}
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-blue-300 text-sm mb-2">{post.category} • {post.readTime}</p>
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">{post.description}</p>
                    <div className="flex items-center justify-between text-sm mt-auto">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Prakhar Bhatia</span>
                      </div>
                      <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-200">Read More →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
