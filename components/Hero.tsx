import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ShaderBackground = dynamic(() => import('./ui/shader-background'), { ssr: false });

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slidingWords = [
    "Experiences",
    "Solutions",
    "Products",
    "Platforms",
    "Applications"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % slidingWords.length);
        setIsAnimating(false);
      }, 300);

    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Shader Background */}
      <ShaderBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-slide-up">
          {/* Main Heading */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-center"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="block text-white mb-4">
              Crafting <span className="text-white">Digital</span>
            </span>
            <span className="block relative h-20 md:h-24 lg:h-28 flex items-center justify-center overflow-visible" style={{color: 'rgb(147, 51, 234)'}}>
              <span
                key={currentWordIndex}
                className={`absolute inset-0 flex items-center justify-center text-center transition-all duration-700 ease-in-out z-20 ${
                  isAnimating
                    ? 'animate-slideOutUp'
                    : 'animate-slideInUp'
                }`}
              >
                {slidingWords[currentWordIndex]}
              </span>
            </span>
          </h1>

          {/* Subtitle — keyword-rich for SEO, readable for humans */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Next.js, React, WordPress & Rust web development agency. We build fast, SEO-optimized websites and web applications — with same-day delivery options.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              href="/contact?ref=hero"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 min-w-[200px]"
            >
              Start Your Project
            </Link>
            <Link
              href="/portfolio"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift hover:shadow-lg hover:shadow-white/10 transition-all duration-300 min-w-[200px]"
            >
              View Our Work
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 hover-lift">
              <div className="text-3xl font-bold text-white mb-2">5000+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift">
              <div className="text-3xl font-bold text-white mb-2">340+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift">
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 transform -translate-x-1/2 animate-bounce flex justify-center">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-center">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
