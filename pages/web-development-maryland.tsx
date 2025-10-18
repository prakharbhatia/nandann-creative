import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function MarylandPage() {
  // FAQ data for Maryland
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Maryland?",
      answer: "We understand Maryland's unique position as a hub for biotech, cybersecurity, and government contracting. From Baltimore's Inner Harbor to Bethesda's biotech corridor, we know what makes Maryland businesses succeed. Our team combines technical expertise with deep knowledge of Maryland's diverse economy—from crab houses on the Chesapeake to defense contractors in Columbia."
    },
    {
      question: "How quickly can you deliver a website for my Maryland business?",
      answer: "Our Rapid Delivery service guarantees completion within 7 days, perfect for Maryland's fast-paced business environment. Whether you're in Baltimore, Annapolis, Bethesda, or Silver Spring, we understand that in Maryland's competitive market—especially in government contracting and biotech—speed matters. We move faster than a skipjack on the Chesapeake Bay."
    },
    {
      question: "Do you understand Maryland's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Maryland and understand the state's diverse economy—from Baltimore's healthcare and education sectors to Montgomery County's biotech industry, from Annapolis's maritime businesses to the defense contractors surrounding Fort Meade. We know Maryland isn't just about crabs and the Chesapeake—it's a powerhouse of innovation and government services."
    },
    {
      question: "Can you help with local SEO for Maryland businesses?",
      answer: "Yes! We specialize in Maryland-specific SEO strategies, including targeting multiple markets from Baltimore to the DC suburbs. We understand local search patterns, from 'best crab cakes in Baltimore' to 'cybersecurity firms in Columbia.' Our geo-targeted approach helps you dominate search results across Maryland's diverse regions."
    },
    {
      question: "What makes your approach different for Maryland clients?",
      answer: "We bring Silicon Valley innovation with an understanding of Maryland's unique business culture. We know that government contractors need security-focused websites, biotech firms need compliance-ready solutions, and Baltimore businesses need sites that reflect the city's authentic character. We're not just another agency—we're your Maryland digital partner."
    },
    {
      question: "Do you offer ongoing support for Maryland businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates (crucial for government contractors), content management, and performance optimization. Maryland businesses can't afford downtime, whether you're running a biotech lab in Rockville, a maritime business in Annapolis, or a restaurant on Baltimore's waterfront. We've got your back like Old Bay on crabs."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Maryland businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-maryland",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Maryland",
      "addressRegion": "MD",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.0458",
      "longitude": "-76.6413"
    },
    "areaServed": {
      "@type": "State",
      "name": "Maryland"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Maryland"
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
        <title>Web Development Maryland | Custom Website Design Agency MD | Nandann Creative</title>
        <meta name="description" content="Web development Maryland: Custom website design agency serving MD businesses. Rapid delivery, local SEO, responsive design. From Baltimore to Bethesda, Annapolis to Silver Spring. Get your website built in 7 days!" />
        <meta name="keywords" content="web development maryland, web design baltimore, website agency bethesda, local seo maryland, custom websites annapolis, rapid website delivery rockville, web development company md, silver spring web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-maryland" />
        <meta property="og:title" content="Web Development Agency in Maryland | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Maryland. Custom websites, rapid delivery, local SEO optimization for Baltimore, Bethesda, Annapolis, and Silver Spring businesses." />
        <meta property="og:image" content="https://www.nandann.com/maryland/maryland-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-maryland" />
        <meta property="twitter:title" content="Web Development Agency in Maryland | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Maryland. Custom websites, rapid delivery, local SEO optimization for Baltimore, Bethesda, Annapolis, and Silver Spring businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/maryland/maryland-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-MD" />
        <meta name="geo.placename" content="Maryland" />
        <meta name="geo.position" content="39.0458;-76.6413" />
        <meta name="ICBM" content="39.0458, -76.6413" />
        <link rel="canonical" href="https://www.nandann.com/web-development-maryland" />
        
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
        <LocationNavigation location="Maryland" locationShort="MD" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Hon, Let's Build a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Website as Strong
                  </span>{' '}
                  as the Chesapeake Bay!
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Baltimore's Inner Harbor to the biotech corridor of Montgomery County, we're the premier 
                  web development agency that understands Maryland's unique business landscape. Whether you're in 
                  Charm City, Annapolis, or the DC suburbs, we deliver custom websites that drive real results 
                  in the Old Line State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 text-center">
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
                  <source src="/maryland/maryland-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/maryland/maryland-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/maryland/maryland-web-development-nandann-creative-poster.webp"
                    alt="Maryland Web Development - Baltimore, Bethesda, Annapolis"
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
                srcSet="/maryland/maryland-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/maryland/maryland-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/maryland/maryland-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/maryland/maryland-web-development-nandann-creative-sm.webp"
                alt="Maryland Web Development Agency - Nandann Creative"
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
                Maryland's{' '}
                <span className="text-green-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Maryland businesses from Baltimore to Bethesda
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Baltimore Innovation Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Greater Baltimore Committee for outstanding web development innovation and business growth impact
                </p>
                <div className="text-sm text-gray-500">
                  Greater Baltimore Committee
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Cybersecurity-Focused Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Maryland Tech Council for exceptional security standards and compliance-ready web solutions
                </p>
                <div className="text-sm text-gray-500">
                  Maryland Tech Council
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
                  Honored by Montgomery County Chamber of Commerce for fastest website delivery while maintaining exceptional quality
                </p>
                <div className="text-sm text-gray-500">
                  Montgomery County Chamber
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maryland Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Hon, Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Maryland
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Old Line State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Security-First for Government Contractors</h3>
                <p className="text-gray-700">
                  Maryland is home to Fort Meade, NSA, and countless defense contractors. We understand the critical 
                  importance of security, compliance, and data protection. Our websites are built with government-grade 
                  security standards from day one—because in Maryland, security isn't optional.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Biotech & Healthcare Expertise</h3>
                <p className="text-gray-700">
                  From the I-270 biotech corridor to Johns Hopkins in Baltimore, Maryland leads in life sciences. 
                  We create HIPAA-compliant, research-focused websites that meet the unique needs of biotech firms, 
                  medical practices, and pharmaceutical companies. We speak your scientific language.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than a Skipjack on the Bay</h3>
                <p className="text-gray-700">
                  Maryland businesses move fast, and so do we. Our 7-day rapid delivery service ensures you're online 
                  and competing quickly. Whether you're a crab house in Annapolis, a tech startup in Columbia, or a 
                  law firm in Towson, we deliver results faster than you can say "Old Bay."
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
                Serving All of Maryland
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the Chesapeake Bay to the Appalachian Mountains, we provide web development services across the entire Old Line State. 
                Each region has its unique business culture, and we understand them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-maryland" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Baltimore</h3>
                <p className="text-gray-600">
                  Charm City. Home to Johns Hopkins, Under Armour, and a thriving Inner Harbor. 
                  Healthcare, education, and maritime industries drive this historic port city.
                </p>
              </Link>
              
              <Link href="/web-development-maryland" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Bethesda</h3>
                <p className="text-gray-600">
                  Biotech capital. NIH headquarters, cutting-edge research firms, and pharmaceutical giants. 
                  High-income professionals and world-class medical innovation define this DC suburb.
                </p>
              </Link>
              
              <Link href="/web-development-maryland" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Annapolis</h3>
                <p className="text-gray-600">
                  State capital and sailing capital of America. Maritime businesses, government services, 
                  tourism, and the Naval Academy create a unique blend of tradition and innovation.
                </p>
              </Link>
              
              <Link href="/web-development-maryland" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Columbia</h3>
                <p className="text-gray-600">
                  Planned community and tech hub. Home to cybersecurity firms, defense contractors, 
                  and innovative startups. Close to Fort Meade and NSA headquarters.
                </p>
              </Link>
              
              <Link href="/web-development-maryland" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Rockville</h3>
                <p className="text-gray-600">
                  I-270 biotech corridor. Pharmaceutical companies, research labs, and life sciences firms. 
                  Montgomery County's commercial hub with diverse international communities.
                </p>
              </Link>
              
              <Link href="/web-development-maryland" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Silver Spring</h3>
                <p className="text-gray-600">
                  Diverse urban center. FDA headquarters, media companies, and vibrant downtown. 
                  Multicultural businesses and proximity to DC make this a dynamic market.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Maryland Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Maryland's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Unique Character
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Maryland isn't just about crabs and the Chesapeake Bay (though we love both, hon!). The Old Line State 
                  is a powerhouse of innovation where world-class biotech firms operate alongside historic crab houses, 
                  where NSA's cybersecurity experts work near Annapolis sailors, and where Johns Hopkins researchers 
                  collaborate with Under Armour's design team.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From the Inner Harbor to the I-270 biotech corridor, from Ocean City's boardwalk to Deep Creek Lake's 
                  mountains, Maryland's diversity is its strength. We understand that Baltimore businesses need authentic, 
                  gritty designs that reflect Charm City's character. Bethesda biotech firms need sleek, professional 
                  sites that convey scientific credibility. Annapolis maritime businesses benefit from nautical themes 
                  that honor the sailing capital's heritage.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Whether you're serving steamed crabs with Old Bay in Fells Point, developing life-saving drugs in 
                  Rockville, protecting national security in Columbia, or running a law firm in Towson, we know how to 
                  create websites that resonate with Maryland audiences. We understand Maryland pride—from the state flag 
                  (the best in the nation, hon) to the Natty Boh mascot to the Orioles at Camden Yards.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team has worked with businesses across Maryland's diverse regions, from the Eastern Shore's 
                  agricultural communities to Western Maryland's mountain towns, from the DC suburbs' government 
                  contractors to Baltimore's creative agencies. We don't just build websites—we create digital 
                  experiences that capture the essence of Maryland's unique business culture and regional pride.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/maryland/maryland-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/maryland/maryland-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/maryland/maryland-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/maryland/maryland-web-development-nandann-creative-sm.webp"
                    alt="Maryland Web Development - Baltimore, Bethesda, Annapolis, Rockville"
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
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Maryland is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Maryland businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    D
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Sarah Chen</h4>
                    <p className="text-gray-600">CEO, BioGen Research (Rockville)</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a biotech firm on the I-270 corridor, we needed a website that conveyed scientific credibility 
                  while being accessible to investors. Nandann Creative delivered a HIPAA-compliant site in 6 days 
                  that's increased our investor inquiries by 180%. They understand Maryland's biotech landscape."
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "Crab King" O'Malley</h4>
                    <p className="text-gray-600">Owner, Fells Point Crab House</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Hon, these folks get Baltimore! Our new website captures the authentic Fells Point vibe and our 
                  online reservations tripled in the first month. They even suggested adding Old Bay to our color 
                  scheme—now that's understanding Maryland! Best decision we made."
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer Martinez</h4>
                    <p className="text-gray-600">Director, SecureNet Solutions (Columbia)</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a cybersecurity firm near Fort Meade, security is everything. Nandann Creative built us a 
                  website with government-grade security that's helped us win three major defense contracts. They 
                  understand Maryland's unique position in national security and delivered accordingly."
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
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Maryland Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Maryland web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Maryland Your Digital Bay?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Maryland businesses that trust Nandann Creative with their digital success—from Baltimore to Bethesda, Annapolis to Rockville
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

        <LocationFooter location="Maryland" locationShort="MD" />
      </div>
    </>
  );
}

