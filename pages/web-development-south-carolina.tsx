import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function SouthCarolinaPage() {
  // FAQ data for South Carolina
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in South Carolina?",
      answer: "We understand South Carolina's unique business landscape and Southern hospitality culture like no other agency! From Charleston's tourism and hospitality industry to Columbia's government sector, from Greenville's manufacturing and tech scene to Myrtle Beach's entertainment industry, we know what makes South Carolina businesses succeed. We combine Silicon Valley innovation with South Carolina's values of hospitality, tradition, and community."
    },
    {
      question: "How quickly can you deliver a website for my South Carolina business?",
      answer: "We move faster than a South Carolina thunderstorm! Our Rapid Delivery service guarantees completion within 7 days, perfect for South Carolina's tourism and hospitality industries where seasons matter. Whether you're in Charleston's historic district, Columbia's government center, or anywhere in the Palmetto State, we understand that South Carolina businesses value efficiency and Southern charm. We deliver websites faster than you can say 'Bless your heart!'"
    },
    {
      question: "Do you understand South Carolina's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across South Carolina and understand the state's diverse economy—from Charleston's tourism and hospitality industry to Columbia's government and education sector, from Greenville's manufacturing and tech companies to Myrtle Beach's entertainment and tourism. We know South Carolina isn't just about beaches and barbecue—it's a thriving business ecosystem with unique advantages like low taxes and business-friendly policies."
    },
    {
      question: "Can you help with local SEO for South Carolina businesses?",
      answer: "Yes! We specialize in South Carolina-specific SEO strategies, from targeting 'best barbecue in Charleston' to 'beach rentals Myrtle Beach.' We understand local search patterns and can help you dominate results across South Carolina's diverse regions. Whether you're targeting tourists in Charleston or serving locals in Columbia, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for South Carolina clients?",
      answer: "We bring Silicon Valley innovation with South Carolina's values—hospitality, tradition, and community focus. We understand that South Carolina businesses prioritize relationships, local connections, and authentic experiences over corporate efficiency. Our approach honors South Carolina's unique culture—from Lowcountry charm to Upstate innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for South Carolina businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. South Carolina businesses can't afford downtime, whether you're running a restaurant in Charleston, a manufacturing plant in Greenville, or a resort in Myrtle Beach. We've got your back like a good South Carolina neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving South Carolina businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-south-carolina",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "South Carolina",
      "addressRegion": "SC",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.8569",
      "longitude": "-80.9450"
    },
    "areaServed": {
      "@type": "State",
      "name": "South Carolina"
    },
    "serviceArea": {
      "@type": "State",
      "name": "South Carolina"
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
        <title>Web Development South Carolina | Custom Website Design Agency SC | Nandann Creative</title>
        <meta name="description" content="Web development South Carolina: Custom website design agency serving SC businesses. Rapid delivery, local SEO, responsive design. From Charleston to Columbia, Greenville to Myrtle Beach. The Palmetto State deserves a great website!" />
        <meta name="keywords" content="web development south carolina, web design charleston, website agency columbia, local seo south carolina, custom websites greenville, rapid website delivery myrtle beach, web development company sc, palmetto state web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-south-carolina" />
        <meta property="og:title" content="Web Development Agency in South Carolina | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in South Carolina. Custom websites, rapid delivery, local SEO optimization for Charleston, Columbia, Greenville, and Myrtle Beach businesses." />
        <meta property="og:image" content="https://www.nandann.com/south-carolina/south-carolina-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-south-carolina" />
        <meta property="twitter:title" content="Web Development Agency in South Carolina | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in South Carolina. Custom websites, rapid delivery, local SEO optimization for Charleston, Columbia, Greenville, and Myrtle Beach businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/south-carolina/south-carolina-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-SC" />
        <meta name="geo.placename" content="South Carolina" />
        <meta name="geo.position" content="33.8569;-80.9450" />
        <meta name="ICBM" content="33.8569, -80.9450" />
        <link rel="canonical" href="https://www.nandann.com/web-development-south-carolina" />
        
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
        <LocationNavigation location="South Carolina" locationShort="SC" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  The Palmetto State Needs a{' '}
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Website That Works
                  </span>
                  , Y'all!
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Charleston's historic charm to Columbia's government sector, we're the premier web development 
                  agency that understands South Carolina's unique Southern hospitality culture and diverse business landscape. 
                  Whether you're in Charleston, Columbia, Greenville, or Myrtle Beach, we deliver custom websites 
                  that capture South Carolina's spirit and drive real results in the Palmetto State.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-center">
                    Get Your Free Quote
                  </Link>
                  <Link href="/portfolio" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 text-center">
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
                  <source src="/south-carolina/south-carolina-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/south-carolina/south-carolina-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/south-carolina/south-carolina-web-development-nandann-creative-poster.webp"
                    alt="South Carolina Web Development - Charleston, Columbia, Greenville"
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
                srcSet="/south-carolina/south-carolina-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/south-carolina/south-carolina-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/south-carolina/south-carolina-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/south-carolina/south-carolina-web-development-nandann-creative-sm.webp"
                alt="South Carolina Web Development Agency - Nandann Creative"
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
                South Carolina's{' '}
                <span className="text-green-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of South Carolina businesses from Charleston to Greenville
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Charleston Hospitality Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Charleston Chamber of Commerce for outstanding web development innovation and hospitality industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Charleston Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Tourism & Hospitality Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by South Carolina Tourism Association for exceptional websites that drive bookings and showcase authentic Southern charm
                </p>
                <div className="text-sm text-gray-500">
                  South Carolina Tourism Association
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
                  Honored by Columbia Business Report for fastest website delivery while maintaining South Carolina's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Columbia Business Report
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* South Carolina Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets South Carolina
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Palmetto State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Southern Hospitality in Every Pixel</h3>
                <p className="text-gray-700">
                  From Charleston's historic charm to Myrtle Beach's beach culture, we understand South Carolina's hospitality industry. 
                  We create websites that embody the warmth and charm of Southern hospitality—whether 
                  you're booking historic tours, beach rentals, or fine dining experiences.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than a South Carolina Thunderstorm</h3>
                <p className="text-gray-700">
                  South Carolina businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Bless your heart!' We understand that in South Carolina's 
                  competitive tourism and hospitality markets, speed and charm matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Tourism to Tech</h3>
                <p className="text-gray-700">
                  We understand South Carolina's diverse economy—from Charleston's tourism and hospitality industry to Columbia's 
                  government sector, from Greenville's manufacturing and tech companies to Myrtle Beach's entertainment industry. 
                  We create industry-specific solutions that work whether you're serving tourists or manufacturing products.
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
                Serving All of South Carolina
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the Lowcountry charm of Charleston to the Upstate innovation of Greenville, we provide web development services across the entire Palmetto State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-south-carolina" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Charleston</h3>
                <p className="text-gray-600">
                  The Holy City. Historic charm, tourism, hospitality, fine dining. 
                  Where Southern tradition meets modern business in the Lowcountry.
                </p>
              </Link>
              
              <Link href="/web-development-south-carolina" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Columbia</h3>
                <p className="text-gray-600">
                  State capital. Government services, education, healthcare. 
                  Where South Carolina's government meets its business community.
                </p>
              </Link>
              
              <Link href="/web-development-south-carolina" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Greenville</h3>
                <p className="text-gray-600">
                  Upstate innovation hub. Manufacturing, tech startups, outdoor recreation. 
                  Where South Carolina's industrial past meets its innovative future.
                </p>
              </Link>
              
              <Link href="/web-development-south-carolina" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Myrtle Beach</h3>
                <p className="text-gray-600">
                  Grand Strand entertainment. Tourism, golf courses, family attractions. 
                  Where South Carolina's beach culture meets entertainment industry.
                </p>
              </Link>
              
              <Link href="/web-development-south-carolina" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Spartanburg</h3>
                <p className="text-gray-600">
                  Manufacturing and education. Textile heritage, healthcare, higher education. 
                  Where South Carolina's industrial roots meet modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-south-carolina" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Rock Hill</h3>
                <p className="text-gray-600">
                  Charlotte metro area. Manufacturing, healthcare, education. 
                  Where South Carolina meets North Carolina business culture.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* South Carolina Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get South Carolina's{' '}
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  South Carolina isn't just a state—it's a state of mind! From Charleston's "Holy City" charm 
                  to Greenville's "Upstate" innovation, from Columbia's government sophistication to Myrtle Beach's 
                  beach culture, South Carolina represents a unique blend of Southern hospitality, historic tradition, 
                  and modern business innovation that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Charleston businesses need websites that reflect the city's historic charm 
                  while serving modern tourism needs—whether you're running a historic inn or a fine dining restaurant. 
                  Columbia companies benefit from designs that capture the city's government and education focus. 
                  Greenville businesses need sites that showcase manufacturing innovation and outdoor recreation 
                  without sacrificing professional credibility.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Lowcountry cuisine to Upstate innovation, from historic preservation to modern manufacturing, 
                  South Carolina's culture is rich, diverse, and deeply rooted in hospitality, tradition, and 
                  community values. We don't just build websites—we create digital experiences that honor 
                  South Carolina's heritage while driving modern business results. Whether you're "serving up 
                  Southern charm" in Charleston, "building the future" in Greenville, or "welcoming visitors" 
                  in Myrtle Beach, we speak your language—from Southern hospitality to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands South Carolina's unique challenges too—from tourism seasonality to the importance 
                  of Southern hospitality, from the balance between tradition and innovation to the significance 
                  of local connections and community involvement. We've worked with businesses across South Carolina's 
                  diverse regions, and we know that what works in Charleston might not work in Greenville, and vice versa. 
                  That's why we create custom solutions as unique as South Carolina itself. Thanks for trusting us 
                  with your digital presence, y'all!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/south-carolina/south-carolina-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/south-carolina/south-carolina-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/south-carolina/south-carolina-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/south-carolina/south-carolina-web-development-nandann-creative-sm.webp"
                    alt="South Carolina Web Development - Charleston, Columbia, Greenville, Myrtle Beach"
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
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  South Carolina is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real South Carolina businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Caroline "The Charleston Belle" Johnson</h4>
                    <p className="text-gray-600">Owner, Historic Charleston Inn</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Charleston! Our new website captures the historic charm and our 
                  bookings tripled in the first month. They even used the right shade of green—
                  that's respect for South Carolina's values! Bless your heart, they're amazing!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    G
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">George "The Greenville Guy" Williams</h4>
                    <p className="text-gray-600">CEO, Upstate Manufacturing Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Bless your heart!' Our 
                  client inquiries increased 200% and manufacturers love the professional vibe. They understand 
                  that in South Carolina, it's not just business—it's about hospitality and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mary "The Myrtle Beach Mom" Thompson</h4>
                    <p className="text-gray-600">Director, Grand Strand Tourism</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a tourism company in Myrtle Beach, we needed a website that honors our beach culture while 
                  attracting visitors from everywhere. Nandann Creative delivered a site that's helped us increase 
                  bookings by 180% while staying true to our Palmetto State values. They understand South Carolina business!"
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
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  South Carolina Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our South Carolina web development services
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Make South Carolina Your Digital Home?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of South Carolina businesses that trust Nandann Creative with their digital success—from Charleston to Greenville, y'all!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center">
                Start Your Project Today
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 text-center">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>

        <LocationFooter location="South Carolina" locationShort="SC" />
      </div>
    </>
  );
}

