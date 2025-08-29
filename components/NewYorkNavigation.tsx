import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewYorkNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [showMobileBlog, setShowMobileBlog] = useState(false)
  const [showMobilePortfolio, setShowMobilePortfolio] = useState(false)

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
    { href: '/approach', label: 'Approach' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out group ${
      isScrolled 
        ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg' 
        : 'py-6 bg-transparent'
    } hover:backdrop-blur-md`}>
      {/* Subtle animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-50/[0.02] to-gray-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out"></div>
      
      {/* Glass effect background when scrolled */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isScrolled 
          ? 'opacity-100 bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-2xl' 
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
                  className="h-12 w-auto transition-all duration-300 hover:scale-105"
                  onError={() => setLogoError(true)}
                  style={{
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
              item.href !== '/blog' && item.href !== '/portfolio' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group/link"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500 ease-out"></span>
                </Link>
              ) : item.href === '/portfolio' ? (
                <div key={item.href} className="relative group/portfolio">
                  <Link
                    href="/portfolio"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group/link"
                  >
                    Portfolio
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500 ease-out"></span>
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/portfolio:block z-50">
                    <div className="min-w-[280px] rounded-xl border border-gray-200 bg-white/95 backdrop-blur-xl p-3 shadow-xl">
                      <ul className="space-y-1">
                        <li>
                          <Link href="/reset-file-and-folder-permissions" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                            File Permissions Plugin
                          </Link>
                        </li>
                        <li className="pt-1 mt-1 border-t border-gray-200">
                          <Link href="/portfolio" className="block px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition">
                            View all projects →
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
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group/link"
                  >
                    Blog
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:w-full transition-all duration-500 ease-out"></span>
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 hidden group-hover/blog:block z-50">
                    <div className="min-w-[320px] rounded-xl border border-gray-200 bg-white/95 backdrop-blur-xl p-3 shadow-xl">
                      <ul className="space-y-1">
                        <li>
                          <Link href="/blog/gpt5-review-raising-the-floor" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                            GPT‑5 Is Here: Why Raising the Floor Matters Most
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/ai-web-development-2025" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                            How AI Is Transforming Web Development in 2025
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog/same-day-website-delivery" className="block px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition">
                            Same‑Day Website Delivery
                          </Link>
                        </li>
                        <li className="pt-1 mt-1 border-t border-gray-200">
                          <Link href="/blog" className="block px-4 py-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition">
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 