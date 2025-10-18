import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function SanMateoCountyPage() {
  // FAQ data for San Mateo County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in San Mateo County?",
      answer: "We understand San Mateo County's unique business landscape and Silicon Valley culture like no other agency! From Redwood City's tech innovation and government sector to Daly City's healthcare excellence, from San Mateo's finance industry to South San Francisco's biotech sector, we know what makes San Mateo County businesses succeed. We combine Silicon Valley innovation with San Mateo County's entrepreneurial spirit and tech expertise."
    },
    {
      question: "How quickly can you deliver a website for my San Mateo County business?",
      answer: "We move faster than San Mateo County's tech innovation! Our Rapid Delivery service guarantees completion within 7 days, perfect for San Mateo County's fast-paced tech and finance industries where efficiency is everything. Whether you're in Redwood City, Daly City, San Mateo, or anywhere in San Mateo County, we understand that Silicon Valley businesses value speed and reliability. We deliver websites faster than you can say 'Silicon Valley!'"
    },
    {
      question: "Do you understand San Mateo County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across San Mateo County and understand the county's diverse economy—from Redwood City's tech innovation and government sector to Daly City's healthcare excellence, from San Mateo's finance industry to South San Francisco's biotech sector. We know San Mateo County isn't just about tech and finance—it's a thriving business ecosystem with unique advantages like Silicon Valley connections and entrepreneurial spirit."
    },
    {
      question: "Can you help with local SEO for San Mateo County businesses?",
      answer: "Yes! We specialize in San Mateo County-specific SEO strategies, from targeting 'best tech companies Redwood City' to 'finance jobs San Mateo.' We understand local search patterns and can help you dominate results across San Mateo County's diverse regions. Whether you're targeting tech clients in Redwood City or serving healthcare patients in Daly City, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for San Mateo County clients?",
      answer: "We bring Silicon Valley innovation with San Mateo County's entrepreneurial spirit—tech expertise, finance innovation, and genuine hospitality. We understand that San Mateo County businesses prioritize efficiency, local connections, and authentic experiences over corporate bureaucracy. Our approach honors San Mateo County's unique culture—from Silicon Valley pride to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for San Mateo County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. San Mateo County businesses can't afford downtime, whether you're running a tech company in Redwood City, a finance firm in San Mateo, or a healthcare business in Daly City. We've got your back like a good Silicon Valley neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving San Mateo County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-san-mateo",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Mateo",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.4969",
      "longitude": "-122.3331"
    },
    "areaServed": {
      "@type": "County",
      "name": "San Mateo County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "San Mateo County"
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
        <title>Web Development San Mateo County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development San Mateo County California: Custom website design agency serving San Mateo County businesses. Rapid delivery, local SEO, responsive design. From Redwood City to Daly City, San Mateo to South San Francisco. Silicon Valley deserves a great website!" />
        <meta name="keywords" content="web development san mateo county, web design redwood city, website agency daly city, local seo san mateo county california, custom websites san mateo, rapid website delivery south san francisco, web development company san mateo county, san mateo county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-san-mateo" />
        <meta property="og:title" content="Web Development Agency in San Mateo County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in San Mateo County. Custom websites, rapid delivery, local SEO optimization for Redwood City, Daly City, San Mateo, and South San Francisco businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-san-mateo" />
        <meta property="twitter:title" content="Web Development Agency in San Mateo County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in San Mateo County. Custom websites, rapid delivery, local SEO optimization for Redwood City, Daly City, San Mateo, and South San Francisco businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Mateo County, California" />
        <meta name="geo.position" content="37.4969;-122.3331" />
        <meta name="ICBM" content="37.4969, -122.3331" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-san-mateo" />
        
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
        <LocationNavigation location="San Mateo County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Silicon Valley Needs a Website That{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Codes Like a Pro!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Redwood City's tech innovation to Daly City's healthcare excellence, we're the premier web development 
                  agency that understands San Mateo County's unique Silicon Valley culture and diverse business landscape. 
                  Whether you're in Redwood City, Daly City, San Mateo, or South San Francisco, we deliver custom websites 
                  that capture San Mateo County's spirit and drive real results in the tech paradise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-center">
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
                    alt="San Mateo County Web Development - Redwood City, Daly City, San Mateo"
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
                alt="San Mateo County Web Development Agency - Nandann Creative"
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
                San Mateo County's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of San Mateo County businesses from Redwood City to South San Francisco
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">San Mateo County Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the San Mateo County Economic Development Agency for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  San Mateo County Economic Development Agency
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Finance Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by San Mateo Chamber of Commerce for exceptional websites that serve the finance and innovation sectors
                </p>
                <div className="text-sm text-gray-500">
                  San Mateo Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Silicon Valley Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Silicon Valley Business Journal for fastest website delivery while maintaining San Mateo County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Silicon Valley Business Journal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* San Mateo County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets San Mateo County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in Silicon Valley
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Tech Innovation</h3>
                <p className="text-gray-700">
                  San Mateo County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Silicon Valley!' We understand that in San Mateo County's competitive 
                  tech and finance markets, efficiency is everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Silicon Valley Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Redwood City's tech industry to Daly City's healthcare sector, we understand San Mateo County's business culture. 
                  We create websites that embody Silicon Valley pride—innovative, efficient, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech Innovation to Finance Excellence</h3>
                <p className="text-gray-700">
                  We understand San Mateo County's diverse economy—from Redwood City's tech innovation and government sector to Daly City's 
                  healthcare excellence, from San Mateo's finance industry to South San Francisco's biotech sector. 
                  We create industry-specific solutions that work whether you're building software or managing finances.
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
                Serving All of San Mateo County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech innovation of Redwood City to the healthcare excellence of Daly City, we provide web development services across the entire San Mateo County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-san-mateo" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Redwood City</h3>
                <p className="text-gray-600">
                  The Tech Hub. Tech innovation, government sector, healthcare. 
                  Where San Mateo County's culture meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-mateo" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Daly City</h3>
                <p className="text-gray-600">
                  The Healthcare Hub. Healthcare excellence, tech innovation, education. 
                  Where San Mateo County's suburban tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-mateo" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">San Mateo</h3>
                <p className="text-gray-600">
                  The Finance Center. Finance industry, tech innovation, education. 
                  Where San Mateo County's finance charm meets its tech culture.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-mateo" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">South San Francisco</h3>
                <p className="text-gray-600">
                  The Biotech Hub. Biotech sector, healthcare, education. 
                  Where San Mateo County's biotech culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-mateo" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Foster City</h3>
                <p className="text-gray-600">
                  The Corporate City. Corporate headquarters, tech innovation, education. 
                  Where San Mateo County's corporate heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-mateo" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Burlingame</h3>
                <p className="text-gray-600">
                  The Gateway City. Tech innovation, healthcare, education. 
                  Where San Mateo County's gateway charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* San Mateo County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get San Mateo County's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  San Mateo County isn't just a county—it's a county of Silicon Valley dreams! From Redwood City's "Tech Hub" 
                  innovation excellence to Daly City's healthcare innovation, from San Mateo's finance industry to South San Francisco's 
                  biotech sector, San Mateo County represents a unique blend of innovation, Silicon Valley pride, 
                  and tech excellence that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Redwood City businesses need websites that reflect the city's tech sophistication 
                  while honoring San Mateo County's entrepreneurial heritage—whether you're running a Fortune 500 company or a startup. 
                  Daly City companies benefit from designs that capture the city's healthcare charm and innovation tradition. 
                  San Mateo businesses need sites that showcase finance excellence and tech innovation 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Silicon Valley pride to tech innovation, from innovation hubs to finance startups, 
                  San Mateo County's culture is rich, diverse, and deeply rooted in tech excellence, finance innovation, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor San Mateo County's heritage while 
                  driving modern business results. Whether you're "building software" in Redwood City, 
                  "managing finances" in San Mateo, or "developing biotech" in South San Francisco, we speak your language—from 
                  Silicon Valley pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands San Mateo County's unique challenges too—from tech industry considerations to the importance 
                  of Silicon Valley connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across San Mateo County's 
                  diverse regions, and we know that what works in Redwood City might not work in Daly City, and vice versa. 
                  That's why we create custom solutions as unique as San Mateo County itself. Thanks for trusting us 
                  with your digital presence, Silicon Valley!
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
                    alt="San Mateo County Web Development - Redwood City, Daly City, San Mateo, South San Francisco"
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
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  San Mateo County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real San Mateo County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Redwood City Tech" Chen</h4>
                    <p className="text-gray-600">CEO, Redwood City Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get San Mateo County! Our new website captures the tech industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for San Mateo County's values! Silicon Valley with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Daly City Healthcare" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Daly City Healthcare Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'Silicon Valley!' Our 
                  healthcare inquiries increased 180% and clients love the innovation vibe. They understand 
                  that in San Mateo County, it's not just business—it's about Silicon Valley pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The San Mateo Finance" Park</h4>
                    <p className="text-gray-600">Director, San Mateo Finance Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a finance services company in San Mateo, we needed a website that honors our finance heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our San Mateo County values. They understand San Mateo County business!"
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
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  San Mateo County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our San Mateo County web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make San Mateo County Your Digital Silicon Valley Hub?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of San Mateo County businesses that trust Nandann Creative with their digital success—from Redwood City to Daly City, Silicon Valley!
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

        <LocationFooter location="San Mateo County, California" locationShort="CA" />
      </div>
    </>
  );
}
