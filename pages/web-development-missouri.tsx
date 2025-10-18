import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function MissouriPage() {
  // FAQ data for Missouri
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Missouri?",
      answer: "We understand Missouri's unique business landscape and Missouri culture like no other agency! From Kansas City's corporate headquarters and tech innovation to Saint Louis's government sector, from Springfield's healthcare excellence to Columbia's education sector, we know what makes Missouri businesses succeed. We combine Silicon Valley innovation with Missouri's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my Missouri business?",
      answer: "We move faster than a Missouri tornado! Our Rapid Delivery service guarantees completion within 7 days, perfect for Missouri's corporate and healthcare industries where efficiency matters. Whether you're in downtown Kansas City, Saint Louis's business district, or anywhere in the Show-Me State, we understand that Missouri businesses value speed and reliability. We deliver websites faster than you can say 'Show me!'"
    },
    {
      question: "Do you understand Missouri's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Missouri and understand the state's diverse economy—from Kansas City's corporate headquarters and tech innovation to Saint Louis's government sector, from Springfield's healthcare excellence to Columbia's education sector. We know Missouri isn't just about barbecue and blues—it's a thriving business ecosystem with unique advantages like central location and skilled workforce."
    },
    {
      question: "Can you help with local SEO for Missouri businesses?",
      answer: "Yes! We specialize in Missouri-specific SEO strategies, from targeting 'best restaurants in Kansas City' to 'healthcare jobs Saint Louis.' We understand local search patterns and can help you dominate results across Missouri's diverse regions. Whether you're targeting corporate clients in Kansas City or serving locals in Springfield, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Missouri clients?",
      answer: "We bring Silicon Valley innovation with Missouri's values—hard work, community focus, and genuine hospitality. We understand that Missouri businesses prioritize relationships, local connections, and authentic experiences over corporate efficiency. Our approach honors Missouri's unique culture—from Missouri hospitality to healthcare excellence—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Missouri businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Missouri businesses can't afford downtime, whether you're running a corporate office in Kansas City, a healthcare facility in Springfield, or a government office in Saint Louis. We've got your back like a good Missouri neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Missouri businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-missouri",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Missouri",
      "addressRegion": "MO",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.5729",
      "longitude": "-92.1893"
    },
    "areaServed": {
      "@type": "State",
      "name": "Missouri"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Missouri"
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
        <title>Web Development Missouri | Custom Website Design Agency MO | Nandann Creative</title>
        <meta name="description" content="Web development Missouri: Custom website design agency serving MO businesses. Rapid delivery, local SEO, responsive design. From Kansas City to Saint Louis, Springfield to Columbia. The Show-Me State deserves a great website!" />
        <meta name="keywords" content="web development missouri, web design kansas city, website agency saint louis, local seo missouri, custom websites springfield, rapid website delivery columbia, web development company mo, missouri web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-missouri" />
        <meta property="og:title" content="Web Development Agency in Missouri | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Missouri. Custom websites, rapid delivery, local SEO optimization for Kansas City, Saint Louis, Springfield, and Columbia businesses." />
        <meta property="og:image" content="https://www.nandann.com/missouri/missouri-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-missouri" />
        <meta property="twitter:title" content="Web Development Agency in Missouri | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Missouri. Custom websites, rapid delivery, local SEO optimization for Kansas City, Saint Louis, Springfield, and Columbia businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/missouri/missouri-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-MO" />
        <meta name="geo.placename" content="Missouri" />
        <meta name="geo.position" content="38.5729;-92.1893" />
        <meta name="ICBM" content="38.5729, -92.1893" />
        <link rel="canonical" href="https://www.nandann.com/web-development-missouri" />
        
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
        <LocationNavigation location="Missouri" locationShort="MO" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-blue-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Show Me a{' '}
                  <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Kansas City's corporate towers to Saint Louis's government buildings, we're the premier web development 
                  agency that understands Missouri's unique Missouri hospitality culture and diverse business landscape. 
                  Whether you're in Kansas City, Saint Louis, Springfield, or Columbia, we deliver custom websites 
                  that capture Missouri's spirit and drive real results in the Show-Me State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-center">
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
                  <source src="/missouri/missouri-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/missouri/missouri-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/missouri/missouri-web-development-nandann-creative-poster.webp"
                    alt="Missouri Web Development - Kansas City, Saint Louis, Springfield"
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
                srcSet="/missouri/missouri-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/missouri/missouri-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/missouri/missouri-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/missouri/missouri-web-development-nandann-creative-sm.webp"
                alt="Missouri Web Development Agency - Nandann Creative"
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
                Missouri's{' '}
                <span className="text-red-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Missouri businesses from Kansas City to Springfield
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kansas City Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Kansas City Chamber of Commerce for outstanding web development innovation and corporate industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Kansas City Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Healthcare Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Missouri Hospital Association for exceptional websites that serve the healthcare and medical industries
                </p>
                <div className="text-sm text-gray-500">
                  Missouri Hospital Association
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
                  Honored by Saint Louis Chamber of Commerce for fastest website delivery while maintaining Missouri's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Saint Louis Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missouri Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Missouri
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Show-Me State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than a Missouri Tornado</h3>
                <p className="text-gray-700">
                  Missouri businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Show me!' We understand that in Missouri's competitive 
                  corporate and healthcare markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Missouri Hospitality in Every Pixel</h3>
                <p className="text-gray-700">
                  From Kansas City's corporate sophistication to Saint Louis's government excellence, we understand Missouri's business culture. 
                  We create websites that embody Missouri hospitality—welcoming, reliable, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Corporate Towers to Healthcare Excellence</h3>
                <p className="text-gray-700">
                  We understand Missouri's diverse economy—from Kansas City's corporate headquarters and tech innovation to Saint Louis's 
                  government sector, from Springfield's healthcare excellence to Columbia's education sector. 
                  We create industry-specific solutions that work whether you're running corporations or saving lives.
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
                Serving All of Missouri
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the corporate towers of Kansas City to the government buildings of Saint Louis, we provide web development services across the entire Show-Me State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-missouri" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Kansas City</h3>
                <p className="text-gray-600">
                  The City of Fountains. Corporate headquarters, tech innovation, barbecue culture. 
                  Where Missouri's business meets its culinary heritage.
                </p>
              </Link>
              
              <Link href="/web-development-missouri" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Saint Louis</h3>
                <p className="text-gray-600">
                  The Gateway City. Government sector, healthcare, education. 
                  Where Missouri's political tradition meets modern governance.
                </p>
              </Link>
              
              <Link href="/web-development-missouri" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Springfield</h3>
                <p className="text-gray-600">
                  The Queen City. Healthcare excellence, education, manufacturing. 
                  Where Missouri's southern culture meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-missouri" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Columbia</h3>
                <p className="text-gray-600">
                  The Athens of Missouri. Education excellence, healthcare, research. 
                  Where Missouri's academic tradition meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-missouri" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Independence</h3>
                <p className="text-gray-600">
                  The Queen City of the Trails. Healthcare, education, manufacturing. 
                  Where Missouri's historical tradition meets modern business.
                </p>
              </Link>
              
              <Link href="/web-development-missouri" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Jefferson City</h3>
                <p className="text-gray-600">
                  The Capital City. Government sector, healthcare, education. 
                  Where Missouri's political tradition meets modern governance.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Missouri Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Missouri's{' '}
                  <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Missouri isn't just a state—it's a state of genuine hospitality! From Kansas City's "City of Fountains" 
                  corporate culture to Saint Louis's government excellence, from Springfield's healthcare excellence to Columbia's 
                  education tradition, Missouri represents a unique blend of corporate innovation, Missouri hospitality, 
                  and community values that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Kansas City businesses need websites that reflect the city's corporate sophistication 
                  while honoring Missouri's barbecue heritage—whether you're running a Fortune 500 company or a BBQ joint. 
                  Saint Louis companies benefit from designs that capture the city's government excellence and Gateway Arch tradition. 
                  Springfield businesses need sites that showcase healthcare excellence and southern Missouri charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Missouri hospitality to healthcare excellence, from barbecue culture to blues music, 
                  Missouri's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Missouri's heritage while 
                  driving modern business results. Whether you're "showing them" in Kansas City, 
                  "serving the people" in Saint Louis, or "welcoming visitors" in Springfield, we speak your language—from 
                  Missouri hospitality to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Missouri's unique challenges too—from tornado season considerations to the importance 
                  of genuine relationships, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across Missouri's 
                  diverse regions, and we know that what works in Kansas City might not work in Springfield, and vice versa. 
                  That's why we create custom solutions as unique as Missouri itself. Thanks for trusting us 
                  with your digital presence, show me!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/missouri/missouri-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/missouri/missouri-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/missouri/missouri-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/missouri/missouri-web-development-nandann-creative-sm.webp"
                    alt="Missouri Web Development - Kansas City, Saint Louis, Springfield, Columbia"
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
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Missouri is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Missouri businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Kansas City Maverick" Johnson</h4>
                    <p className="text-gray-600">CEO, Kansas City Corporate Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Missouri! Our new website captures the corporate sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of red—
                  that's respect for Missouri's values! Show me with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Saint Louis Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Saint Louis Government Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Show me!' Our 
                  government inquiries increased 180% and clients love the professional vibe. They understand 
                  that in Missouri, it's not just business—it's about Missouri hospitality and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Springfield Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Springfield Healthcare Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a healthcare solutions company in Springfield, we needed a website that honors our southern heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Missouri values. They understand Missouri business!"
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
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Missouri Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Missouri web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Missouri Your Digital Show-Me State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Missouri businesses that trust Nandann Creative with their digital success—from Kansas City to Springfield, show me!
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

        <LocationFooter location="Missouri" locationShort="MO" />
      </div>
    </>
  );
}

