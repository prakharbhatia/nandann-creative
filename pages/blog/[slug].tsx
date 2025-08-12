import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { getPostBySlug, getAllPosts } from '../../data/blogPosts';

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return null;
  }

  const canonicalUrl = `https://www.nandann.com/blog/${post.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.description,
    image: post.coverImage || 'https://www.nandann.com/images/Nandann-logo-new.png',
    author: {
      '@type': 'Person',
      name: 'Prakhar Bhatia',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nandann Creative Agency',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.nandann.com/images/Nandann-logo-new.png',
      },
    },
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nandann.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.nandann.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const all = getAllPosts();
  const currentIndex = all.findIndex((p) => p.slug === post.slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : undefined;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : undefined;

  return (
    <>
      <Head>
        <title>{post.title} - Nandann Creative Agency</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.coverImage || 'https://www.nandann.com/images/Nandann-logo-new.png'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <div className="min-h-screen">
        <Navigation />

        <article className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <header className="mb-8">
            <p className="text-blue-300 text-sm mb-2">{post.category} • {post.readTime}</p>
            <h1 className="text-4xl font-bold text-white mb-3">{post.title}</h1>
            <p className="text-gray-400 text-sm">Published on {new Date(post.date).toLocaleDateString()}</p>
          </header>

          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-300 hover:prose-a:text-blue-200 prose-li:marker:text-blue-300" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-6">FAQs</h2>
              <div className="space-y-4">
                {post.faqs.map((f, i) => (
                  <details key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <summary className="cursor-pointer text-blue-300 font-semibold leading-6">{f.question}</summary>
                    <p className="text-gray-300 mt-3 leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <hr className="my-10 border-white/10" />

          <nav className="flex justify-between text-blue-300">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="hover:text-blue-200">← {prev.title}</Link>
            ) : <span />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="hover:text-blue-200">{next.title} →</Link>
            ) : <span />}
          </nav>

          <div className="mt-12">
            <Link href="/blog" className="text-blue-400 hover:text-blue-300">← Back to Blog</Link>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}

