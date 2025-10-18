import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function DelawarePage() {
  // FAQ data for Delaware
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Delaware?",
      answer: "We understand Delaware's unique business landscape and First State culture like no other agency! From Wilmington's corporate headquarters and financial sector to Dover's government industry, from Newark's education excellence to Milford's healthcare sector, we know what makes Delaware businesses succeed. We combine Silicon Valley innovation with Delaware's values of corporate excellence, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my Delaware business?",
      answer: "We move faster than Delaware's corporate mergers! Our Rapid Delivery service guarantees completion within 7 days, perfect for Delaware's corporate and financial industries where efficiency matters. Whether you're in downtown Wilmington, Dover's business district, or anywhere in the First State, we understand that Delaware businesses value speed and reliability. We deliver websites faster than you can say 'Small Wonder!'"
    },
    {
      question: "Do you understand Delaware's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Delaware and understand the state's diverse economy—from Wilmington's corporate headquarters and financial sector to Dover's government industry, from Newark's education excellence to Milford's healthcare sector. We know Delaware isn't just about corporations and beaches—it's a thriving business ecosystem with unique advantages like corporate-friendly laws and strategic location."
    },
    {
      question: "Can you help with local SEO for Delaware businesses?",
      answer: "Yes! We specialize in Delaware-specific SEO strategies, from targeting 'best restaurants Wilmington' to 'corporate jobs Dover.' We understand local search patterns and can help you dominate results across Delaware's diverse regions. Whether you're targeting corporate clients in Wilmington or serving government agencies in Dover, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Delaware clients?",
      answer: "We bring Silicon Valley innovation with Delaware's values—corporate excellence, community, and genuine hospitality. We understand that Delaware businesses prioritize corporate sophistication, local connections, and professional experiences over casual efficiency. Our approach honors Delaware's unique culture—from First State corporate excellence to financial innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Delaware businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Delaware businesses can't afford downtime, whether you're running a Fortune 500 company in Wilmington, a government agency in Dover, or a healthcare facility in Milford. We've got your back like a good Delaware neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Delaware businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-delaware",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delaware",
      "addressRegion": "DE",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.1619",
      "longitude": "-75.5267"
    },
    "areaServed": {
      "@type": "State",
      "name": "Delaware"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Delaware"
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
        <title>Web Development Delaware | Custom Website Design Agency DE | Nandann Creative</title>
        <meta name="description" content="Web development Delaware: Custom website design agency serving DE businesses. Rapid delivery, local SEO, responsive design. From Wilmington to Dover, Newark to Milford. The First State deserves a great website!" />
        <meta name="keywords" content="web development delaware, web design wilmington, website agency dover, local seo delaware, custom websites newark, rapid website delivery milford, web development company de, delaware web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-delaware" />
        <meta property="og:title" content="Web Development Agency in Delaware | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Delaware. Custom websites, rapid delivery, local SEO optimization for Wilmington, Dover, Newark, and Milford businesses." />
        <meta property="og:image" content="https://www.nandann.com/delaware/delaware-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-delaware" />
        <meta property="twitter:title" content="Web Development Agency in Delaware | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Delaware. Custom websites, rapid delivery, local SEO optimization for Wilmington, Dover, Newark, and Milford businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/delaware/delaware-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-DE" />
        <meta name="geo.placename" content="Delaware" />
        <meta name="geo.position" content="39.1619;-75.5267" />
        <meta name="ICBM" content="39.1619, -75.5267" />
        <link rel="canonical" href="https://www.nandann.com/web-development-delaware" />
        
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
        <LocationNavigation location="Delaware" locationShort="DE" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-yellow-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Small Wonder! Delaware Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Wilmington's corporate headquarters to Dover's government sector, we're the premier web development 
                  agency that understands Delaware's unique First State culture and diverse business landscape. 
                  Whether you're in Wilmington, Dover, Newark, or Milford, we deliver custom websites 
                  that capture Delaware's spirit and drive real results in the First State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 text-center">
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
                  <source src="/delaware/delaware-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/delaware/delaware-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/delaware/delaware-web-development-nandann-creative-poster.webp"
                    alt="Delaware Web Development - Wilmington, Dover, Newark"
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
                srcSet="/delaware/delaware-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/delaware/delaware-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/delaware/delaware-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/delaware/delaware-web-development-nandann-creative-sm.webp"
                alt="Delaware Web Development Agency - Nandann Creative"
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
                Delaware's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Delaware businesses from Wilmington to Milford
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Wilmington Corporate Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Wilmington Chamber of Commerce for outstanding web development innovation and corporate sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Wilmington Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Financial Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Delaware Financial Services Association for exceptional websites that serve the corporate and financial sectors
                </p>
                <div className="text-sm text-gray-500">
                  Delaware Financial Services Association
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
                  Honored by Dover Chamber of Commerce for fastest website delivery while maintaining Delaware's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Dover Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delaware Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Delaware
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the First State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-yellow-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Corporate Mergers</h3>
                <p className="text-gray-700">
                  Delaware businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Small Wonder!' We understand that in Delaware's competitive 
                  corporate and financial markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">First State Excellence in Every Pixel</h3>
                <p className="text-gray-700">
                  From Wilmington's corporate sophistication to Dover's government excellence, we understand Delaware's business culture. 
                  We create websites that embody First State corporate excellence—professional, community-focused, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Corporate Headquarters to Government Excellence</h3>
                <p className="text-gray-700">
                  We understand Delaware's diverse economy—from Wilmington's corporate headquarters and financial sector to Dover's 
                  government industry, from Newark's education excellence to Milford's healthcare sector. 
                  We create industry-specific solutions that work whether you're incorporating companies or serving citizens.
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
                Serving All of Delaware
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the corporate headquarters of Wilmington to the government sector of Dover, we provide web development services across the entire First State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-delaware" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Wilmington</h3>
                <p className="text-gray-600">
                  The Corporate City. Corporate headquarters, financial sector, healthcare. 
                  Where Delaware's business meets its corporate heritage.
                </p>
              </Link>
              
              <Link href="/web-development-delaware" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Dover</h3>
                <p className="text-gray-600">
                  The Capital City. Government industry, healthcare, education. 
                  Where Delaware's politics meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-delaware" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Newark</h3>
                <p className="text-gray-600">
                  The University City. Education excellence, healthcare, tech innovation. 
                  Where Delaware's academic tradition meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-delaware" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Milford</h3>
                <p className="text-gray-600">
                  The River City. Healthcare sector, education, manufacturing. 
                  Where Delaware's coastal culture meets its community spirit.
                </p>
              </Link>
              
              <Link href="/web-development-delaware" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Middletown</h3>
                <p className="text-gray-600">
                  The Gateway City. Corporate headquarters, healthcare, education. 
                  Where Delaware's suburban charm meets modern business.
                </p>
              </Link>
              
              <Link href="/web-development-delaware" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Smyrna</h3>
                <p className="text-gray-600">
                  The Duck City. Manufacturing industry, healthcare, education. 
                  Where Delaware's industrial tradition meets its community values.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Delaware Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Delaware's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Delaware isn't just a state—it's a state of corporate excellence! From Wilmington's "Corporate City" 
                  headquarters to Dover's government sector, from Newark's education excellence to Milford's 
                  healthcare sector, Delaware represents a unique blend of innovation, First State corporate excellence, 
                  and small wonder culture that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Wilmington businesses need websites that reflect the city's corporate sophistication 
                  while honoring Delaware's business heritage—whether you're running a Fortune 500 company or a startup. 
                  Dover companies benefit from designs that capture the city's government excellence and capital city tradition. 
                  Newark businesses need sites that showcase education excellence and university city charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From First State corporate excellence to financial innovation, from corporate mergers to beach culture, 
                  Delaware's culture is rich, diverse, and deeply rooted in corporate sophistication, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Delaware's heritage while 
                  driving modern business results. Whether you're "incorporating companies" in Wilmington, 
                  "serving citizens" in Dover, or "educating students" in Newark, we speak your language—from 
                  First State corporate excellence to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Delaware's unique challenges too—from corporate law considerations to the importance 
                  of professional relationships, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across Delaware's 
                  diverse regions, and we know that what works in Wilmington might not work in Dover, and vice versa. 
                  That's why we create custom solutions as unique as Delaware itself. Thanks for trusting us 
                  with your digital presence, small wonder!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/delaware/delaware-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/delaware/delaware-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/delaware/delaware-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/delaware/delaware-web-development-nandann-creative-sm.webp"
                    alt="Delaware Web Development - Wilmington, Dover, Newark, Milford"
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
                <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
                  Delaware is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Delaware businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-yellow-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Wilmington Innovator" Johnson</h4>
                    <p className="text-gray-600">CEO, Wilmington Corporate Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Delaware! Our new website captures the corporate sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for Delaware's values! Small wonder with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Dover Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Dover Government Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Small Wonder!' Our 
                  government inquiries increased 180% and clients love the professional vibe. They understand 
                  that in Delaware, it's not just business—it's about First State excellence and corporate sophistication!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Newark Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Newark Education Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education solutions company in Newark, we needed a website that honors our university city heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Delaware values. They understand Delaware business!"
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
                <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
                  Delaware Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Delaware web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-yellow-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Delaware Your Digital First State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Delaware businesses that trust Nandann Creative with their digital success—from Wilmington to Milford, small wonder!
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

        <LocationFooter location="Delaware" locationShort="DE" />
      </div>
    </>
  );
}

