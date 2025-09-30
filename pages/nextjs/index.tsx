import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import StructuredData from '../../components/StructuredData';

export default function NextJSIndex() {
  return (
    <>
      <Head>
        <title>Next.js Development Services & Migration Guide 2025 | Nandann Creative</title>
        <meta name="description" content="Comprehensive Next.js development services, WordPress migration guides, and performance optimization. Expert Next.js consulting for modern web applications in 2025." />
        <meta name="keywords" content="Next.js development, WordPress to Next.js migration, Next.js performance, React framework, web development 2025" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/nextjs" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Next.js Development Services & Migration Guide 2025 | Nandann Creative" />
        <meta property="og:description" content="Comprehensive Next.js development services, WordPress migration guides, and performance optimization. Expert Next.js consulting for modern web applications in 2025." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/nextjs" />
        <meta property="og:image" content="https://www.nandann.com/api/og?title=Next.js%20Development%20Services%202025&subtitle=WordPress%20Migration%20%26%20Performance%20Optimization" />
        <meta property="og:site_name" content="Nandann Creative" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next.js Development Services & Migration Guide 2025 | Nandann Creative" />
        <meta name="twitter:description" content="Comprehensive Next.js development services, WordPress migration guides, and performance optimization. Expert Next.js consulting for modern web applications in 2025." />
        <meta name="twitter:image" content="https://www.nandann.com/api/og?title=Next.js%20Development%20Services%202025&subtitle=WordPress%20Migration%20%26%20Performance%20Optimization" />
        
        {/* Additional SEO */}
        <meta name="author" content="Nandann Creative" />
        <meta name="publisher" content="Nandann Creative" />
        <meta name="language" content="en-US" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
      </Head>

      <StructuredData 
        type="website"
        pageUrl="https://www.nandann.com/nextjs"
        pageTitle="Next.js Development Services & Migration Guide 2025"
        pageDescription="Comprehensive Next.js development services, WordPress migration guides, and performance optimization. Expert Next.js consulting for modern web applications in 2025."
      />

      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                Next.js <span className="text-gradient">Development</span> 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Expert Next.js development services, WordPress migration guides, and performance optimization. 
                Transform your web presence with modern React framework solutions.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Migration Cost Analysis</h3>
                <p className="text-gray-300 mb-6">Comprehensive cost breakdown for WordPress to Next.js migration with ROI analysis and budget planning.</p>
                <Link href="/nextjs/wordpress-to-nextjs-migration-cost" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Learn More →
                </Link>
              </div>

              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Migration Services</h3>
                <p className="text-gray-300 mb-6">Professional WordPress to Next.js migration services with zero downtime and SEO preservation.</p>
                <Link href="/nextjs/wordpress-to-nextjs-migration-service" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Get Started →
                </Link>
              </div>

              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">SEO Migration</h3>
                <p className="text-gray-300 mb-6">Preserve and enhance your SEO rankings during WordPress to Next.js migration with proven strategies.</p>
                <Link href="/nextjs/wordpress-to-nextjs-seo-migration" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Explore →
                </Link>
              </div>

              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Migration Guide</h3>
                <p className="text-gray-300 mb-6">Step-by-step tutorial for migrating WordPress to Next.js with code examples and best practices.</p>
                <Link href="/nextjs/how-to-migrate-wordpress-to-nextjs" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Read Guide →
                </Link>
              </div>

              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Performance Benchmark</h3>
                <p className="text-gray-300 mb-6">Comprehensive performance comparison between Next.js and WordPress with real-world metrics.</p>
                <Link href="/nextjs/nextjs-vs-wordpress-performance-benchmark" className="text-blue-400 hover:text-blue-300 transition-colors">
                  View Results →
                </Link>
              </div>

              <div className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-white text-2xl">🖼️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Image Optimization</h3>
                <p className="text-gray-300 mb-6">Advanced Next.js image optimization techniques for maximum performance and Core Web Vitals.</p>
                <Link href="/nextjs/nextjs-image-optimization-techniques" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Learn Techniques →
                </Link>
              </div>
            </div>

            {/* Related Blog Posts */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Next.js Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/blog/nextjs-hosting-options-comparison" className="group">
                  <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      Next.js Hosting Options Compared 2025
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Vercel, Netlify, Cloudflare, AWS, GCP, Azure comparison for Next.js hosting.
                    </p>
                  </div>
                </Link>

                <Link href="/blog/react-vs-nextjs-which-to-choose" className="group">
                  <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      React vs Next.js: Which to Choose 2025
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Understand when to use vanilla React and when Next.js unlocks speed and SEO wins.
                    </p>
                  </div>
                </Link>

                <Link href="/blog/core-web-vitals-optimization-guide" className="group">
                  <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      Core Web Vitals Optimization Guide
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Actionable steps to hit green Core Web Vitals on modern Next.js stacks.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Migrate to Next.js?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get expert consultation and professional migration services for your WordPress site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Start Migration Project
                </Link>
                <Link
                  href="/nextjs/wordpress-to-nextjs-migration-cost"
                  className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  View Cost Analysis
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
