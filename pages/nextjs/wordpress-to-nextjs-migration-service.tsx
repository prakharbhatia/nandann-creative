import Head from 'next/head';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import StructuredData from '../../components/StructuredData';

export default function WordPressToNextJSMigrationService() {
  const faqs = [
    {
      question: "What's included in your WordPress to Next.js migration service?",
      answer: "Our comprehensive migration service includes: complete content migration, design recreation, functionality preservation, SEO optimization, performance enhancement, testing and quality assurance, deployment, and 30 days of post-launch support. We also provide training and documentation for your team."
    },
    {
      question: "How do you ensure zero downtime during migration?",
      answer: "We use a staging environment approach where we build your new Next.js site alongside your existing WordPress site. Once everything is tested and approved, we perform a seamless DNS switch during off-peak hours, ensuring zero downtime and minimal risk to your business operations."
    },
    {
      question: "Do you preserve all my WordPress functionality?",
      answer: "Yes, we preserve all existing functionality including custom post types, taxonomies, forms, e-commerce features, user accounts, and third-party integrations. We also enhance functionality where possible using modern Next.js capabilities and best practices."
    },
    {
      question: "What happens to my SEO rankings during migration?",
      answer: "We implement comprehensive SEO preservation strategies including URL structure maintenance, meta tag migration, structured data implementation, and redirect mapping. Most clients see improved rankings post-migration due to better performance and technical SEO implementation."
    },
    {
      question: "How long does the migration process take?",
      answer: "Timeline depends on site complexity: simple sites (1-2 weeks), medium complexity (3-6 weeks), complex sites (2-4 months). We provide detailed project timelines during consultation and keep you updated throughout the process with regular milestones and previews."
    },
    {
      question: "Do you provide training after migration?",
      answer: "Yes, we provide comprehensive training sessions for your team covering content management, basic maintenance, and best practices for your new Next.js site. We also provide detailed documentation and ongoing support to ensure your team is comfortable with the new system."
    },
    {
      question: "What if I need additional features after migration?",
      answer: "We offer ongoing development services and can add new features, integrations, or enhancements to your Next.js site. Our team is familiar with your codebase and can implement changes efficiently. We also provide maintenance packages for regular updates and improvements."
    },
    {
      question: "Do you work with existing design agencies or developers?",
      answer: "Absolutely! We collaborate well with existing teams and can work alongside your current developers, designers, or agencies. We provide clear documentation and can hand off the project to your internal team if needed, ensuring smooth knowledge transfer."
    }
  ];

  return (
    <>
      <Head>
        <title>WordPress to Next.js Migration Service 2025 | Professional Migration | Nandann Creative</title>
        <meta name="description" content="Professional WordPress to Next.js migration service with zero downtime, SEO preservation, and performance optimization. Expert migration team with 16+ years experience. Get started today." />
        <meta name="keywords" content="WordPress to Next.js migration service, professional migration, zero downtime migration, Next.js development service, WordPress migration experts" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/nextjs/wordpress-to-nextjs-migration-service" />
        
        {/* Open Graph */}
        <meta property="og:title" content="WordPress to Next.js Migration Service 2025 | Professional Migration" />
        <meta property="og:description" content="Professional WordPress to Next.js migration service with zero downtime, SEO preservation, and performance optimization. Expert migration team with 16+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/nextjs/wordpress-to-nextjs-migration-service" />
        <meta property="og:image" content="https://www.nandann.com/api/og?title=WordPress%20to%20Next.js%20Migration%20Service%202025&subtitle=Professional%20Migration%20with%20Zero%20Downtime" />
        <meta property="og:site_name" content="Nandann Creative" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WordPress to Next.js Migration Service 2025 | Professional Migration" />
        <meta name="twitter:description" content="Professional WordPress to Next.js migration service with zero downtime, SEO preservation, and performance optimization. Expert migration team with 16+ years experience." />
        <meta name="twitter:image" content="https://www.nandann.com/api/og?title=WordPress%20to%20Next.js%20Migration%20Service%202025&subtitle=Professional%20Migration%20with%20Zero%20Downtime" />
        
        {/* Additional SEO */}
        <meta name="author" content="Nandann Creative" />
        <meta name="publisher" content="Nandann Creative" />
        <meta name="language" content="en-US" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
      </Head>

      <StructuredData 
        type="service"
        pageUrl="https://www.nandann.com/nextjs/wordpress-to-nextjs-migration-service"
        pageTitle="WordPress to Next.js Migration Service 2025 | Professional Migration"
        pageDescription="Professional WordPress to Next.js migration service with zero downtime, SEO preservation, and performance optimization. Expert migration team with 16+ years experience."
      />

      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
                WordPress to Next.js <span className="text-gradient">Migration Service</span> 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Professional WordPress to Next.js migration with zero downtime, SEO preservation, 
                and performance optimization. Expert migration team with 16+ years experience.
              </p>
            </div>

            {/* Service Overview */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Migration Process</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Analysis & Planning</h3>
                  <p className="text-gray-300 text-sm">Comprehensive site audit, content inventory, and migration strategy development.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Development & Migration</h3>
                  <p className="text-gray-300 text-sm">Content migration, design recreation, and functionality implementation in staging environment.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Testing & Optimization</h3>
                  <p className="text-gray-300 text-sm">Comprehensive testing, performance optimization, and SEO implementation.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Launch & Support</h3>
                  <p className="text-gray-300 text-sm">Seamless deployment, DNS switch, and 30 days of post-launch support.</p>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8">What We Deliver</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Zero Downtime Migration</h3>
                      <p className="text-gray-300">Seamless transition with no impact on your live site or business operations.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">SEO Preservation</h3>
                      <p className="text-gray-300">Complete SEO preservation with improvements including structured data and meta optimization.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Performance Enhancement</h3>
                      <p className="text-gray-300">40-60% faster load times and improved Core Web Vitals through Next.js optimization.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Functionality Preservation</h3>
                      <p className="text-gray-300">All existing features, forms, and integrations are preserved and enhanced.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Training & Documentation</h3>
                      <p className="text-gray-300">Comprehensive training for your team and detailed documentation for ongoing maintenance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our Service</h2>
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">16+ Years Experience</h3>
                    <p className="text-gray-300 text-sm">Led by Prakhar Bhatia with extensive experience in WordPress and Next.js development, ensuring expert-level migration services.</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Proven Track Record</h3>
                    <p className="text-gray-300 text-sm">Successfully migrated 100+ WordPress sites to Next.js with zero downtime and improved performance metrics.</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Modern Technology Stack</h3>
                    <p className="text-gray-300 text-sm">Latest Next.js features, React 18, TypeScript, and modern development practices for optimal results.</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Comprehensive Support</h3>
                    <p className="text-gray-300 text-sm">30 days of post-launch support, ongoing maintenance packages, and dedicated project management.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Packages */}
            <div className="glass rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Migration Service Packages</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Standard Migration</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-6">$5,000 - $12,000</div>
                  <ul className="space-y-3 text-gray-300 mb-8">
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Content migration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Design recreation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Basic functionality</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>SEO preservation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>30 days support</span>
                    </li>
                  </ul>
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full text-white font-semibold text-center block transition-all duration-300"
                  >
                    Get Quote
                  </Link>
                </div>

                <div className="bg-white/5 rounded-xl p-8 border-2 border-blue-500 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Migration</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-6">$12,000 - $25,000</div>
                  <ul className="space-y-3 text-gray-300 mb-8">
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Everything in Standard</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Advanced functionality</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Performance optimization</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Custom features</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>60 days support</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Team training</span>
                    </li>
                  </ul>
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full text-white font-semibold text-center block transition-all duration-300"
                  >
                    Get Quote
                  </Link>
                </div>

                <div className="bg-white/5 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Enterprise Migration</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-6">$25,000+</div>
                  <ul className="space-y-3 text-gray-300 mb-8">
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Everything in Premium</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Complex integrations</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Custom development</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Dedicated project manager</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>90 days support</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-green-400">✓</span>
                      <span>Ongoing maintenance</span>
                    </li>
                  </ul>
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full text-white font-semibold text-center block transition-all duration-300"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="glass rounded-2xl p-12">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Migrate Your WordPress Site?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get a free consultation and detailed migration plan for your WordPress to Next.js project.
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
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ 
          title="Migration Service FAQ"
          faqs={faqs}
        />
      </main>

      <Footer />
    </>
  );
}
