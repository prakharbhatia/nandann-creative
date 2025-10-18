import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function ConnecticutPage() {
  // FAQ data for Connecticut
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Connecticut?",
      answer: "We understand Connecticut's unique business landscape and sophisticated corporate culture like no other agency! From Hartford's insurance industry to Stamford's financial services, from New Haven's biotech sector to Greenwich's hedge funds, we know what makes Connecticut businesses succeed. We combine Silicon Valley innovation with Connecticut's values of precision, professionalism, and excellence."
    },
    {
      question: "How quickly can you deliver a website for my Connecticut business?",
      answer: "We move faster than a Connecticut commuter train! Our Rapid Delivery service guarantees completion within 7 days, perfect for Connecticut's fast-paced financial and corporate industries. Whether you're in downtown Hartford, Stamford's corporate district, or anywhere in the Constitution State, we understand that Connecticut businesses value efficiency and precision. We deliver websites faster than you can say 'Yankee Doodle!'"
    },
    {
      question: "Do you understand Connecticut's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Connecticut and understand the state's diverse economy—from Hartford's insurance and government sector to Stamford's financial services, from New Haven's biotech and education to Greenwich's hedge funds and private equity. We know Connecticut isn't just about fall foliage and Yale—it's a powerhouse of finance, insurance, and innovation."
    },
    {
      question: "Can you help with local SEO for Connecticut businesses?",
      answer: "Yes! We specialize in Connecticut-specific SEO strategies, from targeting 'best insurance in Hartford' to 'financial services Stamford.' We understand local search patterns and can help you dominate results across Connecticut's diverse regions. Whether you're targeting corporate clients in Fairfield County or serving local communities, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Connecticut clients?",
      answer: "We bring Silicon Valley innovation with Connecticut's values—precision, professionalism, and attention to detail. We understand that Connecticut businesses prioritize quality, compliance, and sophisticated solutions over flashy marketing. Our approach honors Connecticut's unique culture—from corporate sophistication to New England charm—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Connecticut businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Connecticut businesses can't afford downtime, whether you're running an insurance company in Hartford, a hedge fund in Greenwich, or a biotech firm in New Haven. We've got your back like a good Connecticut neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Connecticut businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-connecticut",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Connecticut",
      "addressRegion": "CT",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.7658",
      "longitude": "-72.6734"
    },
    "areaServed": {
      "@type": "State",
      "name": "Connecticut"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Connecticut"
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
        <title>Web Development Connecticut | Custom Website Design Agency CT | Nandann Creative</title>
        <meta name="description" content="Web development Connecticut: Custom website design agency serving CT businesses. Rapid delivery, local SEO, responsive design. From Hartford to Stamford, New Haven to Greenwich. The Constitution State deserves a great website!" />
        <meta name="keywords" content="web development connecticut, web design hartford, website agency stamford, local seo connecticut, custom websites new haven, rapid website delivery greenwich, web development company ct, constitution state web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-connecticut" />
        <meta property="og:title" content="Web Development Agency in Connecticut | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Connecticut. Custom websites, rapid delivery, local SEO optimization for Hartford, Stamford, New Haven, and Greenwich businesses." />
        <meta property="og:image" content="https://www.nandann.com/connecticut/connecticut-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-connecticut" />
        <meta property="twitter:title" content="Web Development Agency in Connecticut | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Connecticut. Custom websites, rapid delivery, local SEO optimization for Hartford, Stamford, New Haven, and Greenwich businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/connecticut/connecticut-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CT" />
        <meta name="geo.placename" content="Connecticut" />
        <meta name="geo.position" content="41.7658;-72.6734" />
        <meta name="ICBM" content="41.7658, -72.6734" />
        <link rel="canonical" href="https://www.nandann.com/web-development-connecticut" />
        
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
        <LocationNavigation location="Connecticut" locationShort="CT" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  The Constitution State Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Website That Works
                  </span>
                  !
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Hartford's insurance industry to Stamford's financial services, we're the premier web development 
                  agency that understands Connecticut's unique corporate culture and sophisticated business landscape. 
                  Whether you're in Hartford, Stamford, New Haven, or Greenwich, we deliver custom websites 
                  that capture Connecticut's spirit and drive real results in the Constitution State.
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
                  <source src="/connecticut/connecticut-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/connecticut/connecticut-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/connecticut/connecticut-web-development-nandann-creative-poster.webp"
                    alt="Connecticut Web Development - Hartford, Stamford, New Haven"
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
                srcSet="/connecticut/connecticut-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/connecticut/connecticut-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/connecticut/connecticut-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/connecticut/connecticut-web-development-nandann-creative-sm.webp"
                alt="Connecticut Web Development Agency - Nandann Creative"
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
                Connecticut's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Connecticut businesses from Hartford to Greenwich
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hartford Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Hartford Business Journal for outstanding web development innovation and corporate industry leadership
                </p>
                <div className="text-sm text-gray-500">
                  Hartford Business Journal
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Financial Services Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Connecticut Business & Industry Association for exceptional websites that serve the financial services industry
                </p>
                <div className="text-sm text-gray-500">
                  CBIA
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
                  Honored by Stamford Chamber of Commerce for fastest website delivery while maintaining Connecticut's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Stamford Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connecticut Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Connecticut
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Constitution State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Sophistication</h3>
                <p className="text-gray-700">
                  From Hartford's insurance giants to Greenwich's hedge funds, we understand Connecticut's corporate culture. 
                  We create sophisticated websites that reflect the professionalism and precision expected in Connecticut's 
                  financial and corporate sectors—whether you're managing risk or managing wealth.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than a Connecticut Commuter Train</h3>
                <p className="text-gray-700">
                  Connecticut businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can commute from Stamford to Hartford. We understand that in Connecticut's 
                  competitive corporate and financial markets, speed and precision matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Insurance to Innovation</h3>
                <p className="text-gray-700">
                  We understand Connecticut's diverse economy—from Hartford's insurance industry to Stamford's financial services, 
                  from New Haven's biotech sector to Greenwich's hedge funds. We create industry-specific solutions 
                  that work whether you're underwriting policies or underwriting startups.
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
                Serving All of Connecticut
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the corporate towers of Hartford to the financial district of Stamford, we provide web development services across the entire Constitution State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-connecticut" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Hartford</h3>
                <p className="text-gray-600">
                  Insurance capital of the world. Corporate headquarters, government services, cultural attractions. 
                  Where business meets history in Connecticut's capital.
                </p>
              </Link>
              
              <Link href="/web-development-connecticut" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Stamford</h3>
                <p className="text-gray-600">
                  Financial services hub. Corporate headquarters, commuter rail access, modern business district. 
                  Where Connecticut meets New York business culture.
                </p>
              </Link>
              
              <Link href="/web-development-connecticut" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">New Haven</h3>
                <p className="text-gray-600">
                  Home of Yale University. Biotech industry, education, cultural attractions. 
                  Where innovation meets tradition in Connecticut's cultural capital.
                </p>
              </Link>
              
              <Link href="/web-development-connecticut" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Greenwich</h3>
                <p className="text-gray-600">
                  Hedge fund capital. Private equity, wealth management, luxury lifestyle. 
                  Where Connecticut's financial elite call home.
                </p>
              </Link>
              
              <Link href="/web-development-connecticut" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Bridgeport</h3>
                <p className="text-gray-600">
                  Industrial heritage. Manufacturing, healthcare, transportation hub. 
                  Where Connecticut's working-class roots meet modern industry.
                </p>
              </Link>
              
              <Link href="/web-development-connecticut" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Waterbury</h3>
                <p className="text-gray-600">
                  Brass City heritage. Manufacturing, healthcare, education. 
                  Where Connecticut's industrial past meets its innovative future.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Connecticut Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Connecticut's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Unique Character
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Connecticut isn't just a state—it's a state of sophistication! From Hartford's insurance industry 
                  to Greenwich's hedge funds, from Stamford's financial services to New Haven's biotech sector, 
                  Connecticut represents a unique blend of corporate excellence, financial innovation, and 
                  New England charm that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Hartford businesses need websites that reflect the city's corporate sophistication 
                  while honoring Connecticut's insurance industry heritage—whether you're running an insurance company 
                  or a government agency. Stamford companies benefit from designs that capture the city's financial 
                  services focus and commuter culture. Greenwich businesses need sites that showcase wealth management 
                  and luxury lifestyle without sacrificing professional credibility.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From corporate precision to financial innovation, from insurance expertise to biotech breakthroughs, 
                  Connecticut's culture is rich, diverse, and deeply rooted in professionalism, excellence, and 
                  attention to detail. We don't just build websites—we create digital experiences that honor 
                  Connecticut's heritage while driving modern business results. Whether you're "managing risk" 
                  in Hartford, "managing wealth" in Greenwich, or "managing innovation" in New Haven, we speak 
                  your language—from corporate jargon to financial terminology.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Connecticut's unique challenges too—from corporate compliance to the importance 
                  of professional standards, from the balance between tradition and innovation to the significance 
                  of financial services and insurance. We've worked with businesses across Connecticut's diverse 
                  regions, and we know that what works in Hartford might not work in Greenwich, and vice versa. 
                  That's why we create custom solutions as unique as Connecticut itself. Thanks for trusting us 
                  with your digital presence!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/connecticut/connecticut-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/connecticut/connecticut-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/connecticut/connecticut-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/connecticut/connecticut-web-development-nandann-creative-sm.webp"
                    alt="Connecticut Web Development - Hartford, Stamford, New Haven, Greenwich"
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
                  Connecticut is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Connecticut businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Robert "The Insurance Pro" Johnson</h4>
                    <p className="text-gray-600">CEO, Hartford Risk Management</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Connecticut! Our new website captures the corporate sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for Connecticut's values! Building the future with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Financial Whiz" Williams</h4>
                    <p className="text-gray-600">Director, Stamford Financial Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can commute from Stamford to Hartford! Our 
                  client acquisitions increased 180% and investors love the professional vibe. They understand 
                  that in Connecticut, it's not just business—it's about precision and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael "The Greenwich Guru" Thompson</h4>
                    <p className="text-gray-600">Founder, Greenwich Wealth Management</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a wealth management firm in Greenwich, we needed a website that honors our sophisticated clientele while 
                  showcasing our Connecticut roots. Nandann Creative delivered a site that's helped us attract 
                  high-net-worth clients while staying true to our Constitution State values. They understand Connecticut business!"
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
                  Connecticut Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Connecticut web development services
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
              Ready to Build Connecticut's Digital Future?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Connecticut businesses that trust Nandann Creative with their digital success—from Hartford to Greenwich!
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

        <LocationFooter location="Connecticut" locationShort="CT" />
      </div>
    </>
  );
}

