import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { getAllPosts } from '../../data/blogPosts';

const BASE = 'https://www.nandann.com';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE}/author/prakhar-bhatia`,
  name: 'Prakhar Bhatia',
  url: `${BASE}/author/prakhar-bhatia`,
  image: {
    '@type': 'ImageObject',
    url: `${BASE}/images/prakhar.jpg`,
    width: 400,
    height: 400,
  },
  jobTitle: 'Founder & Lead Developer',
  description: 'Prakhar Bhatia is the founder of Nandann Creative Agency with 16+ years of experience in web development, specializing in Next.js, React, WordPress, Rust, and Salesforce.',
  worksFor: {
    '@type': 'Organization',
    name: 'Nandann Creative Agency',
    url: BASE,
  },
  knowsAbout: ['Next.js', 'React', 'WordPress', 'Rust', 'WebAssembly', 'Python', 'Salesforce', 'SEO', 'AI Development'],
  sameAs: [
    'https://www.linkedin.com/in/prakharbhatia',
    'https://github.com/prakharbhatia',
    'https://twitter.com/prakharbhatia',
  ],
};

export default function PrakharBhatia() {
  const posts = getAllPosts();
  const canonicalUrl = `${BASE}/author/prakhar-bhatia`;

  return (
    <>
      <Head>
        <title>Prakhar Bhatia — Founder & Lead Developer at Nandann Creative Agency</title>
        <meta name="description" content="Prakhar Bhatia is the founder of Nandann Creative Agency with 16+ years of experience in Next.js, React, WordPress, Rust, and Salesforce development." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Prakhar Bhatia — Founder & Lead Developer" />
        <meta property="og:description" content="Prakhar Bhatia is the founder of Nandann Creative Agency with 16+ years of experience in web development." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${BASE}/images/prakhar.jpg`} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="profile:first_name" content="Prakhar" />
        <meta property="profile:last_name" content="Bhatia" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nandanncreative" />
        <meta name="twitter:creator" content="@prakharbhatia" />
        <meta name="twitter:title" content="Prakhar Bhatia — Founder & Lead Developer" />
        <meta name="twitter:description" content="Prakhar Bhatia is the founder of Nandann Creative Agency with 16+ years of experience in web development." />
        <meta name="twitter:image" content={`${BASE}/images/prakhar.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>

      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Author card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-16">
            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/30 shrink-0">
              <Image
                src="/images/prakhar.jpg"
                alt="Prakhar Bhatia"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Prakhar Bhatia</h1>
              <p className="text-blue-300 font-medium mb-4">Founder &amp; Lead Developer · Nandann Creative Agency</p>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">
                16+ years building web products — from WordPress plugins to Next.js apps to Rust WASM. I write about what I&apos;m actually shipping, not what I&apos;m reading about.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/prakharbhatia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/prakharbhatia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  GitHub
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all text-sm font-medium"
                >
                  Work with me →
                </Link>
              </div>
            </div>
          </div>

          {/* Articles */}
          <h2 className="text-2xl font-bold text-white mb-8">
            Articles by Prakhar
          </h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="block group"
              >
                <article className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{post.description}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
