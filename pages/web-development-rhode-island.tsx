import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function RhodeIslandPage() {
  // FAQ data for Rhode Island
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Rhode Island?",
      answer: "We understand Rhode Island's unique business landscape and Ocean State culture like no other agency! From Providence's tech innovation and healthcare excellence to Warwick's manufacturing sector, from Cranston's education industry to Newport's tourism sector, we know what makes Rhode Island businesses succeed. We combine Silicon Valley innovation with Rhode Island's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my Rhode Island business?",
      answer: "We move faster than Rhode Island's ocean waves! Our Rapid Delivery service guarantees completion within 7 days, perfect for Rhode Island's tech and tourism industries where efficiency matters. Whether you're in downtown Providence, Warwick's business district, or anywhere in the Ocean State, we understand that Rhode Island businesses value speed and reliability. We deliver websites faster than you can say 'Little Rhody!'"
    },
    {
      question: "Do you understand Rhode Island's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Rhode Island and understand the state's diverse economy—from Providence's tech innovation and healthcare excellence to Warwick's manufacturing sector, from Cranston's education industry to Newport's tourism sector. We know Rhode Island isn't just about beaches and mansions—it's a thriving business ecosystem with unique advantages like strategic location and skilled workforce."
    },
    {
      question: "Can you help with local SEO for Rhode Island businesses?",
      answer: "Yes! We specialize in Rhode Island-specific SEO strategies, from targeting 'best restaurants Providence' to 'tech jobs Warwick.' We understand local search patterns and can help you dominate results across Rhode Island's diverse regions. Whether you're targeting tech clients in Providence or serving tourists in Newport, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Rhode Island clients?",
      answer: "We bring Silicon Valley innovation with Rhode Island's values—hard work, community, and genuine hospitality. We understand that Rhode Island businesses prioritize coastal lifestyle, local connections, and authentic experiences over corporate efficiency. Our approach honors Rhode Island's unique culture—from Ocean State pride to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Rhode Island businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Rhode Island businesses can't afford downtime, whether you're running a tech company in Providence, a manufacturing business in Warwick, or a tourism facility in Newport. We've got your back like a good Rhode Island neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Rhode Island businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-rhode-island",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rhode Island",
      "addressRegion": "RI",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.8236",
      "longitude": "-71.4222"
    },
    "areaServed": {
      "@type": "State",
      "name": "Rhode Island"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Rhode Island"
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
        <title>Web Development Rhode Island | Custom Website Design Agency RI | Nandann Creative</title>
        <meta name="description" content="Web development Rhode Island: Custom website design agency serving RI businesses. Rapid delivery, local SEO, responsive design. From Providence to Warwick, Cranston to Newport. The Ocean State deserves a great website!" />
        <meta name="keywords" content="web development rhode island, web design providence, website agency warwick, local seo rhode island, custom websites cranston, rapid website delivery newport, web development company ri, rhode island web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-rhode-island" />
        <meta property="og:title" content="Web Development Agency in Rhode Island | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Rhode Island. Custom websites, rapid delivery, local SEO optimization for Providence, Warwick, Cranston, and Newport businesses." />
        <meta property="og:image" content="https://www.nandann.com/rhode-island/rhode-island-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-rhode-island" />
        <meta property="twitter:title" content="Web Development Agency in Rhode Island | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Rhode Island. Custom websites, rapid delivery, local SEO optimization for Providence, Warwick, Cranston, and Newport businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/rhode-island/rhode-island-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-RI" />
        <meta name="geo.placename" content="Rhode Island" />
        <meta name="geo.position" content="41.8236;-71.4222" />
        <meta name="ICBM" content="41.8236, -71.4222" />
        <link rel="canonical" href="https://www.nandann.com/web-development-rhode-island" />
        
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
        <LocationNavigation location="Rhode Island" locationShort="RI" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-red-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Little Rhody Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Providence's tech innovation to Warwick's manufacturing sector, we're the premier web development 
                  agency that understands Rhode Island's unique Ocean State culture and diverse business landscape. 
                  Whether you're in Providence, Warwick, Cranston, or Newport, we deliver custom websites 
                  that capture Rhode Island's spirit and drive real results in the Ocean State.
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
                  <source src="/rhode-island/rhode-island-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/rhode-island/rhode-island-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/rhode-island/rhode-island-web-development-nandann-creative-poster.webp"
                    alt="Rhode Island Web Development - Providence, Warwick, Cranston"
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
                srcSet="/rhode-island/rhode-island-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/rhode-island/rhode-island-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/rhode-island/rhode-island-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/rhode-island/rhode-island-web-development-nandann-creative-sm.webp"
                alt="Rhode Island Web Development Agency - Nandann Creative"
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
                Rhode Island's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Rhode Island businesses from Providence to Newport
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Providence Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Providence Chamber of Commerce for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Providence Chamber of Commerce
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
                  Awarded by Warwick Manufacturing Association for exceptional websites that serve the manufacturing and industrial sectors
                </p>
                <div className="text-sm text-gray-500">
                  Warwick Manufacturing Association
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
                  Honored by Newport Chamber of Commerce for fastest website delivery while maintaining Rhode Island's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Newport Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rhode Island Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Rhode Island
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Ocean State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Ocean Waves</h3>
                <p className="text-gray-700">
                  Rhode Island businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Little Rhody!' We understand that in Rhode Island's competitive 
                  tech and tourism markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ocean State Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Providence's tech innovation to Warwick's manufacturing excellence, we understand Rhode Island's business culture. 
                  We create websites that embody Ocean State pride—hardworking, community-focused, and focused on building 
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
                  We understand Rhode Island's diverse economy—from Providence's tech innovation and healthcare excellence to Warwick's 
                  manufacturing sector, from Cranston's education industry to Newport's tourism sector. 
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
                Serving All of Rhode Island
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the tech innovation of Providence to the manufacturing sector of Warwick, we provide web development services across the entire Ocean State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-rhode-island" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Providence</h3>
                <p className="text-gray-600">
                  The Creative Capital. Tech innovation, healthcare excellence, education. 
                  Where Rhode Island's innovation meets its creative heritage.
                </p>
              </Link>
              
              <Link href="/web-development-rhode-island" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Warwick</h3>
                <p className="text-gray-600">
                  The Crossroads City. Manufacturing sector, healthcare, education. 
                  Where Rhode Island's industry meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-rhode-island" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Cranston</h3>
                <p className="text-gray-600">
                  The City of Opportunity. Education industry, healthcare, manufacturing. 
                  Where Rhode Island's academic tradition meets its industrial heritage.
                </p>
              </Link>
              
              <Link href="/web-development-rhode-island" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Newport</h3>
                <p className="text-gray-600">
                  The City by the Sea. Tourism sector, healthcare, education. 
                  Where Rhode Island's coastal culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/web-development-rhode-island" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Pawtucket</h3>
                <p className="text-gray-600">
                  The Bucket City. Manufacturing industry, healthcare, education. 
                  Where Rhode Island's industrial tradition meets its community spirit.
                </p>
              </Link>
              
              <Link href="/web-development-rhode-island" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">East Providence</h3>
                <p className="text-gray-600">
                  The Gateway City. Manufacturing industry, healthcare, education. 
                  Where Rhode Island's eastern culture meets its community values.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Rhode Island Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Rhode Island's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Rhode Island isn't just a state—it's a state of coastal charm! From Providence's "Creative Capital" 
                  tech innovation to Warwick's manufacturing sector, from Cranston's education industry to Newport's 
                  tourism sector, Rhode Island represents a unique blend of innovation, Ocean State pride, 
                  and little rhody culture that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Providence businesses need websites that reflect the city's tech sophistication 
                  while honoring Rhode Island's creative heritage—whether you're running a Fortune 500 company or a startup. 
                  Warwick companies benefit from designs that capture the city's manufacturing excellence and crossroads city tradition. 
                  Cranston businesses need sites that showcase education excellence and opportunity city charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Ocean State pride to tech innovation, from beaches to mansions, 
                  Rhode Island's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Rhode Island's heritage while 
                  driving modern business results. Whether you're "innovating tech" in Providence, 
                  "building products" in Warwick, or "welcoming visitors" in Newport, we speak your language—from 
                  Ocean State pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Rhode Island's unique challenges too—from coastal weather considerations to the importance 
                  of community involvement, from the balance between tradition and innovation to the significance 
                  of local connections and genuine relationships. We've worked with businesses across Rhode Island's 
                  diverse regions, and we know that what works in Providence might not work in Warwick, and vice versa. 
                  That's why we create custom solutions as unique as Rhode Island itself. Thanks for trusting us 
                  with your digital presence, little rhody!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/rhode-island/rhode-island-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/rhode-island/rhode-island-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/rhode-island/rhode-island-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/rhode-island/rhode-island-web-development-nandann-creative-sm.webp"
                    alt="Rhode Island Web Development - Providence, Warwick, Cranston, Newport"
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
                  Rhode Island is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Rhode Island businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Providence Innovator" Johnson</h4>
                    <p className="text-gray-600">CEO, Providence Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Rhode Island! Our new website captures the tech innovation sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for Rhode Island's values! Little rhody with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Warwick Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Warwick Manufacturing Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Little Rhody!' Our 
                  manufacturing inquiries increased 180% and clients love the industrial vibe. They understand 
                  that in Rhode Island, it's not just business—it's about Ocean State pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Cranston Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Cranston Education Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education solutions company in Cranston, we needed a website that honors our opportunity city heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Rhode Island values. They understand Rhode Island business!"
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
                  Rhode Island Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Rhode Island web development services
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
              Ready to Make Rhode Island Your Digital Ocean State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Rhode Island businesses that trust Nandann Creative with their digital success—from Providence to Newport, little rhody!
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

        <LocationFooter location="Rhode Island" locationShort="RI" />
      </div>
    </>
  );
}

