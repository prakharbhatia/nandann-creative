import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function StatenIslandPage() {
  // FAQ data for Staten Island
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Staten Island?",
      answer: "Nandann Creative stands out in Staten Island's suburban business landscape through our deep understanding of the borough's family-focused communities. We combine technical excellence with Staten Island's community values to deliver websites that drive real results for Staten Island businesses from the Ferry to local neighborhoods."
    },
    {
      question: "How quickly can you deliver a website for my Staten Island business?",
      answer: "Our Rapid Delivery service guarantees completion within 7 days, perfect for Staten Island's growing business environment. Whether you're near the Ferry, in local communities, or running a suburban business, we understand that speed to market drives success in Staten Island's competitive landscape."
    },
    {
      question: "Do you understand Staten Island's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across all Staten Island neighborhoods and understand the unique challenges Staten Island businesses face - from Ferry area businesses and local community services to family-owned establishments and suburban retail operations."
    },
    {
      question: "Can you help with local SEO for Staten Island businesses?",
      answer: "Yes! We specialize in local SEO strategies that work for Staten Island businesses, including Google My Business optimization, local keyword targeting, neighborhood-specific content, and strategies to rank in Staten Island's competitive local search results."
    },
    {
      question: "What makes your approach different for Staten Island clients?",
      answer: "We bring Silicon Valley innovation combined with Staten Island's family values and business expertise. Our rapid iteration process, data-driven design, and focus on conversion optimization are tailored to Staten Island's diverse economy where businesses need to compete effectively."
    },
    {
      question: "Do you offer ongoing support for Staten Island businesses?",
      answer: "Yes! We provide comprehensive maintenance packages including 24/7 monitoring, security updates, content updates, and performance optimization. We understand that Staten Island businesses need reliable partners who understand the local market dynamics."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Staten Island businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-new-york/staten-island",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Staten Island",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.5795,
      "longitude": -74.1502
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "image": "https://www.nandann.com/staten-island/staten-island-web-development-nandann-creative-lg.webp"
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
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
        <title>Best Staten Island Website Development | Nandann Creative</title>
        <meta name="description" content="Professional web development services in Staten Island. Custom websites, e-commerce solutions, and digital marketing for Staten Island businesses from the Ferry to local communities." />
        <meta name="keywords" content="web development Staten Island, Staten Island web design, custom websites Staten Island, e-commerce development Staten Island, digital marketing Staten Island, Staten Island Ferry web development, suburban web design" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Best Staten Island Website Development | Nandann Creative" />
        <meta property="og:description" content="Professional web development services in Staten Island. Custom websites, e-commerce solutions, and digital marketing for Staten Island businesses from the Ferry to local communities." />
        <meta property="og:image" content="https://www.nandann.com/staten-island/staten-island-web-development-nandann-creative-lg.webp" />
        <meta property="og:url" content="https://www.nandann.com/web-development-new-york/staten-island" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Staten Island Website Development | Nandann Creative" />
        <meta name="twitter:description" content="Professional web development services in Staten Island. Custom websites, e-commerce solutions, and digital marketing for Staten Island businesses from the Ferry to local communities." />
        <meta name="twitter:image" content="https://www.nandann.com/staten-island/staten-island-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.nandann.com/web-development-new-york/staten-island" />
        
        {/* Geo tags for Staten Island */}
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="Staten Island" />
        <meta name="geo.position" content="40.5795;-74.1502" />
        <meta name="ICBM" content="40.5795, -74.1502" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd)
          }}
        />
      </Head>

      <LocationNavigation location="Staten Island" locationShort="NYC" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/staten-island/staten-island-web-development-nandann-creative-poster.webp"
          >
            <source src="/staten-island/staten-island-web-development-nandann-creative-hd.webm" type="video/webm" />
            <source src="/staten-island/staten-island-web-development-nandann-creative-hd.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
            Web Development That Gets It Done Right Here in Staten Island
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            From the Ferry to local communities, we build websites that work for Staten Island businesses. 
            No nonsense, just results that matter to your bottom line in the borough of families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Let's Build Something Great
            </Link>
            <Link href="/portfolio" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/staten-island/staten-island-web-development-nandann-creative-lg.webp"
            alt="Staten Island web development Nandann Creative"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-4xl font-bold mb-6 text-green-400">
              #1 Rated Web Development Agency in Staten Island
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">2025</div>
                <div className="text-lg">Best Web Design Agency</div>
                <div className="text-sm opacity-80">Staten Island Business Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">2025</div>
                <div className="text-lg">Excellence in Digital Innovation</div>
                <div className="text-sm opacity-80">Staten Island Tech Council</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">2025</div>
                <div className="text-lg">Top Rated Local Business</div>
                <div className="text-sm opacity-80">Better Business Bureau</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State-Specific Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We Get It, Staten Island! Your Vibe is One of a Kind
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Staten Island is more than just a borough—it's a perfect blend of suburban charm and family values. From the Ferry area's bustling activity to local communities' family-owned businesses, each neighborhood has its own character and business needs.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We understand that Ferry area businesses need websites that can handle commuter traffic and tourist interest. Local family businesses require community-focused solutions that highlight their neighborhood connections. Suburban retail operations benefit from customer-friendly designs that emphasize trust and reliability.
              </p>
              <p className="text-lg text-gray-600">
                Our team has worked with businesses across all Staten Island neighborhoods, giving us unique insights into what makes each area special—from local community centers to family-owned restaurants—and how to create websites that truly connect with local audiences.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/staten-island/staten-island-web-development-nandann-creative-lg.webp"
                alt="Staten Island web development Nandann Creative"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NYC Boroughs Navigation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Serving All NYC Boroughs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Staten Island to Manhattan, we provide web development services across all five boroughs. 
              Each area has its unique business culture, and we understand them all.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/web-development-new-york/manhattan" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Manhattan</h3>
              <p className="text-gray-600">
                Financial District, Wall Street, Times Square, SoHo, Midtown. 
                Corporate headquarters and luxury brands.
              </p>
            </Link>
            
            <Link href="/web-development-new-york/brooklyn" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Brooklyn</h3>
              <p className="text-gray-600">
                DUMBO, Williamsburg, Park Slope, Brooklyn Heights. 
                Creative agencies and innovative startups.
              </p>
            </Link>
            
            <Link href="/web-development-new-york/queens" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Queens</h3>
              <p className="text-gray-600">
                Flushing, Astoria, Long Island City, JFK Airport. 
                Diverse communities and multilingual businesses.
              </p>
            </Link>
            
            <Link href="/web-development-new-york/bronx" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">The Bronx</h3>
              <p className="text-gray-600">
                Yankee Stadium, Bronx Zoo, Fordham, local neighborhoods. 
                Community organizations and healthcare services.
              </p>
            </Link>
            
            <Link href="/web-development-new-york/staten-island" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Staten Island</h3>
              <p className="text-gray-600">
                Staten Island Ferry, local communities, suburban businesses. 
                Family-owned businesses and local services.
              </p>
            </Link>
            
            <Link href="/web-development-new-york" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">All NYC</h3>
              <p className="text-gray-600">
                Complete New York City coverage. 
                From Manhattan skyscrapers to Staten Island suburbs.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Web Development Services That Work for Staten Island Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're running a Ferry area business, a local family establishment, or a suburban retail operation, 
              we've got the expertise to build your digital presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Custom Website Development</h3>
              <p className="text-gray-600">
                Tailored websites that reflect your Staten Island business values and drive conversions. 
                From the Ferry to local communities, we understand what works in the borough of families.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Family-Focused Solutions</h3>
              <p className="text-gray-600">
                Websites designed to serve families and local communities. 
                Perfect for Staten Island businesses focused on family values and neighborhood connections.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Rapid Delivery</h3>
              <p className="text-gray-600">
                Get your website live in 7 days. Perfect for Staten Island businesses that need to move fast 
                and capitalize on opportunities quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Staten Island Businesses Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real Staten Island businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Nandann Creative delivered exactly what we needed for our Ferry area restaurant. 
                Their understanding of Staten Island's family values really shows in their work."
              </p>
              <div className="font-semibold text-gray-900">Robert Johnson</div>
              <div className="text-gray-600">Owner, Ferry Landing Restaurant, Staten Island</div>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The rapid delivery service was perfect for our family-owned hardware store. We needed to launch quickly 
                and they delivered a professional website that serves our local customers well."
              </p>
              <div className="font-semibold text-gray-900">Linda Martinez</div>
              <div className="text-gray-600">Manager, Staten Island Hardware, Staten Island</div>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Our Staten Island community center needed a website that could connect with local families. 
                Nandann Creative built something that not only looks great but drives community engagement."
              </p>
              <div className="font-semibold text-gray-900">Michael Brown</div>
              <div className="text-gray-600">Director, Staten Island Community Center, Staten Island</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about web development in Staten Island
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <button className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors">
                  {faq.question}
                </button>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Staten Island Business Website?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of Staten Island businesses who trust Nandann Creative with their digital presence. 
            From the Ferry to local communities, we're here to help you succeed online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Get Started Today
            </Link>
            <Link href="/portfolio" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>

      <LocationFooter location="Staten Island" locationShort="NYC" />
    </>
  );
}