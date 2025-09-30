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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
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
                      <Link href="/blog/gpt5-review-raising-the-floor" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        GPT‑5 Is Here: Why Raising the Floor Matters Most
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/ai-web-development-2025" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        How AI Is Transforming Web Development in 2025
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/same-day-website-delivery" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition">
                        Same‑Day Website Delivery
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

            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/approach" className="text-gray-700 hover:text-blue-600 transition-colors">
              Approach
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link 
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
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
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
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
                  <Link href="/blog/gpt5-review-raising-the-floor" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    GPT‑5 Is Here: Why Raising the Floor Matters Most
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ai-web-development-2025" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    How AI Is Transforming Web Development in 2025
                  </Link>
                </li>
                <li>
                  <Link href="/blog/same-day-website-delivery" className="block text-gray-600 hover:text-blue-600 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Same‑Day Website Delivery
                  </Link>
                </li>
                <li className="pt-1 mt-1 border-t border-gray-200">
                  <Link href="/blog" className="block text-blue-600 hover:text-blue-700 transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    See all articles →
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
              href="/approach"
              className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Approach
            </Link>
            <Link
              href="/contact"
              className="block bg-blue-600 px-4 py-3 rounded-lg text-white font-medium text-center mt-4 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}