import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function SonomaCountyPage() {
  // FAQ data for Sonoma County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Sonoma County?",
      answer: "We understand Sonoma County's unique business landscape and Wine Country culture like no other agency! From Santa Rosa's wine industry excellence and healthcare sector to Petaluma's tech innovation, from Healdsburg's tourism industry to Rohnert Park's education sector, we know what makes Sonoma County businesses succeed. We combine Wine Country innovation with Sonoma County's entrepreneurial spirit and wine expertise."
    },
    {
      question: "How quickly can you deliver a website for my Sonoma County business?",
      answer: "We move faster than Sonoma County's wine fermentation! Our Rapid Delivery service guarantees completion within 7 days, perfect for Sonoma County's fast-paced wine and tourism industries where efficiency is everything. Whether you're in Santa Rosa, Petaluma, Healdsburg, or anywhere in Sonoma County, we understand that Wine Country businesses value speed and reliability. We deliver websites faster than you can say 'Wine Country!'"
    },
    {
      question: "Do you understand Sonoma County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Sonoma County and understand the county's diverse economy—from Santa Rosa's wine industry excellence and healthcare sector to Petaluma's tech innovation, from Healdsburg's tourism industry to Rohnert Park's education sector. We know Sonoma County isn't just about wine and tourism—it's a thriving business ecosystem with unique advantages like Wine Country connections and entrepreneurial spirit."
    },
    {
      question: "Can you help with local SEO for Sonoma County businesses?",
      answer: "Yes! We specialize in Sonoma County-specific SEO strategies, from targeting 'best wineries Santa Rosa' to 'tech jobs Petaluma.' We understand local search patterns and can help you dominate results across Sonoma County's diverse regions. Whether you're targeting wine clients in Santa Rosa or serving tech customers in Petaluma, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Sonoma County clients?",
      answer: "We bring Wine Country innovation with Sonoma County's entrepreneurial spirit—wine expertise, tourism innovation, and genuine hospitality. We understand that Sonoma County businesses prioritize efficiency, local connections, and authentic experiences over corporate bureaucracy. Our approach honors Sonoma County's unique culture—from Wine Country pride to wine innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Sonoma County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Sonoma County businesses can't afford downtime, whether you're running a winery in Santa Rosa, a tech company in Petaluma, or a tourism business in Healdsburg. We've got your back like a good Wine Country neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Sonoma County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-sonoma",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santa Rosa",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.4404",
      "longitude": "-122.7141"
    },
    "areaServed": {
      "@type": "County",
      "name": "Sonoma County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "Sonoma County"
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
        <title>Web Development Sonoma County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development Sonoma County California: Custom website design agency serving Sonoma County businesses. Rapid delivery, local SEO, responsive design. From Santa Rosa to Petaluma, Healdsburg to Rohnert Park. Wine Country deserves a great website!" />
        <meta name="keywords" content="web development sonoma county, web design santa rosa, website agency petaluma, local seo sonoma county california, custom websites healdsburg, rapid website delivery rohnert park, web development company sonoma county, sonoma county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-sonoma" />
        <meta property="og:title" content="Web Development Agency in Sonoma County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Sonoma County. Custom websites, rapid delivery, local SEO optimization for Santa Rosa, Petaluma, Healdsburg, and Rohnert Park businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-sonoma" />
        <meta property="twitter:title" content="Web Development Agency in Sonoma County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Sonoma County. Custom websites, rapid delivery, local SEO optimization for Santa Rosa, Petaluma, Healdsburg, and Rohnert Park businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Sonoma County, California" />
        <meta name="geo.position" content="38.4404;-122.7141" />
        <meta name="ICBM" content="38.4404, -122.7141" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-sonoma" />
        
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
        <LocationNavigation location="Sonoma County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-red-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Wine Country Needs a Website That{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                    Ages Like Fine Wine!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Santa Rosa's wine industry excellence to Petaluma's tech innovation, we're the premier web development 
                  agency that understands Sonoma County's unique Wine Country culture and diverse business landscape. 
                  Whether you're in Santa Rosa, Petaluma, Healdsburg, or Rohnert Park, we deliver custom websites 
                  that capture Sonoma County's spirit and drive real results in the wine paradise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 text-center">
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
                    alt="Sonoma County Web Development - Santa Rosa, Petaluma, Healdsburg"
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
                alt="Sonoma County Web Development Agency - Nandann Creative"
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
                Sonoma County's{' '}
                <span className="text-purple-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Sonoma County businesses from Santa Rosa to Rohnert Park
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sonoma County Wine Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Sonoma County Winegrowers Association for outstanding web development innovation and wine sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Sonoma County Winegrowers Association
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Tourism Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Sonoma County Tourism Board for exceptional websites that serve the tourism and wine sectors
                </p>
                <div className="text-sm text-gray-500">
                  Sonoma County Tourism Board
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Wine Country Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Wine Country Business Journal for fastest website delivery while maintaining Sonoma County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Wine Country Business Journal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sonoma County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Sonoma County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in Wine Country
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Wine Fermentation</h3>
                <p className="text-gray-700">
                  Sonoma County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Wine Country!' We understand that in Sonoma County's competitive 
                  wine and tourism markets, efficiency is everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Wine Country Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Santa Rosa's wine industry to Petaluma's tech sector, we understand Sonoma County's business culture. 
                  We create websites that embody Wine Country pride—innovative, efficient, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Wine Excellence to Tech Innovation</h3>
                <p className="text-gray-700">
                  We understand Sonoma County's diverse economy—from Santa Rosa's wine industry excellence and healthcare sector to Petaluma's 
                  tech innovation, from Healdsburg's tourism industry to Rohnert Park's education sector. 
                  We create industry-specific solutions that work whether you're making wine or building software.
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
                Serving All of Sonoma County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the wine industry excellence of Santa Rosa to the tech innovation of Petaluma, we provide web development services across the entire Sonoma County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-sonoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Santa Rosa</h3>
                <p className="text-gray-600">
                  The Wine Capital. Wine industry excellence, healthcare sector, education. 
                  Where Sonoma County's culture meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-sonoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Petaluma</h3>
                <p className="text-gray-600">
                  The Tech Hub. Tech innovation, agriculture excellence, healthcare. 
                  Where Sonoma County's suburban tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-sonoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Healdsburg</h3>
                <p className="text-gray-600">
                  The Wine Destination. Tourism industry, wine excellence, education. 
                  Where Sonoma County's wine charm meets its tech culture.
                </p>
              </Link>
              
              <Link href="/california/web-development-sonoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Rohnert Park</h3>
                <p className="text-gray-600">
                  The Education Hub. Education sector, healthcare, tech innovation. 
                  Where Sonoma County's education culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-sonoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Sebastopol</h3>
                <p className="text-gray-600">
                  The Apple City. Agriculture excellence, healthcare, education. 
                  Where Sonoma County's agriculture heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-sonoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Windsor</h3>
                <p className="text-gray-600">
                  The Gateway City. Wine industry, healthcare, education. 
                  Where Sonoma County's gateway charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Sonoma County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Sonoma County's{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Sonoma County isn't just a county—it's a county of Wine Country dreams! From Santa Rosa's "Wine Capital" 
                  wine excellence to Petaluma's tech innovation, from Healdsburg's tourism industry to Rohnert Park's 
                  education sector, Sonoma County represents a unique blend of innovation, Wine Country pride, 
                  and wine excellence that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Santa Rosa businesses need websites that reflect the city's wine sophistication 
                  while honoring Sonoma County's entrepreneurial heritage—whether you're running a Fortune 500 company or a startup. 
                  Petaluma companies benefit from designs that capture the city's tech charm and innovation tradition. 
                  Healdsburg businesses need sites that showcase tourism excellence and wine innovation 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Wine Country pride to wine innovation, from harvest seasons to tech startups, 
                  Sonoma County's culture is rich, diverse, and deeply rooted in wine excellence, tourism innovation, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Sonoma County's heritage while 
                  driving modern business results. Whether you're "making wine" in Santa Rosa, 
                  "building software" in Petaluma, or "welcoming tourists" in Healdsburg, we speak your language—from 
                  Wine Country pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Sonoma County's unique challenges too—from wine industry considerations to the importance 
                  of Wine Country connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across Sonoma County's 
                  diverse regions, and we know that what works in Santa Rosa might not work in Petaluma, and vice versa. 
                  That's why we create custom solutions as unique as Sonoma County itself. Thanks for trusting us 
                  with your digital presence, Wine Country!
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
                    alt="Sonoma County Web Development - Santa Rosa, Petaluma, Healdsburg, Rohnert Park"
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
                <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                  Sonoma County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Sonoma County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Santa Rosa Wine" Chen</h4>
                    <p className="text-gray-600">CEO, Santa Rosa Wine Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Sonoma County! Our new website captures the wine industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of purple—
                  that's respect for Sonoma County's values! Wine Country with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Petaluma Tech" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Petaluma Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'Wine Country!' Our 
                  tech inquiries increased 180% and clients love the innovation vibe. They understand 
                  that in Sonoma County, it's not just business—it's about Wine Country pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Healdsburg Tourism" Park</h4>
                    <p className="text-gray-600">Director, Healdsburg Tourism Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a tourism services company in Healdsburg, we needed a website that honors our wine heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Sonoma County values. They understand Sonoma County business!"
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
                <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
                  Sonoma County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Sonoma County web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-red-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Sonoma County Your Digital Wine Country Hub?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Sonoma County businesses that trust Nandann Creative with their digital success—from Santa Rosa to Petaluma, Wine Country!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="Sonoma County, California" locationShort="CA" />
      </div>
    </>
  );
}
