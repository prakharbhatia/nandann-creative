import Head from 'next/head';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import StructuredData from '../../components/StructuredData';

export default function WordPressToNextJSSEOMigration() {
  const faqs = [
    {
      question: "Will my SEO rankings be affected during WordPress to Next.js migration?",
      answer: "With proper SEO migration strategies, your rankings should be preserved and often improved. We implement comprehensive SEO preservation including URL structure maintenance, meta tag migration, structured data, and redirect mapping. Most clients see improved rankings due to better performance and technical SEO implementation."
    },
    {
      question: "How do you preserve URL structure during migration?",
      answer: "We maintain your existing URL structure whenever possible, ensuring that all important URLs remain unchanged. For URLs that need modification, we implement comprehensive 301 redirects to preserve link equity and user experience. We also create a detailed redirect map for all URL changes."
    },
    {
      question: "What happens to my existing backlinks during migration?",
      answer: "All existing backlinks are preserved through proper redirect implementation. We ensure that external links pointing to your WordPress site continue to work and pass link equity to your new Next.js site. We also implement proper canonical URLs to avoid duplicate content issues."
    },
    {
      question: "Do you migrate all meta tags and structured data?",
      answer: "Yes, we migrate all existing meta tags, Open Graph tags, Twitter Cards, and structured data. We also enhance structured data implementation using modern Next.js capabilities and ensure compliance with the latest SEO best practices and schema.org standards."
    },
    {
      question: "How do you handle content migration for SEO?",
      answer: "We perform complete content migration including all text, images, and media files. We ensure proper heading structure (H1, H2, H3), internal linking, and content optimization. We also implement proper image alt tags and optimize content for better search engine understanding."
    },
    {
      question: "What SEO improvements can I expect after migration?",
      answer: "Common SEO improvements include: 40-60% faster page load times, improved Core Web Vitals scores, better mobile performance, enhanced technical SEO, improved structured data implementation, and better user experience metrics. These improvements typically lead to 15-25% increase in organic traffic."
    },
    {
      question: "Do you provide SEO monitoring after migration?",
      answer: "Yes, we provide comprehensive SEO monitoring for 30 days post-migration, including keyword ranking tracking, traffic analysis, and technical SEO audits. We also offer ongoing SEO services and can set up monitoring tools for long-term tracking of your SEO performance."
    },
    {
      question: "How do you handle e-commerce SEO during migration?",
      answer: "For e-commerce sites, we preserve product URLs, category structures, and implement proper e-commerce structured data. We ensure that product pages, category pages, and search functionality maintain their SEO value. We also implement proper breadcrumb navigation and product schema markup."
    }
  ];

  return (
    <>
      <Head>
        <title>WordPress to Next.js SEO Migration 2025 | Preserve Rankings | Nandann Creative</title>
        <meta name="description" content="Expert WordPress to Next.js SEO migration service that preserves and enhances your search rankings. Zero SEO loss, improved performance, and better Core Web Vitals. Free SEO audit included." />
        <meta name="keywords" content="WordPress to Next.js SEO migration, preserve SEO rankings, Next.js SEO optimization, WordPress migration SEO, search engine optimization" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/nextjs/wordpress-to-nextjs-seo-migration" />
        
        {/* Open Graph */}
        <meta property="og:title" content="WordPress to Next.js SEO Migration 2025 | Preserve Rankings" />
        <meta property="og:description" content="Expert WordPress to Next.js SEO migration service that preserves and enhances your search rankings. Zero SEO loss, improved performance, and better Core Web Vitals." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.nandann.com/nextjs/wordpress-to-nextjs-seo-migration" />
        <meta property="og:image" content="https://www.nandann.com/api/og?title=WordPress%20to%20Next.js%20SEO%20Migration%202025&subtitle=Preserve%20Rankings%20%26%20Improve%20Performance" />
        <meta property="og:site_name" content="Nandann Creative" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WordPress to Next.js SEO Migration 2025 | Preserve Rankings" />
        <meta name="twitter:description" content="Expert WordPress to Next.js SEO migration service that preserves and enhances your search rankings. Zero SEO loss, improved performance, and better Core Web Vitals." />
        <meta name="twitter:image" content="https://www.nandann.com/api/og?title=WordPress%20to%20Next.js%20SEO%20Migration%202025&subtitle=Preserve%20Rankings%20%26%20Improve%20Performance" />
        
        {/* Additional SEO */}
        <meta name="author" content="Nandann Creative" />
        <meta name="publisher" content="Nandann Creative" />
        <meta name="language" content="en-US" />
        <meta name="article:published_time" content="2025-01-27T00:00:00Z" />
        <meta name="article:modified_time" content="2025-01-27T00:00:00Z" />
        <meta name="article:section" content="SEO" />
        <meta name="article:tag" content="WordPress, Next.js, SEO, Migration, Search Engine Optimization" />
      </Head>

      <StructuredData 
        type="website"
        pageUrl="https://www.nandann.com/nextjs/wordpress-to-nextjs-seo-migration"
        pageTitle="WordPress to Next.js SEO Migration 2025 | Preserve Rankings"
        pageDescription="Expert WordPress to Next.js SEO migration service that preserves and enhances your search rankings. Zero SEO loss, improved performance, and better Core Web Vitals."
      />

      <Navigation />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
                WordPress to Next.js <span className="text-gradient">SEO Migration</span> 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Expert SEO migration service that preserves and enhances your search rankings. 
                Zero SEO loss, improved performance, and better Core Web Vitals with our proven migration strategy.
              </p>
            </div>

            {/* SEO Migration Process */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">SEO Migration Process</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">SEO Audit</h3>
                  <p className="text-gray-600 text-sm">Comprehensive analysis of current SEO performance, rankings, and technical issues.</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Migration Planning</h3>
                  <p className="text-gray-600 text-sm">Detailed SEO migration strategy with URL mapping and redirect planning.</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">⚙️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Implementation</h3>
                  <p className="text-gray-600 text-sm">SEO-preserving migration with enhanced technical SEO and structured data.</p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitoring</h3>
                  <p className="text-gray-600 text-sm">30 days of SEO monitoring and performance tracking post-migration.</p>
                </div>
              </div>
            </div>

            {/* SEO Preservation Strategies */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">SEO Preservation Strategies</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">URL Structure Preservation</h3>
                      <p className="text-gray-600">Maintain existing URL structure and implement comprehensive 301 redirects for any necessary changes.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Meta Tag Migration</h3>
                      <p className="text-gray-600">Complete migration of title tags, meta descriptions, Open Graph tags, and Twitter Cards.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Structured Data Enhancement</h3>
                      <p className="text-gray-600">Implement enhanced structured data using modern Next.js capabilities and schema.org standards.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Optimization</h3>
                      <p className="text-gray-600">Preserve content structure, internal linking, and optimize for better search engine understanding.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical SEO</h3>
                      <p className="text-gray-600">Implement proper canonical URLs, robots.txt, sitemap.xml, and other technical SEO elements.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">SEO Improvements</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Gains</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-blue-400 font-semibold">40-60%</div>
                        <div className="text-gray-600">Faster Load Times</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-semibold">20-30%</div>
                        <div className="text-gray-600">Better Core Web Vitals</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Search Rankings</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-blue-400 font-semibold">15-25%</div>
                        <div className="text-gray-600">Organic Traffic Increase</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-semibold">10-20%</div>
                        <div className="text-gray-600">Better Search Rankings</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">User Experience</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-blue-400 font-semibold">5-15%</div>
                        <div className="text-gray-600">Conversion Rate Boost</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-semibold">30-50%</div>
                        <div className="text-gray-600">Reduced Bounce Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical SEO Features */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical SEO Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🔗</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">URL & Redirect Management</h3>
                  <p className="text-gray-600 text-sm">Comprehensive URL preservation and 301 redirect implementation to maintain link equity and user experience.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📝</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Meta Tags & Schema</h3>
                  <p className="text-gray-600 text-sm">Complete meta tag migration and enhanced structured data implementation using modern schema.org standards.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🗺️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sitemap & Robots</h3>
                  <p className="text-gray-600 text-sm">Automatic sitemap generation, robots.txt optimization, and proper crawling directives for search engines.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Web Vitals</h3>
                  <p className="text-gray-600 text-sm">Optimization for LCP, FID, and CLS to improve Core Web Vitals scores and search rankings.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mobile Optimization</h3>
                  <p className="text-gray-600 text-sm">Responsive design implementation and mobile-first optimization for better mobile search performance.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">SEO Monitoring</h3>
                  <p className="text-gray-600 text-sm">30 days of comprehensive SEO monitoring including rankings, traffic, and technical SEO audits.</p>
                </div>
              </div>
            </div>

            {/* Case Study */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">SEO Migration Success Story</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">E-commerce Site Migration</h3>
                  <p className="text-gray-600 mb-6">
                    A leading e-commerce site with 10,000+ products migrated from WordPress to Next.js 
                    while preserving and enhancing their SEO performance.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span className="text-gray-600">Zero ranking loss during migration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span className="text-gray-600">25% increase in organic traffic</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span className="text-gray-600">50% improvement in page load speed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span className="text-gray-600">15% boost in conversion rates</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Before vs After</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Page Load Speed</span>
                        <span className="text-blue-400">+50%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Organic Traffic</span>
                        <span className="text-blue-400">+25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Core Web Vitals</span>
                        <span className="text-blue-400">+30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Preserve Your SEO Rankings
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Get expert SEO migration services that preserve and enhance your search rankings. 
                  Free SEO audit and migration consultation included.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Start SEO Migration
                  </Link>
                  <Link
                    href="/nextjs/wordpress-to-nextjs-migration-service"
                    className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-lg text-gray-700 font-semibold text-lg transition-all duration-300"
                  >
                    View Migration Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          title="SEO Migration FAQ"
          faqs={faqs}
        />
      </main>

      <Footer />
    </>
  );
}
