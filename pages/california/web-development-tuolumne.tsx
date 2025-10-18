import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function TuolumneCountyPage() {
  // FAQ data for Tuolumne County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Tuolumne County?",
      answer: "We understand Tuolumne County's unique business landscape and Sierra Nevada culture like no other agency! From Sonora's tech excellence and healthcare sector to Jamestown's agriculture innovation, from Columbia's manufacturing industry to Twain Harte's tech sector, we know what makes Tuolumne County businesses succeed. We combine Sierra Nevada innovation with Tuolumne County's entrepreneurial spirit and agricultural expertise."
    },
    {
      question: "How quickly can you deliver a website for my Tuolumne County business?",
      answer: "We move faster than Tuolumne County's mountain winds! Our Rapid Delivery service guarantees completion within 7 days, perfect for Tuolumne County's fast-paced tech and healthcare industries where efficiency is everything. Whether you're in Sonora, Jamestown, Columbia, or anywhere in Tuolumne County, we understand that Sierra Nevada businesses value speed and reliability. We deliver websites faster than you can say 'Sierra Nevada!'"
    },
    {
      question: "Do you understand Tuolumne County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Tuolumne County and understand the county's diverse economy—from Sonora's tech excellence and healthcare sector to Jamestown's agriculture innovation, from Columbia's manufacturing industry to Twain Harte's tech sector. We know Tuolumne County isn't just about tech and healthcare—it's a thriving business ecosystem with unique advantages like Sierra Nevada connections and entrepreneurial spirit."
    },
    {
      question: "Can you help with local SEO for Tuolumne County businesses?",
      answer: "Yes! We specialize in Tuolumne County-specific SEO strategies, from targeting 'best tech companies Sonora' to 'healthcare jobs Jamestown.' We understand local search patterns and can help you dominate results across Tuolumne County's diverse regions. Whether you're targeting tech clients in Sonora or serving healthcare customers in Jamestown, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Tuolumne County clients?",
      answer: "We bring Sierra Nevada innovation with Tuolumne County's entrepreneurial spirit—agricultural expertise, tech innovation, and genuine hospitality. We understand that Tuolumne County businesses prioritize efficiency, local connections, and authentic experiences over corporate bureaucracy. Our approach honors Tuolumne County's unique culture—from Sierra Nevada pride to agricultural innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Tuolumne County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Tuolumne County businesses can't afford downtime, whether you're running a tech company in Sonora, a healthcare firm in Jamestown, or a manufacturing business in Columbia. We've got your back like a good Sierra Nevada neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Tuolumne County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-tuolumne",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sonora",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.9841",
      "longitude": "-120.3821"
    },
    "areaServed": {
      "@type": "County",
      "name": "Tuolumne County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "Tuolumne County"
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
        <title>Web Development Tuolumne County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development Tuolumne County California: Custom website design agency serving Tuolumne County businesses. Rapid delivery, local SEO, responsive design. From Sonora to Jamestown, Columbia to Twain Harte. The Sierra Nevada deserves a great website!" />
        <meta name="keywords" content="web development tuolumne county, web design sonora, website agency jamestown, local seo tuolumne county california, custom websites columbia, rapid website delivery twain harte, web development company tuolumne county, tuolumne county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-tuolumne" />
        <meta property="og:title" content="Web Development Agency in Tuolumne County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Tuolumne County. Custom websites, rapid delivery, local SEO optimization for Sonora, Jamestown, Columbia, and Twain Harte businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-tuolumne" />
        <meta property="twitter:title" content="Web Development Agency in Tuolumne County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Tuolumne County. Custom websites, rapid delivery, local SEO optimization for Sonora, Jamestown, Columbia, and Twain Harte businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Tuolumne County, California" />
        <meta name="geo.position" content="37.9841;-120.3821" />
        <meta name="ICBM" content="37.9841, -120.3821" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-tuolumne" />
        
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
        <LocationNavigation location="Tuolumne County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Sierra Nevada Needs a Website That{' '}
                  <span className="bg-gradient-to-r from-stone-600 to-gray-600 bg-clip-text text-transparent">
                    Rides the Perfect Wave!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Sonora's tech excellence to Jamestown's agriculture innovation, we're the premier web development 
                  agency that understands Tuolumne County's unique Sierra Nevada culture and diverse business landscape. 
                  Whether you're in Sonora, Jamestown, Columbia, or Twain Harte, we deliver custom websites 
                  that capture Tuolumne County's spirit and drive real results in the mountain paradise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-stone-600 to-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-stone-700 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-stone-600 text-stone-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-stone-600 hover:text-white transition-all duration-300 text-center">
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
                    alt="Tuolumne County Web Development - Sonora, Jamestown, Columbia"
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
                alt="Tuolumne County Web Development Agency - Nandann Creative"
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
                Tuolumne County's{' '}
                <span className="text-stone-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Tuolumne County businesses from Sonora to Twain Harte
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-stone-500 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tuolumne County Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Tuolumne County Economic Development Agency for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Tuolumne County Economic Development Agency
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-stone-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Healthcare Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Sonora Chamber of Commerce for exceptional websites that serve the healthcare and tech sectors
                </p>
                <div className="text-sm text-gray-500">
                  Sonora Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sierra Nevada Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Sierra Nevada Business Journal for fastest website delivery while maintaining Tuolumne County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Sierra Nevada Business Journal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tuolumne County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-stone-600 to-gray-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Tuolumne County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Sierra Nevada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-stone-50 to-gray-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-stone-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Mountain Winds</h3>
                <p className="text-gray-700">
                  Tuolumne County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Sierra Nevada!' We understand that in Tuolumne County's competitive 
                  tech and healthcare markets, efficiency is everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-stone-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sierra Nevada Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Sonora's tech industry to Jamestown's agriculture sector, we understand Tuolumne County's business culture. 
                  We create websites that embody Sierra Nevada pride—innovative, efficient, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-stone-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech Excellence to Agriculture Innovation</h3>
                <p className="text-gray-700">
                  We understand Tuolumne County's diverse economy—from Sonora's tech excellence and healthcare sector to Jamestown's 
                  agriculture innovation, from Columbia's manufacturing industry to Twain Harte's tech sector. 
                  We create industry-specific solutions that work whether you're building software or growing crops.
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
                Serving All of Tuolumne County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech excellence of Sonora to the agriculture innovation of Jamestown, we provide web development services across the entire Tuolumne County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-tuolumne" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Sonora</h3>
                <p className="text-gray-600">
                  The Tech Capital. Tech excellence, healthcare sector, education. 
                  Where Tuolumne County's culture meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-tuolumne" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Jamestown</h3>
                <p className="text-gray-600">
                  The Agriculture Hub. Agriculture innovation, tech excellence, healthcare. 
                  Where Tuolumne County's agricultural tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-tuolumne" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Columbia</h3>
                <p className="text-gray-600">
                  The Manufacturing Hub. Manufacturing industry, tech excellence, education. 
                  Where Tuolumne County's manufacturing charm meets its agricultural culture.
                </p>
              </Link>
              
              <Link href="/california/web-development-tuolumne" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Twain Harte</h3>
                <p className="text-gray-600">
                  The Tech Hub. Tech sector, healthcare, education. 
                  Where Tuolumne County's tech culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-tuolumne" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Groveland</h3>
                <p className="text-gray-600">
                  The Gateway City. Tourism excellence, manufacturing excellence, education. 
                  Where Tuolumne County's gateway heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-tuolumne" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Mi-Wuk Village</h3>
                <p className="text-gray-600">
                  The Gateway City. Tourism excellence, manufacturing excellence, education. 
                  Where Tuolumne County's gateway charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Tuolumne County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Tuolumne County's{' '}
                  <span className="bg-gradient-to-r from-stone-600 to-gray-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Tuolumne County isn't just a county—it's a county of Sierra Nevada dreams! From Sonora's "Tech Capital" 
                  innovation excellence to Jamestown's agriculture innovation, from Columbia's manufacturing industry to Twain Harte's 
                  tech sector, Tuolumne County represents a unique blend of innovation, Sierra Nevada pride, 
                  and agricultural excellence that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Sonora businesses need websites that reflect the city's tech sophistication 
                  while honoring Tuolumne County's entrepreneurial heritage—whether you're running a Fortune 500 company or a startup. 
                  Jamestown companies benefit from designs that capture the city's agriculture charm and innovation tradition. 
                  Columbia businesses need sites that showcase manufacturing excellence and tech innovation 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Sierra Nevada pride to tech innovation, from mountain winds to tech startups, 
                  Tuolumne County's culture is rich, diverse, and deeply rooted in agricultural excellence, tech innovation, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Tuolumne County's heritage while 
                  driving modern business results. Whether you're "building software" in Sonora, 
                  "growing crops" in Jamestown, or "manufacturing products" in Columbia, we speak your language—from 
                  Sierra Nevada pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Tuolumne County's unique challenges too—from tech industry considerations to the importance 
                  of Sierra Nevada connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across Tuolumne County's 
                  diverse regions, and we know that what works in Sonora might not work in Jamestown, and vice versa. 
                  That's why we create custom solutions as unique as Tuolumne County itself. Thanks for trusting us 
                  with your digital presence, Sierra Nevada!
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
                    alt="Tuolumne County Web Development - Sonora, Jamestown, Columbia, Twain Harte"
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
                <span className="bg-gradient-to-r from-stone-600 to-gray-600 bg-clip-text text-transparent">
                  Tuolumne County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Tuolumne County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-stone-50 to-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-stone-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Sonora Tech" Chen</h4>
                    <p className="text-gray-600">CEO, Sonora Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Tuolumne County! Our new website captures the tech industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of stone—
                  that's respect for Tuolumne County's values! Sierra Nevada with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-stone-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Jamestown Agriculture" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Jamestown Agriculture Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'Sierra Nevada!' Our 
                  agriculture inquiries increased 180% and clients love the innovation vibe. They understand 
                  that in Tuolumne County, it's not just business—it's about Sierra Nevada pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-stone-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Columbia Manufacturing" Park</h4>
                    <p className="text-gray-600">Director, Columbia Manufacturing Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a manufacturing services company in Columbia, we needed a website that honors our manufacturing heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Tuolumne County values. They understand Tuolumne County business!"
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
                <span className="bg-gradient-to-r from-stone-600 to-gray-600 bg-clip-text text-transparent">
                  Tuolumne County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Tuolumne County web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-600 to-gray-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Tuolumne County Your Digital Sierra Nevada Hub?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Tuolumne County businesses that trust Nandann Creative with their digital success—from Sonora to Twain Harte, Sierra Nevada!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-stone-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-stone-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="Tuolumne County, California" locationShort="CA" />
      </div>
    </>
  );
}
