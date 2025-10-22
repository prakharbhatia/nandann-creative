import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { getAllPosts } from '../../data/blogPosts';

export default function BlogIndexPage() {
  const posts = getAllPosts();
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
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Latest Articles</h1>
            <p className="text-gray-300 text-lg">Practical strategies to build, launch, and scale high‑performing websites.</p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="block group"
              >
                <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col cursor-pointer">
                {post.coverImage && (
                  <div className="relative h-48 w-full bg-gradient-to-br from-gray-900 to-gray-800">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
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

