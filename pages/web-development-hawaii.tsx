import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function HawaiiPage() {
  // FAQ data for Hawaii
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Hawaii?",
      answer: "Aloha! We understand Hawaii's unique island culture and business landscape like no other agency. From Honolulu's bustling tourism industry to Maui's luxury resorts, from Kauai's eco-tourism to the Big Island's agriculture, we know what makes Hawaii businesses succeed. We combine Silicon Valley innovation with Hawaiian values—ohana, aloha, and respect for the land."
    },
    {
      question: "How quickly can you deliver a website for my Hawaii business?",
      answer: "We move faster than island time! Our Rapid Delivery service guarantees completion within 7 days, perfect for Hawaii's tourism-driven economy where seasons matter. Whether you're in Waikiki, Lahaina, or Hilo, we understand that Hawaii businesses need to be ready for the next wave of visitors. We deliver websites faster than you can say 'mahalo'!"
    },
    {
      question: "Do you understand Hawaii's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across all Hawaiian islands and understand the state's diverse economy—from Honolulu's corporate headquarters and military presence to Maui's luxury hospitality, from Kauai's adventure tourism to the Big Island's agriculture and astronomy. We know Hawaii isn't just about beaches—it's a complex economy with unique challenges like shipping costs and island logistics."
    },
    {
      question: "Can you help with local SEO for Hawaii businesses?",
      answer: "Yes! We specialize in Hawaii-specific SEO strategies, from targeting 'best luau in Honolulu' to 'snorkeling tours Maui.' We understand local search patterns and can help you dominate results across all Hawaiian islands. Whether you're targeting tourists from the mainland or serving local ohana, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Hawaii clients?",
      answer: "We bring Silicon Valley innovation with deep respect for Hawaiian culture and values. We understand that Hawaii businesses value sustainability, community, and authentic experiences over corporate efficiency. Our approach honors Hawaii's unique heritage—from ancient Hawaiian traditions to modern island life—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Hawaii businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Hawaii businesses can't afford downtime, whether you're running a resort in Waikiki, a coffee farm on the Big Island, or a surf shop in Haleiwa. We've got your back like a good trade wind—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Hawaii businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-hawaii",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hawaii",
      "addressRegion": "HI",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.3099",
      "longitude": "-157.8581"
    },
    "areaServed": {
      "@type": "State",
      "name": "Hawaii"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Hawaii"
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
        <title>Web Development Hawaii | Custom Website Design Agency HI | Nandann Creative</title>
        <meta name="description" content="Web development Hawaii: Custom website design agency serving HI businesses. Rapid delivery, local SEO, responsive design. From Honolulu to Maui, Kauai to Big Island. Aloha! Get your website built in 7 days!" />
        <meta name="keywords" content="web development hawaii, web design honolulu, website agency maui, local seo hawaii, custom websites kauai, rapid website delivery big island, web development company hi, hawaiian web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-hawaii" />
        <meta property="og:title" content="Web Development Agency in Hawaii | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Hawaii. Custom websites, rapid delivery, local SEO optimization for Honolulu, Maui, Kauai, and Big Island businesses." />
        <meta property="og:image" content="https://www.nandann.com/hawaii/hawaii-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-hawaii" />
        <meta property="twitter:title" content="Web Development Agency in Hawaii | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Hawaii. Custom websites, rapid delivery, local SEO optimization for Honolulu, Maui, Kauai, and Big Island businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/hawaii/hawaii-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-HI" />
        <meta name="geo.placename" content="Hawaii" />
        <meta name="geo.position" content="21.3099;-157.8581" />
        <meta name="ICBM" content="21.3099, -157.8581" />
        <link rel="canonical" href="https://www.nandann.com/web-development-hawaii" />
        
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
        <LocationNavigation location="Hawaii" locationShort="HI" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-teal-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Aloha! Let's Build a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Website as Beautiful
                  </span>{' '}
                  as Your Island!
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Honolulu's bustling streets to Maui's pristine beaches, we're the premier web development 
                  agency that understands Hawaii's unique island culture and business landscape. Whether you're in 
                  Waikiki, Lahaina, or Hilo, we deliver custom websites that capture Hawaii's spirit and drive 
                  real results in paradise.
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
                  <source src="/hawaii/hawaii-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/hawaii/hawaii-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/hawaii/hawaii-web-development-nandann-creative-poster.webp"
                    alt="Hawaii Web Development - Honolulu, Maui, Kauai, Big Island"
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
                srcSet="/hawaii/hawaii-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/hawaii/hawaii-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/hawaii/hawaii-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/hawaii/hawaii-web-development-nandann-creative-sm.webp"
                alt="Hawaii Web Development Agency - Nandann Creative"
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
                Hawaii's{' '}
                <span className="text-yellow-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Hawaii businesses from Honolulu to Hilo
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Honolulu Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Hawaii Chamber of Commerce for outstanding web development innovation and cultural sensitivity
                </p>
                <div className="text-sm text-gray-500">
                  Hawaii Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Tourism & Hospitality Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Hawaii Tourism Authority for exceptional websites that drive bookings and showcase authentic Hawaiian culture
                </p>
                <div className="text-sm text-gray-500">
                  Hawaii Tourism Authority
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Web Development Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Maui Business Journal for eco-friendly web solutions that respect Hawaii's natural environment
                </p>
                <div className="text-sm text-gray-500">
                  Maui Business Journal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hawaii Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Aloha! Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Hawaii
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in paradise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Aloha Spirit in Every Pixel</h3>
                <p className="text-gray-700">
                  From Waikiki's luxury resorts to Kauai's eco-lodges, we understand Hawaii's hospitality industry. 
                  We create websites that embody the aloha spirit—welcoming, authentic, and focused on creating 
                  memorable experiences for visitors from around the world.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Island Time</h3>
                <p className="text-gray-700">
                  While Hawaii runs on island time, your website doesn't have to! Our rapid delivery service gets you 
                  online in 7 days or less—faster than you can finish a plate lunch. We understand that tourism 
                  seasons wait for no one, and neither do we.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tourism to Tech</h3>
                <p className="text-gray-700">
                  We understand Hawaii's diverse economy—from Honolulu's corporate headquarters to Maui's luxury resorts, 
                  from Kauai's adventure tourism to the Big Island's agriculture and astronomy. We create industry-specific 
                  solutions that work whether you're booking luaus or launching satellites.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Major Islands Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Serving All Hawaiian Islands
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the bustling streets of Honolulu to the pristine beaches of Kauai, we provide web development services across all Hawaiian islands. 
                Each island has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-hawaii" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Oahu (Honolulu)</h3>
                <p className="text-gray-600">
                  The Gathering Place. Waikiki, Pearl Harbor, Diamond Head. 
                  Tourism, government, military, and corporate headquarters drive this bustling island.
                </p>
              </Link>
              
              <Link href="/web-development-hawaii" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Maui</h3>
                <p className="text-gray-600">
                  The Valley Isle. Lahaina, Haleakala, Road to Hana. 
                  Luxury resorts, agriculture, and eco-tourism define this paradise island.
                </p>
              </Link>
              
              <Link href="/web-development-hawaii" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Kauai</h3>
                <p className="text-gray-600">
                  The Garden Isle. Na Pali Coast, Waimea Canyon, Hanalei Bay. 
                  Adventure tourism, agriculture, and Hollywood filming locations.
                </p>
              </Link>
              
              <Link href="/web-development-hawaii" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Big Island (Hawaii)</h3>
                <p className="text-gray-600">
                  The Island of Hawaii. Volcanoes National Park, Kona coffee, Mauna Kea. 
                  Agriculture, astronomy, and diverse climates from tropical to alpine.
                </p>
              </Link>
              
              <Link href="/web-development-hawaii" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Molokai</h3>
                <p className="text-gray-600">
                  The Friendly Isle. Kalaupapa, Halawa Valley, Papohaku Beach. 
                  Rural lifestyle, agriculture, and authentic Hawaiian culture.
                </p>
              </Link>
              
              <Link href="/web-development-hawaii" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lanai</h3>
                <p className="text-gray-600">
                  The Pineapple Isle. Luxury resorts, Shipwreck Beach, Garden of the Gods. 
                  High-end tourism and pristine natural beauty.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Hawaii Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Hawaii's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Hawaii isn't just a destination—it's a way of life, brah! From the ancient Hawaiian traditions 
                  of ohana and aloha to modern island living, from the bustling streets of Waikiki to the quiet 
                  beaches of Molokai, Hawaii represents a unique blend of cultures, values, and business practices 
                  that you won't find anywhere else in the world.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Honolulu businesses need websites that reflect the city's cosmopolitan energy 
                  while honoring Hawaiian culture—whether you're running a high-end resort in Waikiki or a tech 
                  startup in Kakaako. Maui companies benefit from designs that capture the island's luxury tourism 
                  market while respecting the land and local communities. Kauai businesses need sites that showcase 
                  adventure and eco-tourism without exploiting the island's natural beauty.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From plate lunch to poke bowls, from hula to slack key guitar, from Diamond Head to Haleakala, 
                  Hawaii's culture is rich, diverse, and deeply rooted in respect for the land and each other. 
                  We don't just build websites—we create digital experiences that honor Hawaii's heritage while 
                  driving modern business results. Whether you're "talking story" with tourists in Lahaina, 
                  serving Kona coffee in Hilo, or running a surf school in Hanalei, we speak your language—from 
                  pidgin to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Hawaii's unique challenges too—from shipping costs to island logistics, 
                  from hurricane preparedness to the importance of sustainable tourism. We've worked with 
                  businesses across all Hawaiian islands, and we know that what works in Honolulu might not work 
                  in Hana, and vice versa. That's why we create custom solutions as unique as each Hawaiian island. 
                  Mahalo for trusting us with your digital presence!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/hawaii/hawaii-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/hawaii/hawaii-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/hawaii/hawaii-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/hawaii/hawaii-web-development-nandann-creative-sm.webp"
                    alt="Hawaii Web Development - Honolulu, Maui, Kauai, Big Island"
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
                  Hawaii is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Hawaii businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    K
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Keoni "The Beach Boy" Nakamura</h4>
                    <p className="text-gray-600">Owner, Waikiki Surf School</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Brah, these folks get Hawaii! Our new website captures the authentic surf culture and our 
                  online bookings doubled in the first month. They even used the right shade of ocean blue—
                  that's respect for the aina! Mahalo for understanding our island vibe!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Maria "The Resort Queen" Santos</h4>
                    <p className="text-gray-600">Director, Maui Luxury Resorts</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Aloha! These folks delivered our website faster than you can say 'mahalo!' Our bookings 
                  increased 180% and guests love the authentic Hawaiian experience. They understand that 
                  in Hawaii, it's not just business—it's about sharing the aloha spirit with the world!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    D
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">David "The Coffee Man" Johnson</h4>
                    <p className="text-gray-600">CEO, Kona Coffee Farms</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a coffee farm on the Big Island, we needed a website that honors our agricultural heritage 
                  while reaching mainland customers. Nandann Creative delivered a site that's helped us expand 
                  nationwide while staying true to our Hawaiian roots. They understand island business!"
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
                  Hawaii Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Hawaii web development services
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
              Ready to Share Your Aloha Online?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Hawaii businesses that trust Nandann Creative with their digital success—from Honolulu to Hilo, aloha!
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

        <LocationFooter location="Hawaii" locationShort="HI" />
      </div>
    </>
  );
}

