import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function WestVirginiaPage() {
  // FAQ data for West Virginia
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in West Virginia?",
      answer: "We understand West Virginia's unique business landscape and Mountain State culture like no other agency! From Charleston's government sector and healthcare excellence to Huntington's education industry, from Morgantown's tech innovation to Wheeling's manufacturing sector, we know what makes West Virginia businesses succeed. We combine Silicon Valley innovation with West Virginia's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my West Virginia business?",
      answer: "We move faster than West Virginia's mountain streams! Our Rapid Delivery service guarantees completion within 7 days, perfect for West Virginia's government and education industries where efficiency matters. Whether you're in downtown Charleston, Huntington's business district, or anywhere in the Mountain State, we understand that West Virginia businesses value speed and reliability. We deliver websites faster than you can say 'Wild and Wonderful!'"
    },
    {
      question: "Do you understand West Virginia's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across West Virginia and understand the state's diverse economy—from Charleston's government sector and healthcare excellence to Huntington's education industry, from Morgantown's tech innovation to Wheeling's manufacturing sector. We know West Virginia isn't just about mountains and coal—it's a thriving business ecosystem with unique advantages like natural resources and skilled workforce."
    },
    {
      question: "Can you help with local SEO for West Virginia businesses?",
      answer: "Yes! We specialize in West Virginia-specific SEO strategies, from targeting 'best restaurants Charleston' to 'government jobs Huntington.' We understand local search patterns and can help you dominate results across West Virginia's diverse regions. Whether you're targeting government clients in Charleston or serving students in Morgantown, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for West Virginia clients?",
      answer: "We bring Silicon Valley innovation with West Virginia's values—hard work, community, and genuine hospitality. We understand that West Virginia businesses prioritize mountain lifestyle, local connections, and authentic experiences over corporate efficiency. Our approach honors West Virginia's unique culture—from Mountain State pride to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for West Virginia businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. West Virginia businesses can't afford downtime, whether you're running a government office in Charleston, an education institution in Huntington, or a tech company in Morgantown. We've got your back like a good West Virginia neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving West Virginia businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-west-virginia",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "West Virginia",
      "addressRegion": "WV",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.3498",
      "longitude": "-81.6326"
    },
    "areaServed": {
      "@type": "State",
      "name": "West Virginia"
    },
    "serviceArea": {
      "@type": "State",
      "name": "West Virginia"
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
        <title>Web Development West Virginia | Custom Website Design Agency WV | Nandann Creative</title>
        <meta name="description" content="Web development West Virginia: Custom website design agency serving WV businesses. Rapid delivery, local SEO, responsive design. From Charleston to Huntington, Morgantown to Wheeling. The Mountain State deserves a great website!" />
        <meta name="keywords" content="web development west virginia, web design charleston, website agency huntington, local seo west virginia, custom websites morgantown, rapid website delivery wheeling, web development company wv, west virginia web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-west-virginia" />
        <meta property="og:title" content="Web Development Agency in West Virginia | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in West Virginia. Custom websites, rapid delivery, local SEO optimization for Charleston, Huntington, Morgantown, and Wheeling businesses." />
        <meta property="og:image" content="https://www.nandann.com/west-virginia/west-virginia-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-west-virginia" />
        <meta property="twitter:title" content="Web Development Agency in West Virginia | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in West Virginia. Custom websites, rapid delivery, local SEO optimization for Charleston, Huntington, Morgantown, and Wheeling businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/west-virginia/west-virginia-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-WV" />
        <meta name="geo.placename" content="West Virginia" />
        <meta name="geo.position" content="38.3498;-81.6326" />
        <meta name="ICBM" content="38.3498, -81.6326" />
        <link rel="canonical" href="https://www.nandann.com/web-development-west-virginia" />
        
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
        <LocationNavigation location="West Virginia" locationShort="WV" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Wild and Wonderful! West Virginia Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Charleston's government sector to Huntington's education industry, we're the premier web development 
                  agency that understands West Virginia's unique Mountain State culture and diverse business landscape. 
                  Whether you're in Charleston, Huntington, Morgantown, or Wheeling, we deliver custom websites 
                  that capture West Virginia's spirit and drive real results in the Mountain State.
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
                  <source src="/west-virginia/west-virginia-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/west-virginia/west-virginia-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/west-virginia/west-virginia-web-development-nandann-creative-poster.webp"
                    alt="West Virginia Web Development - Charleston, Huntington, Morgantown"
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
                srcSet="/west-virginia/west-virginia-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/west-virginia/west-virginia-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/west-virginia/west-virginia-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/west-virginia/west-virginia-web-development-nandann-creative-sm.webp"
                alt="West Virginia Web Development Agency - Nandann Creative"
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
                West Virginia's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of West Virginia businesses from Charleston to Wheeling
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Charleston Government Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Charleston Chamber of Commerce for outstanding web development innovation and government sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Charleston Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Education Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Huntington Education Association for exceptional websites that serve the education and academic sectors
                </p>
                <div className="text-sm text-gray-500">
                  Huntington Education Association
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Morgantown Chamber of Commerce for fastest website delivery while maintaining West Virginia's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Morgantown Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* West Virginia Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets West Virginia
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Mountain State
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
                  West Virginia businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Wild and Wonderful!' We understand that in West Virginia's competitive 
                  government and education markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mountain State Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Charleston's government excellence to Huntington's education innovation, we understand West Virginia's business culture. 
                  We create websites that embody Mountain State pride—hardworking, community-focused, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Government Excellence to Tech Innovation</h3>
                <p className="text-gray-700">
                  We understand West Virginia's diverse economy—from Charleston's government sector and healthcare excellence to Huntington's 
                  education industry, from Morgantown's tech innovation to Wheeling's manufacturing sector. 
                  We create industry-specific solutions that work whether you're serving citizens or educating students.
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
                Serving All of West Virginia
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the government sector of Charleston to the education industry of Huntington, we provide web development services across the entire Mountain State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-west-virginia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Charleston</h3>
                <p className="text-gray-600">
                  The Capital City. Government sector, healthcare excellence, education. 
                  Where West Virginia's politics meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-west-virginia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Huntington</h3>
                <p className="text-gray-600">
                  The Jewel City. Education industry, healthcare, manufacturing. 
                  Where West Virginia's academic tradition meets its industrial heritage.
                </p>
              </Link>
              
              <Link href="/web-development-west-virginia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Morgantown</h3>
                <p className="text-gray-600">
                  The University City. Tech innovation, education sector, healthcare. 
                  Where West Virginia's academic excellence meets its tech future.
                </p>
              </Link>
              
              <Link href="/web-development-west-virginia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Wheeling</h3>
                <p className="text-gray-600">
                  The Friendly City. Manufacturing sector, healthcare, education. 
                  Where West Virginia's industrial tradition meets its community spirit.
                </p>
              </Link>
              
              <Link href="/web-development-west-virginia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Parkersburg</h3>
                <p className="text-gray-600">
                  The River City. Manufacturing industry, healthcare, education. 
                  Where West Virginia's river culture meets its industrial heritage.
                </p>
              </Link>
              
              <Link href="/web-development-west-virginia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Martinsburg</h3>
                <p className="text-gray-600">
                  The Gateway City. Manufacturing industry, healthcare, education. 
                  Where West Virginia's eastern culture meets its community values.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* West Virginia Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get West Virginia's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  West Virginia isn't just a state—it's a state of natural beauty! From Charleston's "Capital City" 
                  government sector to Huntington's education industry, from Morgantown's tech innovation to Wheeling's 
                  manufacturing sector, West Virginia represents a unique blend of innovation, Mountain State pride, 
                  and wild and wonderful culture that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Charleston businesses need websites that reflect the city's government sophistication 
                  while honoring West Virginia's political heritage—whether you're running a state agency or a local office. 
                  Huntington companies benefit from designs that capture the city's education excellence and jewel city tradition. 
                  Morgantown businesses need sites that showcase tech innovation and university city charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Mountain State pride to tech innovation, from coal mines to mountain streams, 
                  West Virginia's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor West Virginia's heritage while 
                  driving modern business results. Whether you're "serving citizens" in Charleston, 
                  "educating students" in Huntington, or "innovating tech" in Morgantown, we speak your language—from 
                  Mountain State pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands West Virginia's unique challenges too—from mountain weather considerations to the importance 
                  of community involvement, from the balance between tradition and innovation to the significance 
                  of local connections and genuine relationships. We've worked with businesses across West Virginia's 
                  diverse regions, and we know that what works in Charleston might not work in Morgantown, and vice versa. 
                  That's why we create custom solutions as unique as West Virginia itself. Thanks for trusting us 
                  with your digital presence, mountain state!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/west-virginia/west-virginia-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/west-virginia/west-virginia-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/west-virginia/west-virginia-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/west-virginia/west-virginia-web-development-nandann-creative-sm.webp"
                    alt="West Virginia Web Development - Charleston, Huntington, Morgantown, Wheeling"
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
                  West Virginia is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real West Virginia businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Charleston Innovator" Johnson</h4>
                    <p className="text-gray-600">CEO, Charleston Government Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get West Virginia! Our new website captures the government sector sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for West Virginia's values! Wild and wonderful with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Huntington Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Huntington Education Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Wild and Wonderful!' Our 
                  education inquiries increased 180% and clients love the academic vibe. They understand 
                  that in West Virginia, it's not just business—it's about Mountain State pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Morgantown Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Morgantown Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a tech solutions company in Morgantown, we needed a website that honors our university city heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our West Virginia values. They understand West Virginia business!"
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
                  West Virginia Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our West Virginia web development services
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
              Ready to Make West Virginia Your Digital Mountain State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of West Virginia businesses that trust Nandann Creative with their digital success—from Charleston to Wheeling, wild and wonderful!
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

        <LocationFooter location="West Virginia" locationShort="WV" />
      </div>
    </>
  );
}

