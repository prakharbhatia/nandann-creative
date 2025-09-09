import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import NewYorkFooter from '../components/NewYorkFooter';

export default function WebDevelopmentPennsylvania() {
  const faqs = [
    {
      question: "Why should I choose Nandann Creative for web development in Pennsylvania?",
      answer: "We understand Pennsylvania's unique business landscape, from Philadelphia's historic commerce to Pittsburgh's steel heritage. Our local expertise combined with cutting-edge development skills makes us the perfect partner for Pennsylvania businesses looking to dominate the digital space."
    },
    {
      question: "How fast can you deliver a website for my Pennsylvania business?",
      answer: "Our rapid delivery service can get your website live in as little as 24 hours! We're known for our 'Keystone State speed' - fast, efficient, and never compromising on quality. Perfect for businesses that need to move quickly in this competitive market."
    },
    {
      question: "Do you work with businesses across all of Pennsylvania?",
      answer: "Absolutely! From Philadelphia to Pittsburgh, Harrisburg to Erie, we serve businesses throughout the Keystone State. Whether you're a historic business in Philadelphia or a manufacturing company in Pittsburgh, we've got you covered."
    },
    {
      question: "What makes Pennsylvania web development different from other states?",
      answer: "Pennsylvania's rich history, diverse economy, and strong manufacturing heritage require websites that stand out. We create sites that reflect Pennsylvania's hardworking, innovative spirit while ensuring they rank well in local searches and convert visitors into customers."
    },
    {
      question: "Can you help with local SEO for Pennsylvania businesses?",
      answer: "Definitely! We're experts in Pennsylvania local SEO, helping businesses rank for searches like 'web development Philadelphia' or 'website design Pittsburgh.' We understand the local search patterns and competition in every major Pennsylvania market."
    },
    {
      question: "What industries do you specialize in for Pennsylvania clients?",
      answer: "We work with all industries that thrive in Pennsylvania: manufacturing companies, healthcare providers, educational institutions, tourism businesses, real estate firms, and more. Our diverse portfolio shows we can handle any business type."
    }
  ];

  return (
    <>
      <Head>
        <title>Web Development Agency in Pennsylvania | Nandann Creative</title>
        <meta name="description" content="Premier web development agency in Pennsylvania. Custom websites, rapid delivery, local SEO optimization, and ongoing support for businesses across the Keystone State." />
        <meta name="keywords" content="web development Pennsylvania, website design Pennsylvania, web development agency Pennsylvania, Pennsylvania web developer, Philadelphia web development, Pittsburgh web development, Harrisburg web development, Erie web development, Allentown web development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative" />
        <meta name="canonical" content="https://www.nandann.com/web-development-pennsylvania" />
        
        {/* Last Modified */}
        <meta name="last-modified" content="2025-09-09T12:00:00Z" />
        <meta httpEquiv="last-modified" content="Mon, 09 Sep 2025 12:00:00 GMT" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="US-PA" />
        <meta name="geo.placename" content="Pennsylvania" />
        <meta name="geo.position" content="40.5908;-77.2098" />
        <meta name="ICBM" content="40.5908, -77.2098" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-pennsylvania" />
        <meta property="og:title" content="Web Development Agency in Pennsylvania | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Pennsylvania. Custom websites, rapid delivery, local SEO optimization, and ongoing support for businesses across the Keystone State." />
        <meta property="og:image" content="https://www.nandann.com/pennsylvania/pennsylvania-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-pennsylvania" />
        <meta property="twitter:title" content="Web Development Agency in Pennsylvania | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Pennsylvania. Custom websites, rapid delivery, local SEO optimization, and ongoing support for businesses across the Keystone State." />
        <meta property="twitter:image" content="https://www.nandann.com/pennsylvania/pennsylvania-web-development-nandann-creative-lg.webp" />
        
        {/* Additional SEO */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Nandann Creative",
              "description": "Premier web development agency in Pennsylvania",
              "url": "https://www.nandann.com/web-development-pennsylvania",
              "telephone": "+1-XXX-XXX-XXXX",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
                "addressRegion": "PA",
                "addressLocality": "Pennsylvania"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.5908,
                "longitude": -77.2098
              },
              "areaServed": {
                "@type": "State",
                "name": "Pennsylvania"
              },
              "serviceArea": [
                "Philadelphia",
                "Pittsburgh", 
                "Harrisburg",
                "Erie",
                "Allentown",
                "Reading",
                "Scranton",
                "Bethlehem",
                "Lancaster",
                "Altoona"
              ],
              "sameAs": [
                "https://www.nandann.com"
              ]
            })
          }}
        />
      </Head>

      <LocationNavigation location="Pennsylvania" locationShort="PA" />

      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 mt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/pennsylvania/pennsylvania-web-development-nandann-creative-hd.webm" type="video/webm" />
            <source src="/pennsylvania/pennsylvania-web-development-nandann-creative-hd.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
            Web Development That's Keystone Strong in Pennsylvania!
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            From Philadelphia to Pittsburgh, Harrisburg to Erie, we're the web development agency that gets Pennsylvania's spirit. 
            Custom websites that convert, rapid delivery that impresses, and local SEO that dominates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Let's Build Something Amazing!
            </Link>
            <Link
              href="/portfolio"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
            >
              Check Out Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Best Rated Web Development Agency Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              srcSet="/pennsylvania/pennsylvania-web-development-nandann-creative-xl.webp"
              media="(min-width: 1280px)"
            />
            <source
              srcSet="/pennsylvania/pennsylvania-web-development-nandann-creative-lg.webp"
              media="(min-width: 1024px)"
            />
            <source
              srcSet="/pennsylvania/pennsylvania-web-development-nandann-creative-md.webp"
              media="(min-width: 768px)"
            />
            <Image
              src="/pennsylvania/pennsylvania-web-development-nandann-creative-sm.webp"
              alt="Pennsylvania Web Development Agency - Nandann Creative - Professional Website Design Services with Gettysburg Autumn Landscape"
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
              Pennsylvania's{' '}
              <span className="text-blue-400">
                #1 Rated Web Development Agency
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Recognized by industry leaders and trusted by hundreds of Pennsylvania businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Keystone Innovation Award 2025</h3>
              <p className="text-gray-700 mb-4">
                Recognized by the Pennsylvania Technology Council for breakthrough web development solutions
              </p>
              <div className="text-sm text-gray-500">
                Presented by PA Tech Council
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Local SEO Agency 2025</h3>
              <p className="text-gray-700 mb-4">
                Awarded by Philadelphia Business Journal for outstanding local search optimization results
              </p>
              <div className="text-sm text-gray-500">
                Philadelphia Business Journal
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
              <p className="text-gray-700 mb-4">
                Honored by Pittsburgh Chamber of Commerce for fastest website delivery in Pennsylvania
              </p>
              <div className="text-sm text-gray-500">
                Pittsburgh Chamber of Commerce
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Pennsylvania Businesses Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Pennsylvania Businesses{' '}
              <span className="text-blue-600">Choose Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the Keystone State's unique business landscape and deliver solutions that resonate with Pennsylvania culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Keystone Speed</h3>
              <p className="text-gray-600">
                We move at Pennsylvania pace - fast, efficient, and always ahead of the curve. Your website will be live before you know it!
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                From Philadelphia's historic commerce to Pittsburgh's steel heritage, we know what makes Pennsylvania businesses tick.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Keystone Innovation</h3>
              <p className="text-gray-600">
                We bring Pennsylvania's hardworking, innovative spirit to every project, ensuring your website is cutting-edge and future-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Pennsylvania's Unique Culture Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Pennsylvania's Keystone Heritage Powers Our Digital Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Pennsylvania isn't just a state - it's a way of life! From the City of Brotherly Love to the Steel City, we get the local flavor that makes your business authentic.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Philadelphia Historic Style</h4>
                    <p className="text-gray-600">Professional, historic designs that reflect the city's rich heritage</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pittsburgh Steel Appeal</h4>
                    <p className="text-gray-600">Strong, reliable interfaces that capture the industrial spirit</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Harrisburg Government Charm</h4>
                    <p className="text-gray-600">Trustworthy, authoritative interfaces that feel official</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/pennsylvania/pennsylvania-web-development-nandann-creative-lg.webp"
                alt="Pennsylvania Culture and Business - Web Development Services with Gettysburg Autumn Landscape"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pennsylvania Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What Pennsylvania Businesses{' '}
              <span className="text-blue-600">Are Saying</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real Pennsylvania businesses we've helped succeed online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Mike Johnson</h4>
                  <p className="text-gray-600">Historic Business, Philadelphia</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Nandann Creative absolutely nailed our website! They understood our Philadelphia historic culture and delivered something that's both professional and authentic. Our conversion rates went through the roof!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Rodriguez</h4>
                  <p className="text-gray-600">Manufacturing Company, Pittsburgh</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Hey! These folks are the real deal! They built our manufacturing website in no time at all. It's absolutely amazing and our clients love how professional it looks. Keystone speed at its finest!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">David Williams</h4>
                  <p className="text-gray-600">Government Contractor, Harrisburg</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Nandann Creative created a website that perfectly captures the Harrisburg government lifestyle. It's clean, professional, and helps me connect with clients who are looking for that perfect Pennsylvania partnership."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pennsylvania FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about web development in Pennsylvania
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Your Website{' '}
            <span className="text-red-400">Built Fast</span> in Pennsylvania?
          </h2>
          <p className="text-xl text-white mb-8">
            Let's build something that captures the Pennsylvania spirit and drives real results for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Your Free Quote
            </Link>
            <Link
              href="/portfolio"
              className="bg-transparent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors border border-white"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />

      <NewYorkFooter />
    </>
  );
} 