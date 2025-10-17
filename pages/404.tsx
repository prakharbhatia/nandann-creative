import Head from 'next/head';
import Link from 'next/link';
import FlappyBird from '../components/FlappyBird';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - 404 | Nandann Creative</title>
        <meta name="description" content="The page you're looking for doesn't exist. Play our Flappy Bird game while you're here!" />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Page Not Found - 404 | Nandann Creative" />
        <meta property="og:description" content="The page you're looking for doesn't exist. Play our Flappy Bird game while you're here!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/404" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Page Not Found - 404 | Nandann Creative" />
        <meta name="twitter:description" content="The page you're looking for doesn't exist. Play our Flappy Bird game while you're here!" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                404
              </h1>
            </div>
            <Link 
              href="/" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🏠 Go Home
            </Link>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            While you're here, why not play a quick game?
          </p>
        </div>

        {/* Flappy Bird Game */}
        <div className="max-w-6xl mx-auto mb-12">
          <FlappyBird />
        </div>

        {/* Helpful Links Footer */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Quick Links:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/services" className="group p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm">Services</div>
              </Link>
              <Link href="/portfolio" className="group p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm">Portfolio</div>
              </Link>
              <Link href="/about" className="group p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm">About</div>
              </Link>
              <Link href="/blog" className="group p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center">
                <div className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm">Blog</div>
              </Link>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 italic">
              💡 Fun fact: The first 404 error was recorded in 1992 at CERN, where the web was born!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}