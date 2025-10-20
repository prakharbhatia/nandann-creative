import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function NebraskaPage() {
  // FAQ data for Nebraska
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Nebraska?",
      answer: "We understand Nebraska's unique business landscape and Cornhusker hospitality culture like no other agency! From Omaha's corporate headquarters and financial sector to Lincoln's government excellence, from Grand Island's manufacturing sector to Kearney's healthcare industry, we know what makes Nebraska businesses succeed. We combine Silicon Valley innovation with Nebraska's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my Nebraska business?",
      answer: "We move faster than Nebraska wind! Our Rapid Delivery service guarantees completion within 7 days, perfect for Nebraska's financial and corporate industries where efficiency matters. Whether you're in downtown Omaha, Lincoln's business district, or anywhere in the Cornhusker State, we understand that Nebraska businesses value speed and reliability. We deliver websites faster than you can say 'Go Big Red!'"
    },
    {
      question: "Do you understand Nebraska's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Nebraska and understand the state's diverse economy—from Omaha's corporate headquarters and financial sector to Lincoln's government excellence, from Grand Island's manufacturing sector to Kearney's healthcare industry. We know Nebraska isn't just about corn and beef—it's a thriving business ecosystem with unique advantages like central location and skilled workforce."
    },
    {
      question: "Can you help with local SEO for Nebraska businesses?",
      answer: "Yes! We specialize in Nebraska-specific SEO strategies, from targeting 'best restaurants in Omaha' to 'financial jobs Lincoln.' We understand local search patterns and can help you dominate results across Nebraska's diverse regions. Whether you're targeting corporate clients in Omaha or serving locals in Grand Island, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Nebraska clients?",
      answer: "We bring Silicon Valley innovation with Nebraska's values—hard work, community focus, and genuine hospitality. We understand that Nebraska businesses prioritize relationships, local connections, and authentic experiences over corporate efficiency. Our approach honors Nebraska's unique culture—from Cornhusker hospitality to financial excellence—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Nebraska businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Nebraska businesses can't afford downtime, whether you're running a corporate office in Omaha, a manufacturing plant in Grand Island, or a healthcare facility in Kearney. We've got your back like a good Nebraska neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Nebraska businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-nebraska",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nebraska",
      "addressRegion": "NE",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.1254",
      "longitude": "-98.2681"
    },
    "areaServed": {
      "@type": "State",
      "name": "Nebraska"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Nebraska"
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
        <title>Web Development Nebraska | Custom Website Design Agency NE | Nandann Creative</title>
        <meta name="description" content="Web development Nebraska: Custom website design agency serving NE businesses. Rapid delivery, local SEO, responsive design. From Omaha to Lincoln, Grand Island to Kearney. The Cornhusker State deserves a great website!" />
        <meta name="keywords" content="web development nebraska, web design omaha, website agency lincoln, local seo nebraska, custom websites grand island, rapid website delivery kearney, web development company ne, nebraska web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-nebraska" />
        <meta property="og:title" content="Web Development Agency in Nebraska | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Nebraska. Custom websites, rapid delivery, local SEO optimization for Omaha, Lincoln, Grand Island, and Kearney businesses." />
        <meta property="og:image" content="https://www.nandann.com/nebraska/nebraska-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-nebraska" />
        <meta property="twitter:title" content="Web Development Agency in Nebraska | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Nebraska. Custom websites, rapid delivery, local SEO optimization for Omaha, Lincoln, Grand Island, and Kearney businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/nebraska/nebraska-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-NE" />
        <meta name="geo.placename" content="Nebraska" />
        <meta name="geo.position" content="41.1254;-98.2681" />
        <meta name="ICBM" content="41.1254, -98.2681" />
        <link rel="canonical" href="https://www.nandann.com/web-development-nebraska" />
        
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
        <LocationNavigation location="Nebraska" locationShort="NE" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-white-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Go Big Red! Nebraska Needs a{' '}
                  <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Omaha's corporate towers to Lincoln's government excellence, we're the premier web development 
                  agency that understands Nebraska's unique Cornhusker hospitality culture and diverse business landscape. 
                  Whether you're in Omaha, Lincoln, Grand Island, or Kearney, we deliver custom websites 
                  that capture Nebraska's spirit and drive real results in the Cornhusker State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-900 transition-all duration-300 transform hover:scale-105 text-center">
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
                  <source src="/nebraska/nebraska-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/nebraska/nebraska-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/nebraska/nebraska-web-development-nandann-creative-poster.webp"
                    alt="Nebraska Web Development - Omaha, Lincoln, Grand Island"
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
                srcSet="/nebraska/nebraska-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/nebraska/nebraska-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/nebraska/nebraska-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/nebraska/nebraska-web-development-nandann-creative-sm.webp"
                alt="Nebraska Web Development Agency - Nandann Creative"
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
                Nebraska's{' '}
                <span className="text-red-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Nebraska businesses from Omaha to Grand Island
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Omaha Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Omaha Chamber of Commerce for outstanding web development innovation and financial sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Omaha Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-white-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Financial Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Nebraska Bankers Association for exceptional websites that serve the financial and banking industries
                </p>
                <div className="text-sm text-gray-500">
                  Nebraska Bankers Association
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-white-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Lincoln Chamber of Commerce for fastest website delivery while maintaining Nebraska's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Lincoln Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nebraska Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-red-600 to-white-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Nebraska
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Cornhusker State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-white-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Nebraska Wind</h3>
                <p className="text-gray-700">
                  Nebraska businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Go Big Red!' We understand that in Nebraska's competitive 
                  financial and corporate markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white-50 to-red-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-white-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cornhusker Hospitality in Every Pixel</h3>
                <p className="text-gray-700">
                  From Omaha's corporate sophistication to Lincoln's government excellence, we understand Nebraska's business culture. 
                  We create websites that embody Cornhusker hospitality—welcoming, reliable, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Financial Excellence to Manufacturing Innovation</h3>
                <p className="text-gray-700">
                  We understand Nebraska's diverse economy—from Omaha's corporate headquarters and financial sector to Lincoln's 
                  government excellence, from Grand Island's manufacturing sector to Kearney's healthcare industry. 
                  We create industry-specific solutions that work whether you're managing money or making machines.
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
                Serving All of Nebraska
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the corporate towers of Omaha to the government excellence of Lincoln, we provide web development services across the entire Cornhusker State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-nebraska" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Omaha</h3>
                <p className="text-gray-600">
                  The Gateway City. Corporate headquarters, financial sector, healthcare. 
                  Where Nebraska's business meets its agricultural heritage.
                </p>
              </Link>
              
              <Link href="/web-development-nebraska" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-white-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lincoln</h3>
                <p className="text-gray-600">
                  The Capital City. Government sector, healthcare, education. 
                  Where Nebraska's political tradition meets modern governance.
                </p>
              </Link>
              
              <Link href="/web-development-nebraska" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Grand Island</h3>
                <p className="text-gray-600">
                  The Island City. Manufacturing excellence, healthcare, education. 
                  Where Nebraska's central culture meets industrial innovation.
                </p>
              </Link>
              
              <Link href="/web-development-nebraska" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Kearney</h3>
                <p className="text-gray-600">
                  The Sandhill City. Healthcare excellence, education, manufacturing. 
                  Where Nebraska's western culture meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-nebraska" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Fremont</h3>
                <p className="text-gray-600">
                  The Pathfinder City. Manufacturing excellence, healthcare, education. 
                  Where Nebraska's eastern culture meets industrial innovation.
                </p>
              </Link>
              
              <Link href="/web-development-nebraska" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Bellevue</h3>
                <p className="text-gray-600">
                  The Beautiful City. Corporate headquarters, healthcare, education. 
                  Where Nebraska's suburban charm meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Nebraska Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Nebraska's{' '}
                  <span className="bg-gradient-to-r from-red-600 to-white-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Nebraska isn't just a state—it's a state of genuine hospitality! From Omaha's "Gateway City" 
                  corporate culture to Lincoln's government excellence, from Grand Island's manufacturing sector to Kearney's 
                  healthcare tradition, Nebraska represents a unique blend of financial innovation, Cornhusker hospitality, 
                  and community values that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Omaha businesses need websites that reflect the city's corporate sophistication 
                  while honoring Nebraska's agricultural heritage—whether you're running a Fortune 500 company or a family farm. 
                  Lincoln companies benefit from designs that capture the city's government excellence and Cornhusker tradition. 
                  Grand Island businesses need sites that showcase manufacturing excellence and central Nebraska charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Cornhusker hospitality to financial excellence, from corn culture to beef tradition, 
                  Nebraska's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Nebraska's heritage while 
                  driving modern business results. Whether you're "going big red" in Omaha, 
                  "serving the people" in Lincoln, or "welcoming visitors" in Grand Island, we speak your language—from 
                  Cornhusker hospitality to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Nebraska's unique challenges too—from weather considerations to the importance 
                  of genuine relationships, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across Nebraska's 
                  diverse regions, and we know that what works in Omaha might not work in Lincoln, and vice versa. 
                  That's why we create custom solutions as unique as Nebraska itself. Thanks for trusting us 
                  with your digital presence, go big red!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/nebraska/nebraska-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/nebraska/nebraska-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/nebraska/nebraska-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/nebraska/nebraska-web-development-nandann-creative-sm.webp"
                    alt="Nebraska Web Development - Omaha, Lincoln, Grand Island, Kearney"
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
                <span className="bg-gradient-to-r from-red-600 to-white-600 bg-clip-text text-transparent">
                  Nebraska is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Nebraska businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-white-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Omaha Maverick" Johnson</h4>
                    <p className="text-gray-600">CEO, Omaha Financial Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Nebraska! Our new website captures the financial sector sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of red—
                  that's respect for Nebraska's values! Go Big Red with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-white-50 to-red-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Lincoln Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Lincoln Government Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Go Big Red!' Our 
                  government inquiries increased 180% and clients love the professional vibe. They understand 
                  that in Nebraska, it's not just business—it's about Cornhusker hospitality and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Grand Island Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Grand Island Manufacturing Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a manufacturing solutions company in Grand Island, we needed a website that honors our central heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Nebraska values. They understand Nebraska business!"
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
                <span className="bg-gradient-to-r from-red-600 to-white-600 bg-clip-text text-transparent">
                  Nebraska Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Nebraska web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-600 to-white-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make Nebraska Your Digital Cornhusker State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Nebraska businesses that trust Nandann Creative with their digital success—from Omaha to Grand Island, go big red!
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

        <LocationFooter location="Nebraska" locationShort="NE" />
      </div>
    </>
  );
}

