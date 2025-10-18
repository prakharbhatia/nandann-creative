import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function OregonPage() {
  // FAQ data for Oregon
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Oregon?",
      answer: "We understand Oregon's unique Pacific Northwest culture and innovative business landscape like no other agency! From Portland's tech scene to Eugene's outdoor industry, from Bend's craft beer culture to the Willamette Valley's wine country, we know what makes Oregon businesses thrive. We combine Silicon Valley innovation with Oregon's authentic, sustainable, and creative spirit."
    },
    {
      question: "How quickly can you deliver a website for my Oregon business?",
      answer: "We move faster than Portland's bike lanes! Our Rapid Delivery service guarantees completion within 7 days, perfect for Oregon's fast-moving tech and creative industries. Whether you're in the Pearl District, Hawthorne, or anywhere in the Willamette Valley, we understand that Oregon businesses value efficiency and sustainability. We deliver websites faster than you can finish a pint at Deschutes!"
    },
    {
      question: "Do you understand Oregon's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Oregon and understand the state's diverse economy—from Portland's tech startups and creative agencies to Eugene's outdoor gear companies, from Bend's tourism and craft brewing to the Willamette Valley's agriculture and wine industry. We know Oregon isn't just about rain and coffee—it's a powerhouse of innovation, sustainability, and outdoor recreation."
    },
    {
      question: "Can you help with local SEO for Oregon businesses?",
      answer: "Yes! We specialize in Oregon-specific SEO strategies, from targeting 'best coffee in Portland' to 'hiking trails near Bend.' We understand local search patterns and can help you dominate results across Oregon's diverse regions. Whether you're targeting Portland's urban market or serving rural communities, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Oregon clients?",
      answer: "We bring Silicon Valley innovation with Oregon's values—sustainability, authenticity, and community focus. We understand that Oregon businesses prioritize environmental responsibility, local sourcing, and authentic experiences over corporate efficiency. Our approach honors Oregon's unique culture—from Keep Portland Weird to sustainable business practices—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Oregon businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Oregon businesses can't afford downtime, whether you're running a tech startup in Portland, a winery in the Willamette Valley, or a ski resort in Bend. We've got your back like a good rain jacket—reliable protection when you need it most."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Oregon businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-oregon",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Oregon",
      "addressRegion": "OR",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.5152",
      "longitude": "-122.6784"
    },
    "areaServed": {
      "@type": "State",
      "name": "Oregon"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Oregon"
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
        <title>Web Development Oregon | Custom Website Design Agency OR | Nandann Creative</title>
        <meta name="description" content="Web development Oregon: Custom website design agency serving OR businesses. Rapid delivery, local SEO, responsive design. From Portland to Eugene, Bend to Willamette Valley. Keep Portland weird with a great website!" />
        <meta name="keywords" content="web development oregon, web design portland, website agency eugene, local seo oregon, custom websites bend, rapid website delivery salem, web development company or, pacific northwest web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-oregon" />
        <meta property="og:title" content="Web Development Agency in Oregon | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Oregon. Custom websites, rapid delivery, local SEO optimization for Portland, Eugene, Bend, and Willamette Valley businesses." />
        <meta property="og:image" content="https://www.nandann.com/oregon/oregon-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-oregon" />
        <meta property="twitter:title" content="Web Development Agency in Oregon | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Oregon. Custom websites, rapid delivery, local SEO optimization for Portland, Eugene, Bend, and Willamette Valley businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/oregon/oregon-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-OR" />
        <meta name="geo.placename" content="Oregon" />
        <meta name="geo.position" content="45.5152;-122.6784" />
        <meta name="ICBM" content="45.5152, -122.6784" />
        <link rel="canonical" href="https://www.nandann.com/web-development-oregon" />
        
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
        <LocationNavigation location="Oregon" locationShort="OR" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Keep Portland Weird with a{' '}
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Website That Works
                  </span>
                  !
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Portland's Pearl District to Eugene's outdoor industry, we're the premier web development 
                  agency that understands Oregon's unique Pacific Northwest culture and innovative business landscape. 
                  Whether you're in Portland, Eugene, Bend, or the Willamette Valley, we deliver custom websites 
                  that capture Oregon's spirit and drive real results in the Beaver State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 text-center">
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
                  <source src="/oregon/oregon-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/oregon/oregon-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/oregon/oregon-web-development-nandann-creative-poster.webp"
                    alt="Oregon Web Development - Portland, Eugene, Bend, Salem"
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
                srcSet="/oregon/oregon-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/oregon/oregon-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/oregon/oregon-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/oregon/oregon-web-development-nandann-creative-sm.webp"
                alt="Oregon Web Development Agency - Nandann Creative"
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
                Oregon's{' '}
                <span className="text-green-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Oregon businesses from Portland to Bend
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Portland Innovation Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Portland Business Journal for outstanding web development innovation and sustainable business practices
                </p>
                <div className="text-sm text-gray-500">
                  Portland Business Journal
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Sustainable Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Oregon Environmental Council for eco-friendly web solutions that align with Oregon's green values
                </p>
                <div className="text-sm text-gray-500">
                  Oregon Environmental Council
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Eugene Chamber of Commerce for fastest website delivery while maintaining Oregon's authentic character
                </p>
                <div className="text-sm text-gray-500">
                  Eugene Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oregon Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Oregon
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Beaver State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability First</h3>
                <p className="text-gray-700">
                  From Portland's green building movement to Eugene's environmental initiatives, we understand Oregon's 
                  commitment to sustainability. We create eco-friendly websites with optimized performance and 
                  carbon-conscious hosting—because in Oregon, being green isn't just trendy, it's essential.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Portland's Bike Lanes</h3>
                <p className="text-gray-700">
                  Oregon businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can finish a pint at Deschutes Brewery. We understand that in Oregon's 
                  competitive tech and creative markets, speed matters.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tech to Timber</h3>
                <p className="text-gray-700">
                  We understand Oregon's diverse economy—from Portland's tech startups to Eugene's outdoor gear companies, 
                  from Bend's tourism to the Willamette Valley's wine industry. We create industry-specific solutions 
                  that work whether you're coding in the Pearl District or crafting in the Columbia Gorge.
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
                Serving All of Oregon
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the Pacific Coast to the Cascade Mountains, we provide web development services across the entire Beaver State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-oregon" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Portland</h3>
                <p className="text-gray-600">
                  The City of Roses. Pearl District, Hawthorne, tech startups, creative agencies. 
                  Keep Portland Weird with innovative web solutions.
                </p>
              </Link>
              
              <Link href="/web-development-oregon" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Eugene</h3>
                <p className="text-gray-600">
                  Track Town USA. University of Oregon, outdoor gear companies, craft breweries. 
                  Where innovation meets outdoor recreation.
                </p>
              </Link>
              
              <Link href="/web-development-oregon" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Bend</h3>
                <p className="text-gray-600">
                  Outdoor recreation capital. Craft breweries, ski resorts, tech companies. 
                  Where mountain culture meets modern business.
                </p>
              </Link>
              
              <Link href="/web-development-oregon" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Salem</h3>
                <p className="text-gray-600">
                  State capital. Government services, agriculture, education. 
                  Where policy meets technology in Oregon's heart.
                </p>
              </Link>
              
              <Link href="/web-development-oregon" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Medford</h3>
                <p className="text-gray-600">
                  Southern Oregon hub. Healthcare, agriculture, outdoor recreation. 
                  Gateway to Crater Lake and the Rogue Valley.
                </p>
              </Link>
              
              <Link href="/web-development-oregon" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Corvallis</h3>
                <p className="text-gray-600">
                  Home of Oregon State University. Research, agriculture, tech startups. 
                  Where education drives innovation in the Willamette Valley.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Oregon Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Oregon's{' '}
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Unique Character
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Oregon isn't just a state—it's a state of mind! From Portland's "Keep Portland Weird" culture 
                  to Eugene's outdoor recreation focus, from Bend's mountain lifestyle to the Willamette Valley's 
                  wine country sophistication, Oregon represents a unique blend of innovation, sustainability, and 
                  authentic Pacific Northwest values that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Portland businesses need websites that reflect the city's creative, quirky 
                  energy while maintaining professional credibility—whether you're running a tech startup in the 
                  Pearl District or a food cart on Hawthorne. Eugene companies benefit from designs that capture 
                  the city's outdoor recreation focus and university town vibe. Bend businesses need sites that 
                  showcase mountain culture and adventure tourism without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From craft beer to coffee culture, from hiking trails to tech innovation, from sustainable 
                  business practices to authentic local experiences, Oregon's culture is rich, diverse, and deeply 
                  rooted in environmental consciousness and community values. We don't just build websites—we 
                  create digital experiences that honor Oregon's heritage while driving modern business results. 
                  Whether you're "keeping Portland weird" with a creative agency, serving outdoor enthusiasts 
                  in Eugene, or running a winery in the Willamette Valley, we speak your language—from Pacific 
                  Northwest slang to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Oregon's unique challenges too—from weather considerations to the importance 
                  of sustainable business practices, from the balance between urban innovation and outdoor recreation 
                  to the significance of local sourcing and community involvement. We've worked with businesses 
                  across Oregon's diverse regions, and we know that what works in Portland might not work in 
                  Medford, and vice versa. That's why we create custom solutions as unique as Oregon itself. 
                  Thanks for trusting us with your digital presence!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/oregon/oregon-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/oregon/oregon-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/oregon/oregon-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/oregon/oregon-web-development-nandann-creative-sm.webp"
                    alt="Oregon Web Development - Portland, Eugene, Bend, Salem"
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
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Oregon is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Oregon businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jake "The Portlander" Chen</h4>
                    <p className="text-gray-600">Founder, Pearl District Tech</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Portland! Our new website captures the authentic tech scene and our 
                  client inquiries tripled in the first month. They even used the right shade of green—
                  that's respect for Oregon's values! Keep Portland weird with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Outdoor Enthusiast" Martinez</h4>
                    <p className="text-gray-600">Owner, Eugene Adventure Gear</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can hike Spencer Butte! Our 
                  online sales increased 200% and customers love the authentic outdoor vibe. They understand 
                  that in Oregon, it's not just business—it's about connecting people with nature!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Bend Local" Thompson</h4>
                    <p className="text-gray-600">Director, Central Oregon Brewing</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a craft brewery in Bend, we needed a website that honors our mountain culture while 
                  reaching beer lovers everywhere. Nandann Creative delivered a site that's helped us expand 
                  statewide while staying true to our Oregon roots. They understand Pacific Northwest business!"
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
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Oregon Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Oregon web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Keep Oregon Weird Online?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Oregon businesses that trust Nandann Creative with their digital success—from Portland to Bend, keep it weird!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="Oregon" locationShort="OR" />
      </div>
    </>
  );
}

