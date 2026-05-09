import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { getAllCategories, getPostsByCategory, BlogPost } from '../../../data/blogPosts';
import { slugify } from '../../../lib/slugify';

type Props = { category: string; posts: BlogPost[] };

export default function CategoryPage({ category, posts }: Props) {
  const categorySlug = slugify(category);
  const canonicalUrl = `https://www.nandann.com/blog/category/${categorySlug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Articles`,
    url: canonicalUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.nandann.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.nandann.com/blog' },
        { '@type': 'ListItem', position: 3, name: category, item: canonicalUrl },
      ],
    },
  };

  return (
    <>
      <Head>
        <title>{`${category} Articles - Nandann Creative Agency`}</title>
        <meta name="description" content={`Browse all ${posts.length} ${category} articles from Nandann Creative Agency.`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${category} Articles - Nandann Creative`} />
        <meta property="og:description" content={`Browse ${posts.length} articles on ${category} from Nandann Creative Agency.`} />
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
            <span className="text-white">{category}</span>
          </nav>

          <header className="mb-12">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Category</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{category}</h1>
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
  const categories = getAllCategories();
  return {
    paths: categories.map((c) => ({ params: { category: slugify(c) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const categorySlug = params?.category as string;
  const categories = getAllCategories();
  const category = categories.find((c) => slugify(c) === categorySlug);
  if (!category) return { notFound: true };
  const posts = getPostsByCategory(category);
  return { props: { category, posts } };
};
