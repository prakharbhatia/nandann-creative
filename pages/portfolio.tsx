import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import PortfolioGallery from '../components/PortfolioGallery';
import Footer from '../components/Footer';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio — Next.js, React & WordPress Projects | Nandann Creative Agency</title>
        <meta name="description" content="Browse our portfolio of Next.js, React, WordPress, and Rust projects. Real client work spanning e-commerce, SaaS, performance optimization, and rapid-delivery website builds." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:url" content="https://www.nandann.com/portfolio" />
        <meta property="og:title" content="Portfolio — Next.js, React & WordPress Projects | Nandann Creative" />
        <meta property="og:description" content="Next.js, React, WordPress, and Rust projects built for real clients. E-commerce, SaaS, performance optimization, and rapid-delivery website builds." />
        <meta property="og:image" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nandanncreative" />
        <meta name="twitter:title" content="Portfolio — Next.js, React & WordPress Projects | Nandann Creative" />
        <meta name="twitter:description" content="Next.js, React, WordPress, and Rust projects built for real clients. E-commerce, SaaS, performance optimization, and rapid-delivery builds." />
        <meta name="twitter:image" content="https://www.nandann.com/images/nandann-social-card.png" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <PortfolioGallery />
        </main>
        <Footer />
      </div>
    </>
  );
}