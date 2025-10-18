import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function SanDiegoCountyPage() {
  // FAQ data for San Diego County
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in San Diego County?",
      answer: "We understand San Diego County's unique business landscape and coastal culture like no other agency! From San Diego's military industry and biotech excellence to Chula Vista's healthcare sector, from Oceanside's tourism industry to Carlsbad's tech innovation, we know what makes San Diego County businesses succeed. We combine Silicon Valley innovation with San Diego's laid-back coastal vibes and military precision."
    },
    {
      question: "How quickly can you deliver a website for my San Diego County business?",
      answer: "We move faster than San Diego's surf breaks! Our Rapid Delivery service guarantees completion within 7 days, perfect for San Diego County's military and biotech industries where precision matters. Whether you're in San Diego, Chula Vista, Oceanside, or anywhere in San Diego County, we understand that San Diego businesses value speed and reliability. We deliver websites faster than you can say 'Surf's Up!'"
    },
    {
      question: "Do you understand San Diego County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across San Diego County and understand the county's diverse economy—from San Diego's military industry and biotech excellence to Chula Vista's healthcare sector, from Oceanside's tourism industry to Carlsbad's tech innovation. We know San Diego County isn't just about beaches and sunshine—it's a thriving business ecosystem with unique advantages like military connections and biotech innovation."
    },
    {
      question: "Can you help with local SEO for San Diego County businesses?",
      answer: "Yes! We specialize in San Diego County-specific SEO strategies, from targeting 'best restaurants San Diego' to 'biotech jobs Carlsbad.' We understand local search patterns and can help you dominate results across San Diego County's diverse regions. Whether you're targeting military clients in San Diego or serving tourists in Oceanside, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for San Diego County clients?",
      answer: "We bring Silicon Valley innovation with San Diego's coastal vibes—military precision, biotech innovation, and genuine hospitality. We understand that San Diego County businesses prioritize beach lifestyle, military connections, and authentic experiences over corporate efficiency. Our approach honors San Diego's unique culture—from coastal charm to military excellence—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for San Diego County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. San Diego County businesses can't afford downtime, whether you're running a military contractor in San Diego, a biotech company in Carlsbad, or a tourism business in Oceanside. We've got your back like a good San Diego neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving San Diego County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-san-diego",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Diego",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.7157",
      "longitude": "-117.1611"
    },
    "areaServed": {
      "@type": "County",
      "name": "San Diego County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "San Diego County"
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
        <title>Web Development San Diego County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development San Diego County California: Custom website design agency serving San Diego County businesses. Rapid delivery, local SEO, responsive design. From San Diego to Chula Vista, Oceanside to Carlsbad. San Diego County deserves a great website!" />
        <meta name="keywords" content="web development san diego county, web design san diego, website agency chula vista, local seo san diego county california, custom websites oceanside, rapid website delivery carlsbad, web development company san diego county, san diego county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-san-diego" />
        <meta property="og:title" content="Web Development Agency in San Diego County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in San Diego County. Custom websites, rapid delivery, local SEO optimization for San Diego, Chula Vista, Oceanside, and Carlsbad businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-san-diego" />
        <meta property="twitter:title" content="Web Development Agency in San Diego County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in San Diego County. Custom websites, rapid delivery, local SEO optimization for San Diego, Chula Vista, Oceanside, and Carlsbad businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Diego County, California" />
        <meta name="geo.position" content="32.7157;-117.1611" />
        <meta name="ICBM" content="32.7157, -117.1611" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-san-diego" />
        
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
        <LocationNavigation location="San Diego County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Surf's Up! Your San Diego County Business Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Gnarly Website!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From San Diego's military industry to Carlsbad's biotech excellence, we're the premier web development 
                  agency that understands San Diego County's unique coastal culture and diverse business landscape. 
                  Whether you're in San Diego, Chula Vista, Oceanside, or Carlsbad, we deliver custom websites 
                  that capture San Diego's spirit and drive real results in America's Finest City.
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
                    alt="San Diego County Web Development - San Diego, Chula Vista, Oceanside"
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
                alt="San Diego County Web Development Agency - Nandann Creative"
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
                San Diego County's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of San Diego County businesses from San Diego to Carlsbad
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">San Diego Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the San Diego Chamber of Commerce for outstanding web development innovation and biotech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  San Diego Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Tourism Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by San Diego Tourism Authority for exceptional websites that serve the tourism and hospitality sectors
                </p>
                <div className="text-sm text-gray-500">
                  San Diego Tourism Authority
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Coastal Business Excellence 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by La Jolla Business Council for fastest website delivery while maintaining San Diego County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  La Jolla Business Council
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* San Diego County Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets San Diego County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in America's Finest City
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Surf Breaks</h3>
                <p className="text-gray-700">
                  San Diego County businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Surf's Up!' We understand that in San Diego County's competitive 
                  military and biotech markets, precision matters.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Coastal Charm in Every Pixel</h3>
                <p className="text-gray-700">
                  From San Diego's military industry to Carlsbad's biotech excellence, we understand San Diego County's business culture. 
                  We create websites that embody coastal charm—laid-back, innovative, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Military Precision to Biotech Innovation</h3>
                <p className="text-gray-700">
                  We understand San Diego County's diverse economy—from San Diego's military industry and biotech excellence to Chula Vista's 
                  healthcare sector, from Oceanside's tourism industry to Carlsbad's tech innovation. 
                  We create industry-specific solutions that work whether you're serving the military or innovating biotech.
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
                Serving All of San Diego County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the military industry of San Diego to the biotech excellence of Carlsbad, we provide web development services across the entire San Diego County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-san-diego" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">San Diego</h3>
                <p className="text-gray-600">
                  America's Finest City. Military industry, biotech excellence, tourism. 
                  Where San Diego's coastal culture meets its military heritage.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-diego" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Chula Vista</h3>
                <p className="text-gray-600">
                  The Beautiful View. Healthcare sector, education, tech. 
                  Where San Diego's suburban charm meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-diego" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Oceanside</h3>
                <p className="text-gray-600">
                  The Classic California Beach City. Tourism industry, healthcare, education. 
                  Where San Diego's beach culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-diego" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Carlsbad</h3>
                <p className="text-gray-600">
                  The Village by the Sea. Biotech innovation, tourism, healthcare. 
                  Where San Diego's coastal beauty meets its tech innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-diego" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Escondido</h3>
                <p className="text-gray-600">
                  The Hidden Valley. Healthcare industry, education, agriculture. 
                  Where San Diego's inland heritage meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-san-diego" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">El Cajon</h3>
                <p className="text-gray-600">
                  The Valley of the Sun. Healthcare industry, education, retail. 
                  Where San Diego's valley charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* San Diego County Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get San Diego County's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  San Diego County isn't just a county—it's a county of coastal dreams! From San Diego's "America's Finest City" 
                  military industry to Carlsbad's biotech excellence, from Chula Vista's healthcare sector to Oceanside's 
                  tourism industry, San Diego County represents a unique blend of innovation, coastal charm, 
                  and military precision that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that San Diego businesses need websites that reflect the city's military sophistication 
                  while honoring San Diego's coastal heritage—whether you're running a Fortune 500 company or a startup. 
                  Carlsbad companies benefit from designs that capture the city's biotech innovation and coastal beauty tradition. 
                  Chula Vista businesses need sites that showcase healthcare excellence and suburban charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From coastal charm to military precision, from beaches to biotech, 
                  San Diego County's culture is rich, diverse, and deeply rooted in military service, coastal lifestyle, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor San Diego's heritage while 
                  driving modern business results. Whether you're "serving the military" in San Diego, 
                  "innovating biotech" in Carlsbad, or "welcoming visitors" in Oceanside, we speak your language—from 
                  coastal charm to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands San Diego County's unique challenges too—from military industry considerations to the importance 
                  of coastal connections, from the balance between tradition and innovation to the significance 
                  of local relationships and genuine partnerships. We've worked with businesses across San Diego County's 
                  diverse regions, and we know that what works in San Diego might not work in Carlsbad, and vice versa. 
                  That's why we create custom solutions as unique as San Diego County itself. Thanks for trusting us 
                  with your digital presence, America's finest city!
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
                    alt="San Diego County Web Development - San Diego, Chula Vista, Oceanside, Carlsbad"
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
                  San Diego County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real San Diego County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The San Diego Surfer" Chen</h4>
                    <p className="text-gray-600">CEO, San Diego Military Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get San Diego County! Our new website captures the military industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for San Diego's values! America's finest city with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Carlsbad Coast" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Carlsbad Biotech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'Surf's Up!' Our 
                  biotech inquiries increased 180% and clients love the coastal vibe. They understand 
                  that in San Diego County, it's not just business—it's about coastal charm and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Oceanside Ocean" Park</h4>
                    <p className="text-gray-600">Director, Oceanside Tourism Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a tourism services company in Oceanside, we needed a website that honors our beach heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our San Diego County values. They understand San Diego County business!"
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
                  San Diego County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our San Diego County web development services
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
              Ready to Ride the Wave with San Diego County's Best Website?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of San Diego County businesses that trust Nandann Creative with their digital success—from San Diego to Carlsbad, America's finest city!
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

        <LocationFooter location="San Diego County, California" locationShort="CA" />
      </div>
    </>
  );
}
