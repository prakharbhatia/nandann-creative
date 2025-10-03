import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function HolidaySalesTrafficPage() {
  const canonicalUrl = 'https://www.nandann.com/blog/get-ready-2025-holiday-sales-traffic';
  const publishedDate = '2025-10-03';
  const lastModifiedDate = '2025-10-03';

  const faqs = [
    {
      question: "Why is site speed critical during holiday traffic spikes?",
      answer: "During Black Friday, Cyber Monday, and the holiday season, traffic can double or triple on peak days. Slow sites lose customers—studies show that a 1-second delay in page load time can result in 11% fewer page views, 16% decrease in customer satisfaction, and 7% loss in conversions."
    },
    {
      question: "What is Page Speed Boost and how does it help?",
      answer: "Page Speed Boost is our automated optimization service that applies 30+ performance enhancements to your WordPress site. It includes image optimization, caching, code minification, database optimization, and CDN setup—automatically improving your site speed without manual coding."
    },
    {
      question: "Should I migrate from WordPress to Next.js for holiday season?",
      answer: "WordPress to Next.js migration can boost site speed by 40-60% and improve SEO rankings. Next.js offers server-side rendering, automatic code splitting, and built-in performance optimizations. For high-traffic holiday periods, Next.js provides better scalability and faster load times."
    },
    {
      question: "What is headless WordPress and its benefits?",
      answer: "Headless WordPress separates the content management system from the frontend presentation. Using REST API or GraphQL, you get WordPress's ease of use for content while gaining the performance benefits of modern frameworks like React, Next.js, or Vue.js."
    },
    {
      question: "How quickly can you optimize my site for holiday traffic?",
      answer: "Our rapid optimization service can implement performance improvements within 24-48 hours. For WordPress to Next.js migrations, we typically deliver a fully optimized site within 1-2 weeks, ensuring your site is ready before the peak holiday shopping season begins."
    },
    {
      question: "Do you offer free performance audits?",
      answer: "Yes! We provide comprehensive free performance audits that include Core Web Vitals analysis, page speed testing, SEO evaluation, and actionable recommendations. Our experts identify specific bottlenecks and provide a detailed improvement roadmap tailored to your site."
    },
    {
      question: "What are Core Web Vitals and why do they matter for holidays?",
      answer: "Core Web Vitals measure user experience with metrics like Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Google uses these as ranking factors, and optimized vitals lead to better search visibility and user engagement during critical shopping periods."
    },
    {
      question: "Can you help with mobile optimization for holiday shoppers?",
      answer: "Absolutely! Most holiday shopping happens on mobile devices. We ensure your site loads fast on all devices, uses mobile-first design principles, and implements touch-friendly navigation to capture mobile conversions during high-traffic periods."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Get Ready for 2025 Holiday Sales Traffic: Site Optimization Guide",
    "description": "Prepare your website for the busiest shopping season. Learn about page speed optimization, WordPress to Next.js migration, and headless solutions for peak holiday performance.",
    "image": {
      "@type": "ImageObject",
      "url": "https://www.nandann.com/images/holidays-2025-nandann-creative-agency-desktop.webp",
      "width": 1200,
      "height": 800
    },
    "author": {
      "@type": "Organization",
      "name": "Nandann Creative Agency"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nandann Creative Agency",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.nandann.com/images/Nandann-logo-new.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": lastModifiedDate,
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <>
      <Head>
        <title>Get Ready for 2025 Holiday Sales Traffic: Site Optimization Guide</title>
        <meta name="description" content="Prepare your website for the busiest shopping season. Learn about page speed optimization, WordPress to Next.js migration, and headless solutions for peak holiday performance." />
        <meta name="keywords" content="holiday traffic optimization, Black Friday website performance, WordPress to Next.js migration, headless WordPress, page speed optimization, holiday ecommerce, Core Web Vitals, free performance audit" />
        
        {/* Canonical and dates */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="datePublished" content={publishedDate} />
        <meta name="dateModified" content={lastModifiedDate} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Get Ready for 2025 Holiday Sales Traffic: Site Optimization Guide" />
        <meta property="og:description" content="Prepare your website for the busiest shopping season. Learn about page speed optimization, WordPress to Next.js migration, and headless solutions for peak holiday performance." />
        <meta property="og:image" content="https://www.nandann.com/images/holidays-2025-nandann-creative-agency-desktop.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Get Ready for 2025 Holiday Sales Traffic - Nandann Creative Agency" />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={lastModifiedDate} />
        <meta property="article:author" content="Nandann Creative Agency" />
        <meta property="article:section" content="Web Development" />
        <meta property="article:tag" content="holiday optimization" />
        <meta property="article:tag" content="performance" />
        <meta property="article:tag" content="WordPress migration" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content="Get Ready for 2025 Holiday Sales Traffic: Site Optimization Guide" />
        <meta name="twitter:description" content="Prepare your website for the busiest shopping season. Learn about page speed optimization, WordPress to Next.js migration, and headless solutions for peak holiday performance." />
        <meta name="twitter:image" content="https://www.nandann.com/images/holidays-2025-nandann-creative-agency-desktop.webp" />
        <meta name="twitter:image:alt" content="Get Ready for 2025 Holiday Sales Traffic - Nandann Creative Agency" />

        {/* LinkedIn */}
        <meta property="linkedin:title" content="Get Ready for 2025 Holiday Sales Traffic: Site Optimization Guide" />
        <meta property="linkedin:description" content="Prepare your website for the busiest shopping season. Learn about page speed optimization, WordPress to Next.js migration, and headless solutions for peak holiday performance." />
        <meta property="linkedin:image" content="https://www.nandann.com/images/holidays-2025-nandann-creative-agency-desktop.webp" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        
        <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span>🚀 Holiday Optimization</span>
                <span>•</span>
                <span>Performance</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Get Ready for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">2025 Holiday Sales</span> Traffic
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The busiest time of the year is fast approaching! From Black Friday right through the new year, many e‑commerce sites see almost double their daily average of traffic on peak days.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
                <span>{new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>Sandra Johnson</span>
                <span>•</span>
                <span>15 min read</span>
              </div>
            </header>

            {/* Banner Image */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-12">
              <picture>
                <source media="(max-width: 640px)" srcSet="/images/holidays-2025-nandann-creative-agency-mobile.avif" type="image/avif" />
                <source media="(max-width: 640px)" srcSet="/images/holidays-2025-nandann-creative-agency-mobile.webp" type="image/webp" />
                <source media="(max-width: 1024px)" srcSet="/images/holidays-2025-nandann-creative-agency-tablet.avif" type="image/avif" />
                <source media="(max-width: 1024px)" srcSet="/images/holidays-2025-nandann-creative-agency-tablet.webp" type="image/webp" />
                <source media="(min-width: 1920px)" srcSet="/images/holidays-2025-nandann-creative-agency-large.avif" type="image/avif" />
                <source media="(min-width: 1920px)" srcSet="/images/holidays-2025-nandann-creative-agency-large.webp" type="image/webp" />
                <source srcSet="/images/holidays-2025-nandann-creative-agency-desktop.avif" type="image/avif" />
                <source srcSet="/images/holidays-2025-nandann-creative-agency-desktop.webp" type="image/webp" />
                <Image
                  src="/images/holidays-2025-nandann-creative-agency-tablet.jpg"
                  alt="Get Ready for 2025 Holiday Sales Traffic - Nandann Creative Agency"
                  fill
                  className="object-cover"
                  priority
                />
              </picture>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6 mb-8">
                <p className="text-lg text-white mb-0">
                  <strong>⚠️ Time-Sensitive:</strong> Prepare your site now to avoid losing customers during the busiest shopping period of the year.
                </p>
              </div>

              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Prepare your site to make sure it gets your visitors through the door and where they want to go. 
                We're here to help you get ready with tools that can prep your site ahead of this time to make it faster, more secure, and even better at converting visitors into customers.
              </p>

              <h2 className="text-3xl font-bold text-white mb-6">Why Holiday Traffic Optimization Matters</h2>
              
              <p className="text-gray-200 leading-relaxed mb-6">
                During Black Friday through New Year's, online traffic surges dramatically. According to recent studies:
              </p>

              <ul className="text-gray-200 space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Sites see <strong>180-250%</strong> traffic increases on peak shopping days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span><strong>53%</strong> of mobile users abandon sites that take longer than 3 seconds to load</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>Every <strong>100ms</strong> improvement in load time can increase conversions by 1%</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span><strong>75%</strong> of holiday shoppers research products online before purchasing</span>';
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-white mb-6">🚀 Page Speed Boost</h2>
              
              <p className="text-gray-200 leading-relaxed mb-6">
                When traffic spikes, every second counts. With our Page Speed Boost service, you can automatically apply 30+ performance enhancements to optimize your site for speed and performance, so you can focus on your sales, not your site.
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">What Page Speed Boost Includes:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Image optimization and WebP conversion</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Advanced caching implementation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Code minification and compression</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Database optimization</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>CDN setup and configuration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Core Web Vitals optimization</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Mobile performance enhancements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Preloading and prefetching</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">⚡ WordPress to Next.js Migration</h2>
              
              <p className="text-gray-200 leading-relaxed mb-6">
                For businesses expecting significant holiday traffic, migrating from WordPress to Next.js can provide dramatic performance improvements:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">40-60%</div>
                  <div className="text-white font-semibold mb-1">Faster Load Times</div>
                  <div className="text-gray-300 text-sm">Server-side rendering and optimization</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">95+</div>
                  <div className="text-white font-semibold mb-1">Core Web Vitals Score</div>
                  <div className="text-gray-300 text-sm">Google's ranking factors optimized</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
                  <div className="text-white font-semibold mb-1">Scalability</div>
                  <div className="text-gray-300 text-sm">Handles traffic spikes seamlessly</div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">🔀 Headless WordPress Solutions</h2>
              
              <p className="text-gray-200 leading-relaxed mb-6">
                Keep your familiar WordPress backend while gaining modern frontend performance. Headless WordPress separates content management from presentation, letting you use React, Next.js, or Vue.js for lightning-fast user experiences.
              </p>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Benefits of Headless WordPress:</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Keep WordPress's ease of use for content creators</li>
                  <li>• Leverage REST API or GraphQL for modern frontend</li>
                  <li>• Use CDN and edge computing for global performance</li>
                  <li>• Scale independently for content and presentation</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">🆓 Free Performance Audit</h2>
              
              <p className="text-gray-200 leading-relaxed mb-6">
                Don't optimize blindly. Our comprehensive free performance audit identifies exactly what's slowing down your site and provides actionable recommendations tailored to your specific needs.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">What We Analyze:</h3>
                  <ul className="space-y-3 text-gray-200">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▹</span>
                      <span>Core Web Vitals scores</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▹</span>
                      <span>Page speed across devices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▹</span>
                      <span>Image optimization opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▹</span>
                      <span>JavaScript and CSS bottlenecks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">▹</span>
                      <span>Hosting and CDN analysis</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Deliverables Include:</h3>
                  <ul className="space-y-3 text-gray-200">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Detailed performance report</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Specific improvement recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Priority matrix for fixes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>ROI projections for optimizations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Timeline for implementation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-8 text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">⏰ Limited Time Holiday Prep Package</h3>
                <p className="text-gray-200 mb-6">
                  Don't wait until November. Start preparing now with our comprehensive holiday optimization package that includes everything you need for peak traffic performance.
                </p>
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  Get Your Free Audit & Quote →
                </Link>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">📊 Holiday Traffic Timeline</h2>
              
              <p className="text-gray-200 leading-relaxed mb-6">
                Here's your ideal preparation timeline to ensure peak performance during the busiest periods:
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Oct 2025</span>
                    <span className="text-white font-semibold">Site Audit & Optimization Planning</span>
                  </div>
                  <p className="text-gray-300 text-sm">Perform comprehensive performance audit and begin optimization implementation.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">Nov 2025</span>
                    <span className="text-white font-semibold">Implementation & Testing</span>
                  </div>
                  <p className="text-gray-300 text-sm">Deploy optimizations and test under simulated high-traffic conditions.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">Nov 28</span>
                    <span className="text-white font-semibold">Black Friday Launch</span>
                  </div>
                  <p className="text-gray-300 text-sm">Peak traffic begins with Black Friday sales and continues through the holiday season.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">🎯 Key Takeaways</h2>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6 mb-8">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">★</span>
                    <span><strong>Front loading optimization:</strong> Improving site speed now pays dividends during peak traffic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">★</span>
                    <span><strong>Mobile-first approach:</strong> Most holiday shopping happens on mobile devices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">★</span>
                    <span><strong>Core Web Vitals:</strong> Google's ranking factors directly impact holiday search visibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">★</span>
                    <span><strong>Professional help:</strong> Expert optimization delivers better ROI than DIY attempts</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-200 leading-relaxed mb-8">
                The holiday season represents the biggest revenue opportunity for e‑commerce businesses. A well-optimized site can capture more sales, build customer loyalty, and set the foundation for year‑round success. Start preparing now to maximize your holiday performance.
              </p>

              <div className="text-center bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Optimize for Holiday Success?</h3>
                <p className="text-gray-300 mb-6">
                  Don't lose customers due to slow performance. Get your free audit and discuss how we can prepare your site for peak holiday traffic.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Get Free Performance Audit →
                  </Link>
                  <Link
                    href="/rapid-same-day-website-delivery"
                    className="border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full text-white font-bold transition-all duration-300"
                  >
                    Learn About Rapid Delivery
                  </Link>
                </div>
              </div>

            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white/5 backdrop-bl 🔥blur-sm border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </article>
        
        <Footer />
      </div>
    </>
  );
}
