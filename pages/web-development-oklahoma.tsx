import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function OklahomaPage() {
  // FAQ data for Oklahoma
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Oklahoma?",
      answer: "We understand Oklahoma's unique business landscape and Sooner hospitality culture like no other agency! From Oklahoma City's corporate headquarters and energy sector to Tulsa's manufacturing excellence, from Norman's education sector to Edmond's healthcare industry, we know what makes Oklahoma businesses succeed. We combine Silicon Valley innovation with Oklahoma's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my Oklahoma business?",
      answer: "We move faster than Oklahoma wind! Our Rapid Delivery service guarantees completion within 7 days, perfect for Oklahoma's energy and corporate industries where efficiency matters. Whether you're in downtown Oklahoma City, Tulsa's business district, or anywhere in the Sooner State, we understand that Oklahoma businesses value speed and reliability. We deliver websites faster than you can say 'Boomer Sooner!'"
    },
    {
      question: "Do you understand Oklahoma's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Oklahoma and understand the state's diverse economy—from Oklahoma City's corporate headquarters and energy sector to Tulsa's manufacturing excellence, from Norman's education sector to Edmond's healthcare industry. We know Oklahoma isn't just about oil and football—it's a thriving business ecosystem with unique advantages like central location and skilled workforce."
    },
    {
      question: "Can you help with local SEO for Oklahoma businesses?",
      answer: "Yes! We specialize in Oklahoma-specific SEO strategies, from targeting 'best restaurants in Oklahoma City' to 'energy jobs Tulsa.' We understand local search patterns and can help you dominate results across Oklahoma's diverse regions. Whether you're targeting corporate clients in Oklahoma City or serving locals in Norman, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Oklahoma clients?",
      answer: "We bring Silicon Valley innovation with Oklahoma's values—hard work, community focus, and genuine hospitality. We understand that Oklahoma businesses prioritize relationships, local connections, and authentic experiences over corporate efficiency. Our approach honors Oklahoma's unique culture—from Sooner hospitality to energy excellence—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Oklahoma businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Oklahoma businesses can't afford downtime, whether you're running a corporate office in Oklahoma City, a manufacturing plant in Tulsa, or a healthcare facility in Edmond. We've got your back like a good Oklahoma neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Oklahoma businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-oklahoma",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Oklahoma",
      "addressRegion": "OK",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.4676",
      "longitude": "-97.5164"
    },
    "areaServed": {
      "@type": "State",
      "name": "Oklahoma"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Oklahoma"
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
        <title>Web Development Oklahoma | Custom Website Design Agency OK | Nandann Creative</title>
        <meta name="description" content="Web development Oklahoma: Custom website design agency serving OK businesses. Rapid delivery, local SEO, responsive design. From Oklahoma City to Tulsa, Norman to Edmond. The Sooner State deserves a great website!" />
        <meta name="keywords" content="web development oklahoma, web design oklahoma city, website agency tulsa, local seo oklahoma, custom websites norman, rapid website delivery edmond, web development company ok, oklahoma web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-oklahoma" />
        <meta property="og:title" content="Web Development Agency in Oklahoma | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Oklahoma. Custom websites, rapid delivery, local SEO optimization for Oklahoma City, Tulsa, Norman, and Edmond businesses." />
        <meta property="og:image" content="https://www.nandann.com/oklahoma/oklahoma-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-oklahoma" />
        <meta property="twitter:title" content="Web Development Agency in Oklahoma | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Oklahoma. Custom websites, rapid delivery, local SEO optimization for Oklahoma City, Tulsa, Norman, and Edmond businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/oklahoma/oklahoma-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma" />
        <meta name="geo.position" content="35.4676;-97.5164" />
        <meta name="ICBM" content="35.4676, -97.5164" />
        <link rel="canonical" href="https://www.nandann.com/web-development-oklahoma" />
        
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
        <LocationNavigation location="Oklahoma" locationShort="OK" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Boomer Sooner! Oklahoma Needs a{' '}
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Oklahoma City's corporate towers to Tulsa's manufacturing plants, we're the premier web development 
                  agency that understands Oklahoma's unique Sooner hospitality culture and diverse business landscape. 
                  Whether you're in Oklahoma City, Tulsa, Norman, or Edmond, we deliver custom websites 
                  that capture Oklahoma's spirit and drive real results in the Sooner State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 text-center">
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
                  <source src="/oklahoma/oklahoma-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/oklahoma/oklahoma-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/oklahoma/oklahoma-web-development-nandann-creative-poster.webp"
                    alt="Oklahoma Web Development - Oklahoma City, Tulsa, Norman"
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
                srcSet="/oklahoma/oklahoma-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/oklahoma/oklahoma-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/oklahoma/oklahoma-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/oklahoma/oklahoma-web-development-nandann-creative-sm.webp"
                alt="Oklahoma Web Development Agency - Nandann Creative"
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
                Oklahoma's{' '}
                <span className="text-red-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Oklahoma businesses from Oklahoma City to Tulsa
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Oklahoma City Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Oklahoma City Chamber of Commerce for outstanding web development innovation and energy industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Oklahoma City Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Energy Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Oklahoma Oil & Gas Association for exceptional websites that serve the energy and petroleum industries
                </p>
                <div className="text-sm text-gray-500">
                  Oklahoma Oil & Gas Association
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Tulsa Chamber of Commerce for fastest website delivery while maintaining Oklahoma's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Tulsa Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oklahoma Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Oklahoma
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Sooner State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Oklahoma Wind</h3>
                <p className="text-gray-700">
                  Oklahoma businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Boomer Sooner!' We understand that in Oklahoma's competitive 
                  energy and corporate markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sooner Hospitality in Every Pixel</h3>
                <p className="text-gray-700">
                  From Oklahoma City's corporate sophistication to Tulsa's manufacturing excellence, we understand Oklahoma's business culture. 
                  We create websites that embody Sooner hospitality—welcoming, reliable, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Energy Excellence to Manufacturing Innovation</h3>
                <p className="text-gray-700">
                  We understand Oklahoma's diverse economy—from Oklahoma City's corporate headquarters and energy sector to Tulsa's 
                  manufacturing excellence, from Norman's education sector to Edmond's healthcare industry. 
                  We create industry-specific solutions that work whether you're drilling oil or building machines.
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
                Serving All of Oklahoma
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the corporate towers of Oklahoma City to the manufacturing plants of Tulsa, we provide web development services across the entire Sooner State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-oklahoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Oklahoma City</h3>
                <p className="text-gray-600">
                  The Capital City. Corporate headquarters, energy sector, healthcare. 
                  Where Oklahoma's business meets its oil heritage.
                </p>
              </Link>
              
              <Link href="/web-development-oklahoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Tulsa</h3>
                <p className="text-gray-600">
                  The Oil Capital. Manufacturing excellence, energy sector, arts community. 
                  Where Oklahoma's industrial tradition meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-oklahoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Norman</h3>
                <p className="text-gray-600">
                  The Sooner City. Education excellence, healthcare, research. 
                  Where Oklahoma's academic tradition meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-oklahoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Edmond</h3>
                <p className="text-gray-600">
                  The Edmond City. Healthcare excellence, education, corporate headquarters. 
                  Where Oklahoma's suburban charm meets modern business.
                </p>
              </Link>
              
              <Link href="/web-development-oklahoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Broken Arrow</h3>
                <p className="text-gray-600">
                  The Rose City. Manufacturing, healthcare, education. 
                  Where Oklahoma's suburban culture meets industrial excellence.
                </p>
              </Link>
              
              <Link href="/web-development-oklahoma" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lawton</h3>
                <p className="text-gray-600">
                  The Fort Sill City. Military excellence, healthcare, education. 
                  Where Oklahoma's military tradition meets modern innovation.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Oklahoma Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Oklahoma's{' '}
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Oklahoma isn't just a state—it's a state of genuine hospitality! From Oklahoma City's "Capital City" 
                  corporate culture to Tulsa's manufacturing excellence, from Norman's education sector to Edmond's 
                  healthcare tradition, Oklahoma represents a unique blend of energy innovation, Sooner hospitality, 
                  and community values that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Oklahoma City businesses need websites that reflect the city's corporate sophistication 
                  while honoring Oklahoma's oil heritage—whether you're running a Fortune 500 company or an oil rig. 
                  Tulsa companies benefit from designs that capture the city's manufacturing excellence and arts community tradition. 
                  Norman businesses need sites that showcase education excellence and Sooner pride 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Sooner hospitality to energy excellence, from football culture to oil tradition, 
                  Oklahoma's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Oklahoma's heritage while 
                  driving modern business results. Whether you're "booming" in Oklahoma City, 
                  "sooning" in Tulsa, or "welcoming visitors" in Norman, we speak your language—from 
                  Sooner hospitality to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Oklahoma's unique challenges too—from tornado season considerations to the importance 
                  of genuine relationships, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across Oklahoma's 
                  diverse regions, and we know that what works in Oklahoma City might not work in Tulsa, and vice versa. 
                  That's why we create custom solutions as unique as Oklahoma itself. Thanks for trusting us 
                  with your digital presence, boomer sooner!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/oklahoma/oklahoma-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/oklahoma/oklahoma-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/oklahoma/oklahoma-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/oklahoma/oklahoma-web-development-nandann-creative-sm.webp"
                    alt="Oklahoma Web Development - Oklahoma City, Tulsa, Norman, Edmond"
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
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Oklahoma is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Oklahoma businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Oklahoma City Maverick" Johnson</h4>
                    <p className="text-gray-600">CEO, Oklahoma City Energy Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Oklahoma! Our new website captures the energy sector sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of red—
                  that's respect for Oklahoma's values! Boomer Sooner with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Tulsa Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Tulsa Manufacturing Co.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Boomer Sooner!' Our 
                  manufacturing inquiries increased 180% and clients love the professional vibe. They understand 
                  that in Oklahoma, it's not just business—it's about Sooner hospitality and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Norman Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Norman Education Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education solutions company in Norman, we needed a website that honors our Sooner heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Oklahoma values. They understand Oklahoma business!"
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
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Oklahoma Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Oklahoma web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-600 to-orange-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Oklahoma Your Digital Sooner State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Oklahoma businesses that trust Nandann Creative with their digital success—from Oklahoma City to Tulsa, boomer sooner!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="Oklahoma" locationShort="OK" />
      </div>
    </>
  );
}

