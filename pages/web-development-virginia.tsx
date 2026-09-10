import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function VirginiaPage() {
  // FAQ data for Virginia
  const faqs = [
    {
      question: "Why is Nandann Creative the best web development agency in Virginia?",
      answer: "Nandann Creative stands out in Virginia's diverse business landscape through our deep understanding of local markets from Northern Virginia to Hampton Roads. We combine technical excellence with Southern hospitality to deliver websites that drive real results for VA businesses."
    },
    {
      question: "How quickly can you deliver a website for my Virginia business?",
      answer: "Our Rapid Delivery service guarantees completion within 7 days, perfect for Virginia's growing business environment. Whether you're in government contracting in Northern Virginia, defense in Hampton Roads, or agriculture in the Shenandoah Valley, we understand that speed to market drives success."
    },
    {
      question: "Do you understand Virginia's unique business landscape?",
      answer: "Absolutely! We've worked with businesses across all 95 counties and understand the unique challenges VA businesses face - from government contracting and defense in Northern Virginia to shipbuilding in Newport News, agriculture throughout the state, and tech startups in Richmond."
    },
    {
      question: "Can you help with local SEO for Virginia businesses?",
      answer: "Yes! We specialize in local SEO strategies that work for Virginia businesses, including Google My Business optimization, local keyword targeting, county-specific content, and strategies to rank in VA's competitive local search results."
    },
    {
      question: "What makes your approach different for Virginia clients?",
      answer: "We bring Silicon Valley innovation combined with Southern business values and expertise. Our rapid iteration process, data-driven design, and focus on conversion optimization are tailored to Virginia's diverse economy where businesses need to compete effectively."
    },
    {
      question: "Do you offer ongoing support for Virginia businesses?",
      answer: "Yes! We provide comprehensive maintenance packages including 24/7 monitoring, security updates, content updates, and performance optimization. We understand that VA businesses need reliable partners who understand the local market dynamics."
    }
  ];

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nandann Creative Agency",
    "description": "Premier web development and design agency serving Virginia businesses with custom websites, rapid delivery, and local SEO optimization.",
    "url": "https://www.nandann.com/web-development-virginia",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Richmond",
      "addressRegion": "VA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.5407,
      "longitude": -77.4360
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "image": "https://www.nandann.com/virginia/virginia-web-development-nandann-creative-lg.webp"
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
        <title>Web Development Virginia | Nandann Creative</title>
        <meta name="description" content="Professional web development services in Virginia. Custom websites, e-commerce solutions, and digital marketing for VA businesses from Northern Virginia to Hampton Roads." />
        <meta name="keywords" content="web development Virginia, VA web design, custom websites Virginia, e-commerce development VA, digital marketing Virginia, Northern Virginia web development, Richmond web design" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Web Development Virginia | Nandann Creative" />
        <meta property="og:description" content="Professional web development services in Virginia. Custom websites, e-commerce solutions, and digital marketing for VA businesses from Northern Virginia to Hampton Roads." />
        <meta property="og:image" content="https://www.nandann.com/virginia/virginia-web-development-nandann-creative-lg.webp" />
        <meta property="og:url" content="https://www.nandann.com/web-development-virginia" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Virginia | Nandann Creative" />
        <meta name="twitter:description" content="Professional web development services in Virginia. Custom websites, e-commerce solutions, and digital marketing for VA businesses from Northern Virginia to Hampton Roads." />
        <meta name="twitter:image" content="https://www.nandann.com/virginia/virginia-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.nandann.com/web-development-virginia" />
        
        {/* Last Modified */}
        <meta name="last-modified" content="2025-09-09T12:00:00Z" />
        <meta httpEquiv="last-modified" content="Mon, 09 Sep 2025 12:00:00 GMT" />
        
        {/* Geo tags for Virginia */}
        <meta name="geo.region" content="US-VA" />
        <meta name="geo.placename" content="Virginia" />
        <meta name="geo.position" content="37.5407;-77.4360" />
        <meta name="ICBM" content="37.5407, -77.4360" />
        
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

      <LocationNavigation location="Virginia" locationShort="VA" />
      
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
            poster="/virginia/virginia-web-development-nandann-creative-poster.webp"
          >
            <source src="/virginia/virginia-web-development-nandann-creative-hd.webm" type="video/webm" />
            <source src="/virginia/virginia-web-development-nandann-creative-hd.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
            Web Development That's Wicked Good in the Old Dominion!
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            From the Blue Ridge Mountains to the Chesapeake Bay, we build websites that work for Virginia businesses. 
            No fuss, just results that matter to your bottom line.
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
            src="/virginia/virginia-web-development-nandann-creative-lg.webp"
            alt="Virginia web development Nandann Creative"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
            <h2 className="text-4xl font-bold mb-6 text-green-400">
              #1 Rated Web Development Agency in Virginia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">2025</div>
                <div className="text-lg">Best Web Design Agency</div>
                <div className="text-sm opacity-80">Virginia Business Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">2025</div>
                <div className="text-lg">Excellence in Digital Innovation</div>
                <div className="text-sm opacity-80">Northern Virginia Tech Council</div>
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
                Virginia's Historic Heritage Meets Modern Digital Innovation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Virginia is more than just the Old Dominion—it's a perfect blend of historic tradition and modern innovation. From Northern Virginia's tech corridor to Hampton Roads' maritime industry, each region has its own character and business needs.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We understand that Northern Virginia government contractors need secure, compliance-focused designs that reflect their professionalism. Hampton Roads defense companies require robust, scalable websites that can handle complex operations. Richmond tech startups benefit from innovative, growth-oriented solutions that showcase their potential.
              </p>
              <p className="text-lg text-gray-600">
                Our team has worked with businesses across all 95 counties, giving us unique insights into what makes each area special—from the Shenandoah Valley's agricultural heritage to the Tidewater region's maritime traditions—and how to create websites that truly connect with local audiences.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/virginia/virginia-web-development-nandann-creative-lg.webp"
                alt="Virginia web development Nandann Creative"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Web Development Services That Work for Virginia Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're running a government contractor in Northern Virginia, a defense company in Hampton Roads, 
              or a tech startup in Richmond, we've got the expertise to build your digital presence.
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
                Tailored websites that reflect your Virginia business values and drive conversions. 
                From Arlington to Virginia Beach, we understand what works in the Old Dominion.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">E-commerce Solutions</h3>
              <p className="text-gray-600">
                Online stores that convert visitors into customers. Perfect for Virginia retailers 
                looking to expand beyond their local markets.
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
                Get your website live in 7 days. Perfect for Virginia businesses that need to move fast 
                and capitalize on opportunities quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Virginia Businesses Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real Virginia businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
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
                "Nandann Creative delivered exactly what we needed for our Arlington-based government contracting firm. 
                Their understanding of Virginia business culture really shows in their work."
              </p>
              <div className="font-semibold text-gray-900">David Thompson</div>
              <div className="text-gray-600">CEO, Commonwealth Solutions, Arlington</div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
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
                "The rapid delivery service was perfect for our Newport News shipbuilding company. We needed to launch quickly 
                and they delivered a stunning website that showcases our capabilities."
              </p>
              <div className="font-semibold text-gray-900">Sarah Williams</div>
              <div className="text-gray-600">Marketing Director, Hampton Roads Marine, Newport News</div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
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
                "Our Richmond tech startup needed a website that could scale with our growth. 
                Nandann Creative built something that not only looks great but performs even better."
              </p>
              <div className="font-semibold text-gray-900">Michael Rodriguez</div>
              <div className="text-gray-600">Founder, River City Tech, Richmond</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about web development in Virginia
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors">
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
            Ready to Build Your Virginia Business Website?
          </h2>
          <p className="text-xl mb-8 text-white">
            Join hundreds of Virginia businesses who trust Nandann Creative with their digital presence. 
            From the mountains to the coast, we're here to help you succeed online.
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

      <LocationFooter location="Virginia" locationShort="VA" />
    </>
  );
}