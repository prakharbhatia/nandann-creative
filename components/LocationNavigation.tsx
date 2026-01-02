import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LocationNavigationProps {
  location: string;
  locationShort: string;
}

export default function LocationNavigation({ location, locationShort }: LocationNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileBlog, setShowMobileBlog] = useState(false);
  const [showMobilePortfolio, setShowMobilePortfolio] = useState(false);
  const [showMobileNextJS, setShowMobileNextJS] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'py-3 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg'
        : 'py-6 bg-white/90 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Nandann-logo-new.png"
              alt={`Nandann Creative - ${location} Web Development Agency`}
              width={150}
              height={50}
              className="h-12 w-auto"
              style={{
                maxHeight: '48px',
                width: 'auto'
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>

            {/* Blog Dropdown */}
            <div className="relative group/blog">
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/blog:block z-50">
                <div className="min-w-[320px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                  <ul className="space-y-1">
                    <li>
                      <Link href="/blog/php-8-5-launch-major-updates" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        PHP 8.5 Launch: Major Updates
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/ace-core-web-vitals-2025-inp-requirements" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        7 Ways to Ace Core Web Vitals in 2025
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/get-ready-2025-holiday-sales-traffic" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        Get Ready for 2025 Holiday Sales Traffic
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/apple-iphone-17-ios-26-event-2025" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        Apple iPhone 17, iOS 26, and Apple Event 2025
                      </Link>
                    </li>
                    <li className="pt-1 mt-1 border-t border-gray-200">
                      <Link href="/blog" className="block px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-gray-50 transition">
                        See all articles →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next.js Dropdown */}
            <div className="relative group/nextjs">
              <Link
                href="/nextjs"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Next.js
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/nextjs:block z-50">
                <div className="min-w-[380px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                  <ul className="space-y-1">
                    <li>
                      <Link href="/nextjs/wordpress-to-nextjs-migration-cost" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        WordPress to Next.js Migration Cost
                      </Link>
                    </li>
                    <li>
                      <Link href="/nextjs/wordpress-to-nextjs-migration-service" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        WordPress to Next.js Migration Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/nextjs/wordpress-to-nextjs-seo-migration" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        WordPress to Next.js SEO Migration
                      </Link>
                    </li>
                    <li>
                      <Link href="/nextjs/how-to-migrate-wordpress-to-nextjs" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        How to Migrate WordPress to Next.js
                      </Link>
                    </li>
                    <li>
                      <Link href="/nextjs/nextjs-vs-wordpress-performance-benchmark" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        Next.js vs WordPress Performance
                      </Link>
                    </li>
                    <li>
                      <Link href="/nextjs/nextjs-image-optimization-techniques" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        Next.js Image Optimization
                      </Link>
                    </li>
                    <li className="pt-1 mt-1 border-t border-gray-200">
                      <Link href="/nextjs" className="block px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-gray-50 transition">
                        View all Next.js content →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/approach" className="text-gray-700 hover:text-blue-600 transition-colors">
              Approach
            </Link>

            {/* Portfolio Dropdown */}
            <div className="relative group/portfolio">
              <Link
                href="/portfolio"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Portfolio
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/portfolio:block z-50">
                <div className="min-w-[280px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                  <ul className="space-y-1">
                    <li>
                      <Link href="/tg-live-chat" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        TG Live Chat
                      </Link>
                    </li>
                    <li>
                      <Link href="/reset-file-and-folder-permissions" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        File Permissions Plugin
                      </Link>
                    </li>
                    <li className="pt-1 mt-1 border-t border-gray-200">
                      <Link href="/portfolio" className="block px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-gray-50 transition">
                        View all projects →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full text-white font-medium hover-lift hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
        >
          <div className="bg-white rounded-2xl p-4 space-y-3 border border-gray-200 shadow-lg mt-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>

            {/* Mobile Blog Dropdown */}
            <button
              className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              onClick={() => setShowMobileBlog(!showMobileBlog)}
              aria-expanded={showMobileBlog}
              aria-controls="mobile-blog-submenu"
            >
              Blog
              <span className={`transform transition-transform ${showMobileBlog ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div id="mobile-blog-submenu" className={`overflow-hidden transition-all ${showMobileBlog ? 'max-h-96' : 'max-h-0'}`}>
              <ul className="pl-3 space-y-1">
                <li>
                  <Link href="/blog/php-8-5-launch-major-updates" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    PHP 8.5 Launch: Major Updates
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ace-core-web-vitals-2025-inp-requirements" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    7 Ways to Ace Core Web Vitals in 2025
                  </Link>
                </li>
                <li>
                  <Link href="/blog/get-ready-2025-holiday-sales-traffic" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Ready for 2025 Holiday Sales Traffic
                  </Link>
                </li>
                <li>
                  <Link href="/blog/apple-iphone-17-ios-26-event-2025" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Apple iPhone 17, iOS 26, and Apple Event 2025
                  </Link>
                </li>
                <li className="pt-1 mt-1 border-t border-gray-200">
                  <Link href="/blog" className="block text-blue-600 hover:text-blue-700 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    See all articles →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile Next.js Dropdown */}
            <button
              className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              onClick={() => setShowMobileNextJS(!showMobileNextJS)}
              aria-expanded={showMobileNextJS}
              aria-controls="mobile-nextjs-submenu"
            >
              Next.js
              <span className={`transform transition-transform ${showMobileNextJS ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div id="mobile-nextjs-submenu" className={`overflow-hidden transition-all ${showMobileNextJS ? 'max-h-96' : 'max-h-0'}`}>
              <ul className="pl-3 space-y-1">
                <li>
                  <Link href="/nextjs/wordpress-to-nextjs-migration-cost" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    WordPress to Next.js Migration Cost
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/wordpress-to-nextjs-migration-service" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    WordPress to Next.js Migration Service
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/wordpress-to-nextjs-seo-migration" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    WordPress to Next.js SEO Migration
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/how-to-migrate-wordpress-to-nextjs" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    How to Migrate WordPress to Next.js
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/nextjs-vs-wordpress-performance-benchmark" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Next.js vs WordPress Performance
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/nextjs-image-optimization-techniques" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Next.js Image Optimization
                  </Link>
                </li>
                <li className="pt-1 mt-1 border-t border-gray-200">
                  <Link href="/nextjs" className="block text-blue-600 hover:text-blue-700 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    View all Next.js content →
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              href="/approach"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Approach
            </Link>

            {/* Mobile Portfolio Dropdown */}
            <button
              className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              onClick={() => setShowMobilePortfolio(!showMobilePortfolio)}
              aria-expanded={showMobilePortfolio}
              aria-controls="mobile-portfolio-submenu"
            >
              Portfolio
              <span className={`transform transition-transform ${showMobilePortfolio ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div id="mobile-portfolio-submenu" className={`overflow-hidden transition-all ${showMobilePortfolio ? 'max-h-96' : 'max-h-0'}`}>
              <ul className="pl-3 space-y-1">
                <li>
                  <Link href="/tg-live-chat" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    TG Live Chat
                  </Link>
                </li>
                <li>
                  <Link href="/reset-file-and-folder-permissions" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    File Permissions Plugin
                  </Link>
                </li>
                <li className="pt-1 mt-1 border-t border-gray-200">
                  <Link href="/portfolio" className="block text-blue-600 hover:text-blue-700 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    View all projects →
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-lg text-white font-medium text-center mt-4 transition-all duration-300"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}