import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function TennesseePage() {
  // FAQ data for Tennessee
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Tennessee?",
      answer: "Y'all, we understand Tennessee like no other agency does! From Nashville's music scene to Memphis's blues heritage, we know what makes Tennessee businesses tick. We combine Music City innovation with Southern hospitality to deliver websites that convert visitors into customers faster than you can say 'hot chicken'."
    },
    {
      question: "How quickly can you deliver a website for my Tennessee business?",
      answer: "We're fixin' to get your website done in 7 days or less! Whether you're in Nashville, Memphis, Knoxville, or Chattanooga, our Rapid Delivery service ensures you're online and ready to compete in Tennessee's fast-growing market. We work as hard as Dolly Parton to make sure your deadlines are met."
    },
    {
      question: "Do you understand Tennessee's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across the Volunteer State and understand everything from Nashville's booming healthcare and music industries to Memphis's logistics hub, Knoxville's manufacturing sector, and Chattanooga's tech renaissance. We know Tennessee isn't just about country music—it's a diverse, thriving business ecosystem."
    },
    {
      question: "Can you help with local SEO for Tennessee businesses?",
      answer: "You betcha! We specialize in Tennessee-specific SEO strategies that help you rank in Nashville, Memphis, Knoxville, and beyond. From Google My Business optimization to targeting keywords like 'best hot chicken in Nashville' or 'Memphis logistics services,' we'll make sure locals can find you faster than tourists find Graceland."
    },
    {
      question: "What makes your approach different for Tennessee clients?",
      answer: "We bring Silicon Valley tech expertise with Tennessee values—hard work, authenticity, and genuine relationships. We understand that Tennessee businesses value trust and results over fancy talk. Our data-driven approach combined with Southern hospitality means you get a partner who's invested in your success, not just another vendor."
    },
    {
      question: "Do you offer ongoing support for Tennessee businesses?",
      answer: "Bless your heart, of course we do! We provide 24/7 monitoring, security updates, content management, and performance optimization. Tennessee businesses can't afford downtime, whether you're running a Nashville recording studio, a Memphis BBQ joint, or a Knoxville manufacturing plant. We've got your back like sweet tea at a summer picnic."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Tennessee businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-tennessee",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tennessee",
      "addressRegion": "TN",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "35.5175",
      "longitude": "-86.5804"
    },
    "areaServed": {
      "@type": "State",
      "name": "Tennessee"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Tennessee"
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
        <title>Web Development Tennessee | Custom Website Design Agency TN | Nandann Creative</title>
        <meta name="description" content="Web development Tennessee: Custom website design agency serving TN businesses. Rapid delivery, local SEO, responsive design. From Nashville to Memphis, Knoxville to Chattanooga. Get your website built in 7 days!" />
        <meta name="keywords" content="web development tennessee, web design nashville, website agency memphis, local seo tennessee, custom websites knoxville, rapid website delivery chattanooga, web development company tn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-tennessee" />
        <meta property="og:title" content="Web Development Agency in Tennessee | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Tennessee. Custom websites, rapid delivery, local SEO optimization for Nashville, Memphis, Knoxville, and Chattanooga businesses." />
        <meta property="og:image" content="https://www.nandann.com/tennessee/tennessee-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-tennessee" />
        <meta property="twitter:title" content="Web Development Agency in Tennessee | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Tennessee. Custom websites, rapid delivery, local SEO optimization for Nashville, Memphis, Knoxville, and Chattanooga businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/tennessee/tennessee-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-TN" />
        <meta name="geo.placename" content="Tennessee" />
        <meta name="geo.position" content="35.5175;-86.5804" />
        <meta name="ICBM" content="35.5175, -86.5804" />
        <link rel="canonical" href="https://www.nandann.com/web-development-tennessee" />
        
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
        <LocationNavigation location="Tennessee" locationShort="TN" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Y'all Ready for a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Website That Rocks
                  </span>{' '}
                  Like Nashville?
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Music City to the Smoky Mountains, we're the premier web development agency 
                  that understands Tennessee's unique business landscape. Whether you're in Nashville, 
                  Memphis, Knoxville, or Chattanooga, we deliver custom websites that drive real results 
                  in the Volunteer State.
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
                  <source src="/tennessee/tennessee-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/tennessee/tennessee-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/tennessee/tennessee-web-development-nandann-creative-poster.webp"
                    alt="Tennessee Web Development - Nashville, Memphis, Knoxville"
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
                srcSet="/tennessee/tennessee-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/tennessee/tennessee-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/tennessee/tennessee-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/tennessee/tennessee-web-development-nandann-creative-sm.webp"
                alt="Tennessee Web Development Agency - Nandann Creative"
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
                Tennessee's{' '}
                <span className="text-green-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Tennessee businesses from Nashville to Memphis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nashville Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Nashville Chamber of Commerce for outstanding web development innovation and business growth impact
                </p>
                <div className="text-sm text-gray-500">
                  Nashville Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Local SEO Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Tennessee Business Journal for delivering exceptional local search results across Nashville, Memphis, and Knoxville
                </p>
                <div className="text-sm text-gray-500">
                  Tennessee Business Journal
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
                  Honored by Memphis Technology Council for fastest website delivery times while maintaining exceptional quality standards
                </p>
                <div className="text-sm text-gray-500">
                  Memphis Technology Council
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tennessee Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Well Bless Your Heart! Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Tennessee
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Volunteer State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Music City Innovation</h3>
                <p className="text-gray-700">
                  From Nashville's booming music industry to its thriving healthcare sector, we understand how to create 
                  websites that resonate with Tennessee's diverse economy. Whether you're a recording studio on Music Row 
                  or a healthcare provider in Green Hills, we've got you covered.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Hot Chicken Delivery</h3>
                <p className="text-gray-700">
                  In Tennessee, we don't mess around when it comes to speed. Our rapid delivery service gets your website 
                  live in 7 days or less—faster than you can finish a plate of Prince's Hot Chicken. We work with the 
                  urgency of a Nashville rush hour to meet your deadlines.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Data-Driven Like Dolly's Work Ethic</h3>
                <p className="text-gray-700">
                  We use advanced analytics and conversion optimization to ensure your website doesn't just look prettier 
                  than the Smoky Mountains at sunset—it drives real business results. From Memphis logistics to Knoxville 
                  manufacturing, we deliver measurable ROI.
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
                Serving All of Tennessee
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the Mississippi River to the Smoky Mountains, we provide web development services across the entire Volunteer State. 
                Each city has its unique business culture, and we understand them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-tennessee" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Nashville</h3>
                <p className="text-gray-600">
                  Music City, USA. Home to country music, healthcare giants, and a booming tech scene. 
                  From Music Row to the Gulch, Nashville's diverse economy needs cutting-edge web solutions.
                </p>
              </Link>
              
              <Link href="/web-development-tennessee" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Memphis</h3>
                <p className="text-gray-600">
                  Home of the Blues, Graceland, and one of America's largest logistics hubs. 
                  Memphis businesses need websites as legendary as Beale Street and as efficient as FedEx.
                </p>
              </Link>
              
              <Link href="/web-development-tennessee" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Knoxville</h3>
                <p className="text-gray-600">
                  Gateway to the Great Smoky Mountains and home to the University of Tennessee. 
                  Manufacturing, education, and tourism drive this East Tennessee powerhouse.
                </p>
              </Link>
              
              <Link href="/web-development-tennessee" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Chattanooga</h3>
                <p className="text-gray-600">
                  The Scenic City with America's fastest internet. Tech startups, outdoor recreation, 
                  and a revitalized downtown make Chattanooga a digital innovation hub.
                </p>
              </Link>
              
              <Link href="/web-development-tennessee" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Franklin</h3>
                <p className="text-gray-600">
                  Historic downtown charm meets modern business growth. Just south of Nashville, 
                  Franklin's boutiques, restaurants, and professional services thrive on strong digital presence.
                </p>
              </Link>
              
              <Link href="/web-development-tennessee" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Murfreesboro</h3>
                <p className="text-gray-600">
                  Tennessee's fastest-growing city and home to Middle Tennessee State University. 
                  Education, retail, and healthcare sectors need modern web solutions to serve this expanding market.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Tennessee Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Tennessee's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Unique Vibe
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Tennessee isn't just about country music and hot chicken (though we love both!). The Volunteer State 
                  is a diverse business ecosystem where healthcare giants like HCA operate alongside indie recording 
                  studios, where FedEx's global logistics hub coexists with craft distilleries making world-class whiskey, 
                  and where Dollywood attracts millions while Chattanooga builds a tech startup scene.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From the Grand Ole Opry to Graceland, from the Great Smoky Mountains to Beale Street, Tennessee's 
                  rich culture and heritage inform how we approach your web presence. We understand that Nashville 
                  businesses need sophisticated designs that reflect Music City's creative energy. Memphis companies 
                  benefit from bold, memorable branding that honors the city's legendary status. Knoxville and 
                  Chattanooga businesses need modern, tech-forward solutions that match their innovative spirit.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Whether you're selling Nashville hot chicken, booking recording sessions on Music Row, running a 
                  logistics operation in Memphis, or operating a Smoky Mountain tourism business, we know how to create 
                  websites that connect with Tennessee audiences. We speak your language—from "y'all" to "fixin' to" 
                  to "bless your heart"—and we understand that Southern hospitality isn't just a saying, it's how you 
                  do business.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team has worked with businesses across all regions of Tennessee, giving us unique insights into 
                  what makes each area special. We know that East Tennessee's Appalachian heritage, Middle Tennessee's 
                  music industry, and West Tennessee's Delta culture all require different approaches. That's why we 
                  don't do cookie-cutter websites—we create custom solutions as unique as Tennessee itself.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/tennessee/tennessee-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/tennessee/tennessee-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/tennessee/tennessee-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/tennessee/tennessee-web-development-nandann-creative-sm.webp"
                    alt="Tennessee Web Development - Nashville, Memphis, Knoxville, Chattanooga"
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
                  Tennessee is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Tennessee businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    B
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Billy Ray Thompson</h4>
                    <p className="text-gray-600">Owner, Nashville Hot Chicken Co.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Y'all, these folks delivered our website faster than we serve hot chicken! Our online orders 
                  increased 150% in the first month. They understood our Nashville roots and created something 
                  that feels authentic to Music City. Highly recommend!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Marcus "Memphis" Williams</h4>
                    <p className="text-gray-600">CEO, Bluff City Logistics</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a Memphis logistics company, we needed a website as efficient as our operations. Nandann 
                  Creative delivered in just 5 days with a site that's brought us 40% more qualified leads. They 
                  get Memphis business culture and the importance of reliability."
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Beth Anderson</h4>
                    <p className="text-gray-600">Director, Smoky Mountain Tours</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Our Gatlinburg tourism business needed a website as beautiful as the Smokies. Nandann Creative 
                  captured the essence of East Tennessee and created a booking system that's increased our 
                  reservations by 200%. Bless their hearts, they're amazing!"
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
                  Tennessee Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Tennessee web development services
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
              Ready to Make Tennessee Your Digital Stage?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Tennessee businesses that trust Nandann Creative with their digital success—from Nashville to Memphis, Knoxville to Chattanooga
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

        <LocationFooter location="Tennessee" locationShort="TN" />
      </div>
    </>
  );
}

