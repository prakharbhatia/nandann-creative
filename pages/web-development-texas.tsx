import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import NewYorkFooter from '../components/NewYorkFooter';

export default function WebDevelopmentTexas() {
  const faqs = [
    {
      question: "Why should I choose Nandann Creative for web development in Texas?",
      answer: "We understand Texas's unique business landscape, from Houston's energy sector to Austin's tech scene. Our local expertise combined with cutting-edge development skills makes us the perfect partner for Texas businesses looking to dominate the digital space."
    },
    {
      question: "How fast can you deliver a website for my Texas business?",
      answer: "Our rapid delivery service can get your website live in as little as 24 hours! We're known for our 'Texas speed' - fast, efficient, and never compromising on quality. Perfect for businesses that need to move quickly in this competitive market."
    },
    {
      question: "Do you work with businesses across all of Texas?",
      answer: "Absolutely! From Houston to Dallas, Austin to San Antonio, we serve businesses throughout the Lone Star State. Whether you're an energy company in Houston or a tech startup in Austin, we've got you covered."
    },
    {
      question: "What makes Texas web development different from other states?",
      answer: "Texas's diverse economy, energy focus, and tech innovation require websites that stand out. We create sites that reflect Texas's bold, independent spirit while ensuring they rank well in local searches and convert visitors into customers."
    },
    {
      question: "Can you help with local SEO for Texas businesses?",
      answer: "Definitely! We're experts in Texas local SEO, helping businesses rank for searches like 'web development Houston' or 'website design Austin.' We understand the local search patterns and competition in every major Texas market."
    },
    {
      question: "What industries do you specialize in for Texas clients?",
      answer: "We work with all industries that thrive in Texas: energy companies, tech startups, healthcare providers, real estate firms, manufacturing businesses, and more. Our diverse portfolio shows we can handle any business type."
    }
  ];

  return (
    <>
      <Head>
        <title>Web Development Agency in Texas | Nandann Creative</title>
        <meta name="description" content="Premier web development agency in Texas. Custom websites, rapid delivery, local SEO optimization, and ongoing support for businesses across the Lone Star State." />
        <meta name="keywords" content="web development Texas, website design Texas, web development agency Texas, Texas web developer, Houston web development, Austin web development, Dallas web development, San Antonio web development, Fort Worth web development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative" />
        <meta name="canonical" content="https://www.nandann.com/web-development-texas" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Texas" />
        <meta name="geo.position" content="31.9686;-99.9018" />
        <meta name="ICBM" content="31.9686, -99.9018" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-texas" />
        <meta property="og:title" content="Web Development Agency in Texas | Nandann Creative" />
        <meta property="og:description" content="Premier web development agency in Texas. Custom websites, rapid delivery, local SEO optimization, and ongoing support for businesses across the Lone Star State." />
        <meta property="og:image" content="https://www.nandann.com/texas/texas-web-development-nandann-creative-lg.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/web-development-texas" />
        <meta property="twitter:title" content="Web Development Agency in Texas | Nandann Creative" />
        <meta property="twitter:description" content="Premier web development agency in Texas. Custom websites, rapid delivery, local SEO optimization, and ongoing support for businesses across the Lone Star State." />
        <meta property="twitter:image" content="https://www.nandann.com/texas/texas-web-development-nandann-creative-lg.webp" />
        
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
              "description": "Premier web development agency in Texas",
              "url": "https://www.nandann.com/web-development-texas",
              "telephone": "+1-XXX-XXX-XXXX",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
                "addressRegion": "TX",
                "addressLocality": "Texas"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 31.9686,
                "longitude": -99.9018
              },
              "areaServed": {
                "@type": "State",
                "name": "Texas"
              },
              "serviceArea": [
                "Houston",
                "Austin", 
                "Dallas",
                "San Antonio",
                "Fort Worth",
                "El Paso",
                "Arlington",
                "Corpus Christi",
                "Plano",
                "Lubbock"
              ],
              "sameAs": [
                "https://www.nandann.com"
              ]
            })
          }}
        />
      </Head>

      <LocationNavigation location="Texas" locationShort="TX" />

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
            <source src="/texas/texas-web-development-nandann-creative-hd.webm" type="video/webm" />
            <source src="/texas/texas-web-development-nandann-creative-hd.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
            <span className="text-red-400">Howdy!</span> Your Website is{' '}
            <span className="text-blue-400">Bigger and Better</span> in Texas!
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
            From Houston to Austin, Dallas to San Antonio, we're the web development agency that gets Texas's spirit. 
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
              srcSet="/texas/texas-web-development-nandann-creative-xl.webp"
              media="(min-width: 1280px)"
            />
            <source
              srcSet="/texas/texas-web-development-nandann-creative-lg.webp"
              media="(min-width: 1024px)"
            />
            <source
              srcSet="/texas/texas-web-development-nandann-creative-md.webp"
              media="(min-width: 768px)"
            />
            <Image
              src="/texas/texas-web-development-nandann-creative-sm.webp"
              alt="Texas Web Development Agency - Nandann Creative - Professional Website Design Services with Bluebonnet Background"
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
              Texas's{' '}
              <span className="text-red-400">
                #1 Rated Web Development Agency
              </span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Recognized by industry leaders and trusted by hundreds of Texas businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lone Star Innovation Award 2025</h3>
              <p className="text-gray-700 mb-4">
                Recognized by the Texas Technology Council for breakthrough web development solutions
              </p>
              <div className="text-sm text-gray-500">
                Presented by TX Tech Council
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
                Awarded by Houston Business Journal for outstanding local search optimization results
              </p>
              <div className="text-sm text-gray-500">
                Houston Business Journal
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
                Honored by Austin Chamber of Commerce for fastest website delivery in Texas
              </p>
              <div className="text-sm text-gray-500">
                Austin Chamber of Commerce
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Texas Businesses Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Texas Businesses{' '}
              <span className="text-blue-600">Choose Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the Lone Star State's unique business landscape and deliver solutions that resonate with Texas culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Texas Speed</h3>
              <p className="text-gray-600">
                We move at Texas pace - fast, efficient, and always ahead of the curve. Your website will be live before you know it!
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
                From Houston's energy sector to Austin's tech scene, we know what makes Texas businesses tick.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lone Star Innovation</h3>
              <p className="text-gray-600">
                We bring Texas's bold, independent spirit to every project, ensuring your website is cutting-edge and future-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Texas's Unique Culture Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Texas's Lone Star Spirit Drives Our Digital Innovation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Texas isn't just a state - it's a way of life! From the energy capital of Houston to the live music capital of Austin, we get the local flavor that makes your business authentic.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Houston Energy Style</h4>
                    <p className="text-gray-600">Professional, powerful designs that reflect the energy industry</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Austin Tech Appeal</h4>
                    <p className="text-gray-600">Innovative, creative interfaces that capture the startup spirit</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dallas Business Charm</h4>
                    <p className="text-gray-600">Sophisticated, corporate interfaces that feel professional</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/texas/texas-web-development-nandann-creative-lg.webp"
                alt="Texas Culture and Business - Web Development Services with Bluebonnet Flowers"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Texas Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What Texas Businesses{' '}
              <span className="text-blue-600">Are Saying</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real Texas businesses we've helped succeed online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Mike Rodriguez</h4>
                  <p className="text-gray-600">Energy Company, Houston</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Nandann Creative absolutely nailed our website! They understood our Houston energy culture and delivered something that's both professional and powerful. Our conversion rates went through the roof!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600">Tech Startup, Austin</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Howdy! These folks are the real deal! They built our tech startup website in no time at all. It's totally awesome and our investors love how professional it looks. Texas speed at its finest!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">David Williams</h4>
                  <p className="text-gray-600">Real Estate Agent, Dallas</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Nandann Creative created a website that perfectly captures the Dallas business lifestyle. It's clean, professional, and helps me connect with clients who are looking for that perfect Texas property."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Texas FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about web development in Texas
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
            Ready to Make Your Texas Business{' '}
            <span className="text-red-400">Bigger and Better</span> Online?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's build something that captures the Texas spirit and drives real results for your business
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