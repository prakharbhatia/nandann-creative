import React, { useState } from 'react';
import Image from 'next/image';

export default function NewYorkFooter() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          {/* Logo */}
          {!logoError ? (
            <Image
              src="/images/Nandann-logo-new.png"
              alt="Nandann Creative Agency"
              width={150}
              height={50}
              className="h-12 w-auto"
              onError={() => setLogoError(true)}
              style={{
                maxHeight: '48px',
                width: 'auto'
              }}
            />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-gray-900 font-bold text-xl">Nandann Creative Agency</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 mb-3">
          Crafting digital experiences that drive results
        </p>
        <p className="text-gray-500 text-sm mb-4">
          © 2025 Nandann Creative Agency. All rights reserved.
        </p>
        </div>
      </div>
    </footer>
  );
} 