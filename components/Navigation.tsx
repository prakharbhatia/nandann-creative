import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [showMobileBlog, setShowMobileBlog] = useState(false)
  const [showMobilePortfolio, setShowMobilePortfolio] = useState(false)
  const [showMobileNextJS, setShowMobileNextJS] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/nextjs', label: 'Next.js' },
    { href: '/approach', label: 'Approach' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out group ${
      isScrolled 
        ? 'py-3 bg-black/30 backdrop-blur-xl border-b border-white/10' 
        : 'py-6 bg-transparent'
    } hover:backdrop-blur-md`}>
      {/* Subtle animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out"></div>
      
      {/* Glass effect background when scrolled */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isScrolled 
          ? 'opacity-100 bg-gradient-to-r from-black/20 via-black/30 to-black/20 backdrop-blur-2xl' 
          : 'opacity-0'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Try to use the actual logo image, fallback to icon */}
            <div className="relative">
              {!logoError ? (
                <Image
                                                src="/images/Nandann-logo-new.png"
                  alt="Nandann Creative Agency"
                  width={150}
                  height={50}
                  className="h-12 w-auto brightness-0 invert transition-all duration-300 hover:scale-105"
                  onError={() => setLogoError(true)}
                  style={{
                    filter: 'brightness(0) invert(1)',
                    maxHeight: '48px',
                    width: 'auto'
                  }}
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href !== '/blog' && item.href !== '/portfolio' && item.href !== '/nextjs' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group/link"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500 ease-out"></span>
                </Link>
              ) : item.href === '/portfolio' ? (
                <div key={item.href} className="relative group/portfolio">
                  <Link
                    href="/portfolio"
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group/link"
                  >
                    Portfolio
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500 ease-out"></span>
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/portfolio:block z-50">
                    <div className="min-w-[280px] rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-3 shadow-xl">
                      <ul className="space-y-1">
                        <li>
                          <Link href="/reset-file-and-folder-permissions" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            File Permissions Plugin
                          </Link>
                        </li>
                        <li className="pt-1 mt-1 border-t border-white/10">
                          <Link href="/portfolio" className="block px-4 py-2 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition">
                            View all projects →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : item.href === '/nextjs' ? (
                <div key={item.href} className="relative group/nextjs">
                  <Link
                    href="/nextjs"
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group/link"
                  >
                    Next.js
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500 ease-out"></span>
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/nextjs:block z-50">
                    <div className="min-w-[380px] rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-3 shadow-xl">
                      <ul className="space-y-1">
                        <li>
                          <Link href="/nextjs/wordpress-to-nextjs-migration-cost" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            WordPress to Next.js Migration Cost
                          </Link>
                        </li>
                        <li>
                          <Link href="/nextjs/wordpress-to-nextjs-migration-service" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            WordPress to Next.js Migration Service
                          </Link>
                        </li>
                        <li>
                          <Link href="/nextjs/wordpress-to-nextjs-seo-migration" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            WordPress to Next.js SEO Migration
                          </Link>
                        </li>
                        <li>
                          <Link href="/nextjs/how-to-migrate-wordpress-to-nextjs" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            How to Migrate WordPress to Next.js
                          </Link>
                        </li>
                        <li>
                          <Link href="/nextjs/nextjs-vs-wordpress-performance-benchmark" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            Next.js vs WordPress Performance
                          </Link>
                        </li>
                        <li>
                          <Link href="/nextjs/nextjs-image-optimization-techniques" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            Next.js Image Optimization
                          </Link>
                        </li>
                        <li className="pt-1 mt-1 border-t border-white/10">
                          <Link href="/nextjs" className="block px-4 py-2 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition">
                            View all Next.js content →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item.href} className="relative group/blog">
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative group/link"
                  >
                    Blog
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500 ease-out"></span>
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/blog:block z-50">
                    <div className="min-w-[320px] rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-3 shadow-xl">
                      <ul className="space-y-1">
                        <li>
                          <Link href="/blog/gpt5-review-raising-the-floor" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            GPT‑5 Is Here: Why Raising the Floor Matters Most
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/ai-web-development-2025" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            How AI Is Transforming Web Development in 2025
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/same-day-website-delivery" className="block px-4 py-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition">
                            Same‑Day Website Delivery
                          </Link>
                        </li>
                        <li className="pt-1 mt-1 border-t border-white/10">
                          <Link href="/blog" className="block px-4 py-2 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition">
                            See all articles →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full text-white font-medium hover-lift hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden group/cta"
            >
              {/* Subtle shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-out"></span>
              <span className="relative">Start Project</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden glass p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="glass rounded-2xl p-4 space-y-3">
            {navItems.filter((n) => n.href !== '/blog' && n.href !== '/portfolio' && n.href !== '/nextjs').map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              className="w-full text-left text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              onClick={() => setShowMobilePortfolio(!showMobilePortfolio)}
              aria-expanded={showMobilePortfolio}
              aria-controls="mobile-portfolio-submenu"
            >
              <span>Portfolio</span>
              <span className={`transform transition ${showMobilePortfolio ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div id="mobile-portfolio-submenu" className={`overflow-hidden transition-all ${showMobilePortfolio ? 'max-h-96' : 'max-h-0'}`}>
              <ul className="pl-3 space-y-1">
                <li>
                  <Link href="/reset-file-and-folder-permissions" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    File Permissions Plugin
                  </Link>
                </li>
                <li className="pt-1 mt-1 border-t border-white/10">
                  <Link href="/portfolio" className="block text-blue-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    View all projects →
                  </Link>
                </li>
              </ul>
            </div>
            <button
              className="w-full text-left text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              onClick={() => setShowMobileNextJS(!showMobileNextJS)}
              aria-expanded={showMobileNextJS}
              aria-controls="mobile-nextjs-submenu"
            >
              <span>Next.js</span>
              <span className={`transform transition ${showMobileNextJS ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div id="mobile-nextjs-submenu" className={`overflow-hidden transition-all ${showMobileNextJS ? 'max-h-96' : 'max-h-0'}`}>
              <ul className="pl-3 space-y-1">
                <li>
                  <Link href="/nextjs/wordpress-to-nextjs-migration-cost" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    WordPress to Next.js Migration Cost
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/wordpress-to-nextjs-migration-service" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    WordPress to Next.js Migration Service
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/wordpress-to-nextjs-seo-migration" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    WordPress to Next.js SEO Migration
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/how-to-migrate-wordpress-to-nextjs" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    How to Migrate WordPress to Next.js
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/nextjs-vs-wordpress-performance-benchmark" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Next.js vs WordPress Performance
                  </Link>
                </li>
                <li>
                  <Link href="/nextjs/nextjs-image-optimization-techniques" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Next.js Image Optimization
                  </Link>
                </li>
                <li className="pt-1 mt-1 border-t border-white/10">
                  <Link href="/nextjs" className="block text-blue-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    View all Next.js content →
                  </Link>
                </li>
              </ul>
            </div>
            <button
              className="w-full text-left text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 flex items-center justify-between"
              onClick={() => setShowMobileBlog(!showMobileBlog)}
              aria-expanded={showMobileBlog}
              aria-controls="mobile-blog-submenu"
            >
              <span>Blog</span>
              <span className={`transform transition ${showMobileBlog ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div id="mobile-blog-submenu" className={`overflow-hidden transition-all ${showMobileBlog ? 'max-h-96' : 'max-h-0'}`}>
              <ul className="pl-3 space-y-1">
                <li>
                  <Link href="/blog/gpt5-review-raising-the-floor" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    GPT‑5 Is Here: Why Raising the Floor Matters Most
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ai-web-development-2025" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    How AI Is Transforming Web Development in 2025
                  </Link>
                </li>
                <li>
                  <Link href="/blog/same-day-website-delivery" className="block text-gray-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    Same‑Day Website Delivery
                  </Link>
                </li>
                <li className="pt-1 mt-1 border-t border-white/10">
                  <Link href="/blog" className="block text-blue-300 hover:text-white transition py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    See all articles →
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="block glass px-4 py-3 rounded-xl text-white font-medium text-center mt-4 hover:bg-white/20 transition-all duration-300"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 