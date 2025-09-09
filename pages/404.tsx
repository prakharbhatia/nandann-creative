import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Custom404() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Page Not Found - 404 | Nandann Creative</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's get you back on track with Nandann Creative's web development services." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Not Found - 404 | Nandann Creative" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Let's get you back on track with Nandann Creative's web development services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/404" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Page Not Found - 404 | Nandann Creative" />
        <meta name="twitter:description" content="The page you're looking for doesn't exist. Let's get you back on track with Nandann Creative's web development services." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated 404 */}
          <div className="mb-8">
            <h1 
              className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-4"
              style={{ 
                fontSize: 'clamp(6rem, 15vw, 12rem)',
                lineHeight: '0.8'
              }}
            >
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Oops! This Page Got Lost in the Digital Void
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't worry, even the best websites have missing pages. Let's get you back to building something amazing!
            </p>
          </div>

          {/* Illustration */}
          <div className="mb-12">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full opacity-20"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-16 right-12 w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-12 left-12 w-5 h-5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-8 right-8 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Central Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.709A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🏠 Go Home
            </Link>
            <button 
              onClick={handleGoBack}
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ← Go Back
            </button>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              💬 Contact Us
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Popular Pages You Might Be Looking For:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/services" className="group p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold">Services</div>
                <div className="text-sm text-gray-600">Web Development</div>
              </Link>
              <Link href="/portfolio" className="group p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold">Portfolio</div>
                <div className="text-sm text-gray-600">Our Work</div>
              </Link>
              <Link href="/about" className="group p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold">About</div>
                <div className="text-sm text-gray-600">Our Story</div>
              </Link>
              <Link href="/blog" className="group p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold">Blog</div>
                <div className="text-sm text-gray-600">Latest News</div>
              </Link>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 italic">
              💡 Fun fact: The first 404 error was recorded in 1992 at CERN, where the web was born!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -8px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
      `}</style>
    </>
  );
}