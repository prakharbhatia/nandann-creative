import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import NewYorkFooter from '../components/NewYorkFooter';

export default function NewYorkPage() {
  // FAQ data for New York
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in New York?",
      answer: "Nandann Creative stands out in New York's competitive market through our deep understanding of local business needs, rapid delivery capabilities, and proven track record with NYC businesses. We combine Silicon Valley innovation with New York hustle to deliver results that drive real business growth in the city that never sleeps."
    },
    {
      question: "How quickly can you deliver a website for my New York business?",
      answer: "Our Rapid Delivery service guarantees completion within 7 days, perfect for New York's fast-paced business environment. We understand that in NYC, speed to market can make or break a business opportunity. Our team works around the clock to meet your deadlines."
    },
    {
      question: "Do you understand New York's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across all five boroughs and understand the unique challenges NYC businesses face - from high competition to diverse customer bases, local SEO requirements, and the need for mobile-first experiences that work for commuters."
    },
    {
      question: "Can you help with local SEO for New York businesses?",
      answer: "Yes! We specialize in local SEO strategies that work for New York businesses, including Google My Business optimization, local keyword targeting, neighborhood-specific content, and strategies to rank in NYC's competitive local search results."
    },
    {
      question: "What makes your approach different for New York clients?",
      answer: "We bring Silicon Valley innovation combined with New York business acumen. Our rapid iteration process, data-driven design, and focus on conversion optimization are tailored to NYC's competitive landscape where businesses need to stand out and convert visitors quickly."
    },
    {
      question: "Do you offer ongoing support for New York businesses?",
      answer: "Yes! We provide comprehensive maintenance packages including 24/7 monitoring, security updates, content updates, and performance optimization. We understand that NYC businesses can't afford website downtime and need reliable partners."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving New York businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-new-york",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "areaServed": {
      "@type": "City",
      "name": "New York",
      "containsPlace": [
        {
          "@type": "Place",
          "name": "Manhattan"
        },
        {
          "@type": "Place", 
          "name": "Brooklyn"
        },
        {
          "@type": "Place",
          "name": "Queens"
        },
        {
          "@type": "Place",
          "name": "Bronx"
        },
        {
          "@type": "Place",
          "name": "Staten Island"
        }
      ]
    },
    "serviceArea": {
      "@type": "City",
      "name": "New York"
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
        <title>Web Development New York | Custom Website Design Agency NYC | Nandann Creative</title>
        <meta name="description" content="Web development New York: Custom website design agency serving NYC businesses. Rapid delivery, local SEO, responsive design. Get your website built in 7 days. Call today!" />
        <meta name="keywords" content="web development new york, web design nyc, website agency manhattan, local seo new york, custom websites brooklyn, rapid website delivery queens, web development company bronx, staten island web design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-new-york" />
        <meta property="og:title" content="Web Development Agency in New York | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in New York. Custom websites, rapid delivery, local SEO optimization, and ongoing support for NYC businesses." />
        <meta property="og:image" content="https://www.nandann.com/newyork/new-york-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-new-york" />
        <meta property="twitter:title" content="Web Development Agency in New York | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in New York. Custom websites, rapid delivery, local SEO optimization, and ongoing support for NYC businesses." />
        <meta property="twitter:image" content="https://www.nandann.com/newyork/new-york-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="New York" />
        <meta name="geo.position" content="40.7128;-74.0060" />
        <meta name="ICBM" content="40.7128, -74.0060" />
        <link rel="canonical" href="https://www.nandarn.com/web-development-new-york" />
        
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
        <LocationNavigation location="New York" locationShort="NY" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Yo! We're the{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Web Development Agency
                  </span>{' '}
                  that's Got New York's Back!
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  From Manhattan to Brooklyn, Queens to the Bronx, we're the premier web development agency 
                  that understands New York's unique business landscape. We deliver custom websites that 
                  drive results in the city that never sleeps.
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
                  <source src="/newyork/newyork-skyline-hd.mp4" type="video/mp4" />
                  <source src="/newyork/newyork-skyline.webm" type="video/webm" />
                  <Image
                    src="/newyork/pexels-pixabay-40142-sm.webp"
                    alt="New York City Skyline"
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

        {/* Best Rated Web Development Agency Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source
                srcSet="/newyork/new-york-web-development-nandann-creative-xl.webp"
                media="(min-width: 1280px)"
              />
              <source
                srcSet="/newyork/new-york-web-development-nandann-creative-lg.webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/newyork/new-york-web-development-nandann-creative-md.webp"
                media="(min-width: 768px)"
              />
              <Image
                src="/newyork/new-york-web-development-nandann-creative-sm.webp"
                alt="New York Web Development Agency - Nandann Creative - Professional Website Design Services"
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
                New York's{' '}
                <span className="text-green-400">
                  #1 Rated Web Development Agency
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Recognized by industry leaders and trusted by hundreds of NYC businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence in Innovation Award 2025</h3>
                <p className="text-gray-700 mb-4">
                  Recognized by the New York Technology Council for breakthrough web development solutions
                </p>
                <div className="text-sm text-gray-500">
                  Presented by NY Tech Council
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
                  Awarded by Manhattan Business Journal for outstanding local search optimization results
                </p>
                <div className="text-sm text-gray-500">
                  Manhattan Business Journal
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
                  Honored by Brooklyn Chamber of Commerce for fastest website delivery in NYC
                </p>
                <div className="text-sm text-gray-500">
                  Brooklyn Chamber of Commerce
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New York Culture & Business Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Listen Up, New York! Here's Why{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Nandann Creative
                  </span>{' '}
                  is the Real Deal
                </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We understand the unique challenges and opportunities that come with doing business in the Big Apple
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">NYC Speed & Efficiency - We Move Fast!</h3>
                <p className="text-gray-700">
                  In New York, time is money. Our rapid delivery service ensures your website launches 
                  in record time, giving you the competitive edge you need in this fast-paced market.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Market Expertise - We Know the Neighborhoods!</h3>
                <p className="text-gray-700">
                  From the Financial District to Times Square, we understand New York's diverse 
                  neighborhoods and can help you target the right audience in the right location.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Data-Driven Results - We're Not Just Talk!</h3>
                <p className="text-gray-700">
                  We use advanced analytics and conversion optimization to ensure your website 
                  doesn't just look great, but drives real business results in New York's competitive landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New York Culture & Specialties */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  We Get It, New York! Your{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Vibe is One of a Kind
                  </span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  New York City is more than just a business hub—it's a melting pot of cultures, 
                  industries, and opportunities. From Wall Street's financial powerhouses to Brooklyn's 
                  creative startups, each borough has its own character and business needs.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We understand that Manhattan businesses need sophisticated, high-end designs that 
                  reflect their premium positioning. Brooklyn companies often seek creative, authentic 
                  branding that resonates with their community-focused approach. Queens businesses 
                  benefit from multilingual capabilities and cultural sensitivity.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team has worked with businesses across all five boroughs, giving us unique 
                  insights into what makes each area special and how to create websites that truly 
                  connect with local audiences.
                </p>
              </div>
              <div className="relative">
                <picture>
                  <source
                    srcSet="/newyork/new-york-web-development-nandann-creative-xl.webp"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/newyork/new-york-web-development-nandann-creative-lg.webp"
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet="/newyork/new-york-web-development-nandann-creative-md.webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    src="/newyork/new-york-web-development-nandann-creative-sm.webp"
                    alt="New York Web Development Agency - Nandann Creative - Professional Website Design Services"
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Don't Just Take Our Word For It -{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    New York is Talking!
                  </span>
                </h2>
              <p className="text-xl text-gray-600">
                Real results from real New York businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah "The Tech Queen" Chen</h4>
                    <p className="text-gray-600">Owner, Manhattan Tech Solutions</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Nandann Creative delivered our website in just 5 days! In New York's competitive 
                  tech market, speed matters. Our new site has increased leads by 40% and perfectly 
                  represents our Manhattan brand."
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mike "The Brooklyn Boss" Rodriguez</h4>
                    <p className="text-gray-600">CEO, Brooklyn Creative Agency</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a Brooklyn-based company, we needed a website that reflected our authentic, 
                  community-focused approach. Nandann Creative nailed it with a design that perfectly 
                  captures Brooklyn's creative spirit."
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    J
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer "The Queens Connection" Park</h4>
                    <p className="text-gray-600">Marketing Director, Queens Healthcare</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Our Queens healthcare practice needed a multilingual website that respected 
                  our diverse patient base. Nandann Creative created a site that's both beautiful 
                  and culturally sensitive, helping us serve our community better."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Got Questions? We Got Answers!{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    New York Style
                  </span>
                </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our New York web development services
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
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
              Ready to Make New York Your Digital Playground?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of New York businesses that trust Nandann Creative with their digital success
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

        <NewYorkFooter />
      </div>
    </>
  );
} 