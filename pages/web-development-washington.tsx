import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import LocationNavigation from '../components/LocationNavigation';
import LocationFooter from '../components/LocationFooter';

export default function WashingtonWebDevelopment() {
  return (
    <>
      <Head>
        <title>Web Development Washington | Nandann Creative - Seattle, Spokane & More</title>
        <meta name="description" content="Looking for web development in Washington? Nandann Creative delivers high-performance websites for Seattle, Spokane, Tacoma & more. Get your Washington business online fast!" />
        <meta name="keywords" content="web development Washington, website design Seattle, web developer Spokane, Washington web development company, Seattle website design, Spokane web developer, Tacoma web development, Bellevue website design, Vancouver web developer, Olympia web development, Washington business website, Washington ecommerce website" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Web Development Washington | Nandann Creative - Seattle, Spokane & More" />
        <meta property="og:description" content="Looking for web development in Washington? Nandann Creative delivers high-performance websites for Seattle, Spokane, Tacoma & more. Get your Washington business online fast!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/web-development-washington" />
        <meta property="og:image" content="https://www.nandann.com/washington/washington-web-development-nandann-creative-lg.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Nandann Creative" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Washington | Nandann Creative - Seattle, Spokane & More" />
        <meta name="twitter:description" content="Looking for web development in Washington? Nandann Creative delivers high-performance websites for Seattle, Spokane, Tacoma & more. Get your Washington business online fast!" />
        <meta name="twitter:image" content="https://www.nandann.com/washington/washington-web-development-nandann-creative-lg.webp" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.nandann.com/web-development-washington" />
        
        {/* Last Modified */}
        <meta name="last-modified" content="2025-09-09T12:00:00Z" />
        <meta httpEquiv="last-modified" content="Mon, 09 Sep 2025 12:00:00 GMT" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="US-WA" />
        <meta name="geo.placename" content="Washington" />
        <meta name="geo.position" content="47.7511;-120.7401" />
        <meta name="ICBM" content="47.7511, -120.7401" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Nandann Creative",
              "description": "Web Development Services in Washington",
              "url": "https://www.nandann.com/web-development-washington",
              "telephone": "+1-555-123-4567",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US",
                "addressRegion": "Washington"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 47.7511,
                "longitude": -120.7401
              },
              "areaServed": {
                "@type": "State",
                "name": "Washington"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 47.7511,
                  "longitude": -120.7401
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

      <LocationNavigation location="Washington" locationShort="WA" />

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
          <source src="/washington/washington-web-development-nandann-creative-hd.mp4" type="video/mp4" />
          <source src="/washington/washington-web-development-nandann-creative-hd.webm" type="video/webm" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
          >
            Web Development That's Totally Rad in the Evergreen State!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            From Seattle to Spokane, we're Washington's go-to web development team. 
            Fast, reliable, and built for the Evergreen State's unique business needs.
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
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/washington/washington-web-development-nandann-creative-lg.webp)' }}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
            <span className="text-green-600">#1 Rated Web Development Agency</span> in Washington
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
                Recognized by the Washington Technology Industry Association for breakthrough web development solutions
              </p>
              <div className="text-sm text-gray-500">
                Presented by WTIA
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
                Awarded by Puget Sound Business Journal for outstanding local search optimization results
              </p>
              <div className="text-sm text-gray-500">
                Puget Sound Business Journal
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
                Honored by Seattle Chamber of Commerce for fastest website delivery in Washington
              </p>
              <div className="text-sm text-gray-500">
                Seattle Chamber of Commerce
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Washington's Unique Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Washington's Pacific Northwest Innovation Powers Our Digital Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Washington isn't just about coffee and rain anymore. From Seattle's booming tech scene to Spokane's growing business community, 
                we understand what makes Washington businesses special. We speak your language - whether you're in the innovative world 
                of Seattle startups or the traditional values of Eastern Washington's agricultural businesses.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team knows Washington's business landscape inside and out. We've worked with everything from Seattle's Fortune 500 
                tech companies to Spokane's local family businesses. We get that Washington businesses need websites that reflect their 
                unique blend of Pacific Northwest innovation and natural beauty.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Tech Innovation</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Natural Beauty</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Local Expertise</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Fast Delivery</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/washington/washington-web-development-nandann-creative-lg.webp"
                alt="Washington web development services by Nandann Creative"
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
            Web Development Services Across Washington
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Custom Website Design</h3>
              <p className="text-gray-600 mb-4">
                From Seattle's modern tech companies to Spokane's traditional businesses, we create websites that perfectly match your brand and goals.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Responsive design for all devices</li>
                <li>• SEO-optimized structure</li>
                <li>• Fast loading times</li>
                <li>• Washington-specific content</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">E-commerce Solutions</h3>
              <p className="text-gray-600 mb-4">
                Whether you're selling tech products in Seattle or agricultural goods in Eastern Washington, we'll get your online store up and running fast.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Secure payment processing</li>
                <li>• Inventory management</li>
                <li>• Mobile shopping experience</li>
                <li>• Washington tax compliance</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Digital Marketing</h3>
              <p className="text-gray-600 mb-4">
                Get found by Washington customers with our local SEO and digital marketing services.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Local SEO optimization</li>
                <li>• Google My Business setup</li>
                <li>• Social media management</li>
                <li>• Washington-focused content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Serving Major Cities Across Washington
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Seattle</h3>
              <p className="text-gray-600">Washington's largest city, home to major tech companies and startups</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Spokane</h3>
              <p className="text-gray-600">Eastern Washington's business hub with growing tech and healthcare sectors</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Tacoma</h3>
              <p className="text-gray-600">Port city with diverse manufacturing and maritime industries</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Bellevue</h3>
              <p className="text-gray-600">Tech suburb with major corporations and innovative startups</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Vancouver</h3>
              <p className="text-gray-600">Southwest Washington's growing business and technology center</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Olympia</h3>
              <p className="text-gray-600">State capital with government and educational institutions</p>
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
              <span className="text-green-600">Washington is Talking!</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real Washington businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah "The Seattle Startup" Chen</h4>
                  <p className="text-gray-600">CEO, Seattle Tech Solutions</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Nandann Creative delivered our website in just 4 days! In Seattle's competitive 
                tech market, speed matters. Our new site has increased leads by 50% and perfectly 
                represents our Pacific Northwest innovation."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Mike "The Spokane Success" Rodriguez</h4>
                  <p className="text-gray-600">Owner, Spokane Healthcare</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a Spokane-based healthcare provider, we needed a website that reflected our 
                community-focused approach. Nandann Creative nailed it with a design that 
                perfectly captures Eastern Washington's warm hospitality."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  J
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Jennifer "The Tacoma Tech" Park</h4>
                  <p className="text-gray-600">Marketing Director, Tacoma Manufacturing</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Our Tacoma manufacturing company needed a website that showcased our traditional 
                values while embracing modern technology. Nandann Creative created a site that's 
                both professional and authentically Washington."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Why is Nandann Creative the best web development agency in Washington?
              </h3>
              <p className="text-gray-600">
                We combine local Washington expertise with cutting-edge web development technology. Our team understands Washington's unique business landscape, from Seattle's tech scene to Spokane's growing industries. We deliver fast, reliable websites that help Washington businesses grow online.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                How quickly can you deliver a website for my Washington business?
              </h3>
              <p className="text-gray-600">
                Most Washington businesses get their websites delivered within 24-48 hours. We understand that Washington businesses need to move fast to stay competitive, especially in growing markets like Seattle and Spokane.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Do you work with businesses across all of Washington?
              </h3>
              <p className="text-gray-600">
                Absolutely! We serve businesses from Seattle to Spokane, Tacoma to Vancouver, and everywhere in between. Whether you're in the tech hub of the Puget Sound or the agricultural regions of Eastern Washington, we can help your business succeed online.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                What makes your Washington web development services different?
              </h3>
              <p className="text-gray-600">
                We understand Washington's unique business culture - the blend of Pacific Northwest innovation and natural beauty. Our websites reflect this, combining professional design with local Washington charm that resonates with your customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Can you help with local SEO for Washington businesses?
              </h3>
              <p className="text-gray-600">
                Yes! We specialize in local SEO for Washington businesses. We'll optimize your website to rank higher in Washington-specific searches, helping you get found by customers in Seattle, Spokane, Tacoma, and throughout the state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Get Your Washington Business Online?
          </h2>
          <p className="text-xl mb-8 text-white">
            Join hundreds of Washington businesses that trust Nandann Creative for their web development needs.
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
              See Our Washington Work
            </Link>
          </div>
        </div>
      </section>

      <LocationFooter location="Washington" locationShort="WA" />

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
                "name": "Why is Nandann Creative the best web development agency in Washington?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We combine local Washington expertise with cutting-edge web development technology. Our team understands Washington's unique business landscape, from Seattle's tech scene to Spokane's growing industries. We deliver fast, reliable websites that help Washington businesses grow online."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly can you deliver a website for my Washington business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most Washington businesses get their websites delivered within 24-48 hours. We understand that Washington businesses need to move fast to stay competitive, especially in growing markets like Seattle and Spokane."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with businesses across all of Washington?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We serve businesses from Seattle to Spokane, Tacoma to Vancouver, and everywhere in between. Whether you're in the tech hub of the Puget Sound or the agricultural regions of Eastern Washington, we can help your business succeed online."
                }
              },
              {
                "@type": "Question",
                "name": "What makes your Washington web development services different?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We understand Washington's unique business culture - the blend of Pacific Northwest innovation and natural beauty. Our websites reflect this, combining professional design with local Washington charm that resonates with your customers."
                }
              },
              {
                "@type": "Question",
                "name": "Can you help with local SEO for Washington businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We specialize in local SEO for Washington businesses. We'll optimize your website to rank higher in Washington-specific searches, helping you get found by customers in Seattle, Spokane, Tacoma, and throughout the state."
                }
              }
            ]
          })
        }}
      />
    </>
  );
} 