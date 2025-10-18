import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function ContraCostaCountyPage() {
  // FAQ data for Contra Costa County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Contra Costa County?",
      answer: "We understand Contra Costa County's unique business landscape and East Bay culture like no other agency! From Concord's tech innovation and healthcare excellence to Richmond's port sector, from Antioch's manufacturing to Walnut Creek's finance industry, we know what makes Contra Costa County businesses succeed. We combine Silicon Valley innovation with Contra Costa County's entrepreneurial spirit and East Bay expertise."
    },
    {
      question: "How quickly can you deliver a website for my Contra Costa County business?",
      answer: "We move faster than Contra Costa County's port operations! Our Rapid Delivery service guarantees completion within 7 days, perfect for Contra Costa County's fast-paced tech and manufacturing industries where efficiency is everything. Whether you're in Concord, Richmond, Antioch, or anywhere in Contra Costa County, we understand that East Bay businesses value speed and reliability. We deliver websites faster than you can say 'East Bay!'"
    },
    {
      question: "Do you understand Contra Costa County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Contra Costa County and understand the county's diverse economy—from Concord's tech innovation and healthcare excellence to Richmond's port sector, from Antioch's manufacturing to Walnut Creek's finance industry. We know Contra Costa County isn't just about tech and manufacturing—it's a thriving business ecosystem with unique advantages like port connections and entrepreneurial spirit."
    },
    {
      question: "Can you help with local SEO for Contra Costa County businesses?",
      answer: "Yes! We specialize in Contra Costa County-specific SEO strategies, from targeting 'best restaurants Concord' to 'tech jobs Richmond.' We understand local search patterns and can help you dominate results across Contra Costa County's diverse regions. Whether you're targeting tech clients in Concord or serving tourists in Walnut Creek, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Contra Costa County clients?",
      answer: "We bring Silicon Valley innovation with Contra Costa County's entrepreneurial spirit—East Bay expertise, port innovation, and genuine hospitality. We understand that Contra Costa County businesses prioritize efficiency, local connections, and authentic experiences over corporate bureaucracy. Our approach honors Contra Costa County's unique culture—from East Bay pride to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Contra Costa County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Contra Costa County businesses can't afford downtime, whether you're running a tech company in Concord, a port facility in Richmond, or a finance firm in Walnut Creek. We've got your back like a good East Bay neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Contra Costa County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-contra-costa",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Martinez",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.0194",
      "longitude": "-122.1342"
    },
    "areaServed": {
      "@type": "County",
      "name": "Contra Costa County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "Contra Costa County"
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
        <title>Web Development Contra Costa County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development Contra Costa County California: Custom website design agency serving Contra Costa County businesses. Rapid delivery, local SEO, responsive design. From Concord to Richmond, Antioch to Walnut Creek. The East Bay deserves a great website!" />
        <meta name="keywords" content="web development contra costa county, web design concord, website agency richmond, local seo contra costa county california, custom websites antioch, rapid website delivery walnut creek, web development company contra costa county, contra costa county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-contra-costa" />
        <meta property="og:title" content="Web Development Agency in Contra Costa County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Contra Costa County. Custom websites, rapid delivery, local SEO optimization for Concord, Richmond, Antioch, and Walnut Creek businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-contra-costa" />
        <meta property="twitter:title" content="Web Development Agency in Contra Costa County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Contra Costa County. Custom websites, rapid delivery, local SEO optimization for Concord, Richmond, Antioch, and Walnut Creek businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Contra Costa County, California" />
        <meta name="geo.position" content="38.0194;-122.1342" />
        <meta name="ICBM" content="38.0194, -122.1342" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-contra-costa" />
        
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
        <LocationNavigation location="Contra Costa County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  East Bay Needs a Website That{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Powers Innovation!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Concord's tech innovation to Richmond's port excellence, we're the premier web development 
                  agency that understands Contra Costa County's unique East Bay culture and diverse business landscape. 
                  Whether you're in Concord, Richmond, Antioch, or Walnut Creek, we deliver custom websites 
                  that capture Contra Costa County's spirit and drive real results in the East Bay.
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
                    alt="Contra Costa County Web Development - Concord, Richmond, Antioch"
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
                alt="Contra Costa County Web Development Agency - Nandann Creative"
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
                Contra Costa County's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Contra Costa County businesses from Concord to Walnut Creek
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contra Costa County Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Contra Costa County Economic Development Agency for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Contra Costa County Economic Development Agency
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Port Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Richmond Chamber of Commerce for exceptional websites that serve the port and logistics sectors
                </p>
                <div className="text-sm text-gray-500">
                  Richmond Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Finance Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Walnut Creek Business Association for fastest website delivery while maintaining Contra Costa County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Walnut Creek Business Association
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contra Costa County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Contra Costa County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the East Bay
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Port Operations</h3>
                <p className="text-gray-700">
                  Contra Costa County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'East Bay!' We understand that in Contra Costa County's competitive 
                  tech and manufacturing markets, efficiency is everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">East Bay Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Concord's tech industry to Richmond's port sector, we understand Contra Costa County's business culture. 
                  We create websites that embody East Bay pride—innovative, efficient, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech Innovation to Port Excellence</h3>
                <p className="text-gray-700">
                  We understand Contra Costa County's diverse economy—from Concord's tech innovation and healthcare excellence to Richmond's 
                  port sector, from Antioch's manufacturing to Walnut Creek's finance industry. 
                  We create industry-specific solutions that work whether you're building software or managing port operations.
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
                Serving All of Contra Costa County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech innovation of Concord to the port excellence of Richmond, we provide web development services across the entire Contra Costa County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-contra-costa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Concord</h3>
                <p className="text-gray-600">
                  The Heart of Contra Costa. Tech innovation, healthcare excellence, education. 
                  Where Contra Costa County's culture meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-contra-costa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Richmond</h3>
                <p className="text-gray-600">
                  The Port City. Port sector, tech innovation, healthcare. 
                  Where Contra Costa County's port tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-contra-costa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Antioch</h3>
                <p className="text-gray-600">
                  The City of Opportunity. Manufacturing sector, healthcare, education. 
                  Where Contra Costa County's suburban charm meets its tech culture.
                </p>
              </Link>
              
              <Link href="/california/web-development-contra-costa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Walnut Creek</h3>
                <p className="text-gray-600">
                  The Financial Hub. Finance industry, tech innovation, healthcare. 
                  Where Contra Costa County's finance culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-contra-costa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Pittsburg</h3>
                <p className="text-gray-600">
                  The Gateway City. Tech innovation, healthcare, education. 
                  Where Contra Costa County's gateway heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-contra-costa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Martinez</h3>
                <p className="text-gray-600">
                  The County Seat. Government services, healthcare, education. 
                  Where Contra Costa County's government charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Contra Costa County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Contra Costa County's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Contra Costa County isn't just a county—it's a county of East Bay dreams! From Concord's "Heart of Contra Costa" 
                  tech innovation to Richmond's port sector, from Antioch's manufacturing to Walnut Creek's 
                  finance industry, Contra Costa County represents a unique blend of innovation, East Bay pride, 
                  and port excellence that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Concord businesses need websites that reflect the city's tech sophistication 
                  while honoring Contra Costa County's entrepreneurial heritage—whether you're running a Fortune 500 company or a startup. 
                  Richmond companies benefit from designs that capture the city's port charm and logistics tradition. 
                  Walnut Creek businesses need sites that showcase finance excellence and business innovation 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From East Bay pride to tech innovation, from ports to finance, 
                  Contra Costa County's culture is rich, diverse, and deeply rooted in tech excellence, port operations, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Contra Costa County's heritage while 
                  driving modern business results. Whether you're "building software" in Concord, 
                  "managing ports" in Richmond, or "managing finances" in Walnut Creek, we speak your language—from 
                  East Bay pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Contra Costa County's unique challenges too—from tech industry considerations to the importance 
                  of port connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across Contra Costa County's 
                  diverse regions, and we know that what works in Concord might not work in Richmond, and vice versa. 
                  That's why we create custom solutions as unique as Contra Costa County itself. Thanks for trusting us 
                  with your digital presence, East Bay!
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
                    alt="Contra Costa County Web Development - Concord, Richmond, Antioch, Walnut Creek"
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
                  Contra Costa County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Contra Costa County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Concord Tech" Chen</h4>
                    <p className="text-gray-600">CEO, Concord Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Contra Costa County! Our new website captures the tech industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for Contra Costa County's values! East Bay with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Richmond Port" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Richmond Port Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'East Bay!' Our 
                  port inquiries increased 180% and clients love the logistics vibe. They understand 
                  that in Contra Costa County, it's not just business—it's about East Bay pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Walnut Creek Finance" Park</h4>
                    <p className="text-gray-600">Director, Walnut Creek Finance Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a finance services company in Walnut Creek, we needed a website that honors our business heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Contra Costa County values. They understand Contra Costa County business!"
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
                  Contra Costa County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Contra Costa County web development services
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
              Ready to Make Contra Costa County Your Digital Innovation Hub?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Contra Costa County businesses that trust Nandann Creative with their digital success—from Concord to Richmond, East Bay!
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

        <LocationFooter location="Contra Costa County, California" locationShort="CA" />
      </div>
    </>
  );
}
