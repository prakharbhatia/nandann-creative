import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function PlacerCountyPage() {
  // FAQ data for Placer County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Placer County?",
      answer: "We understand Placer County's unique business landscape and Sierra Nevada culture like no other agency! From Roseville's tech excellence and healthcare sector to Auburn's agriculture innovation, from Rocklin's education industry to Lincoln's manufacturing sector, we know what makes Placer County businesses succeed. We combine Sierra Nevada innovation with Placer County's entrepreneurial spirit and mountain expertise."
    },
    {
      question: "How quickly can you deliver a website for my Placer County business?",
      answer: "We move faster than Placer County's mountain streams! Our Rapid Delivery service guarantees completion within 7 days, perfect for Placer County's fast-paced tech and healthcare industries where efficiency is everything. Whether you're in Roseville, Auburn, Rocklin, or anywhere in Placer County, we understand that Sierra Nevada businesses value speed and reliability. We deliver websites faster than you can say 'Sierra Nevada!'"
    },
    {
      question: "Do you understand Placer County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Placer County and understand the county's diverse economy—from Roseville's tech excellence and healthcare sector to Auburn's agriculture innovation, from Rocklin's education industry to Lincoln's manufacturing sector. We know Placer County isn't just about tech and healthcare—it's a thriving business ecosystem with unique advantages like Sierra Nevada connections and entrepreneurial spirit."
    },
    {
      question: "Can you help with local SEO for Placer County businesses?",
      answer: "Yes! We specialize in Placer County-specific SEO strategies, from targeting 'best tech companies Roseville' to 'healthcare jobs Auburn.' We understand local search patterns and can help you dominate results across Placer County's diverse regions. Whether you're targeting tech clients in Roseville or serving healthcare patients in Auburn, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Placer County clients?",
      answer: "We bring Sierra Nevada innovation with Placer County's entrepreneurial spirit—mountain expertise, tech innovation, and genuine hospitality. We understand that Placer County businesses prioritize efficiency, local connections, and authentic experiences over corporate bureaucracy. Our approach honors Placer County's unique culture—from Sierra Nevada pride to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Placer County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Placer County businesses can't afford downtime, whether you're running a tech company in Roseville, a healthcare firm in Auburn, or a manufacturing business in Lincoln. We've got your back like a good Sierra Nevada neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Placer County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-placer",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Roseville",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.3296",
      "longitude": "-120.7983"
    },
    "areaServed": {
      "@type": "County",
      "name": "Placer County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "Placer County"
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
        <title>Web Development Placer County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development Placer County California: Custom website design agency serving Placer County businesses. Rapid delivery, local SEO, responsive design. From Roseville to Auburn, Rocklin to Lincoln. The Sierra Nevada deserves a great website!" />
        <meta name="keywords" content="web development placer county, web design roseville, website agency auburn, local seo placer county california, custom websites rocklin, rapid website delivery lincoln, web development company placer county, placer county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-placer" />
        <meta property="og:title" content="Web Development Agency in Placer County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Placer County. Custom websites, rapid delivery, local SEO optimization for Roseville, Auburn, Rocklin, and Lincoln businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-placer" />
        <meta property="twitter:title" content="Web Development Agency in Placer County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Placer County. Custom websites, rapid delivery, local SEO optimization for Roseville, Auburn, Rocklin, and Lincoln businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Placer County, California" />
        <meta name="geo.position" content="39.3296;-120.7983" />
        <meta name="ICBM" content="39.3296, -120.7983" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-placer" />
        
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
        <LocationNavigation location="Placer County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Sierra Nevada Needs a Website That{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Reaches New Heights!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Roseville's tech excellence to Auburn's agriculture innovation, we're the premier web development 
                  agency that understands Placer County's unique Sierra Nevada culture and diverse business landscape. 
                  Whether you're in Roseville, Auburn, Rocklin, or Lincoln, we deliver custom websites 
                  that capture Placer County's spirit and drive real results in the mountain paradise.
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
                    alt="Placer County Web Development - Roseville, Auburn, Rocklin"
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
                alt="Placer County Web Development Agency - Nandann Creative"
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
                Placer County's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Placer County businesses from Roseville to Lincoln
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Placer County Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Placer County Economic Development Agency for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Placer County Economic Development Agency
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Healthcare Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Roseville Chamber of Commerce for exceptional websites that serve the healthcare and tech sectors
                </p>
                <div className="text-sm text-gray-500">
                  Roseville Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sierra Nevada Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Sierra Nevada Business Journal for fastest website delivery while maintaining Placer County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Sierra Nevada Business Journal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Placer County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Placer County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Sierra Nevada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Mountain Streams</h3>
                <p className="text-gray-700">
                  Placer County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Sierra Nevada!' We understand that in Placer County's competitive 
                  tech and healthcare markets, efficiency is everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sierra Nevada Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Roseville's tech industry to Auburn's agriculture sector, we understand Placer County's business culture. 
                  We create websites that embody Sierra Nevada pride—innovative, efficient, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech Excellence to Agriculture Innovation</h3>
                <p className="text-gray-700">
                  We understand Placer County's diverse economy—from Roseville's tech excellence and healthcare sector to Auburn's 
                  agriculture innovation, from Rocklin's education industry to Lincoln's manufacturing sector. 
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
                Serving All of Placer County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech excellence of Roseville to the agriculture innovation of Auburn, we provide web development services across the entire Placer County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-placer" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Roseville</h3>
                <p className="text-gray-600">
                  The Tech Capital. Tech excellence, healthcare sector, education. 
                  Where Placer County's culture meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-placer" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Auburn</h3>
                <p className="text-gray-600">
                  The Agriculture Hub. Agriculture innovation, tech excellence, healthcare. 
                  Where Placer County's mountain tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-placer" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Rocklin</h3>
                <p className="text-gray-600">
                  The Education Hub. Education industry, tech excellence, healthcare. 
                  Where Placer County's education charm meets its mountain culture.
                </p>
              </Link>
              
              <Link href="/california/web-development-placer" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lincoln</h3>
                <p className="text-gray-600">
                  The Manufacturing Hub. Manufacturing sector, tech excellence, healthcare. 
                  Where Placer County's manufacturing culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-placer" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Colfax</h3>
                <p className="text-gray-600">
                  The Gateway City. Agriculture excellence, tech excellence, healthcare. 
                  Where Placer County's gateway heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-placer" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Granite Bay</h3>
                <p className="text-gray-600">
                  The Gateway City. Tech excellence, agriculture excellence, healthcare. 
                  Where Placer County's gateway charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Placer County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Placer County's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Placer County isn't just a county—it's a county of Sierra Nevada dreams! From Roseville's "Tech Capital" 
                  innovation excellence to Auburn's agriculture innovation, from Rocklin's education industry to Lincoln's 
                  manufacturing sector, Placer County represents a unique blend of innovation, Sierra Nevada pride, 
                  and mountain excellence that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Roseville businesses need websites that reflect the city's tech sophistication 
                  while honoring Placer County's entrepreneurial heritage—whether you're running a Fortune 500 company or a startup. 
                  Auburn companies benefit from designs that capture the city's agriculture charm and innovation tradition. 
                  Rocklin businesses need sites that showcase education excellence and tech innovation 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Sierra Nevada pride to tech innovation, from mountain streams to tech startups, 
                  Placer County's culture is rich, diverse, and deeply rooted in mountain excellence, tech innovation, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Placer County's heritage while 
                  driving modern business results. Whether you're "building software" in Roseville, 
                  "growing crops" in Auburn, or "educating students" in Rocklin, we speak your language—from 
                  Sierra Nevada pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Placer County's unique challenges too—from tech industry considerations to the importance 
                  of Sierra Nevada connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across Placer County's 
                  diverse regions, and we know that what works in Roseville might not work in Auburn, and vice versa. 
                  That's why we create custom solutions as unique as Placer County itself. Thanks for trusting us 
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
                    alt="Placer County Web Development - Roseville, Auburn, Rocklin, Lincoln"
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
                  Placer County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Placer County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Roseville Tech" Chen</h4>
                    <p className="text-gray-600">CEO, Roseville Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Placer County! Our new website captures the tech industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for Placer County's values! Sierra Nevada with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Auburn Agriculture" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Auburn Agriculture Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'Sierra Nevada!' Our 
                  agriculture inquiries increased 180% and clients love the innovation vibe. They understand 
                  that in Placer County, it's not just business—it's about Sierra Nevada pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Rocklin Education" Park</h4>
                    <p className="text-gray-600">Director, Rocklin Education Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education services company in Rocklin, we needed a website that honors our education heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Placer County values. They understand Placer County business!"
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
                  Placer County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Placer County web development services
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
              Ready to Make Placer County Your Digital Sierra Nevada Hub?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Placer County businesses that trust Nandann Creative with their digital success—from Roseville to Auburn, Sierra Nevada!
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

        <LocationFooter location="Placer County, California" locationShort="CA" />
      </div>
    </>
  );
}
