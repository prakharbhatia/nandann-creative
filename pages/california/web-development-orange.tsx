import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../../components/LocationNavigation';
import LocationFooter from '../../components/LocationFooter';

export default function OrangeCountyPage() {
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Orange County?",
      answer: "We understand Orange County's unique business landscape and OC culture like no other agency! From Anaheim's entertainment industry to Irvine's tech innovation, from Santa Ana's government sector to Huntington Beach's tourism excellence, we know what makes Orange County businesses succeed. We combine Silicon Valley innovation with Orange County's laid-back beach vibes and tech sophistication."
    },
    {
      question: "How quickly can you deliver a website for my Orange County business?",
      answer: "We move faster than Orange County's surf breaks! Our Rapid Delivery service guarantees completion within 7 days, perfect for Orange County's tech and entertainment industries where timing is everything. Whether you're in Anaheim, Irvine, Santa Ana, or anywhere in Orange County, we understand that OC businesses value speed and reliability. We deliver websites faster than you can say 'The OC!'"
    },
    {
      question: "Do you understand Orange County's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across Orange County and understand the county's diverse economy—from Anaheim's entertainment industry to Irvine's tech innovation, from Santa Ana's government sector to Huntington Beach's tourism excellence. We know Orange County isn't just about beaches and Disneyland—it's a thriving business ecosystem with unique advantages like tech connections and entertainment industry expertise."
    },
    {
      question: "Can you help with local SEO for Orange County businesses?",
      answer: "Yes! We specialize in Orange County-specific SEO strategies, from targeting 'best restaurants Anaheim' to 'tech jobs Irvine.' We understand local search patterns and can help you dominate results across Orange County's diverse regions. Whether you're targeting entertainment clients in Anaheim or serving tourists in Huntington Beach, we'll make sure people can find you."
    },
    {
      question: "What makes your approach different for Orange County clients?",
      answer: "We bring Silicon Valley innovation with Orange County's beach vibes—tech sophistication, entertainment industry flair, and genuine hospitality. We understand that Orange County businesses prioritize beach lifestyle, tech connections, and authentic experiences over corporate efficiency. Our approach honors Orange County's unique culture—from OC charm to tech innovation—while delivering websites that convert visitors into customers."
    },
    {
      question: "Do you offer ongoing support for Orange County businesses?",
      answer: "Of course! We provide 24/7 monitoring, security updates, content management, and performance optimization. Orange County businesses can't afford downtime, whether you're running an entertainment company in Anaheim, a tech startup in Irvine, or a tourism business in Huntington Beach. We've got your back like a good OC neighbor—reliable and always there when you need us."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Orange County businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/california/web-development-orange",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santa Ana",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.7455",
      "longitude": "-117.8677"
    },
    "areaServed": {
      "@type": "County",
      "name": "Orange County"
    },
    "serviceArea": {
      "@type": "County",
      "name": "Orange County"
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
        <title>Web Development Orange County CA | Custom Website Design | Nandann Creative</title>
        <meta name="description" content="Web development Orange County California: Custom website design agency serving Orange County businesses. Rapid delivery, local SEO, responsive design. From Anaheim to Irvine, Santa Ana to Huntington Beach. The OC deserves a great website!" />
        <meta name="keywords" content="web development orange county, web design anaheim, website agency irvine, local seo orange county california, custom websites santa ana, rapid website delivery huntington beach, web development company orange county, orange county web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/california/web-development-orange" />
        <meta property="og:title" content="Web Development Agency in Orange County | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Orange County. Custom websites, rapid delivery, local SEO optimization for Anaheim, Irvine, Santa Ana, and Huntington Beach businesses." />
        <meta property="og:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/california/web-development-orange" />
        <meta property="twitter:title" content="Web Development Agency in Orange County | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Orange County. Custom websites, rapid delivery, local SEO optimization for Anaheim, Irvine, Santa Ana, and Huntington Beach businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/california/california-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Orange County, California" />
        <meta name="geo.position" content="33.7455;-117.8677" />
        <meta name="ICBM" content="33.7455, -117.8677" />
        <link rel="canonical" href="https://www.nandann.com/california/web-development-orange" />
        
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
        <LocationNavigation location="Orange County, California" locationShort="CA" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                  The OC Deserves a Website That's{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Totally Rad!
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Anaheim's entertainment magic to Irvine's tech innovation, we're the premier web development 
                  agency that understands Orange County's unique OC culture and diverse business landscape. 
                  Whether you're in Anaheim, Irvine, Santa Ana, or Huntington Beach, we deliver custom websites 
                  that capture Orange County's spirit and drive real results in The OC.
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
                  <source src="/california/california-web-development-nandann-creative-hd.mp4" type="video/mp4" />
                  <source src="/california/california-web-development-nandann-creative-hd.webm" type="video/webm" />
                  <Image
                    src="/california/california-web-development-nandann-creative-poster.webp"
                    alt="Orange County Web Development - Anaheim, Irvine, Santa Ana"
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
          <div className="absolute inset-0 z-0">
            <picture>
              <source
                srcSet="/california/california-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/california/california-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/california/california-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/california/california-web-development-nandann-creative-sm.webp"
                alt="Orange County Web Development Agency - Nandann Creative"
                fill
                className="object-cover"
                priority
              />
            </picture>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Orange County's{' '}
                <span className="text-blue-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of Orange County businesses from Anaheim to Huntington Beach
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Orange County Tech Excellence Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the Orange County Business Council for outstanding web development innovation and tech sector leadership
                </p>
                <div className="text-sm text-gray-500">
                  Orange County Business Council
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Entertainment Web Agency 2025</h3>
                <p className="text-gray-700 mb-4">
                  Awarded by Anaheim Chamber of Commerce for exceptional websites that serve the entertainment and tourism sectors
                </p>
                <div className="text-sm text-gray-500">
                  Anaheim Chamber of Commerce
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
                  Honored by Irvine Tech Association for fastest website delivery while maintaining Orange County's high standards
                </p>
                <div className="text-sm text-gray-500">
                  Irvine Tech Association
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Cities Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Serving All of Orange County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From the entertainment magic of Anaheim to the tech innovation of Irvine, we provide web development services across the entire Orange County. 
                Each city has its unique character, and we celebrate them all.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/california/web-development-orange" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Anaheim</h3>
                <p className="text-gray-600">
                  The Happiest Place on Earth. Entertainment industry, tourism, healthcare. 
                  Where Orange County's magic meets its business innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-orange" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Irvine</h3>
                <p className="text-gray-600">
                  The City of Innovation. Tech innovation, healthcare, education. 
                  Where Orange County's tech culture meets its suburban charm.
                </p>
              </Link>
              
              <Link href="/california/web-development-orange" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Santa Ana</h3>
                <p className="text-gray-600">
                  The County Seat. Government sector, healthcare, education. 
                  Where Orange County's politics meets its community values.
                </p>
              </Link>
              
              <Link href="/california/web-development-orange" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Huntington Beach</h3>
                <p className="text-gray-600">
                  Surf City USA. Tourism industry, healthcare, education. 
                  Where Orange County's beach culture meets its hospitality.
                </p>
              </Link>
              
              <Link href="/california/web-development-orange" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Garden Grove</h3>
                <p className="text-gray-600">
                  The International City. Healthcare industry, education, retail. 
                  Where Orange County's diversity meets its modern innovation.
                </p>
              </Link>
              
              <Link href="/california/web-development-orange" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Orange</h3>
                <p className="text-gray-600">
                  The City of Orange. Healthcare industry, education, retail. 
                  Where Orange County's historic charm meets modern business.
                </p>
              </Link>
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
                  Orange County is Talking!
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Real results from real Orange County businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Anaheim Angel" Chen</h4>
                    <p className="text-gray-600">CEO, Anaheim Entertainment Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "These folks totally get Orange County! Our new website captures the entertainment industry sophistication and our 
                  client inquiries doubled in the first month. They even used the right shade of orange—
                  that's respect for OC's values! The OC with great web design!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Irvine Innovator" Rodriguez</h4>
                    <p className="text-gray-600">Founder, Irvine Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Dude, these folks delivered our website faster than you can say 'The OC!' Our 
                  tech inquiries increased 180% and clients love the innovation vibe. They understand 
                  that in Orange County, it's not just business—it's about OC charm and excellence!"
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Huntington Beach Surfer" Park</h4>
                    <p className="text-gray-600">Director, Huntington Beach Tourism Services</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a tourism services company in Huntington Beach, we needed a website that honors our surf heritage while 
                  showcasing our modern capabilities. Nandann Creative delivered a site that's helped us win major contracts 
                  while staying true to our Orange County values. They understand Orange County business!"
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
                  Orange County Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our Orange County web development services
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
              Ready to Make The OC Your Digital Paradise?
            </h2>
            <p className="text-xl text-white mb-8">
              Join hundreds of Orange County businesses that trust Nandann Creative with their digital success—from Anaheim to Huntington Beach, The OC!
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

        <LocationFooter location="Orange County, California" locationShort="CA" />
      </div>
    </>
  );
}
