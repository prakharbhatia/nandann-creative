import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { getAllTags, getPostsByTag, BlogPost } from '../../../data/blogPosts';
import { slugify } from '../../../lib/slugify';

type Props = { tag: string; posts: BlogPost[] };

export default function TagPage({ tag, posts }: Props) {
  const tagSlug = slugify(tag);
  const canonicalUrl = `https://www.nandann.com/blog/tag/${tagSlug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Articles tagged "${tag}"`,
    url: canonicalUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nandann.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.nandann.com/blog' },
        { '@type': 'ListItem', position: 3, name: `Tag: ${tag}`, item: canonicalUrl },
      ],
    },
  };

  return (
    <>
      <Head>
        <title>{`${tag} Articles - Nandann Creative Agency`}</title>
        <meta name="description" content={`Browse ${posts.length} articles tagged "${tag}" on Nandann Creative Agency.`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${tag} Articles - Nandann Creative`} />
        <meta property="og:description" content={`Browse ${posts.length} articles tagged "${tag}" on Nandann Creative Agency.`} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl mx-auto">
          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white">#{tag}</span>
          </nav>

          <header className="mb-12">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Tag</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">#{tag}</h1>
            <p className="text-gray-400">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} prefetch={false} className="block group">
                <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-200 h-full flex flex-col cursor-pointer">
                  {post.coverImage && (
                    <div className="relative h-48 w-full bg-gradient-to-br from-gray-900 to-gray-800">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-blue-300 text-sm mb-2">{post.category} • {post.readTime}</p>
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">{post.title}</h2>
                    <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">{post.description}</p>
                    <div className="flex items-center justify-between text-sm mt-auto">
                      <span className="text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                      <span className="text-blue-400 group-hover:text-blue-300 transition-colors">Read More →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">← All Articles</Link>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags();
  // Deduplicate by slug (handles case variants like 'serverless' vs 'Serverless')
  const seen = new Set<string>();
  const paths: { params: { tag: string } }[] = [];
  for (const tag of tags) {
    const s = slugify(tag);
    if (!seen.has(s)) {
      seen.add(s);
      paths.push({ params: { tag: s } });
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tagSlug = params?.tag as string;
  const tags = getAllTags();
  // Find canonical tag name that matches this slug
  const tag = tags.find((t) => slugify(t) === tagSlug);
  if (!tag) return { notFound: true };
  // Collect posts for all tag variants with the same slug
  const allTags = getAllTags();
  const variants = allTags.filter((t) => slugify(t) === tagSlug);
  const posts = getPostsByTag(tag);
  // Merge posts from case variants (e.g. 'serverless' and 'Serverless')
  const seen = new Set<string>();
  const merged = posts.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
  for (const variant of variants) {
    if (variant === tag) continue;
    for (const p of getPostsByTag(variant)) {
      if (!seen.has(p.slug)) {
        seen.add(p.slug);
        merged.push(p);
      }
    }
  }
  merged.sort((a, b) => (a.date < b.date ? 1 : -1));
  return { props: { tag, posts: merged } };
};
