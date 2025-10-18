import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function NewMexicoPage() {
  // FAQ data for New Mexico
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in New Mexico?",
      answer: "We understand New Mexico's unique business landscape and Land of Enchantment culture like no other agency! From Albuquerque's tech innovation and healthcare excellence to Santa Fe's tourism industry, from Las Cruces's education sector to Roswell's aerospace industry, we know what makes New Mexico businesses succeed. We combine Silicon Valley innovation with New Mexico's values of creativity, diversity, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my New Mexico business?",
      answer: "We move faster than New Mexico's desert winds! Our Rapid Delivery service guarantees completion within 7 days, perfect for New Mexico's tech and tourism industries where efficiency matters. Whether you're in downtown Albuquerque, Santa Fe's historic district, or anywhere in the Land of Enchantment, we understand that New Mexico businesses value speed and reliability. We deliver websites faster than you can say 'Red or Green?'"
    },
    {
      question: "Do you understand New Mexico's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across New Mexico and understand the state's diverse economy—from Albuquerque's tech innovation and healthcare excellence to Santa Fe's tourism industry, from Las Cruces's education sector to Roswell's aerospace industry. We know New Mexico isn't just about chile peppers and UFOs—it's a thriving business ecosystem with unique advantages like tech talent and cultural diversity."
    },
    {
      question: "Can you help with local SEO for New Mexico businesses?",
      answer: "Yes! We specialize in New Mexico-specific SEO strategies, from targeting 'best restaurants Albuquerque' to 'tech jobs Santa Fe.' We understand local search patterns and can help you dominate results across New Mexico's diverse regions. Whether you're targeting tech clients in Albuquerque or serving tourists in Santa Fe, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for New Mexico clients?",
      answer: "We bring Silicon Valley innovation with New Mexico's values—creativity, diversity, and genuine hospitality. We understand that New Mexico businesses prioritize cultural authenticity, local connections, and innovative experiences over corporate efficiency. Our approach honors New Mexico's unique culture—from Land of Enchantment creativity to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for New Mexico businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. New Mexico businesses can't afford downtime, whether you're running a tech company in Albuquerque, a tourism business in Santa Fe, or an aerospace facility in Roswell. We've got your back like a good New Mexico neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving New Mexico businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-new-mexico",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Mexico",
      "addressRegion": "NM",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.5199",
      "longitude": "-105.8701"
    },
    "areaServed": {
      "@type": "State",
      "name": "New Mexico"
    },
    "serviceArea": {
      "@type": "State",
      "name": "New Mexico"
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
        <title>Web Development New Mexico | Custom Website Design Agency NM | Nandann Creative</title>
        <meta name="description" content="Web development New Mexico: Custom website design agency serving NM businesses. Rapid delivery, local SEO, responsive design. From Albuquerque to Santa Fe, Las Cruces to Roswell. The Land of Enchantment deserves a great website!" />
        <meta name="keywords" content="web development new mexico, web design albuquerque, website agency santa fe, local seo new mexico, custom websites las cruces, rapid website delivery roswell, web development company nm, new mexico web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-new-mexico" />
        <meta property="og:title" content="Web Development Agency in New Mexico | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in New Mexico. Custom websites, rapid delivery, local SEO optimization for Albuquerque, Santa Fe, Las Cruces, and Roswell businesses." />
        <meta property="og:image" content="https://www.nandann.com/new-mexico/new-mexico-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-new-mexico" />
        <meta property="twitter:title" content="Web Development Agency in New Mexico | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in New Mexico. Custom websites, rapid delivery, local SEO optimization for Albuquerque, Santa Fe, Las Cruces, and Roswell businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/new-mexico/new-mexico-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-NM" />
        <meta name="geo.placename" content="New Mexico" />
        <meta name="geo.position" content="34.5199;-105.8701" />
        <meta name="ICBM" content="34.5199, -105.8701" />
        <link rel="canonical" href="https://www.nandann.com/web-development-new-mexico" />
        
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
        <LocationNavigation location="New Mexico" locationShort="NM" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-yellow-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Red or Green? New Mexico Needs a{' '}
                  <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Albuquerque's tech innovation to Santa Fe's tourism industry, we're the premier web development 
                  agency that understands New Mexico's unique Land of Enchantment culture and diverse business landscape. 
                  Whether you're in Albuquerque, Santa Fe, Las Cruces, or Roswell, we deliver custom websites 
                  that capture New Mexico's spirit and drive real results in the Land of Enchantment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-red-600 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 text-center">
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
                  <source src="/new-mexico/new-mexico-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/new-mexico/new-mexico-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/new-mexico/new-mexico-web-development-nandann-creative-poster.webp"
                    alt="New Mexico Web Development - Albuquerque, Santa Fe, Las Cruces"
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
                srcSet="/new-mexico/new-mexico-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/new-mexico/new-mexico-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/new-mexico/new-mexico-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/new-mexico/new-mexico-web-development-nandann-creative-sm.webp"
                alt="New Mexico Web Development Agency - Nandann Creative"
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
                New Mexico's{' '}
                <span className="text-red-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of New Mexico businesses from Albuquerque to Roswell
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Albuquerque Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Albuquerque Chamber of Commerce for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Albuquerque Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Tourism Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Santa Fe Tourism Board for exceptional websites that showcase New Mexico's cultural heritage and attractions
                </p>
                <div className="text-sm text-gray-500">
                  Santa Fe Tourism Board
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Las Cruces Chamber of Commerce for fastest website delivery while maintaining New Mexico's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Las Cruces Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Mexico Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets New Mexico
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Land of Enchantment
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-yellow-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Desert Winds</h3>
                <p className="text-gray-700">
                  New Mexico businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Red or Green?' We understand that in New Mexico's competitive 
                  tech and tourism markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Land of Enchantment in Every Pixel</h3>
                <p className="text-gray-700">
                  From Albuquerque's tech innovation to Santa Fe's cultural heritage, we understand New Mexico's business culture. 
                  We create websites that embody Land of Enchantment creativity—innovative, diverse, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech Innovation to Cultural Heritage</h3>
                <p className="text-gray-700">
                  We understand New Mexico's diverse economy—from Albuquerque's tech innovation and healthcare excellence to Santa Fe's 
                  tourism industry, from Las Cruces's education sector to Roswell's aerospace industry. 
                  We create industry-specific solutions that work whether you're innovating tech or preserving culture.
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
                Serving All of New Mexico
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech innovation of Albuquerque to the cultural heritage of Santa Fe, we provide web development services across the entire Land of Enchantment. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-new-mexico" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Albuquerque</h3>
                <p className="text-gray-600">
                  The Duke City. Tech innovation, healthcare excellence, aerospace. 
                  Where New Mexico's innovation meets its cultural heritage.
                </p>
              </Link>
              
              <Link href="/web-development-new-mexico" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Santa Fe</h3>
                <p className="text-gray-600">
                  The City Different. Tourism industry, cultural heritage, arts. 
                  Where New Mexico's culture meets its creative spirit.
                </p>
              </Link>
              
              <Link href="/web-development-new-mexico" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Las Cruces</h3>
                <p className="text-gray-600">
                  The City of Crosses. Education sector, healthcare, agriculture. 
                  Where New Mexico's academic tradition meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-new-mexico" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Roswell</h3>
                <p className="text-gray-600">
                  The UFO City. Aerospace industry, tourism, agriculture. 
                  Where New Mexico's mystery meets its scientific innovation.
                </p>
              </Link>
              
              <Link href="/web-development-new-mexico" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Farmington</h3>
                <p className="text-gray-600">
                  The Energy City. Oil and gas industry, healthcare, education. 
                  Where New Mexico's energy sector meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-new-mexico" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Rio Rancho</h3>
                <p className="text-gray-600">
                  The City of Vision. Tech innovation, healthcare, education. 
                  Where New Mexico's suburban charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* New Mexico Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get New Mexico's{' '}
                  <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  New Mexico isn't just a state—it's a state of enchantment! From Albuquerque's "Duke City" 
                  tech innovation to Santa Fe's cultural heritage, from Las Cruces's education excellence to Roswell's 
                  aerospace industry, New Mexico represents a unique blend of innovation, Land of Enchantment creativity, 
                  and cultural diversity that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Albuquerque businesses need websites that reflect the city's tech sophistication 
                  while honoring New Mexico's cultural heritage—whether you're running a Fortune 500 company or a startup. 
                  Santa Fe companies benefit from designs that capture the city's artistic excellence and cultural tradition. 
                  Las Cruces businesses need sites that showcase education excellence and cross city charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Land of Enchantment creativity to tech innovation, from chile peppers to UFO culture, 
                  New Mexico's culture is rich, diverse, and deeply rooted in creativity, diversity, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor New Mexico's heritage while 
                  driving modern business results. Whether you're "innovating tech" in Albuquerque, 
                  "preserving culture" in Santa Fe, or "exploring space" in Roswell, we speak your language—from 
                  Land of Enchantment creativity to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands New Mexico's unique challenges too—from desert climate considerations to the importance 
                  of cultural authenticity, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across New Mexico's 
                  diverse regions, and we know that what works in Albuquerque might not work in Santa Fe, and vice versa. 
                  That's why we create custom solutions as unique as New Mexico itself. Thanks for trusting us 
                  with your digital presence, red or green!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/new-mexico/new-mexico-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/new-mexico/new-mexico-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/new-mexico/new-mexico-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/new-mexico/new-mexico-web-development-nandann-creative-sm.webp"
                    alt="New Mexico Web Development - Albuquerque, Santa Fe, Las Cruces, Roswell"
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
                <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                  New Mexico is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real New Mexico businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-yellow-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Maria "The Albuquerque Innovator" Rodriguez</h4>
                    <p className="text-gray-600">CEO, Albuquerque Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get New Mexico! Our new website captures the tech innovation sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of red—
                  that's respect for New Mexico's values! Red or green with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sofia "The Santa Fe Strategist" Martinez</h4>
                    <p className="text-gray-600">Director, Santa Fe Tourism Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Red or Green?' Our 
                  tourism inquiries increased 180% and clients love the cultural vibe. They understand 
                  that in New Mexico, it's not just business—it's about Land of Enchantment creativity and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tomás "The Las Cruces Dynamo" Torres</h4>
                    <p className="text-gray-600">Founder, Las Cruces Education Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education solutions company in Las Cruces, we needed a website that honors our cross city heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our New Mexico values. They understand New Mexico business!"
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
                <span className="bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                  New Mexico Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our New Mexico web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-600 to-yellow-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make New Mexico Your Digital Land of Enchantment?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of New Mexico businesses that trust Nandann Creative with their digital success—from Albuquerque to Roswell, red or green!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="New Mexico" locationShort="NM" />
      </div>
    </>
  );
}

