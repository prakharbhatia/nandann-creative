import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GooeyText } from './ui/gooey-text-morphing';

const ShaderBackground = dynamic(() => import('./ui/shader-background'), { ssr: false });

const morphingWords = [
  'Experiences',
  'Solutions',
  'Products',
  'Platforms',
  'Applications',
];

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Shader Background */}
      <ShaderBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-slide-up">
          {/* Main Heading */}
          <h1
            className="font-bold mb-8 leading-tight text-center"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="block text-white mb-4">
              Crafting Digital
            </span>

            {/*
              GooeyText container — height must match text size so the
              absolutely-positioned spans don't collapse the layout.
              clamp(3rem, 8vw, 6rem) → use h-[4rem] sm:h-[5rem] lg:h-[6rem]
              Add extra headroom for the blur glow: +1rem on each size.
            */}
            <span className="block relative h-20 sm:h-24 lg:h-28 w-full">
              <GooeyText
                texts={morphingWords}
                morphTime={1.2}
                cooldownTime={2.5}
                className="absolute inset-0 w-full h-full"
                textClassName="font-bold w-full"
                textStyle={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  color: '#ffffff',
                  textShadow:
                    '0 0 40px rgba(192, 132, 252, 0.9), 0 0 80px rgba(139, 92, 246, 0.6)',
                }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We transform your vision into powerful digital solutions that drive results.
            Modern web development, stunning mobile apps, and innovative Python solutions.
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
