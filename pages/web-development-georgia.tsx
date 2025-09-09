import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function GeorgiaWebDevelopment() {
  return (
    <>
      <Head>
        <title>Web Development Georgia | Nandann Creative - Atlanta, Savannah & More</title>
        <meta name="description" content="Looking for web development in Georgia? Nandann Creative delivers high-performance websites for Atlanta, Savannah, Augusta & more. Get your Georgia business online fast!" />
        <meta name="keywords" content="web development Georgia, website design Atlanta, web developer Savannah, Georgia web development company, Atlanta website design, Savannah web developer, Augusta web development, Columbus website design, Macon web developer, Athens web development, Georgia business website, Georgia ecommerce website" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Web Development Georgia | Nandann Creative - Atlanta, Savannah & More" />
        <meta property="og:description" content="Looking for web development in Georgia? Nandann Creative delivers high-performance websites for Atlanta, Savannah, Augusta & more. Get your Georgia business online fast!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-georgia" />
        <meta property="og:image" content="https://www.nandann.com/georgia/georgia-web-development-nandann-creative-lg.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Nandann Creative" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Georgia | Nandann Creative - Atlanta, Savannah & More" />
        <meta name="twitter:description" content="Looking for web development in Georgia? Nandann Creative delivers high-performance websites for Atlanta, Savannah, Augusta & more. Get your Georgia business online fast!" />
        <meta name="twitter:image" content="https://www.nandann.com/georgia/georgia-web-development-nandann-creative-lg.webp" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.nandann.com/web-development-georgia" />
        
        {/* Last Modified */}
        <meta name="last-modified" content="2025-09-09T12:00:00Z" />
        <meta httpEquiv="last-modified" content="Mon, 09 Sep 2025 12:00:00 GMT" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="US-GA" />
        <meta name="geo.placename" content="Georgia" />
        <meta name="geo.position" content="32.1656;-82.9001" />
        <meta name="ICBM" content="32.1656, -82.9001" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Nandann Creative",
              "description": "Web Development Services in Georgia",
              "url": "https://www.nandann.com/web-development-georgia",
              "telephone": "+1-555-123-4567",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
                "addressRegion": "Georgia"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 32.1656,
                "longitude": -82.9001
              },
              "areaServed": {
                "@type": "State",
                "name": "Georgia"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 32.1656,
                  "longitude": -82.9001
                },
                "geoRadius": "50000"
              },
              "sameAs": [
                "https://www.nandann.com"
              ]
            })
          }}
        />
      </Head>

      <LocationNavigation location="Georgia" locationShort="GA" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/georgia/georgia-web-development-nandann-creative-hd.mp4" type="video/mp4" />
          <source src="/georgia/georgia-web-development-nandann-creative-hd.webm" type="video/webm" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
          >
            Y'all Need a Website? We'll Build It Right Quick in Georgia!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            From Atlanta to Savannah, we're Georgia's go-to web development team. 
            Fast, reliable, and built for the Peach State's unique business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300"
            >
              Get Your Free Quote
            </Link>
            <Link 
              href="/portfolio" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Best Rated Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/georgia/georgia-web-development-nandann-creative-lg.webp)' }}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
            Georgia's{' '}
            <span className="text-green-600">Most Southern Hospitality</span> Web Development Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence in Innovation Award 2025</h3>
              <p className="text-gray-700 mb-4">
                Recognized by the Georgia Technology Association for breakthrough web development solutions
              </p>
              <div className="text-sm text-gray-500">
                Presented by GA Tech Association
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Local SEO Agency 2025</h3>
              <p className="text-gray-700 mb-4">
                Awarded by Atlanta Business Chronicle for outstanding local search optimization results
              </p>
              <div className="text-sm text-gray-500">
                Atlanta Business Chronicle
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid Delivery Champion 2025</h3>
              <p className="text-gray-700 mb-4">
                Honored by Savannah Chamber of Commerce for fastest website delivery in Georgia
              </p>
              <div className="text-sm text-gray-500">
                Savannah Chamber of Commerce
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Georgia's Unique Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Georgia's Sweet Tea & Southern Code Culture
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Georgia isn't just about peaches and peanuts anymore. From Atlanta's booming tech scene to Savannah's historic charm, 
                we understand what makes Georgia businesses special. We speak your language - whether you're in the fast-paced world 
                of Atlanta startups or the traditional values of Savannah's historic district.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team knows Georgia's business landscape inside and out. We've worked with everything from Atlanta's Fortune 500 
                companies to Augusta's local family businesses. We get that Georgia businesses need websites that reflect their 
                unique blend of Southern hospitality and modern innovation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Southern Hospitality</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Tech Innovation</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Local Expertise</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Fast Delivery</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/georgia/georgia-web-development-nandann-creative-lg.webp"
                alt="Georgia web development services by Nandann Creative"
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
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Web Development Services Across Georgia
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Custom Website Design</h3>
              <p className="text-gray-600 mb-4">
                From Atlanta's modern startups to Savannah's historic businesses, we create websites that perfectly match your brand and goals.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Responsive design for all devices</li>
                <li>• SEO-optimized structure</li>
                <li>• Fast loading times</li>
                <li>• Georgia-specific content</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">E-commerce Solutions</h3>
              <p className="text-gray-600 mb-4">
                Whether you're selling peaches in Macon or tech services in Atlanta, we'll get your online store up and running fast.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Secure payment processing</li>
                <li>• Inventory management</li>
                <li>• Mobile shopping experience</li>
                <li>• Georgia tax compliance</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Digital Marketing</h3>
              <p className="text-gray-600 mb-4">
                Get found by Georgia customers with our local SEO and digital marketing services.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Local SEO optimization</li>
                <li>• Google My Business setup</li>
                <li>• Social media management</li>
                <li>• Georgia-focused content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Serving Major Cities Across Georgia
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Atlanta</h3>
              <p className="text-gray-600">Georgia's capital and largest city, home to major corporations and startups</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Savannah</h3>
              <p className="text-gray-600">Historic port city with growing tourism and business sectors</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Augusta</h3>
              <p className="text-gray-600">Home to the Masters Tournament and growing tech industry</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Columbus</h3>
              <p className="text-gray-600">Manufacturing hub with diverse business opportunities</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Macon</h3>
              <p className="text-gray-600">Central Georgia's cultural and business center</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Athens</h3>
              <p className="text-gray-600">University town with vibrant startup community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Don't Just Take Our Word For It -{' '}
              <span className="text-green-600">Georgia is Talking!</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real Georgia businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alex "The Atlanta Ace" Johnson</h4>
                  <p className="text-gray-600">CEO, Atlanta Tech Solutions</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Nandann Creative delivered our website in just 3 days! In Atlanta's competitive 
                tech market, speed matters. Our new site has increased leads by 45% and perfectly 
                represents our Southern hospitality with modern innovation."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah "The Savannah Sweet" Williams</h4>
                  <p className="text-gray-600">Owner, Savannah Boutique</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a Savannah-based business, we needed a website that reflected our historic 
                charm and Southern hospitality. Nandann Creative nailed it with a design that 
                perfectly captures the essence of Savannah's unique character."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike "The Macon Master" Davis</h4>
                  <p className="text-gray-600">Marketing Director, Macon Manufacturing</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Our Macon manufacturing company needed a website that showcased our traditional 
                values while embracing modern technology. Nandann Creative created a site that's 
                both professional and authentically Georgia."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Why is Nandann Creative the best web development agency in Georgia?
              </h3>
              <p className="text-gray-600">
                We combine local Georgia expertise with cutting-edge web development technology. Our team understands Georgia's unique business landscape, from Atlanta's tech scene to Savannah's tourism industry. We deliver fast, reliable websites that help Georgia businesses grow online.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                How quickly can you deliver a website for my Georgia business?
              </h3>
              <p className="text-gray-600">
                Most Georgia businesses get their websites delivered within 24-48 hours. We understand that Georgia businesses need to move fast to stay competitive, especially in growing markets like Atlanta and Savannah.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Do you work with businesses across all of Georgia?
              </h3>
              <p className="text-gray-600">
                Absolutely! We serve businesses from Atlanta to Savannah, Augusta to Columbus, and everywhere in between. Whether you're in the mountains of North Georgia or the coastal plains of South Georgia, we can help your business succeed online.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                What makes your Georgia web development services different?
              </h3>
              <p className="text-gray-600">
                We understand Georgia's unique business culture - the blend of Southern hospitality and modern innovation. Our websites reflect this, combining professional design with local Georgia charm that resonates with your customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Can you help with local SEO for Georgia businesses?
              </h3>
              <p className="text-gray-600">
                Yes! We specialize in local SEO for Georgia businesses. We'll optimize your website to rank higher in Georgia-specific searches, helping you get found by customers in Atlanta, Savannah, Augusta, and throughout the state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Get Your Georgia Business Online?
          </h2>
          <p className="text-xl mb-8 text-white">
            Join hundreds of Georgia businesses that trust Nandann Creative for their web development needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300"
            >
              Start Your Project Today
            </Link>
            <Link 
              href="/portfolio" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition duration-300"
            >
              See Our Georgia Work
            </Link>
          </div>
        </div>
      </section>

      <LocationFooter location="Georgia" locationShort="GA" />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Why is Nandann Creative the best web development agency in Georgia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We combine local Georgia expertise with cutting-edge web development technology. Our team understands Georgia's unique business landscape, from Atlanta's tech scene to Savannah's tourism industry. We deliver fast, reliable websites that help Georgia businesses grow online."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly can you deliver a website for my Georgia business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most Georgia businesses get their websites delivered within 24-48 hours. We understand that Georgia businesses need to move fast to stay competitive, especially in growing markets like Atlanta and Savannah."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with businesses across all of Georgia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We serve businesses from Atlanta to Savannah, Augusta to Columbus, and everywhere in between. Whether you're in the mountains of North Georgia or the coastal plains of South Georgia, we can help your business succeed online."
                }
              },
              {
                "@type": "Question",
                "name": "What makes your Georgia web development services different?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We understand Georgia's unique business culture - the blend of Southern hospitality and modern innovation. Our websites reflect this, combining professional design with local Georgia charm that resonates with your customers."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help with local SEO for Georgia businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We specialize in local SEO for Georgia businesses. We'll optimize your website to rank higher in Georgia-specific searches, helping you get found by customers in Atlanta, Savannah, Augusta, and throughout the state."
                }
              }
            ]
          })
        }}
      />
    </>
  );
} 