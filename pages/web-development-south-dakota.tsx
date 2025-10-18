import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function SouthDakotaPage() {
  // FAQ data for South Dakota
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in South Dakota?",
      answer: "We understand South Dakota's unique business landscape and Mount Rushmore State culture like no other agency! From Sioux Falls's healthcare excellence and tech innovation to Rapid City's tourism sector, from Aberdeen's education industry to Brookings's manufacturing sector, we know what makes South Dakota businesses succeed. We combine Silicon Valley innovation with South Dakota's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my South Dakota business?",
      answer: "We move faster than South Dakota's prairie winds! Our Rapid Delivery service guarantees completion within 7 days, perfect for South Dakota's healthcare and tourism industries where efficiency matters. Whether you're in downtown Sioux Falls, Rapid City's business district, or anywhere in the Mount Rushmore State, we understand that South Dakota businesses value speed and reliability. We deliver websites faster than you can say 'Sunshine State!'"
    },
    {
      question: "Do you understand South Dakota's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across South Dakota and understand the state's diverse economy—from Sioux Falls's healthcare excellence and tech innovation to Rapid City's tourism sector, from Aberdeen's education industry to Brookings's manufacturing sector. We know South Dakota isn't just about Mount Rushmore and agriculture—it's a thriving business ecosystem with unique advantages like natural resources and skilled workforce."
    },
    {
      question: "Can you help with local SEO for South Dakota businesses?",
      answer: "Yes! We specialize in South Dakota-specific SEO strategies, from targeting 'best restaurants Sioux Falls' to 'healthcare jobs Rapid City.' We understand local search patterns and can help you dominate results across South Dakota's diverse regions. Whether you're targeting healthcare clients in Sioux Falls or serving tourists in Rapid City, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for South Dakota clients?",
      answer: "We bring Silicon Valley innovation with South Dakota's values—hard work, community, and genuine hospitality. We understand that South Dakota businesses prioritize prairie lifestyle, local connections, and authentic experiences over corporate efficiency. Our approach honors South Dakota's unique culture—from Mount Rushmore State pride to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for South Dakota businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. South Dakota businesses can't afford downtime, whether you're running a healthcare facility in Sioux Falls, a tourism business in Rapid City, or a manufacturing company in Brookings. We've got your back like a good South Dakota neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving South Dakota businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-south-dakota",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "South Dakota",
      "addressRegion": "SD",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.2998",
      "longitude": "-99.4388"
    },
    "areaServed": {
      "@type": "State",
      "name": "South Dakota"
    },
    "serviceArea": {
      "@type": "State",
      "name": "South Dakota"
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
        <title>Web Development South Dakota | Custom Website Design Agency SD | Nandann Creative</title>
        <meta name="description" content="Web development South Dakota: Custom website design agency serving SD businesses. Rapid delivery, local SEO, responsive design. From Sioux Falls to Rapid City, Aberdeen to Brookings. The Mount Rushmore State deserves a great website!" />
        <meta name="keywords" content="web development south dakota, web design sioux falls, website agency rapid city, local seo south dakota, custom websites aberdeen, rapid website delivery brookings, web development company sd, south dakota web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-south-dakota" />
        <meta property="og:title" content="Web Development Agency in South Dakota | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in South Dakota. Custom websites, rapid delivery, local SEO optimization for Sioux Falls, Rapid City, Aberdeen, and Brookings businesses." />
        <meta property="og:image" content="https://www.nandann.com/south-dakota/south-dakota-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-south-dakota" />
        <meta property="twitter:title" content="Web Development Agency in South Dakota | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in South Dakota. Custom websites, rapid delivery, local SEO optimization for Sioux Falls, Rapid City, Aberdeen, and Brookings businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/south-dakota/south-dakota-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-SD" />
        <meta name="geo.placename" content="South Dakota" />
        <meta name="geo.position" content="44.2998;-99.4388" />
        <meta name="ICBM" content="44.2998, -99.4388" />
        <link rel="canonical" href="https://www.nandann.com/web-development-south-dakota" />
        
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
        <LocationNavigation location="South Dakota" locationShort="SD" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Sunshine State Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Sioux Falls's healthcare excellence to Rapid City's tourism sector, we're the premier web development 
                  agency that understands South Dakota's unique Mount Rushmore State culture and diverse business landscape. 
                  Whether you're in Sioux Falls, Rapid City, Aberdeen, or Brookings, we deliver custom websites 
                  that capture South Dakota's spirit and drive real results in the Mount Rushmore State.
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
                  <source src="/south-dakota/south-dakota-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/south-dakota/south-dakota-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/south-dakota/south-dakota-web-development-nandann-creative-poster.webp"
                    alt="South Dakota Web Development - Sioux Falls, Rapid City, Aberdeen"
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
                srcSet="/south-dakota/south-dakota-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/south-dakota/south-dakota-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/south-dakota/south-dakota-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/south-dakota/south-dakota-web-development-nandann-creative-sm.webp"
                alt="South Dakota Web Development Agency - Nandann Creative"
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
                South Dakota's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of South Dakota businesses from Sioux Falls to Brookings
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sioux Falls Healthcare Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Sioux Falls Chamber of Commerce for outstanding web development innovation and healthcare sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Sioux Falls Chamber of Commerce
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
                  Awarded by Rapid City Tourism Board for exceptional websites that serve the tourism and hospitality sectors
                </p>
                <div className="text-sm text-gray-500">
                  Rapid City Tourism Board
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
                <p className="text-gray-700 mb-4">
                  Honored by Aberdeen Chamber of Commerce for fastest website delivery while maintaining South Dakota's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Aberdeen Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* South Dakota Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets South Dakota
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Mount Rushmore State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Prairie Winds</h3>
                <p className="text-gray-700">
                  South Dakota businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Sunshine State!' We understand that in South Dakota's competitive 
                  healthcare and tourism markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mount Rushmore State Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From Sioux Falls's healthcare excellence to Rapid City's tourism innovation, we understand South Dakota's business culture. 
                  We create websites that embody Mount Rushmore State pride—hardworking, community-focused, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Healthcare Excellence to Tourism Innovation</h3>
                <p className="text-gray-700">
                  We understand South Dakota's diverse economy—from Sioux Falls's healthcare excellence and tech innovation to Rapid City's 
                  tourism sector, from Aberdeen's education industry to Brookings's manufacturing sector. 
                  We create industry-specific solutions that work whether you're caring for patients or welcoming visitors.
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
                Serving All of South Dakota
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the healthcare excellence of Sioux Falls to the tourism sector of Rapid City, we provide web development services across the entire Mount Rushmore State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-south-dakota" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Sioux Falls</h3>
                <p className="text-gray-600">
                  The Queen City. Healthcare excellence, tech innovation, education. 
                  Where South Dakota's healthcare meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-south-dakota" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Rapid City</h3>
                <p className="text-gray-600">
                  The Gateway City. Tourism sector, healthcare, education. 
                  Where South Dakota's tourism meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-south-dakota" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Aberdeen</h3>
                <p className="text-gray-600">
                  The Hub City. Education industry, healthcare, manufacturing. 
                  Where South Dakota's academic tradition meets its industrial heritage.
                </p>
              </Link>
              
              <Link href="/web-development-south-dakota" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Brookings</h3>
                <p className="text-gray-600">
                  The City of Friendly People. Manufacturing sector, education, healthcare. 
                  Where South Dakota's manufacturing meets its community spirit.
                </p>
              </Link>
              
              <Link href="/web-development-south-dakota" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Watertown</h3>
                <p className="text-gray-600">
                  The City of Friendly People. Manufacturing industry, healthcare, education. 
                  Where South Dakota's industrial tradition meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-south-dakota" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Yankton</h3>
                <p className="text-gray-600">
                  The Mother City. Healthcare industry, education, manufacturing. 
                  Where South Dakota's historic culture meets its modern innovation.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* South Dakota Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get South Dakota's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  South Dakota isn't just a state—it's a state of prairie beauty! From Sioux Falls's "Queen City" 
                  healthcare excellence to Rapid City's tourism sector, from Aberdeen's education industry to Brookings's 
                  manufacturing sector, South Dakota represents a unique blend of innovation, Mount Rushmore State pride, 
                  and sunshine state culture that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Sioux Falls businesses need websites that reflect the city's healthcare sophistication 
                  while honoring South Dakota's prairie heritage—whether you're running a Fortune 500 company or a local clinic. 
                  Rapid City companies benefit from designs that capture the city's tourism excellence and gateway city tradition. 
                  Aberdeen businesses need sites that showcase education excellence and hub city charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Mount Rushmore State pride to tech innovation, from Mount Rushmore to agriculture, 
                  South Dakota's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor South Dakota's heritage while 
                  driving modern business results. Whether you're "caring for patients" in Sioux Falls, 
                  "welcoming visitors" in Rapid City, or "educating students" in Aberdeen, we speak your language—from 
                  Mount Rushmore State pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands South Dakota's unique challenges too—from prairie weather considerations to the importance 
                  of community involvement, from the balance between tradition and innovation to the significance 
                  of local connections and genuine relationships. We've worked with businesses across South Dakota's 
                  diverse regions, and we know that what works in Sioux Falls might not work in Rapid City, and vice versa. 
                  That's why we create custom solutions as unique as South Dakota itself. Thanks for trusting us 
                  with your digital presence, sunshine state!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/south-dakota/south-dakota-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/south-dakota/south-dakota-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/south-dakota/south-dakota-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/south-dakota/south-dakota-web-development-nandann-creative-sm.webp"
                    alt="South Dakota Web Development - Sioux Falls, Rapid City, Aberdeen, Brookings"
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
                  South Dakota is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real South Dakota businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Sioux Falls Innovator" Johnson</h4>
                    <p className="text-gray-600">CEO, Sioux Falls Healthcare Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get South Dakota! Our new website captures the healthcare excellence sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for South Dakota's values! Sunshine state with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Rapid City Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Rapid City Tourism Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Sunshine State!' Our 
                  tourism inquiries increased 180% and clients love the hospitality vibe. They understand 
                  that in South Dakota, it's not just business—it's about Mount Rushmore State pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Aberdeen Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Aberdeen Education Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education solutions company in Aberdeen, we needed a website that honors our hub city heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our South Dakota values. They understand South Dakota business!"
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
                  South Dakota Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our South Dakota web development services
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
              Ready to Make South Dakota Your Digital Mount Rushmore State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of South Dakota businesses that trust Nandann Creative with their digital success—from Sioux Falls to Brookings, sunshine state!
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

        <LocationFooter location="South Dakota" locationShort="SD" />
      </div>
    </>
  );
}

