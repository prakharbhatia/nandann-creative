import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Portfolio from '../components/Portfolio';

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Portfolio - Nandann Creative Agency</title>
        <meta name="description" content="View our portfolio of successful projects and client work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen">
        <Navigation />
        <Portfolio />
      </div>
    </>
  );
} 