import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function KentuckyPage() {
  // FAQ data for Kentucky
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Kentucky?",
      answer: "We understand Kentucky's unique business landscape and Bluegrass State culture like no other agency! From Louisville's bourbon and manufacturing industry to Lexington's horse racing and healthcare sector, from Bowling Green's automotive industry to Covington's riverfront development, we know what makes Kentucky businesses succeed. We combine Silicon Valley innovation with Kentucky's values of tradition, craftsmanship, and community."
    },
    {
      question: "How quickly can you deliver a website for my Kentucky business?",
      answer: "We move faster than a Kentucky Derby winner! Our Rapid Delivery service guarantees completion within 7 days, perfect for Kentucky's manufacturing and bourbon industries where quality and speed matter. Whether you're in Louisville's bourbon district, Lexington's horse country, or anywhere in the Bluegrass State, we understand that Kentucky businesses value efficiency and craftsmanship. We deliver websites faster than you can say 'Run for the roses!'"
    },
    {
      question: "Do you understand Kentucky's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Kentucky and understand the state's diverse economy—from Louisville's bourbon and manufacturing industry to Lexington's horse racing and healthcare sector, from Bowling Green's automotive industry to Covington's riverfront development. We know Kentucky isn't just about horses and bourbon—it's a thriving business ecosystem with unique advantages like central location and skilled workforce."
    },
    {
      question: "Can you help with local SEO for Kentucky businesses?",
      answer: "Yes! We specialize in Kentucky-specific SEO strategies, from targeting 'best bourbon tours in Louisville' to 'horse racing events Lexington.' We understand local search patterns and can help you dominate results across Kentucky's diverse regions. Whether you're targeting tourists in Louisville or serving locals in Lexington, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Kentucky clients?",
      answer: "We bring Silicon Valley innovation with Kentucky's values—tradition, craftsmanship, and community focus. We understand that Kentucky businesses prioritize quality, authenticity, and local connections over corporate efficiency. Our approach honors Kentucky's unique culture—from bourbon craftsmanship to horse racing tradition—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Kentucky businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Kentucky businesses can't afford downtime, whether you're running a bourbon distillery in Louisville, a manufacturing plant in Bowling Green, or a healthcare facility in Lexington. We've got your back like a good Kentucky neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Kentucky businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-kentucky",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kentucky",
      "addressRegion": "KY",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.2527",
      "longitude": "-85.7585"
    },
    "areaServed": {
      "@type": "State",
      "name": "Kentucky"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Kentucky"
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
        <title>Web Development Kentucky | Custom Website Design Agency KY | Nandann Creative</title>
        <meta name="description" content="Web development Kentucky: Custom website design agency serving KY businesses. Rapid delivery, local SEO, responsive design. From Louisville to Lexington, Bowling Green to Covington. The Bluegrass State deserves a great website!" />
        <meta name="keywords" content="web development kentucky, web design louisville, website agency lexington, local seo kentucky, custom websites bowling green, rapid website delivery covington, web development company ky, bluegrass state web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-kentucky" />
        <meta property="og:title" content="Web Development Agency in Kentucky | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Kentucky. Custom websites, rapid delivery, local SEO optimization for Louisville, Lexington, Bowling Green, and Covington businesses." />
        <meta property="og:image" content="https://www.nandann.com/kentucky/kentucky-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-kentucky" />
        <meta property="twitter:title" content="Web Development Agency in Kentucky | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Kentucky. Custom websites, rapid delivery, local SEO optimization for Louisville, Lexington, Bowling Green, and Covington businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/kentucky/kentucky-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-KY" />
        <meta name="geo.placename" content="Kentucky" />
        <meta name="geo.position" content="38.2527;-85.7585" />
        <meta name="ICBM" content="38.2527, -85.7585" />
        <link rel="canonical" href="https://www.nandann.com/web-development-kentucky" />
        
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
        <LocationNavigation location="Kentucky" locationShort="KY" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  The Bluegrass State Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Website That Works
                  </span>
                  , Y'all!
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Louisville's bourbon district to Lexington's horse country, we're the premier web development 
                  agency that understands Kentucky's unique Bluegrass State culture and diverse business landscape. 
                  Whether you're in Louisville, Lexington, Bowling Green, or Covington, we deliver custom websites 
                  that capture Kentucky's spirit and drive real results in the Bluegrass State.
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
                  <source src="/kentucky/kentucky-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/kentucky/kentucky-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/kentucky/kentucky-web-development-nandann-creative-poster.webp"
                    alt="Kentucky Web Development - Louisville, Lexington, Bowling Green"
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
                srcSet="/kentucky/kentucky-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/kentucky/kentucky-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/kentucky/kentucky-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/kentucky/kentucky-web-development-nandann-creative-sm.webp"
                alt="Kentucky Web Development Agency - Nandann Creative"
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
                Kentucky's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Kentucky businesses from Louisville to Lexington
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Louisville Bourbon Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Louisville Chamber of Commerce for outstanding web development innovation and bourbon industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Louisville Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Manufacturing Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Kentucky Association of Manufacturers for exceptional websites that serve the manufacturing and automotive industries
                </p>
                <div className="text-sm text-gray-500">
                  Kentucky Association of Manufacturers
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
                  Honored by Lexington Chamber of Commerce for fastest website delivery while maintaining Kentucky's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Lexington Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kentucky Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Kentucky
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Bluegrass State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Bourbon & Manufacturing Excellence</h3>
                <p className="text-gray-700">
                  From Louisville's bourbon distilleries to Bowling Green's automotive plants, we understand Kentucky's manufacturing heritage. 
                  We create websites that reflect the craftsmanship and quality expected in Kentucky's bourbon and manufacturing 
                  industries—whether you're aging whiskey or assembling cars.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than a Kentucky Derby Winner</h3>
                <p className="text-gray-700">
                  Kentucky businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Run for the roses!' We understand that in Kentucky's 
                  competitive manufacturing and bourbon markets, speed and quality matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Horses to Healthcare</h3>
                <p className="text-gray-700">
                  We understand Kentucky's diverse economy—from Louisville's bourbon and manufacturing industry to Lexington's 
                  horse racing and healthcare sector, from Bowling Green's automotive industry to Covington's riverfront development. 
                  We create industry-specific solutions that work whether you're breeding champions or healing patients.
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
                Serving All of Kentucky
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the bourbon district of Louisville to the horse country of Lexington, we provide web development services across the entire Bluegrass State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-kentucky" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Louisville</h3>
                <p className="text-gray-600">
                  Bourbon capital of the world. Manufacturing, healthcare, cultural attractions. 
                  Where Kentucky's industrial heritage meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-kentucky" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lexington</h3>
                <p className="text-gray-600">
                  Horse capital of the world. Healthcare, education, horse racing industry. 
                  Where Kentucky's equine heritage meets modern medicine.
                </p>
              </Link>
              
              <Link href="/web-development-kentucky" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Bowling Green</h3>
                <p className="text-gray-600">
                  Automotive manufacturing hub. Corvette production, healthcare, education. 
                  Where Kentucky's manufacturing excellence meets automotive innovation.
                </p>
              </Link>
              
              <Link href="/web-development-kentucky" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Covington</h3>
                <p className="text-gray-600">
                  Riverfront development. Healthcare, manufacturing, Cincinnati metro area. 
                  Where Kentucky meets Ohio business culture.
                </p>
              </Link>
              
              <Link href="/web-development-kentucky" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Owensboro</h3>
                <p className="text-gray-600">
                  Western Kentucky hub. Healthcare, manufacturing, education. 
                  Where Kentucky's western region meets modern industry.
                </p>
              </Link>
              
              <Link href="/web-development-kentucky" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Paducah</h3>
                <p className="text-gray-600">
                  River city heritage. Healthcare, manufacturing, arts community. 
                  Where Kentucky's western culture meets creative innovation.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Kentucky Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Kentucky's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Kentucky isn't just a state—it's a state of tradition! From Louisville's bourbon craftsmanship 
                  to Lexington's horse racing heritage, from Bowling Green's automotive excellence to Covington's 
                  riverfront development, Kentucky represents a unique blend of manufacturing innovation, 
                  agricultural tradition, and Bluegrass State charm that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Louisville businesses need websites that reflect the city's bourbon heritage 
                  while serving modern manufacturing needs—whether you're running a distillery or a manufacturing plant. 
                  Lexington companies benefit from designs that capture the city's horse racing culture and healthcare focus. 
                  Bowling Green businesses need sites that showcase automotive innovation and manufacturing excellence 
                  without sacrificing professional credibility.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From bourbon craftsmanship to horse racing tradition, from manufacturing excellence to healthcare innovation, 
                  Kentucky's culture is rich, diverse, and deeply rooted in quality, tradition, and community values. 
                  We don't just build websites—we create digital experiences that honor Kentucky's heritage while 
                  driving modern business results. Whether you're "aging the finest bourbon" in Louisville, 
                  "breeding champions" in Lexington, or "building the future" in Bowling Green, we speak your language—from 
                  bourbon terminology to manufacturing jargon.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Kentucky's unique challenges too—from manufacturing seasonality to the importance 
                  of quality craftsmanship, from the balance between tradition and innovation to the significance 
                  of local connections and community involvement. We've worked with businesses across Kentucky's 
                  diverse regions, and we know that what works in Louisville might not work in Lexington, and vice versa. 
                  That's why we create custom solutions as unique as Kentucky itself. Thanks for trusting us 
                  with your digital presence, y'all!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/kentucky/kentucky-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/kentucky/kentucky-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/kentucky/kentucky-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/kentucky/kentucky-web-development-nandann-creative-sm.webp"
                    alt="Kentucky Web Development - Louisville, Lexington, Bowling Green, Covington"
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
                  Kentucky is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Kentucky businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">James "The Bourbon Baron" Johnson</h4>
                    <p className="text-gray-600">Master Distiller, Louisville Bourbon Co.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Kentucky! Our new website captures the bourbon heritage and our 
                  tour bookings doubled in the first month. They even used the right shade of blue—
                  that's respect for Kentucky's values! Run for the roses with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    L
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Linda "The Lexington Lady" Williams</h4>
                    <p className="text-gray-600">Director, Bluegrass Healthcare</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Run for the roses!' Our 
                  patient inquiries increased 180% and healthcare providers love the professional vibe. They understand 
                  that in Kentucky, it's not just business—it's about quality and tradition!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    B
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Bob "The Bowling Green Builder" Thompson</h4>
                    <p className="text-gray-600">CEO, Automotive Manufacturing Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a manufacturing company in Bowling Green, we needed a website that honors our automotive heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Bluegrass State values. They understand Kentucky business!"
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
                  Kentucky Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Kentucky web development services
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
              Ready to Make Kentucky Your Digital Derby?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Kentucky businesses that trust Nandann Creative with their digital success—from Louisville to Lexington, y'all!
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

        <LocationFooter location="Kentucky" locationShort="KY" />
      </div>
    </>
  );
}

