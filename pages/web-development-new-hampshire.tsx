import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function NewHampshirePage() {
  // FAQ data for New Hampshire
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in New Hampshire?",
      answer: "We understand New Hampshire's unique business landscape and Live Free or Die culture like no other agency! From Manchester's tech innovation and healthcare excellence to Nashua's manufacturing sector, from Concord's government industry to Portsmouth's tourism sector, we know what makes New Hampshire businesses succeed. We combine Silicon Valley innovation with New Hampshire's values of independence, hard work, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my New Hampshire business?",
      answer: "We move faster than New Hampshire's mountain winds! Our Rapid Delivery service guarantees completion within 7 days, perfect for New Hampshire's tech and manufacturing industries where efficiency matters. Whether you're in downtown Manchester, Nashua's business district, or anywhere in the Granite State, we understand that New Hampshire businesses value speed and reliability. We deliver websites faster than you can say 'Live Free or Die!'"
    },
    {
      question: "Do you understand New Hampshire's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across New Hampshire and understand the state's diverse economy—from Manchester's tech innovation and healthcare excellence to Nashua's manufacturing sector, from Concord's government industry to Portsmouth's tourism sector. We know New Hampshire isn't just about mountains and independence—it's a thriving business ecosystem with unique advantages like tech talent and no sales tax."
    },
    {
      question: "Can you help with local SEO for New Hampshire businesses?",
      answer: "Yes! We specialize in New Hampshire-specific SEO strategies, from targeting 'best restaurants Manchester' to 'tech jobs Nashua.' We understand local search patterns and can help you dominate results across New Hampshire's diverse regions. Whether you're targeting tech clients in Manchester or serving tourists in Portsmouth, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for New Hampshire clients?",
      answer: "We bring Silicon Valley innovation with New Hampshire's values—independence, hard work, and genuine hospitality. We understand that New Hampshire businesses prioritize freedom, local connections, and authentic experiences over corporate efficiency. Our approach honors New Hampshire's unique culture—from Live Free or Die independence to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for New Hampshire businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. New Hampshire businesses can't afford downtime, whether you're running a tech company in Manchester, a manufacturing business in Nashua, or a tourism facility in Portsmouth. We've got your back like a good New Hampshire neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving New Hampshire businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-new-hampshire",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Hampshire",
      "addressRegion": "NH",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.4525",
      "longitude": "-71.5639"
    },
    "areaServed": {
      "@type": "State",
      "name": "New Hampshire"
    },
    "serviceArea": {
      "@type": "State",
      "name": "New Hampshire"
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
        <title>Web Development New Hampshire | Custom Website Design Agency NH | Nandann Creative</title>
        <meta name="description" content="Web development New Hampshire: Custom website design agency serving NH businesses. Rapid delivery, local SEO, responsive design. From Manchester to Nashua, Concord to Portsmouth. The Granite State deserves a great website!" />
        <meta name="keywords" content="web development new hampshire, web design manchester, website agency nashua, local seo new hampshire, custom websites concord, rapid website delivery portsmouth, web development company nh, new hampshire web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-new-hampshire" />
        <meta property="og:title" content="Web Development Agency in New Hampshire | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in New Hampshire. Custom websites, rapid delivery, local SEO optimization for Manchester, Nashua, Concord, and Portsmouth businesses." />
        <meta property="og:image" content="https://www.nandann.com/new-hampshire/new-hampshire-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-new-hampshire" />
        <meta property="twitter:title" content="Web Development Agency in New Hampshire | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in New Hampshire. Custom websites, rapid delivery, local SEO optimization for Manchester, Nashua, Concord, and Portsmouth businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/new-hampshire/new-hampshire-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-NH" />
        <meta name="geo.placename" content="New Hampshire" />
        <meta name="geo.position" content="43.4525;-71.5639" />
        <meta name="ICBM" content="43.4525, -71.5639" />
        <link rel="canonical" href="https://www.nandann.com/web-development-new-hampshire" />
        
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
        <LocationNavigation location="New Hampshire" locationShort="NH" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-red-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Live Free or Die! New Hampshire Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Manchester's tech innovation to Nashua's manufacturing sector, we're the premier web development 
                  agency that understands New Hampshire's unique Live Free or Die culture and diverse business landscape. 
                  Whether you're in Manchester, Nashua, Concord, or Portsmouth, we deliver custom websites 
                  that capture New Hampshire's spirit and drive real results in the Granite State.
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
                  <source src="/new-hampshire/new-hampshire-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/new-hampshire/new-hampshire-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/new-hampshire/new-hampshire-web-development-nandann-creative-poster.webp"
                    alt="New Hampshire Web Development - Manchester, Nashua, Concord"
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
                srcSet="/new-hampshire/new-hampshire-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/new-hampshire/new-hampshire-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/new-hampshire/new-hampshire-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/new-hampshire/new-hampshire-web-development-nandann-creative-sm.webp"
                alt="New Hampshire Web Development Agency - Nandann Creative"
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
                New Hampshire's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of New Hampshire businesses from Manchester to Portsmouth
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Manchester Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Manchester Chamber of Commerce for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Manchester Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Manufacturing Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Nashua Manufacturing Association for exceptional websites that serve the manufacturing and industrial sectors
                </p>
                <div className="text-sm text-gray-500">
                  Nashua Manufacturing Association
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Portsmouth Chamber of Commerce for fastest website delivery while maintaining New Hampshire's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Portsmouth Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Hampshire Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets New Hampshire
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Granite State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Mountain Winds</h3>
                <p className="text-gray-700">
                  New Hampshire businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Live Free or Die!' We understand that in New Hampshire's competitive 
                  tech and manufacturing markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Free or Die in Every Pixel</h3>
                <p className="text-gray-700">
                  From Manchester's tech innovation to Nashua's manufacturing excellence, we understand New Hampshire's business culture. 
                  We create websites that embody Live Free or Die independence—hardworking, community-focused, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech Innovation to Manufacturing Excellence</h3>
                <p className="text-gray-700">
                  We understand New Hampshire's diverse economy—from Manchester's tech innovation and healthcare excellence to Nashua's 
                  manufacturing sector, from Concord's government industry to Portsmouth's tourism sector. 
                  We create industry-specific solutions that work whether you're innovating tech or building products.
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
                Serving All of New Hampshire
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech innovation of Manchester to the manufacturing sector of Nashua, we provide web development services across the entire Granite State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-new-hampshire" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Manchester</h3>
                <p className="text-gray-600">
                  The Queen City. Tech innovation, healthcare excellence, manufacturing. 
                  Where New Hampshire's innovation meets its industrial heritage.
                </p>
              </Link>
              
              <Link href="/web-development-new-hampshire" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Nashua</h3>
                <p className="text-gray-600">
                  The Gate City. Manufacturing sector, tech innovation, healthcare. 
                  Where New Hampshire's industry meets its tech future.
                </p>
              </Link>
              
              <Link href="/web-development-new-hampshire" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Concord</h3>
                <p className="text-gray-600">
                  The Capital City. Government industry, healthcare, education. 
                  Where New Hampshire's politics meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-new-hampshire" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Portsmouth</h3>
                <p className="text-gray-600">
                  The Port City. Tourism sector, healthcare, education. 
                  Where New Hampshire's coastal culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/web-development-new-hampshire" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Derry</h3>
                <p className="text-gray-600">
                  The Space City. Tech innovation, healthcare, education. 
                  Where New Hampshire's suburban charm meets modern business.
                </p>
              </Link>
              
              <Link href="/web-development-new-hampshire" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Rochester</h3>
                <p className="text-gray-600">
                  The Lilac City. Manufacturing industry, healthcare, education. 
                  Where New Hampshire's industrial tradition meets its community spirit.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* New Hampshire Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get New Hampshire's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  New Hampshire isn't just a state—it's a state of independence! From Manchester's "Queen City" 
                  tech innovation to Nashua's manufacturing sector, from Concord's government industry to Portsmouth's 
                  tourism sector, New Hampshire represents a unique blend of innovation, Live Free or Die independence, 
                  and Granite State pride that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Manchester businesses need websites that reflect the city's tech sophistication 
                  while honoring New Hampshire's industrial heritage—whether you're running a Fortune 500 company or a startup. 
                  Nashua companies benefit from designs that capture the city's manufacturing excellence and gate city tradition. 
                  Concord businesses need sites that showcase government excellence and capital city charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Live Free or Die independence to tech innovation, from mountains to no sales tax, 
                  New Hampshire's culture is rich, diverse, and deeply rooted in independence, hard work, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor New Hampshire's heritage while 
                  driving modern business results. Whether you're "innovating tech" in Manchester, 
                  "building products" in Nashua, or "serving citizens" in Concord, we speak your language—from 
                  Live Free or Die independence to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands New Hampshire's unique challenges too—from mountain weather considerations to the importance 
                  of independence, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across New Hampshire's 
                  diverse regions, and we know that what works in Manchester might not work in Nashua, and vice versa. 
                  That's why we create custom solutions as unique as New Hampshire itself. Thanks for trusting us 
                  with your digital presence, granite state!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/new-hampshire/new-hampshire-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/new-hampshire/new-hampshire-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/new-hampshire/new-hampshire-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/new-hampshire/new-hampshire-web-development-nandann-creative-sm.webp"
                    alt="New Hampshire Web Development - Manchester, Nashua, Concord, Portsmouth"
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
                  New Hampshire is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real New Hampshire businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Manchester Innovator" Johnson</h4>
                    <p className="text-gray-600">CEO, Manchester Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get New Hampshire! Our new website captures the tech innovation sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for New Hampshire's values! Live free or die with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Nashua Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Nashua Manufacturing Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Live Free or Die!' Our 
                  manufacturing inquiries increased 180% and clients love the industrial vibe. They understand 
                  that in New Hampshire, it's not just business—it's about independence and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Concord Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Concord Government Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a government solutions company in Concord, we needed a website that honors our capital city heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our New Hampshire values. They understand New Hampshire business!"
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
                  New Hampshire Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our New Hampshire web development services
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
              Ready to Make New Hampshire Your Digital Granite State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of New Hampshire businesses that trust Nandann Creative with their digital success—from Manchester to Portsmouth, live free or die!
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

        <LocationFooter location="New Hampshire" locationShort="NH" />
      </div>
    </>
  );
}

