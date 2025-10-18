import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function SantaBarbaraCountyPage() {
  // FAQ data for Santa Barbara County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Santa Barbara County?",
      answer: "We understand Santa Barbara County's unique business landscape and Central Coast culture like no other agency! From Santa Barbara's tourism excellence and tech sector to Santa Maria's agriculture innovation, from Goleta's tech industry to Lompoc's aerospace sector, we know what makes Santa Barbara County businesses succeed. We combine Central Coast innovation with Santa Barbara County's entrepreneurial spirit and coastal expertise."
    },
    {
      question: "How quickly can you deliver a website for my Santa Barbara County business?",
      answer: "We move faster than Santa Barbara County's ocean waves! Our Rapid Delivery service guarantees completion within 7 days, perfect for Santa Barbara County's fast-paced tourism and tech industries where efficiency is everything. Whether you're in Santa Barbara, Santa Maria, Goleta, or anywhere in Santa Barbara County, we understand that Central Coast businesses value speed and reliability. We deliver websites faster than you can say 'Central Coast!'"
    },
    {
      question: "Do you understand Santa Barbara County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Santa Barbara County and understand the county's diverse economy—from Santa Barbara's tourism excellence and tech sector to Santa Maria's agriculture innovation, from Goleta's tech industry to Lompoc's aerospace sector. We know Santa Barbara County isn't just about tourism and tech—it's a thriving business ecosystem with unique advantages like Central Coast connections and entrepreneurial spirit."
    },
    {
      question: "Can you help with local SEO for Santa Barbara County businesses?",
      answer: "Yes! We specialize in Santa Barbara County-specific SEO strategies, from targeting 'best restaurants Santa Barbara' to 'tech jobs Goleta.' We understand local search patterns and can help you dominate results across Santa Barbara County's diverse regions. Whether you're targeting tourism clients in Santa Barbara or serving tech customers in Goleta, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Santa Barbara County clients?",
      answer: "We bring Central Coast innovation with Santa Barbara County's entrepreneurial spirit—coastal expertise, tourism innovation, and genuine hospitality. We understand that Santa Barbara County businesses prioritize efficiency, local connections, and authentic experiences over corporate bureaucracy. Our approach honors Santa Barbara County's unique culture—from Central Coast pride to tourism innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Santa Barbara County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Santa Barbara County businesses can't afford downtime, whether you're running a tourism company in Santa Barbara, a tech firm in Goleta, or an agriculture business in Santa Maria. We've got your back like a good Central Coast neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Santa Barbara County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-santa-barbara",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santa Barbara",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.4208",
      "longitude": "-119.6982"
    },
    "areaServed": {
      "@type": "County",
      "name": "Santa Barbara County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "Santa Barbara County"
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
        <title>Web Development Santa Barbara County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development Santa Barbara County California: Custom website design agency serving Santa Barbara County businesses. Rapid delivery, local SEO, responsive design. From Santa Barbara to Santa Maria, Goleta to Lompoc. The Central Coast deserves a great website!" />
        <meta name="keywords" content="web development santa barbara county, web design santa barbara, website agency santa maria, local seo santa barbara county california, custom websites goleta, rapid website delivery lompoc, web development company santa barbara county, santa barbara county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-santa-barbara" />
        <meta property="og:title" content="Web Development Agency in Santa Barbara County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Santa Barbara County. Custom websites, rapid delivery, local SEO optimization for Santa Barbara, Santa Maria, Goleta, and Lompoc businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-santa-barbara" />
        <meta property="twitter:title" content="Web Development Agency in Santa Barbara County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Santa Barbara County. Custom websites, rapid delivery, local SEO optimization for Santa Barbara, Santa Maria, Goleta, and Lompoc businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Santa Barbara County, California" />
        <meta name="geo.position" content="34.4208;-119.6982" />
        <meta name="ICBM" content="34.4208, -119.6982" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-santa-barbara" />
        
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
        <LocationNavigation location="Santa Barbara County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-teal-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Central Coast Needs a Website That{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Rides the Perfect Wave!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Santa Barbara's tourism excellence to Santa Maria's agriculture innovation, we're the premier web development 
                  agency that understands Santa Barbara County's unique Central Coast culture and diverse business landscape. 
                  Whether you're in Santa Barbara, Santa Maria, Goleta, or Lompoc, we deliver custom websites 
                  that capture Santa Barbara County's spirit and drive real results in the coastal paradise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 text-center">
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
                    alt="Santa Barbara County Web Development - Santa Barbara, Santa Maria, Goleta"
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
                alt="Santa Barbara County Web Development Agency - Nandann Creative"
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
                Santa Barbara County's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Santa Barbara County businesses from Santa Barbara to Lompoc
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Santa Barbara County Tourism Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Santa Barbara County Tourism Board for outstanding web development innovation and tourism sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Santa Barbara County Tourism Board
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Tech Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Goleta Chamber of Commerce for exceptional websites that serve the tech and innovation sectors
                </p>
                <div className="text-sm text-gray-500">
                  Goleta Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Central Coast Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Central Coast Business Journal for fastest website delivery while maintaining Santa Barbara County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Central Coast Business Journal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Santa Barbara County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Santa Barbara County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business on the Central Coast
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Ocean Waves</h3>
                <p className="text-gray-700">
                  Santa Barbara County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Central Coast!' We understand that in Santa Barbara County's competitive 
                  tourism and tech markets, efficiency is everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Central Coast Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Santa Barbara's tourism industry to Goleta's tech sector, we understand Santa Barbara County's business culture. 
                  We create websites that embody Central Coast pride—innovative, efficient, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tourism Excellence to Tech Innovation</h3>
                <p className="text-gray-700">
                  We understand Santa Barbara County's diverse economy—from Santa Barbara's tourism excellence and tech sector to Santa Maria's 
                  agriculture innovation, from Goleta's tech industry to Lompoc's aerospace sector. 
                  We create industry-specific solutions that work whether you're welcoming tourists or building software.
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
                Serving All of Santa Barbara County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tourism excellence of Santa Barbara to the agriculture innovation of Santa Maria, we provide web development services across the entire Santa Barbara County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-santa-barbara" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Santa Barbara</h3>
                <p className="text-gray-600">
                  The Tourism Capital. Tourism excellence, tech sector, education. 
                  Where Santa Barbara County's culture meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-santa-barbara" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Santa Maria</h3>
                <p className="text-gray-600">
                  The Agriculture Hub. Agriculture innovation, tech innovation, healthcare. 
                  Where Santa Barbara County's suburban tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-santa-barbara" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Goleta</h3>
                <p className="text-gray-600">
                  The Tech Hub. Tech industry, aerospace sector, education. 
                  Where Santa Barbara County's tech charm meets its coastal culture.
                </p>
              </Link>
              
              <Link href="/california/web-development-santa-barbara" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lompoc</h3>
                <p className="text-gray-600">
                  The Aerospace Hub. Aerospace sector, agriculture excellence, education. 
                  Where Santa Barbara County's aerospace culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-santa-barbara" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Carpinteria</h3>
                <p className="text-gray-600">
                  The Gateway City. Tourism excellence, agriculture excellence, education. 
                  Where Santa Barbara County's gateway heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-santa-barbara" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Solvang</h3>
                <p className="text-gray-600">
                  The Danish City. Tourism excellence, agriculture excellence, education. 
                  Where Santa Barbara County's Danish charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Santa Barbara County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Santa Barbara County's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Santa Barbara County isn't just a county—it's a county of Central Coast dreams! From Santa Barbara's "Tourism Capital" 
                  coastal excellence to Santa Maria's agriculture innovation, from Goleta's tech industry to Lompoc's 
                  aerospace sector, Santa Barbara County represents a unique blend of innovation, Central Coast pride, 
                  and coastal excellence that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Santa Barbara businesses need websites that reflect the city's tourism sophistication 
                  while honoring Santa Barbara County's entrepreneurial heritage—whether you're running a Fortune 500 company or a startup. 
                  Santa Maria companies benefit from designs that capture the city's agriculture charm and innovation tradition. 
                  Goleta businesses need sites that showcase tech excellence and aerospace innovation 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Central Coast pride to tourism innovation, from ocean waves to tech startups, 
                  Santa Barbara County's culture is rich, diverse, and deeply rooted in coastal excellence, tourism innovation, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Santa Barbara County's heritage while 
                  driving modern business results. Whether you're "welcoming tourists" in Santa Barbara, 
                  "growing crops" in Santa Maria, or "building software" in Goleta, we speak your language—from 
                  Central Coast pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Santa Barbara County's unique challenges too—from tourism industry considerations to the importance 
                  of Central Coast connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across Santa Barbara County's 
                  diverse regions, and we know that what works in Santa Barbara might not work in Santa Maria, and vice versa. 
                  That's why we create custom solutions as unique as Santa Barbara County itself. Thanks for trusting us 
                  with your digital presence, Central Coast!
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
                    alt="Santa Barbara County Web Development - Santa Barbara, Santa Maria, Goleta, Lompoc"
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
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Santa Barbara County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Santa Barbara County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Santa Barbara Tourism" Chen</h4>
                    <p className="text-gray-600">CEO, Santa Barbara Tourism Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Santa Barbara County! Our new website captures the tourism industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for Santa Barbara County's values! Central Coast with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Goleta Tech" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Goleta Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'Central Coast!' Our 
                  tech inquiries increased 180% and clients love the innovation vibe. They understand 
                  that in Santa Barbara County, it's not just business—it's about Central Coast pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Santa Maria Agriculture" Park</h4>
                    <p className="text-gray-600">Director, Santa Maria Agriculture Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an agriculture services company in Santa Maria, we needed a website that honors our agriculture heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Santa Barbara County values. They understand Santa Barbara County business!"
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
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Santa Barbara County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Santa Barbara County web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-teal-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Santa Barbara County Your Digital Central Coast Hub?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Santa Barbara County businesses that trust Nandann Creative with their digital success—from Santa Barbara to Santa Maria, Central Coast!
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

        <LocationFooter location="Santa Barbara County, California" locationShort="CA" />
      </div>
    </>
  );
}
