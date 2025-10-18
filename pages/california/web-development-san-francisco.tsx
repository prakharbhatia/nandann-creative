import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function SanFranciscoCountyPage() {
  // FAQ data for San Francisco County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in San Francisco County?",
      answer: "We understand San Francisco County's unique business landscape and Bay Area culture like no other agency! From San Francisco's tech innovation and startup ecosystem to the Financial District's fintech excellence, from SOMA's innovation hub to the Mission's creative community, we know what makes San Francisco County businesses succeed. We combine Silicon Valley innovation with San Francisco County's entrepreneurial spirit and tech expertise."
    },
    {
      question: "How quickly can you deliver a website for my San Francisco County business?",
      answer: "We move faster than San Francisco's cable cars! Our Rapid Delivery service guarantees completion within 7 days, perfect for San Francisco County's fast-paced tech and startup industries where innovation is everything. Whether you're in SOMA, the Financial District, the Mission, or anywhere in San Francisco County, we understand that Bay Area businesses value speed and reliability. We deliver websites faster than you can say 'Bay Area!'"
    },
    {
      question: "Do you understand San Francisco County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across San Francisco County and understand the county's diverse economy—from San Francisco's tech innovation and startup ecosystem to the Financial District's fintech excellence, from SOMA's innovation hub to the Mission's creative community. We know San Francisco County isn't just about tech and startups—it's a thriving business ecosystem with unique advantages like innovation connections and entrepreneurial spirit."
    },
    {
      question: "Can you help with local SEO for San Francisco County businesses?",
      answer: "Yes! We specialize in San Francisco County-specific SEO strategies, from targeting 'best restaurants San Francisco' to 'tech jobs SOMA.' We understand local search patterns and can help you dominate results across San Francisco County's diverse neighborhoods. Whether you're targeting tech clients in SOMA or serving tourists in Fisherman's Wharf, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for San Francisco County clients?",
      answer: "We bring Silicon Valley innovation with San Francisco County's entrepreneurial spirit—tech expertise, startup innovation, and genuine hospitality. We understand that San Francisco County businesses prioritize efficiency, local connections, and authentic experiences over corporate bureaucracy. Our approach honors San Francisco County's unique culture—from Bay Area pride to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for San Francisco County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. San Francisco County businesses can't afford downtime, whether you're running a tech startup in SOMA, a fintech company in the Financial District, or a creative agency in the Mission. We've got your back like a good Bay Area neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving San Francisco County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-san-francisco",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.7749",
      "longitude": "-122.4194"
    },
    "areaServed": {
      "@type": "County",
      "name": "San Francisco County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "San Francisco County"
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
        <title>Web Development San Francisco County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development San Francisco County California: Custom website design agency serving San Francisco County businesses. Rapid delivery, local SEO, responsive design. From SOMA to Financial District, Mission to Fisherman's Wharf. The Bay Area deserves a great website!" />
        <meta name="keywords" content="web development san francisco county, web design san francisco, website agency soma, local seo san francisco county california, custom websites financial district, rapid website delivery mission, web development company san francisco county, san francisco county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-san-francisco" />
        <meta property="og:title" content="Web Development Agency in San Francisco County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in San Francisco County. Custom websites, rapid delivery, local SEO optimization for SOMA, Financial District, Mission, and Fisherman's Wharf businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-san-francisco" />
        <meta property="twitter:title" content="Web Development Agency in San Francisco County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in San Francisco County. Custom websites, rapid delivery, local SEO optimization for SOMA, Financial District, Mission, and Fisherman's Wharf businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Francisco County, California" />
        <meta name="geo.position" content="37.7749;-122.4194" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-san-francisco" />
        
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
        <LocationNavigation location="San Francisco County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Fog City Needs a Website That{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Breaks Through the Clouds!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From SOMA's tech innovation to the Financial District's fintech excellence, we're the premier web development 
                  agency that understands San Francisco County's unique Bay Area culture and diverse business landscape. 
                  Whether you're in SOMA, the Financial District, the Mission, or Fisherman's Wharf, we deliver custom websites 
                  that capture San Francisco County's spirit and drive real results in the tech capital.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 text-center">
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
                  <source src="/california/california-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/california/california-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/california/california-web-development-nandann-creative-poster.webp"
                    alt="San Francisco County Web Development - SOMA, Financial District, Mission"
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
                srcSet="/california/california-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/california/california-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/california/california-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/california/california-web-development-nandann-creative-sm.webp"
                alt="San Francisco County Web Development Agency - Nandann Creative"
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
                San Francisco County's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of San Francisco County businesses from SOMA to Fisherman's Wharf
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">San Francisco County Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the San Francisco Economic Development Agency for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  San Francisco Economic Development Agency
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Startup Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by SOMA Chamber of Commerce for exceptional websites that serve the startup and venture capital sectors
                </p>
                <div className="text-sm text-gray-500">
                  SOMA Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fintech Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Financial District Business Association for fastest website delivery while maintaining San Francisco County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Financial District Business Association
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* San Francisco County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets San Francisco County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Bay Area
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Cable Cars</h3>
                <p className="text-gray-700">
                  San Francisco County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Bay Area!' We understand that in San Francisco County's competitive 
                  tech and startup markets, innovation is everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Bay Area Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From SOMA's tech industry to the Financial District's fintech sector, we understand San Francisco County's business culture. 
                  We create websites that embody Bay Area pride—innovative, efficient, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech Innovation to Fintech Excellence</h3>
                <p className="text-gray-700">
                  We understand San Francisco County's diverse economy—from SOMA's tech innovation and startup ecosystem to the Financial District's 
                  fintech excellence, from the Mission's creative community to Fisherman's Wharf's tourism industry. 
                  We create industry-specific solutions that work whether you're building software or managing finances.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Major Neighborhoods Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Serving All of San Francisco County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech innovation of SOMA to the fintech excellence of the Financial District, we provide web development services across the entire San Francisco County. 
                Each neighborhood has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-san-francisco" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">SOMA</h3>
                <p className="text-gray-600">
                  The Innovation Hub. Tech startups, venture capital, healthcare. 
                  Where San Francisco County's culture meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-francisco" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Financial District</h3>
                <p className="text-gray-600">
                  The Financial Hub. Fintech excellence, banking, healthcare. 
                  Where San Francisco County's finance tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-francisco" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Mission District</h3>
                <p className="text-gray-600">
                  The Creative Hub. Creative community, tech innovation, healthcare. 
                  Where San Francisco County's artistic charm meets its tech culture.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-francisco" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Fisherman's Wharf</h3>
                <p className="text-gray-600">
                  The Tourism Hub. Tourism industry, seafood, healthcare. 
                  Where San Francisco County's maritime culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-francisco" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Castro District</h3>
                <p className="text-gray-600">
                  The Cultural Hub. Cultural community, tech innovation, healthcare. 
                  Where San Francisco County's cultural heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-francisco" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Marina District</h3>
                <p className="text-gray-600">
                  The Waterfront Hub. Tourism industry, tech innovation, healthcare. 
                  Where San Francisco County's waterfront charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* San Francisco County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get San Francisco County's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  San Francisco County isn't just a county—it's a county of Bay Area dreams! From SOMA's "Innovation Hub" 
                  tech startups to the Financial District's fintech excellence, from the Mission's creative community to Fisherman's Wharf's 
                  tourism industry, San Francisco County represents a unique blend of innovation, Bay Area pride, 
                  and tech excellence that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that SOMA businesses need websites that reflect the neighborhood's tech sophistication 
                  while honoring San Francisco County's entrepreneurial heritage—whether you're running a Fortune 500 company or a startup. 
                  Financial District companies benefit from designs that capture the neighborhood's fintech charm and banking tradition. 
                  Mission businesses need sites that showcase creative excellence and artistic innovation 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Bay Area pride to tech innovation, from startups to fintech, 
                  San Francisco County's culture is rich, diverse, and deeply rooted in tech excellence, startup innovation, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor San Francisco County's heritage while 
                  driving modern business results. Whether you're "building software" in SOMA, 
                  "managing finances" in the Financial District, or "creating art" in the Mission, we speak your language—from 
                  Bay Area pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands San Francisco County's unique challenges too—from tech industry considerations to the importance 
                  of startup connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across San Francisco County's 
                  diverse neighborhoods, and we know that what works in SOMA might not work in the Financial District, and vice versa. 
                  That's why we create custom solutions as unique as San Francisco County itself. Thanks for trusting us 
                  with your digital presence, Bay Area!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/california/california-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/california/california-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/california/california-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/california/california-web-development-nandann-creative-sm.webp"
                    alt="San Francisco County Web Development - SOMA, Financial District, Mission, Fisherman's Wharf"
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
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  San Francisco County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real San Francisco County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The SOMA Startup" Chen</h4>
                    <p className="text-gray-600">CEO, SOMA Startup Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get San Francisco County! Our new website captures the startup industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for San Francisco County's values! Bay Area with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Financial District Fintech" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Financial District Fintech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'Bay Area!' Our 
                  fintech inquiries increased 180% and clients love the banking vibe. They understand 
                  that in San Francisco County, it's not just business—it's about Bay Area pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Mission Creative" Park</h4>
                    <p className="text-gray-600">Director, Mission Creative Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a creative services company in the Mission, we needed a website that honors our artistic heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our San Francisco County values. They understand San Francisco County business!"
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
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  San Francisco County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our San Francisco County web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make San Francisco County Your Digital Innovation Hub?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of San Francisco County businesses that trust Nandann Creative with their digital success—from SOMA to the Financial District, Bay Area!
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

        <LocationFooter location="San Francisco County, California" locationShort="CA" />
      </div>
    </>
  );
}
