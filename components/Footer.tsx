import React, { useState } from 'react';
import Image from 'next/image';

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-white/10">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          {/* Logo */}
          {!logoError ? (
            <Image
              src="/images/Nandann-logo-new.png"
              alt="Nandann Creative Agency"
              width={150}
              height={50}
              className="h-12 w-auto brightness-0 invert"
              onError={() => setLogoError(true)}
              style={{
                filter: 'brightness(0) invert(1)',
                maxHeight: '48px',
                width: 'auto'
              }}
            />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">Nandann Creative Agency</span>
            </div>
          )}
        </div>
        <p className="text-gray-400 mb-6">
          Crafting digital experiences that drive results
        </p>
        <p className="text-gray-500 text-sm">
          © 2025 Nandann Creative Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 