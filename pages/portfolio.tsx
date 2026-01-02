import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import PortfolioGallery from '../components/PortfolioGallery';
import Footer from '../components/Footer';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio - Nandann Creative Agency</title>
        <meta name="description" content="View our portfolio of successful projects and client work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.nandann.com/portfolio" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <PortfolioGallery />
        </main>
        <Footer />
      </div>
    </>
  );
}