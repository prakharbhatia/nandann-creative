import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function LouisianaPage() {
  // FAQ data for Louisiana
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Louisiana?",
      answer: "Cher, we understand Louisiana like nobody else! From New Orleans' vibrant culture to Baton Rouge's government sector, from Lafayette's Cajun country to Shreveport's gaming industry, we know what makes Louisiana businesses unique. We combine Silicon Valley tech with Louisiana soul to create websites that truly connect with your audience—laissez les bons temps rouler!"
    },
    {
      question: "How quickly can you deliver a website for my Louisiana business?",
      answer: "We move faster than a crawfish boil! Our Rapid Delivery service guarantees completion within 7 days. Whether you're in the French Quarter, on Magazine Street, or in Cajun country, we understand that Louisiana businesses need to move quickly. We deliver websites faster than you can finish a po'boy from Parkway Bakery."
    },
    {
      question: "Do you understand Louisiana's unique business landscape?",
      answer: "Mais oui! We've worked with businesses across Louisiana and understand the state's diverse economy—from New Orleans' tourism and hospitality to Baton Rouge's petrochemical industry, from Lafayette's oil & gas sector to Shreveport's gaming and entertainment. We know Louisiana isn't just about Mardi Gras—it's a complex, thriving business ecosystem with Creole and Cajun influences."
    },
    {
      question: "Can you help with local SEO for Louisiana businesses?",
      answer: "Absolutely, cher! We specialize in Louisiana-specific SEO strategies, from targeting 'best gumbo in New Orleans' to 'Cajun restaurants in Lafayette.' We understand local search patterns and can help you dominate results across Louisiana's unique parishes. Whether you're in Orleans Parish or Terrebonne Parish, we'll make sure locals can find you."
    },
    {
      question: "What makes your approach different for Louisiana clients?",
      answer: "We bring Silicon Valley innovation with Louisiana hospitality and authenticity. We understand that Louisiana businesses value relationships, culture, and authenticity over corporate speak. Our approach honors Louisiana's rich heritage—from jazz to zydeco, from Creole to Cajun—while delivering modern, results-driven websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Louisiana businesses?",
      answer: "Mais yeah! We provide 24/7 monitoring, security updates, content management, and performance optimization. Louisiana businesses can't afford downtime, whether you're running a restaurant on Bourbon Street, an oil company in Lafayette, or a casino in Shreveport. We've got your back like a good roux has your gumbo."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Louisiana businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-louisiana",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Louisiana",
      "addressRegion": "LA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.9843",
      "longitude": "-91.9623"
    },
    "areaServed": {
      "@type": "State",
      "name": "Louisiana"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Louisiana"
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
        <title>Web Development Louisiana | Custom Website Design Agency LA | Nandann Creative</title>
        <meta name="description" content="Web development Louisiana: Custom website design agency serving LA businesses. Rapid delivery, local SEO, responsive design. From New Orleans to Baton Rouge, Lafayette to Shreveport. Laissez les bons temps rouler with a great website!" />
        <meta name="keywords" content="web development louisiana, web design new orleans, website agency baton rouge, local seo louisiana, custom websites lafayette, rapid website delivery shreveport, web development company la, cajun web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-louisiana" />
        <meta property="og:title" content="Web Development Agency in Louisiana | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Louisiana. Custom websites, rapid delivery, local SEO optimization for New Orleans, Baton Rouge, Lafayette, and Shreveport businesses." />
        <meta property="og:image" content="https://www.nandann.com/louisiana/louisiana-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-louisiana" />
        <meta property="twitter:title" content="Web Development Agency in Louisiana | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Louisiana. Custom websites, rapid delivery, local SEO optimization for New Orleans, Baton Rouge, Lafayette, and Shreveport businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/louisiana/louisiana-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-LA" />
        <meta name="geo.placename" content="Louisiana" />
        <meta name="geo.position" content="30.9843;-91.9623" />
        <meta name="ICBM" content="30.9843, -91.9623" />
        <link rel="canonical" href="https://www.nandann.com/web-development-louisiana" />
        
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
        <LocationNavigation location="Louisiana" locationShort="LA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Laissez Les Bons Temps Rouler with a{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Website That Works
                  </span>
                  , Cher!
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From the French Quarter to Cajun Country, we're the premier web development agency that understands 
                  Louisiana's unique culture and business landscape. Whether you're in New Orleans, Baton Rouge, 
                  Lafayette, or Shreveport, we deliver custom websites that capture Louisiana's spirit and drive 
                  real results in the Pelican State.
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
                  <source src="/louisiana/louisiana-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/louisiana/louisiana-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/louisiana/louisiana-web-development-nandann-creative-poster.webp"
                    alt="Louisiana Web Development - New Orleans, Baton Rouge, Lafayette"
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
                srcSet="/louisiana/louisiana-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/louisiana/louisiana-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/louisiana/louisiana-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/louisiana/louisiana-web-development-nandann-creative-sm.webp"
                alt="Louisiana Web Development Agency - Nandann Creative"
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
                Louisiana's{' '}
                <span className="text-yellow-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Louisiana businesses from the French Quarter to Cajun Country
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">New Orleans Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the New Orleans Chamber of Commerce for outstanding web development innovation and cultural authenticity
                </p>
                <div className="text-sm text-gray-500">
                  New Orleans Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Tourism & Hospitality Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Louisiana Tourism Association for exceptional websites that drive bookings and capture Louisiana's unique culture
                </p>
                <div className="text-sm text-gray-500">
                  Louisiana Tourism Association
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
                  Honored by Baton Rouge Business Report for fastest website delivery times while maintaining Louisiana's authentic character
                </p>
                <div className="text-sm text-gray-500">
                  Baton Rouge Business Report
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Louisiana Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Cher, Here's Why{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Louisiana
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Pelican State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Jazz, Zydeco & Digital Excellence</h3>
                <p className="text-gray-700">
                  From New Orleans' jazz clubs to Lafayette's zydeco halls, we understand Louisiana's rich cultural heritage. 
                  We create websites that capture the soul of Louisiana—whether you're a restaurant on Bourbon Street, 
                  a music venue on Frenchmen Street, or a Cajun tour operator in the bayou.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Making a Roux</h3>
                <p className="text-gray-700">
                  In Louisiana, we know good things take time—except your website! Our rapid delivery service gets you 
                  online in 7 days or less. We move faster than a second line parade but with the care and attention 
                  of a grandmother's gumbo recipe. Laissez les bons temps rouler!
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Oil & Gas to Hospitality</h3>
                <p className="text-gray-700">
                  We understand Louisiana's diverse economy—from Lafayette's oil & gas industry to New Orleans' tourism, 
                  from Baton Rouge's petrochemical plants to Shreveport's gaming sector. We create industry-specific 
                  solutions that drive real ROI, whether you're drilling or serving beignets.
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
                Serving All of Louisiana
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the Mississippi River to the Gulf Coast, we provide web development services across the entire Pelican State. 
                Each region has its unique culture, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-louisiana" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">New Orleans</h3>
                <p className="text-gray-600">
                  The Big Easy. French Quarter, Bourbon Street, Jazz Fest, Mardi Gras. 
                  Tourism, hospitality, and culture drive this iconic city's economy.
                </p>
              </Link>
              
              <Link href="/web-development-louisiana" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Baton Rouge</h3>
                <p className="text-gray-600">
                  State capital and petrochemical hub. Government, LSU, oil refineries, and port operations. 
                  A blend of politics, education, and industry.
                </p>
              </Link>
              
              <Link href="/web-development-louisiana" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lafayette</h3>
                <p className="text-gray-600">
                  Heart of Cajun Country. Oil & gas industry, Cajun culture, zydeco music, and authentic cuisine. 
                  Where French heritage meets modern energy business.
                </p>
              </Link>
              
              <Link href="/web-development-louisiana" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Shreveport</h3>
                <p className="text-gray-600">
                  Gaming and entertainment capital. Casinos, Barksdale Air Force Base, healthcare, and regional commerce. 
                  Northwest Louisiana's economic engine.
                </p>
              </Link>
              
              <Link href="/web-development-louisiana" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lake Charles</h3>
                <p className="text-gray-600">
                  Casino resort destination and petrochemical center. Gaming, tourism, oil refining, and port operations. 
                  Southwest Louisiana's commercial hub.
                </p>
              </Link>
              
              <Link href="/web-development-louisiana" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Houma</h3>
                <p className="text-gray-600">
                  Bayou country and offshore oil hub. Fishing industry, oil & gas support services, and Cajun culture. 
                  Gateway to Louisiana's coastal wetlands.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Louisiana Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Louisiana's{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Unique Soul
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Louisiana isn't just a state—it's a state of mind, cher! From the jazz-filled streets of the French 
                  Quarter to the zydeco halls of Cajun Country, from the cypress swamps of the bayou to the oil rigs 
                  in the Gulf, Louisiana is a unique blend of cultures, cuisines, and industries that you won't find 
                  anywhere else in America.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that New Orleans businesses need websites that capture the city's vibrant, authentic 
                  character—whether you're serving beignets at Café Du Monde or booking jazz tours on Frenchmen Street. 
                  Lafayette companies benefit from designs that honor Cajun heritage while serving the modern oil & gas 
                  industry. Baton Rouge businesses need professional sites that work for both government contractors 
                  and LSU-focused ventures.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From gumbo to étouffée, from Mardi Gras to Jazz Fest, from crawfish boils to second line parades, 
                  Louisiana's culture is rich, diverse, and deeply rooted. We don't just build websites—we create 
                  digital experiences that honor Louisiana's heritage while driving modern business results. Whether 
                  you're "making groceries" in New Orleans, running an oil company in Lafayette, or operating a casino 
                  in Shreveport, we speak your language—from Creole to Cajun to business.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Louisiana's unique challenges too—from hurricane preparedness to the importance 
                  of local festivals, from the complexity of parish-based governance to the significance of family 
                  traditions. We've worked with businesses across Louisiana's diverse regions, and we know that what 
                  works in New Orleans might not work in Shreveport, and vice versa. That's why we create custom 
                  solutions as unique as Louisiana itself. Laissez les bons temps rouler!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/louisiana/louisiana-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/louisiana/louisiana-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/louisiana/louisiana-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/louisiana/louisiana-web-development-nandann-creative-sm.webp"
                    alt="Louisiana Web Development - New Orleans, Baton Rouge, Lafayette, Shreveport"
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
                  Louisiana is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Louisiana businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jean-Pierre "JP" Boudreaux</h4>
                    <p className="text-gray-600">Owner, Boudreaux's Cajun Kitchen (Lafayette)</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Mais, these folks get Louisiana, cher! Our new website captures the authentic Cajun spirit and our 
                  online reservations tripled in the first month. They even used the right shade of purple and gold—
                  that's LSU pride, baby! Best gumbo... I mean, best website decision we ever made!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Marie "The Queen" Thibodeaux</h4>
                    <p className="text-gray-600">Director, French Quarter Tours</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Where y'at? These folks delivered our website faster than you can say 'Who dat!' Our bookings 
                  increased 200% and tourists love the authentic New Orleans vibe. They understand that in NOLA, 
                  it's not just business—it's about soul, culture, and laissez les bons temps rouler!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Robert "Big Oil" Landry</h4>
                    <p className="text-gray-600">CEO, Gulf Coast Energy Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an oil & gas company in Lafayette, we needed a professional website that works as hard as we do. 
                  Nandann Creative delivered a site that's helped us win major contracts while still honoring our 
                  Cajun roots. They understand Louisiana business—from the bayou to the boardroom."
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
                  Louisiana Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Louisiana web development services
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
              Ready to Laissez Les Bons Temps Rouler Online?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Louisiana businesses that trust Nandann Creative with their digital success—from the French Quarter to Cajun Country, cher!
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

        <LocationFooter location="Louisiana" locationShort="LA" />
      </div>
    </>
  );
}

