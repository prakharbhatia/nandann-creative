import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { blogPosts, getPostBySlug, getAllPosts, type BlogPost } from '../../data/blogPosts';

type Props = { post: BlogPost };

export default function BlogPostPage({ post }: Props) {

  const canonicalUrl = `https://www.nandann.com/blog/${post.slug}`;
  const toAbsolute = (path: string) => (path?.startsWith('http') ? path : `https://www.nandann.com${path}`);
  const preferredCover = post.coverImage ? toAbsolute(post.coverImage) : undefined;
  const dynamicOg = `https://www.nandann.com/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}`;
  const ogImageUrl = preferredCover && !preferredCover.endsWith('.svg') ? preferredCover : dynamicOg;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.description,
    image: ogImageUrl,
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
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:alt" content={`${post.title} – Nandann Creative`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - Nandann Creative Agency`} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImageUrl} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};

