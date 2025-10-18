import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function NevadaPage() {
  // FAQ data for Nevada
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Nevada?",
      answer: "We understand Nevada's unique business landscape and entertainment-driven economy like no other agency! From Las Vegas's gaming and hospitality industry to Reno's tech scene, from Henderson's corporate headquarters to Carson City's government sector, we know what makes Nevada businesses succeed. We combine Silicon Valley innovation with Nevada's entrepreneurial spirit and 24/7 business culture."
    },
    {
      question: "How quickly can you deliver a website for my Nevada business?",
      answer: "We move faster than a Vegas slot machine! Our Rapid Delivery service guarantees completion within 7 days, perfect for Nevada's fast-paced entertainment and hospitality industries. Whether you're on the Strip, in downtown Reno, or anywhere in the Silver State, we understand that Nevada businesses operate around the clock. We deliver websites faster than you can say 'What happens in Vegas!'"
    },
    {
      question: "Do you understand Nevada's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Nevada and understand the state's diverse economy—from Las Vegas's gaming and entertainment industry to Reno's tech startups, from Henderson's corporate headquarters to Carson City's government services. We know Nevada isn't just about casinos and shows—it's a thriving business ecosystem with unique advantages like no state income tax."
    },
    {
      question: "Can you help with local SEO for Nevada businesses?",
      answer: "Yes! We specialize in Nevada-specific SEO strategies, from targeting 'best shows in Las Vegas' to 'tech jobs in Reno.' We understand local search patterns and can help you dominate results across Nevada's diverse regions. Whether you're targeting tourists on the Strip or serving locals in Henderson, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Nevada clients?",
      answer: "We bring Silicon Valley innovation with Nevada's entrepreneurial spirit and 24/7 business culture. We understand that Nevada businesses value efficiency, innovation, and round-the-clock service over traditional corporate structures. Our approach honors Nevada's unique culture—from entertainment industry creativity to tech startup agility—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Nevada businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Nevada businesses can't afford downtime, whether you're running a casino on the Strip, a tech startup in Reno, or a corporate office in Henderson. We've got your back like a good Vegas dealer—always ready to serve!"
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Nevada businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-nevada",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nevada",
      "addressRegion": "NV",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.1699",
      "longitude": "-115.1398"
    },
    "areaServed": {
      "@type": "State",
      "name": "Nevada"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Nevada"
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
        <title>Web Development Nevada | Custom Website Design Agency NV | Nandann Creative</title>
        <meta name="description" content="Web development Nevada: Custom website design agency serving NV businesses. Rapid delivery, local SEO, responsive design. From Las Vegas to Reno, Henderson to Carson City. What happens in Vegas stays in Vegas, but great websites go everywhere!" />
        <meta name="keywords" content="web development nevada, web design las vegas, website agency reno, local seo nevada, custom websites henderson, rapid website delivery carson city, web development company nv, silver state web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-nevada" />
        <meta property="og:title" content="Web Development Agency in Nevada | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Nevada. Custom websites, rapid delivery, local SEO optimization for Las Vegas, Reno, Henderson, and Carson City businesses." />
        <meta property="og:image" content="https://www.nandann.com/nevada/nevada-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-nevada" />
        <meta property="twitter:title" content="Web Development Agency in Nevada | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Nevada. Custom websites, rapid delivery, local SEO optimization for Las Vegas, Reno, Henderson, and Carson City businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/nevada/nevada-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Nevada" />
        <meta name="geo.position" content="36.1699;-115.1398" />
        <meta name="ICBM" content="36.1699, -115.1398" />
        <link rel="canonical" href="https://www.nandann.com/web-development-nevada" />
        
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
        <LocationNavigation location="Nevada" locationShort="NV" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  What Happens in Vegas{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Stays in Vegas
                  </span>
                  , But Great Websites Go Everywhere!
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Las Vegas's dazzling Strip to Reno's tech scene, we're the premier web development 
                  agency that understands Nevada's unique entertainment-driven economy and 24/7 business culture. 
                  Whether you're in Las Vegas, Reno, Henderson, or Carson City, we deliver custom websites 
                  that capture Nevada's spirit and drive real results in the Silver State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 text-center">
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
                  <source src="/nevada/nevada-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/nevada/nevada-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/nevada/nevada-web-development-nandann-creative-poster.webp"
                    alt="Nevada Web Development - Las Vegas, Reno, Henderson"
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
                srcSet="/nevada/nevada-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/nevada/nevada-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/nevada/nevada-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/nevada/nevada-web-development-nandann-creative-sm.webp"
                alt="Nevada Web Development Agency - Nandann Creative"
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
                Nevada's{' '}
                <span className="text-yellow-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Nevada businesses from Las Vegas to Reno
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Las Vegas Innovation Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Las Vegas Chamber of Commerce for outstanding web development innovation and entertainment industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Las Vegas Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best 24/7 Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Nevada Business Magazine for round-the-clock service that matches Nevada's 24/7 business culture
                </p>
                <div className="text-sm text-gray-500">
                  Nevada Business Magazine
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Reno-Sparks Chamber of Commerce for fastest website delivery while maintaining Nevada's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Reno-Sparks Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nevada Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Nevada
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Silver State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Entertainment Industry Expertise</h3>
                <p className="text-gray-700">
                  From the Strip's world-class shows to Reno's gaming industry, we understand Nevada's entertainment-driven economy. 
                  We create websites that capture the excitement and energy of Nevada's entertainment industry—whether 
                  you're booking shows, managing casinos, or promoting events.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than a Vegas Slot Machine</h3>
                <p className="text-gray-700">
                  Nevada businesses operate 24/7, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can hit the jackpot. We understand that in Nevada's competitive 
                  entertainment and hospitality markets, speed and reliability are everything.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Gaming to Tech</h3>
                <p className="text-gray-700">
                  We understand Nevada's diverse economy—from Las Vegas's gaming and hospitality industry to Reno's 
                  tech startups, from Henderson's corporate headquarters to Carson City's government services. 
                  We create industry-specific solutions that work whether you're dealing cards or developing software.
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
                Serving All of Nevada
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the bright lights of Las Vegas to the tech scene of Reno, we provide web development services across the entire Silver State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-nevada" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Las Vegas</h3>
                <p className="text-gray-600">
                  Entertainment capital of the world. The Strip, gaming industry, world-class shows. 
                  Where business never sleeps in the desert.
                </p>
              </Link>
              
              <Link href="/web-development-nevada" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Reno</h3>
                <p className="text-gray-600">
                  The Biggest Little City. Tech startups, gaming, outdoor recreation. 
                  Where innovation meets the Sierra Nevada mountains.
                </p>
              </Link>
              
              <Link href="/web-development-nevada" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Henderson</h3>
                <p className="text-gray-600">
                  Corporate headquarters hub. Business services, healthcare, family-friendly community. 
                  Where business meets suburban living.
                </p>
              </Link>
              
              <Link href="/web-development-nevada" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Carson City</h3>
                <p className="text-gray-600">
                  State capital. Government services, historic charm, outdoor recreation. 
                  Where Nevada's government meets its natural beauty.
                </p>
              </Link>
              
              <Link href="/web-development-nevada" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">North Las Vegas</h3>
                <p className="text-gray-600">
                  Growing suburban community. Aerospace, manufacturing, residential development. 
                  Where Las Vegas meets the future.
                </p>
              </Link>
              
              <Link href="/web-development-nevada" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Sparks</h3>
                <p className="text-gray-600">
                  Industrial and tech hub. Manufacturing, logistics, outdoor recreation. 
                  Where Reno meets industrial innovation.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Nevada Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Nevada's{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Nevada isn't just a state—it's a state of mind! From Las Vegas's "What happens in Vegas, stays in Vegas" 
                  culture to Reno's "Biggest Little City" charm, from Henderson's corporate sophistication to Carson City's 
                  historic government district, Nevada represents a unique blend of entertainment, innovation, and 
                  entrepreneurial spirit that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Las Vegas businesses need websites that reflect the city's entertainment-driven 
                  energy while maintaining professional credibility—whether you're running a casino on the Strip or a 
                  corporate office in Henderson. Reno companies benefit from designs that capture the city's tech innovation 
                  and outdoor recreation focus. Henderson businesses need sites that showcase corporate professionalism 
                  and family-friendly community values.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From gaming industry innovation to tech startup agility, from 24/7 business culture to outdoor recreation, 
                  Nevada's culture is rich, diverse, and deeply rooted in entertainment, entrepreneurship, and 
                  round-the-clock service. We don't just build websites—we create digital experiences that honor 
                  Nevada's heritage while driving modern business results. Whether you're "dealing the cards" in Las Vegas, 
                  "coding the future" in Reno, or "building the community" in Henderson, we speak your language—from 
                  entertainment industry jargon to tech startup slang.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Nevada's unique challenges too—from 24/7 business operations to the importance 
                  of entertainment industry compliance, from the balance between innovation and tradition to the 
                  significance of tourism and hospitality. We've worked with businesses across Nevada's diverse regions, 
                  and we know that what works in Las Vegas might not work in Carson City, and vice versa. That's why 
                  we create custom solutions as unique as Nevada itself. Thanks for trusting us with your digital presence!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/nevada/nevada-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/nevada/nevada-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/nevada/nevada-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/nevada/nevada-web-development-nandann-creative-sm.webp"
                    alt="Nevada Web Development - Las Vegas, Reno, Henderson, Carson City"
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
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nevada is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Nevada businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tony "The Vegas VIP" Rodriguez</h4>
                    <p className="text-gray-600">Director, Strip Entertainment Group</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Vegas! Our new website captures the Strip's energy and our 
                  bookings tripled in the first month. They even used the right shade of purple—
                  that's respect for Vegas style! What happens in Vegas stays in Vegas, but great websites go everywhere!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Rachel "The Reno Tech" Chen</h4>
                    <p className="text-gray-600">CEO, Biggest Little Tech</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Reno 911!' Our 
                  client inquiries increased 200% and startups love the authentic tech vibe. They understand 
                  that in Nevada, it's not just business—it's about innovation and entertainment!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    H
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Henry "The Henderson Hero" Martinez</h4>
                    <p className="text-gray-600">Owner, Corporate Solutions Nevada</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a corporate services company in Henderson, we needed a website that honors our professional 
                  standards while showcasing our Nevada roots. Nandann Creative delivered a site that's helped us 
                  win major contracts while staying true to our Silver State values. They understand Nevada business!"
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
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nevada Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Nevada web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Nevada Your Digital Jackpot?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Nevada businesses that trust Nandann Creative with their digital success—from Las Vegas to Reno, what happens online stays online!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="Nevada" locationShort="NV" />
      </div>
    </>
  );
}

