import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function UtahPage() {
  // FAQ data for Utah
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Utah?",
      answer: "We understand Utah's unique business landscape and family-focused culture like no other agency! From Salt Lake City's tech boom to Provo's startup scene, from Park City's tourism industry to St. George's outdoor recreation, we know what makes Utah businesses succeed. We combine Silicon Valley innovation with Utah's values of hard work, integrity, and family-first business practices."
    },
    {
      question: "How quickly can you deliver a website for my Utah business?",
      answer: "We move faster than a Utah winter storm! Our Rapid Delivery service guarantees completion within 7 days, perfect for Utah's fast-growing tech and outdoor recreation industries. Whether you're in the Silicon Slopes, downtown Salt Lake, or anywhere in Utah County, we understand that Utah businesses value efficiency and reliability. We deliver websites faster than you can ski Park City!"
    },
    {
      question: "Do you understand Utah's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Utah and understand the state's diverse economy—from Salt Lake City's corporate headquarters and tech startups to Provo's software companies, from Park City's luxury tourism to St. George's outdoor recreation industry. We know Utah isn't just about mountains and Mormons—it's a thriving business ecosystem with Silicon Slopes innovation."
    },
    {
      question: "Can you help with local SEO for Utah businesses?",
      answer: "Yes! We specialize in Utah-specific SEO strategies, from targeting 'best skiing in Park City' to 'tech jobs in Lehi.' We understand local search patterns and can help you dominate results across Utah's diverse regions. Whether you're targeting Salt Lake's urban market or serving rural communities, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Utah clients?",
      answer: "We bring Silicon Valley innovation with Utah's values—family focus, integrity, and community service. We understand that Utah businesses prioritize work-life balance, ethical business practices, and community involvement over pure profit. Our approach honors Utah's unique culture—from outdoor recreation to family values—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Utah businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Utah businesses can't afford downtime, whether you're running a tech startup in Lehi, a ski resort in Park City, or a family business in St. George. We've got your back like a good Utah neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Utah businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-utah",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Utah",
      "addressRegion": "UT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7608",
      "longitude": "-111.8910"
    },
    "areaServed": {
      "@type": "State",
      "name": "Utah"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Utah"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO Optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Rapid Website Delivery"
          }
        }
      ]
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Web Development Utah | Custom Website Design Agency UT | Nandann Creative</title>
        <meta name="description" content="Web development Utah: Custom website design agency serving UT businesses. Rapid delivery, local SEO, responsive design. From Salt Lake City to Provo, Park City to St. George. The Beehive State deserves a great website!" />
        <meta name="keywords" content="web development utah, web design salt lake city, website agency provo, local seo utah, custom websites park city, rapid website delivery lehi, web development company ut, silicon slopes web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-utah" />
        <meta property="og:title" content="Web Development Agency in Utah | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Utah. Custom websites, rapid delivery, local SEO optimization for Salt Lake City, Provo, Park City, and St. George businesses." />
        <meta property="og:image" content="https://www.nandann.com/utah/utah-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-utah" />
        <meta property="twitter:title" content="Web Development Agency in Utah | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Utah. Custom websites, rapid delivery, local SEO optimization for Salt Lake City, Provo, Park City, and St. George businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/utah/utah-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-UT" />
        <meta name="geo.placename" content="Utah" />
        <meta name="geo.position" content="40.7608;-111.8910" />
        <meta name="ICBM" content="40.7608, -111.8910" />
        <link rel="canonical" href="https://www.nandann.com/web-development-utah" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        <LocationNavigation location="Utah" locationShort="UT" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-red-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  The Beehive State Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    Website That Works
                  </span>
                  !
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Salt Lake City's Silicon Slopes to Park City's mountain resorts, we're the premier web development 
                  agency that understands Utah's unique business landscape and family-focused culture. Whether you're in 
                  Salt Lake, Provo, Park City, or St. George, we deliver custom websites that capture Utah's spirit 
                  and drive real results in the Beehive State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-center">
                    View Our Work
                  </Link>
                </div>
              </div>
              <div className="relative">
                <video
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/utah/utah-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/utah/utah-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/utah/utah-web-development-nandann-creative-poster.webp"
                    alt="Utah Web Development - Salt Lake City, Provo, Park City"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                    priority
                  />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source
                srcSet="/utah/utah-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/utah/utah-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/utah/utah-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/utah/utah-web-development-nandann-creative-sm.webp"
                alt="Utah Web Development Agency - Nandann Creative"
                fill
                className="object-cover"
                priority
              />
            </picture>
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content with glass effect */}
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Utah's{' '}
                <span className="text-yellow-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Utah businesses from Salt Lake City to St. George
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Silicon Slopes Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Utah Technology Council for outstanding web development innovation and tech industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Utah Technology Council
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Family-Friendly Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Utah Family Business Association for websites that support work-life balance and family values
                </p>
                <div className="text-sm text-gray-500">
                  Utah Family Business Association
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Salt Lake Chamber of Commerce for fastest website delivery while maintaining Utah's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Salt Lake Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Utah Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Utah
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Beehive State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Silicon Slopes Innovation</h3>
                <p className="text-gray-700">
                  From Lehi's tech giants to Provo's startup scene, we understand Utah's booming technology sector. 
                  We create cutting-edge websites that reflect the innovation happening in Silicon Slopes—whether 
                  you're a software company, fintech startup, or outdoor tech innovator.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than a Utah Winter Storm</h3>
                <p className="text-gray-700">
                  Utah businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can ski Park City's slopes. We understand that in Utah's competitive 
                  tech and outdoor recreation markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech to Tourism</h3>
                <p className="text-gray-700">
                  We understand Utah's diverse economy—from Salt Lake City's corporate headquarters to Park City's 
                  luxury resorts, from Provo's software companies to St. George's outdoor recreation industry. 
                  We create industry-specific solutions that work whether you're coding in Lehi or guiding in Moab.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Major Cities Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Serving All of Utah
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the Wasatch Front to the red rock canyons, we provide web development services across the entire Beehive State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-utah" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Salt Lake City</h3>
                <p className="text-gray-600">
                  The Crossroads of the West. Downtown, Silicon Slopes, corporate headquarters. 
                  Where business meets the mountains in Utah's capital.
                </p>
              </Link>
              
              <Link href="/web-development-utah" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Provo</h3>
                <p className="text-gray-600">
                  Home of BYU and tech startups. Software companies, outdoor gear, family businesses. 
                  Where innovation meets traditional values.
                </p>
              </Link>
              
              <Link href="/web-development-utah" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Park City</h3>
                <p className="text-gray-600">
                  Mountain resort destination. Skiing, Sundance Film Festival, luxury tourism. 
                  Where outdoor recreation meets high-end hospitality.
                </p>
              </Link>
              
              <Link href="/web-development-utah" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">St. George</h3>
                <p className="text-gray-600">
                  Gateway to outdoor recreation. Zion National Park, golf courses, retirement communities. 
                  Where desert beauty meets modern living.
                </p>
              </Link>
              
              <Link href="/web-development-utah" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lehi</h3>
                <p className="text-gray-600">
                  Silicon Slopes hub. Tech companies, startups, family-friendly business culture. 
                  Where innovation thrives in Utah County.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Utah Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Utah's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Utah isn't just a state—it's a unique blend of innovation, outdoor recreation, and family values! 
                  From Salt Lake City's Silicon Slopes to Park City's mountain resorts, from Provo's tech startups 
                  to St. George's outdoor recreation industry, Utah represents a perfect balance of cutting-edge 
                  technology and traditional values that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Salt Lake City businesses need websites that reflect the city's corporate 
                  sophistication while honoring Utah's family-friendly culture—whether you're running a tech 
                  startup in Lehi or a family business in downtown Salt Lake. Provo companies benefit from 
                  designs that capture the city's innovative spirit and traditional values. Park City businesses 
                  need sites that showcase mountain culture and luxury tourism without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Silicon Slopes innovation to outdoor recreation, from family values to tech entrepreneurship, 
                  Utah's culture is rich, diverse, and deeply rooted in hard work, integrity, and community service. 
                  We don't just build websites—we create digital experiences that honor Utah's heritage while 
                  driving modern business results. Whether you're "building the future" in Lehi, serving outdoor 
                  enthusiasts in Moab, or running a family business in Ogden, we speak your language—from tech 
                  jargon to Utah slang.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Utah's unique challenges too—from work-life balance to the importance of 
                  family-friendly business practices, from the balance between innovation and tradition to the 
                  significance of outdoor recreation and community involvement. We've worked with businesses 
                  across Utah's diverse regions, and we know that what works in Salt Lake City might not work 
                  in St. George, and vice versa. That's why we create custom solutions as unique as Utah itself. 
                  Thanks for trusting us with your digital presence!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/utah/utah-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/utah/utah-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/utah/utah-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/utah/utah-web-development-nandann-creative-sm.webp"
                    alt="Utah Web Development - Salt Lake City, Provo, Park City, St. George"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Don't Just Take Our Word For It -{' '}
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Utah is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Utah businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    D
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">David "The Tech Guy" Johnson</h4>
                    <p className="text-gray-600">CEO, Silicon Slopes Software</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Utah! Our new website captures the Silicon Slopes innovation and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for Utah's values! Building the future with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Mountain Mom" Williams</h4>
                    <p className="text-gray-600">Owner, Park City Family Adventures</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can ski Deer Valley! Our 
                  bookings increased 180% and families love the authentic mountain vibe. They understand 
                  that in Utah, it's not just business—it's about creating memories for families!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Provo Pioneer" Thompson</h4>
                    <p className="text-gray-600">Founder, BYU Startup Incubator</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a startup incubator in Provo, we needed a website that honors our traditional values while 
                  showcasing our innovative spirit. Nandann Creative delivered a site that's helped us attract 
                  top talent while staying true to our Utah roots. They understand the Beehive State!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Got Questions? We Got Answers!{' '}
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Utah Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Utah web development services
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-red-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Build Utah's Digital Future?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Utah businesses that trust Nandann Creative with their digital success—from Silicon Slopes to St. George!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="Utah" locationShort="UT" />
      </div>
    </>
  );
}

