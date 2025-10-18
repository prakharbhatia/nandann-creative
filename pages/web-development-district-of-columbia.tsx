import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function DistrictOfColumbiaPage() {
  // FAQ data for District of Columbia
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Washington DC?",
      answer: "We understand DC's unique business landscape and federal district culture like no other agency! From downtown's government sector and tech innovation to Georgetown's healthcare excellence, from Capitol Hill's political industry to Dupont Circle's business sector, we know what makes DC businesses succeed. We combine Silicon Valley innovation with DC's values of power, influence, and genuine hospitality."
    },
    {
      question: "How quickly can you deliver a website for my DC business?",
      answer: "We move faster than DC's political winds! Our Rapid Delivery service guarantees completion within 7 days, perfect for DC's government and tech industries where efficiency matters. Whether you're in downtown DC, Georgetown's business district, or anywhere in the federal district, we understand that DC businesses value speed and reliability. We deliver websites faster than you can say 'District of Columbia!'"
    },
    {
      question: "Do you understand DC's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across DC and understand the district's diverse economy—from downtown's government sector and tech innovation to Georgetown's healthcare excellence, from Capitol Hill's political industry to Dupont Circle's business sector. We know DC isn't just about politics and monuments—it's a thriving business ecosystem with unique advantages like federal connections and skilled workforce."
    },
    {
      question: "Can you help with local SEO for DC businesses?",
      answer: "Yes! We specialize in DC-specific SEO strategies, from targeting 'best restaurants Georgetown' to 'government jobs Capitol Hill.' We understand local search patterns and can help you dominate results across DC's diverse regions. Whether you're targeting government clients in downtown or serving tourists in Dupont Circle, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for DC clients?",
      answer: "We bring Silicon Valley innovation with DC's values—power, influence, and genuine hospitality. We understand that DC businesses prioritize political lifestyle, federal connections, and authentic experiences over corporate efficiency. Our approach honors DC's unique culture—from federal district pride to government innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for DC businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. DC businesses can't afford downtime, whether you're running a government contractor in downtown, a healthcare facility in Georgetown, or a tourism business in Dupont Circle. We've got your back like a good DC neighbor—reliable and always there when you need us."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Washington DC businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-district-of-columbia",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Washington",
      "addressRegion": "DC",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.9072",
      "longitude": "-77.0369"
    },
    "areaServed": {
      "@type": "State",
      "name": "District of Columbia"
    },
    "serviceArea": {
      "@type": "State",
      "name": "District of Columbia"
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
        <title>Web Development Washington DC | Custom Website Design Agency DC | Nandann Creative</title>
        <meta name="description" content="Web development Washington DC: Custom website design agency serving DC businesses. Rapid delivery, local SEO, responsive design. From downtown to Georgetown, Capitol Hill to Dupont Circle. The federal district deserves a great website!" />
        <meta name="keywords" content="web development washington dc, web design downtown dc, website agency georgetown, local seo washington dc, custom websites capitol hill, rapid website delivery dupont circle, web development company dc, washington dc web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-district-of-columbia" />
        <meta property="og:title" content="Web Development Agency in Washington DC | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Washington DC. Custom websites, rapid delivery, local SEO optimization for downtown, Georgetown, Capitol Hill, and Dupont Circle businesses." />
        <meta property="og:image" content="https://www.nandann.com/district-of-columbia/district-of-columbia-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-district-of-columbia" />
        <meta property="twitter:title" content="Web Development Agency in Washington DC | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Washington DC. Custom websites, rapid delivery, local SEO optimization for downtown, Georgetown, Capitol Hill, and Dupont Circle businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/district-of-columbia/district-of-columbia-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-DC" />
        <meta name="geo.placename" content="Washington DC" />
        <meta name="geo.position" content="38.9072;-77.0369" />
        <meta name="ICBM" content="38.9072, -77.0369" />
        <link rel="canonical" href="https://www.nandann.com/web-development-district-of-columbia" />
        
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
        <LocationNavigation location="District of Columbia" locationShort="DC" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  Federal District Needs a{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Website That Works!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From downtown's government sector to Georgetown's healthcare excellence, we're the premier web development 
                  agency that understands DC's unique federal district culture and diverse business landscape. 
                  Whether you're in downtown DC, Georgetown, Capitol Hill, or Dupont Circle, we deliver custom websites 
                  that capture DC's spirit and drive real results in the federal district.
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
                  <source src="/district-of-columbia/district-of-columbia-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/district-of-columbia/district-of-columbia-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/district-of-columbia/district-of-columbia-web-development-nandann-creative-poster.webp"
                    alt="Washington DC Web Development - Downtown, Georgetown, Capitol Hill"
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
                srcSet="/district-of-columbia/district-of-columbia-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/district-of-columbia/district-of-columbia-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/district-of-columbia/district-of-columbia-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/district-of-columbia/district-of-columbia-web-development-nandann-creative-sm.webp"
                alt="Washington DC Web Development Agency - Nandann Creative"
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
                DC's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of DC businesses from downtown to Dupont Circle
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Downtown Government Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the DC Chamber of Commerce for outstanding web development innovation and government sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  DC Chamber of Commerce
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Healthcare Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Georgetown Healthcare Association for exceptional websites that serve the healthcare and medical sectors
                </p>
                <div className="text-sm text-gray-500">
                  Georgetown Healthcare Association
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
                  Honored by Capitol Hill Business Council for fastest website delivery while maintaining DC's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Capitol Hill Business Council
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DC Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Here's Why{' '}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nandann Creative
                </span>{' '}
                Gets DC
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the federal district
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faster Than Political Winds</h3>
                <p className="text-gray-700">
                  DC businesses move fast, and so do we! Our rapid delivery service gets you online in 7 days 
                  or less—faster than you can say 'District of Columbia!' We understand that in DC's competitive 
                  government and tech markets, speed and reliability matter.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Federal District Pride in Every Pixel</h3>
                <p className="text-gray-700">
                  From downtown's government sector to Georgetown's healthcare excellence, we understand DC's business culture. 
                  We create websites that embody federal district pride—powerful, influential, and focused on building 
                  genuine relationships with customers and clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From Government Innovation to Tourism Excellence</h3>
                <p className="text-gray-700">
                  We understand DC's diverse economy—from downtown's government sector and tech innovation to Georgetown's 
                  healthcare excellence, from Capitol Hill's political industry to Dupont Circle's business sector. 
                  We create industry-specific solutions that work whether you're innovating government or welcoming visitors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Major Areas Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Serving All of Washington DC
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the government sector of downtown to the healthcare excellence of Georgetown, we provide web development services across the entire federal district. 
                Each area has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/web-development-district-of-columbia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Downtown</h3>
                <p className="text-gray-600">
                  The Heart of DC. Government sector, tech innovation, education. 
                  Where DC's politics meets its federal heritage.
                </p>
              </Link>
              
              <Link href="/web-development-district-of-columbia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Georgetown</h3>
                <p className="text-gray-600">
                  The Historic District. Healthcare excellence, education, tech. 
                  Where DC's history meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-district-of-columbia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Capitol Hill</h3>
                <p className="text-gray-600">
                  The Political Center. Government industry, education, healthcare. 
                  Where DC's politics meets its community values.
                </p>
              </Link>
              
              <Link href="/web-development-district-of-columbia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Dupont Circle</h3>
                <p className="text-gray-600">
                  The Cultural Hub. Business sector, healthcare, education. 
                  Where DC's culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/web-development-district-of-columbia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Adams Morgan</h3>
                <p className="text-gray-600">
                  The Nightlife District. Business sector, healthcare, education. 
                  Where DC's entertainment meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/web-development-district-of-columbia" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Foggy Bottom</h3>
                <p className="text-gray-600">
                  The University District. Education sector, healthcare, tech. 
                  Where DC's academic tradition meets modern business.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* DC Specialties & Culture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get DC's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Unique Spirit
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  DC isn't just a district—it's a district of federal power! From downtown's "Heart of DC" 
                  government sector to Georgetown's healthcare excellence, from Capitol Hill's political industry to Dupont Circle's 
                  business sector, DC represents a unique blend of innovation, federal district pride, 
                  and political culture that you won't find anywhere else.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that downtown businesses need websites that reflect the city's government sophistication 
                  while honoring DC's federal heritage—whether you're running a Fortune 500 company or a startup. 
                  Georgetown companies benefit from designs that capture the city's healthcare excellence and historic district tradition. 
                  Capitol Hill businesses need sites that showcase political excellence and federal charm 
                  without sacrificing modern functionality.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From federal district pride to government innovation, from monuments to politics, 
                  DC's culture is rich, diverse, and deeply rooted in power, influence, and genuine relationships. 
                  We don't just build websites—we create digital experiences that honor DC's heritage while 
                  driving modern business results. Whether you're "innovating government" in downtown, 
                  "healing patients" in Georgetown, or "welcoming visitors" in Dupont Circle, we speak your language—from 
                  federal district pride to business English.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team understands DC's unique challenges too—from political weather considerations to the importance 
                  of community involvement, from the balance between tradition and innovation to the significance 
                  of local connections and genuine relationships. We've worked with businesses across DC's 
                  diverse regions, and we know that what works in downtown might not work in Georgetown, and vice versa. 
                  That's why we create custom solutions as unique as DC itself. Thanks for trusting us 
                  with your digital presence, federal district!
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/district-of-columbia/district-of-columbia-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/district-of-columbia/district-of-columbia-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/district-of-columbia/district-of-columbia-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/district-of-columbia/district-of-columbia-web-development-nandann-creative-sm.webp"
                    alt="Washington DC Web Development - Downtown, Georgetown, Capitol Hill, Dupont Circle"
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
                  DC is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real DC businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Downtown Powerhouse" Johnson</h4>
                    <p className="text-gray-600">CEO, Downtown Government Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get DC! Our new website captures the government sector sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of blue—
                  that's respect for DC's values! Federal district with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Georgetown Strategist" Williams</h4>
                    <p className="text-gray-600">Director, Georgetown Healthcare Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Right on! These folks delivered our website faster than you can say 'District of Columbia!' Our 
                  healthcare inquiries increased 180% and clients love the medical vibe. They understand 
                  that in DC, it's not just business—it's about federal district pride and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tom "The Capitol Hill Dynamo" Thompson</h4>
                    <p className="text-gray-600">Founder, Capitol Hill Political Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a political solutions company in Capitol Hill, we needed a website that honors our federal heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our DC values. They understand DC business!"
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
                  DC Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our DC web development services
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
              Ready to Make DC Your Digital Federal District?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of DC businesses that trust Nandann Creative with their digital success—from downtown to Dupont Circle, federal district!
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

        <LocationFooter location="District of Columbia" locationShort="DC" />
      </div>
    </>
  );
}

