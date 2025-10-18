import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function MississippiPage() {
  // FAQ data for Mississippi
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Mississippi?",
      answer: "We understand Mississippi's unique business landscape and Magnolia hospitality culture like no other agency! From Jackson's corporate headquarters and government sector to Gulfport's port industry, from Hattiesburg's education excellence to Biloxi's healthcare industry, we know what makes Mississippi businesses succeed. We combine Silicon Valley innovation with Mississippi's values of hard work, community, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my Mississippi business?",
      answer: "We move faster than Mississippi River current! Our Rapid Delivery service guarantees completion within 7 days, perfect for Mississippi's government and corporate industries where efficiency matters. Whether you're in downtown Jackson, Gulfport's business district, or anywhere in the Magnolia State, we understand that Mississippi businesses value speed and reliability. We deliver websites faster than you can say 'Hotty Toddy!'"
    },
    {
      question: "Do you understand Mississippi's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Mississippi and understand the state's diverse economy—from Jackson's corporate headquarters and government sector to Gulfport's port industry, from Hattiesburg's education excellence to Biloxi's healthcare industry. We know Mississippi isn't just about blues and catfish—it's a thriving business ecosystem with unique advantages like central location and skilled workforce."
    },
    {
      question: "Can you help with local SEO for Mississippi businesses?",
      answer: "Yes! We specialize in Mississippi-specific SEO strategies, from targeting 'best restaurants in Jackson' to 'government jobs Gulfport.' We understand local search patterns and can help you dominate results across Mississippi's diverse regions. Whether you're targeting corporate clients in Jackson or serving locals in Hattiesburg, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Mississippi clients?",
      answer: "We bring Silicon Valley innovation with Mississippi's values—hard work, community focus, and genuine hospitality. We understand that Mississippi businesses prioritize relationships, local connections, and authentic experiences over corporate efficiency. Our approach honors Mississippi's unique culture—from Magnolia hospitality to education excellence—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Mississippi businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Mississippi businesses can't afford downtime, whether you're running a corporate office in Jackson, a port operation in Gulfport, or a healthcare facility in Biloxi. We've got your back like a good Mississippi neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Mississippi businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-mississippi",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mississippi",
      "addressRegion": "MS",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.3547",
      "longitude": "-89.3985"
    },
    "areaServed": {
      "@type": "State",
      "name": "Mississippi"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Mississippi"
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
        <title>Web Development Mississippi | Custom Website Design Agency MS | Nandann Creative</title>
        <meta name="description" content="Web development Mississippi: Custom website design agency serving MS businesses. Rapid delivery, local SEO, responsive design. From Jackson to Gulfport, Hattiesburg to Biloxi. The Magnolia State deserves a great website!" />
        <meta name="keywords" content="web development mississippi, web design jackson, website agency gulfport, local seo mississippi, custom websites hattiesburg, rapid website delivery biloxi, web development company ms, mississippi web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-mississippi" />
        <meta property="og:title" content="Web Development Agency in Mississippi | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Mississippi. Custom websites, rapid delivery, local SEO optimization for Jackson, Gulfport, Hattiesburg, and Biloxi businesses." />
        <meta property="og:image" content="https://www.nandann.com/mississippi/mississippi-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-mississippi" />
        <meta property="twitter:title" content="Web Development Agency in Mississippi | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Mississippi. Custom websites, rapid delivery, local SEO optimization for Jackson, Gulfport, Hattiesburg, and Biloxi businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/mississippi/mississippi-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Mississippi" />
        <meta name="geo.position" content="32.3547;-89.3985" />
        <meta name="ICBM" content="32.3547, -89.3985" />
        <link rel="canonical" href="https://www.nandann.com/web-development-mississippi" />
        
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
        <LocationNavigation location="Mississippi" locationShort="MS" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-blue-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Hotty Toddy! Mississippi Needs a{' '}
                  <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Jackson's corporate towers to Gulfport's port industry, we're the premier web development 
                  agency that understands Mississippi's unique Magnolia hospitality culture and diverse business landscape. 
                  Whether you're in Jackson, Gulfport, Hattiesburg, or Biloxi, we deliver custom websites 
                  that capture Mississippi's spirit and drive real results in the Magnolia State.
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
                  <source src="/mississippi/mississippi-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/mississippi/mississippi-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/mississippi/mississippi-web-development-nandann-creative-poster.webp"
                    alt="Mississippi Web Development - Jackson, Gulfport, Hattiesburg"
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
                srcSet="/mississippi/mississippi-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/mississippi/mississippi-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/mississippi/mississippi-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/mississippi/mississippi-web-development-nandann-creative-sm.webp"
                alt="Mississippi Web Development Agency - Nandann Creative"
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
                Mississippi's{' '}
                <span className="text-red-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Mississippi businesses from Jackson to Biloxi
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Jackson Business Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Jackson Chamber of Commerce for outstanding web development innovation and government sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Jackson Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Port Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Mississippi Port Authority for exceptional websites that serve the port and maritime industries
                </p>
                <div className="text-sm text-gray-500">
                  Mississippi Port Authority
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
                  Honored by Gulfport Chamber of Commerce for fastest website delivery while maintaining Mississippi's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Gulfport Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mississippi Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets Mississippi
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Magnolia State
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Mississippi River Current</h3>
                <p className="text-gray-700">
                  Mississippi businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'Hotty Toddy!' We understand that in Mississippi's competitive 
                  government and corporate markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Magnolia Hospitality in Every Pixel</h3>
                <p className="text-gray-700">
                  From Jackson's corporate sophistication to Gulfport's port excellence, we understand Mississippi's business culture. 
                  We create websites that embody Magnolia hospitality—welcoming, reliable, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Government Excellence to Port Innovation</h3>
                <p className="text-gray-700">
                  We understand Mississippi's diverse economy—from Jackson's corporate headquarters and government sector to Gulfport's 
                  port industry, from Hattiesburg's education excellence to Biloxi's healthcare industry. 
                  We create industry-specific solutions that work whether you're serving the people or shipping goods.
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
                Serving All of Mississippi
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the corporate towers of Jackson to the port industry of Gulfport, we provide web development services across the entire Magnolia State. 
                Each region has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-mississippi" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Jackson</h3>
                <p className="text-gray-600">
                  The Capital City. Corporate headquarters, government sector, healthcare. 
                  Where Mississippi's business meets its political heritage.
                </p>
              </Link>
              
              <Link href="/web-development-mississippi" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Gulfport</h3>
                <p className="text-gray-600">
                  The Port City. Port industry, healthcare, education. 
                  Where Mississippi's coastal culture meets maritime innovation.
                </p>
              </Link>
              
              <Link href="/web-development-mississippi" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Hattiesburg</h3>
                <p className="text-gray-600">
                  The Hub City. Education excellence, healthcare, manufacturing. 
                  Where Mississippi's academic tradition meets modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-mississippi" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Biloxi</h3>
                <p className="text-gray-600">
                  The Casino City. Healthcare excellence, tourism, education. 
                  Where Mississippi's coastal culture meets entertainment innovation.
                </p>
              </Link>
              
              <Link href="/web-development-mississippi" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Southaven</h3>
                <p className="text-gray-600">
                  The Suburban City. Corporate headquarters, healthcare, education. 
                  Where Mississippi's suburban charm meets modern business.
                </p>
              </Link>
              
              <Link href="/web-development-mississippi" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Meridian</h3>
                <p className="text-gray-600">
                  The Queen City. Healthcare excellence, education, manufacturing. 
                  Where Mississippi's eastern culture meets modern innovation.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Mississippi Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get Mississippi's{' '}
                  <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Mississippi isn't just a state—it's a state of genuine hospitality! From Jackson's "Capital City" 
                  corporate culture to Gulfport's port industry, from Hattiesburg's education excellence to Biloxi's 
                  healthcare tradition, Mississippi represents a unique blend of government innovation, Magnolia hospitality, 
                  and community values that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Jackson businesses need websites that reflect the city's corporate sophistication 
                  while honoring Mississippi's political heritage—whether you're running a Fortune 500 company or a government office. 
                  Gulfport companies benefit from designs that capture the city's port excellence and coastal tradition. 
                  Hattiesburg businesses need sites that showcase education excellence and hub city charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From Magnolia hospitality to education excellence, from blues culture to catfish tradition, 
                  Mississippi's culture is rich, diverse, and deeply rooted in hard work, community, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor Mississippi's heritage while 
                  driving modern business results. Whether you're "serving the people" in Jackson, 
                  "shipping goods" in Gulfport, or "welcoming visitors" in Hattiesburg, we speak your language—from 
                  Magnolia hospitality to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands Mississippi's unique challenges too—from hurricane season considerations to the importance 
                  of genuine relationships, from the balance between tradition and innovation to the significance 
                  of community involvement and local connections. We've worked with businesses across Mississippi's 
                  diverse regions, and we know that what works in Jackson might not work in Gulfport, and vice versa. 
                  That's why we create custom solutions as unique as Mississippi itself. Thanks for trusting us 
                  with your digital presence, hotty toddy!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/mississippi/mississippi-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/mississippi/mississippi-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/mississippi/mississippi-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/mississippi/mississippi-web-development-nandann-creative-sm.webp"
                    alt="Mississippi Web Development - Jackson, Gulfport, Hattiesburg, Biloxi"
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
                  Mississippi is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Mississippi businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Jackson Maverick" Johnson</h4>
                    <p className="text-gray-600">CEO, Jackson Government Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Mississippi! Our new website captures the government sector sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of red—
                  that's respect for Mississippi's values! Hotty Toddy with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Gulfport Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Gulfport Port Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'Hotty Toddy!' Our 
                  port inquiries increased 180% and clients love the professional vibe. They understand 
                  that in Mississippi, it's not just business—it's about Magnolia hospitality and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Hattiesburg Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Hattiesburg Education Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As an education solutions company in Hattiesburg, we needed a website that honors our hub city heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Mississippi values. They understand Mississippi business!"
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
                  Mississippi Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Mississippi web development services
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
              Ready to Make Mississippi Your Digital Magnolia State?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Mississippi businesses that trust Nandann Creative with their digital success—from Jackson to Biloxi, hotty toddy!
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

        <LocationFooter location="Mississippi" locationShort="MS" />
      </div>
    </>
  );
}

