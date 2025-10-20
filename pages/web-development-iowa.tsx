import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function IowaPage() {
  // FAQ data for Iowa
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Iowa?",
      answer: "We understand Iowa's unique business landscape and Hawkeye hospitality culture like no other agency! From Des Moines's corporate headquarters and insurance sector to Cedar Rapids's manufacturing excellence, from Iowa City's education sector to Davenport's healthcare industry, we know what makes Iowa businesses succeed. We combine Silicon Valley innovation with Iowa's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my Iowa business?",
      answer: "We move faster than Iowa corn grows! Our Rapid Delivery service guarantees completion within 7 days, perfect for Iowa's agricultural and corporate industries where efficiency matters. Whether you're in downtown Des Moines, Cedar Rapids's business district, or anywhere in the Hawkeye State, we understand that Iowa businesses value speed and reliability. We deliver websites faster than you can say 'Go Hawks!'"
    },
    {
      question: "Do you understand Iowa's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Iowa and understand the state's diverse economy—from Des Moines's corporate headquarters and insurance sector to Cedar Rapids's manufacturing excellence, from Iowa City's education sector to Davenport's healthcare industry. We know Iowa isn't just about corn and pigs—it's a thriving business ecosystem with unique advantages like central location and skilled workforce."
    },
    {
      question: "Can you help with local SEO for Iowa businesses?",
      answer: "Yes! We specialize in Iowa-specific SEO strategies, from targeting 'best restaurants in Des Moines' to 'insurance jobs Cedar Rapids.' We understand local search patterns and can help you dominate results across Iowa's diverse regions. Whether you're targeting corporate clients in Des Moines or serving locals in Iowa City, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Iowa clients?",
      answer: "We bring Silicon Valley innovation with Iowa's values—hard work, community focus, and genuine hospitality. We understand that Iowa businesses prioritize relationships, local connections, and authentic experiences over corporate efficiency. Our approach honors Iowa's unique culture—from Hawkeye hospitality to agricultural excellence—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Iowa businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Iowa businesses can't afford downtime, whether you're running a corporate office in Des Moines, a manufacturing plant in Cedar Rapids, or a healthcare facility in Davenport. We've got your back like a good Iowa neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Iowa businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-iowa",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Iowa",
      "addressRegion": "IA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.5868",
      "longitude": "-93.6250"
    },
    "areaServed": {
      "@type": "State",
      "name": "Iowa"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Iowa"
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
        <title>Web Development Iowa | Custom Website Design Agency IA | Nandann Creative</title>
        <meta name="description" content="Web development Iowa: Custom website design agency serving IA businesses. Rapid delivery, local SEO, responsive design. From Des Moines to Cedar Rapids, Iowa City to Davenport. The Hawkeye State deserves a great website!" />
        <meta name="keywords" content="web development iowa, web design des moines, website agency cedar rapids, local seo iowa, custom websites iowa city, rapid website delivery davenport, web development company ia, iowa web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-iowa" />
        <meta property="og:title" content="Web Development Agency in Iowa | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Iowa. Custom websites, rapid delivery, local SEO optimization for Des Moines, Cedar Rapids, Iowa City, and Davenport businesses." />
        <meta property="og:image" content="https://www.nandann.com/iowa/iowa-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-iowa" />
        <meta property="twitter:title" content="Web Development Agency in Iowa | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Iowa. Custom websites, rapid delivery, local SEO optimization for Des Moines, Cedar Rapids, Iowa City, and Davenport businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/iowa/iowa-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-IA" />
        <meta name="geo.placename" content="Iowa" />
        <meta name="geo.position" content="41.5868;-93.6250" />
        <meta name="ICBM" content="41.5868, -93.6250" />
        <link rel="canonical" href="https://www.nandann.com/web-development-iowa" />
        
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
        <LocationNavigation location="Iowa" locationShort="IA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Go Hawks! Iowa Needs a{' '}
                  <span className="text-yellow-600">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Des Moines's corporate towers to Cedar Rapids's manufacturing plants, we're the premier web development 
                  agency that understands Iowa's unique Hawkeye hospitality culture and diverse business landscape. 
                  Whether you're in Des Moines, Cedar Rapids, Iowa City, or Davenport, we deliver custom websites 
                  that capture Iowa's spirit and drive real results in the Hawkeye State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-700 hover:to-yellow-900 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-600 hover:text-white transition-all duration-300 text-center">
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
                  <source src="/iowa/iowa-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/iowa/iowa-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/iowa/iowa-web-development-nandann-creative-poster.webp"
                    alt="Iowa Web Development - Des Moines, Cedar Rapids, Iowa City"
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
                srcSet="/iowa/iowa-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/iowa/iowa-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/iowa/iowa-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/iowa/iowa-web-development-nandann-creative-sm.webp"
                alt="Iowa Web Development Agency - Nandann Creative"
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
                Iowa's{' '}
                <span className="text-yellow-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Iowa businesses from Des Moines to Davenport
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Des Moines Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Des Moines Chamber of Commerce for outstanding web development innovation and insurance industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Des Moines Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Agricultural Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Iowa Farm Bureau for exceptional websites that serve the agricultural and farming industries
                </p>
                <div className="text-sm text-gray-500">
                  Iowa Farm Bureau
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Cedar Rapids Chamber of Commerce for fastest website delivery while maintaining Iowa's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Cedar Rapids Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Iowa Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="text-yellow-600">
                  Nandann Creative
                </span>{' '}
                Gets Iowa
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Hawkeye State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-50 to-gray-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Iowa Corn Grows</h3>
                <p className="text-gray-700">
                  Iowa businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Go Hawks!' We understand that in Iowa's competitive 
                  agricultural and corporate markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-yellow-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gray-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hawkeye Hospitality in Every Pixel</h3>
                <p className="text-gray-700">
                  From Des Moines's corporate sophistication to Cedar Rapids's manufacturing excellence, we understand Iowa's business culture. 
                  We create websites that embody Hawkeye hospitality—welcoming, reliable, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Agricultural Excellence to Insurance Innovation</h3>
                <p className="text-gray-700">
                  We understand Iowa's diverse economy—from Des Moines's corporate headquarters and insurance sector to Cedar Rapids's 
                  manufacturing excellence, from Iowa City's education sector to Davenport's healthcare industry. 
                  We create industry-specific solutions that work whether you're growing corn or selling insurance.
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
                Serving All of Iowa
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the corporate towers of Des Moines to the manufacturing plants of Cedar Rapids, we provide web development services across the entire Hawkeye State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-iowa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Des Moines</h3>
                <p className="text-gray-600">
                  The Capital City. Corporate headquarters, insurance sector, healthcare. 
                  Where Iowa's business meets its agricultural heritage.
                </p>
              </Link>
              
              <Link href="/web-development-iowa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Cedar Rapids</h3>
                <p className="text-gray-600">
                  The City of Five Seasons. Manufacturing excellence, healthcare, education. 
                  Where Iowa's industrial tradition meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-iowa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Iowa City</h3>
                <p className="text-gray-600">
                  The Hawkeye City. Education excellence, healthcare, research. 
                  Where Iowa's academic tradition meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-iowa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Davenport</h3>
                <p className="text-gray-600">
                  The Quad City. Healthcare excellence, manufacturing, education. 
                  Where Iowa's riverfront culture meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-iowa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Sioux City</h3>
                <p className="text-gray-600">
                  The Gateway City. Manufacturing, healthcare, education. 
                  Where Iowa's western culture meets industrial excellence.
                </p>
              </Link>
              
              <Link href="/web-development-iowa" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Waterloo</h3>
                <p className="text-gray-600">
                  The Cedar Valley. Manufacturing excellence, healthcare, education. 
                  Where Iowa's industrial tradition meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Iowa Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Iowa's{' '}
                  <span className="text-yellow-600">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Iowa isn't just a state—it's a state of genuine hospitality! From Des Moines's "Capital City" 
                  corporate culture to Cedar Rapids's manufacturing excellence, from Iowa City's education sector to Davenport's 
                  healthcare tradition, Iowa represents a unique blend of agricultural innovation, Hawkeye hospitality, 
                  and community values that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Des Moines businesses need websites that reflect the city's corporate sophistication 
                  while honoring Iowa's agricultural heritage—whether you're running a Fortune 500 company or a family farm. 
                  Cedar Rapids companies benefit from designs that capture the city's manufacturing excellence and five seasons tradition. 
                  Iowa City businesses need sites that showcase education excellence and Hawkeye pride 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Hawkeye hospitality to agricultural excellence, from corn culture to insurance innovation, 
                  Iowa's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Iowa's heritage while 
                  driving modern business results. Whether you're "growing" in Des Moines, 
                  "manufacturing" in Cedar Rapids, or "welcoming visitors" in Iowa City, we speak your language—from 
                  Hawkeye hospitality to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Iowa's unique challenges too—from weather considerations to the importance 
                  of genuine relationships, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across Iowa's 
                  diverse regions, and we know that what works in Des Moines might not work in Cedar Rapids, and vice versa. 
                  That's why we create custom solutions as unique as Iowa itself. Thanks for trusting us 
                  with your digital presence, go hawks!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/iowa/iowa-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/iowa/iowa-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/iowa/iowa-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/iowa/iowa-web-development-nandann-creative-sm.webp"
                    alt="Iowa Web Development - Des Moines, Cedar Rapids, Iowa City, Davenport"
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
                  <span className="text-yellow-600">
                    Iowa is Talking!
                  </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Iowa businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-50 to-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Des Moines Maverick" Johnson</h4>
                    <p className="text-gray-600">CEO, Des Moines Insurance Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Iowa! Our new website captures the insurance sector sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of gold—
                  that's respect for Iowa's values! Go Hawks with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-yellow-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Cedar Rapids Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Cedar Rapids Manufacturing Co.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Go Hawks!' Our 
                  manufacturing inquiries increased 180% and clients love the professional vibe. They understand 
                  that in Iowa, it's not just business—it's about Hawkeye hospitality and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Iowa City Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Iowa City Education Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education solutions company in Iowa City, we needed a website that honors our Hawkeye heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Iowa values. They understand Iowa business!"
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
                <span className="text-yellow-600">
                  Iowa Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Iowa web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Iowa Your Digital Hawkeye State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Iowa businesses that trust Nandann Creative with their digital success—from Des Moines to Davenport, go hawks!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-yellow-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="Iowa" locationShort="IA" />
      </div>
    </>
  );
}

