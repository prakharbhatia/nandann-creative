import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Portfolio from '../components/Portfolio';
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
      
      <div className="min-h-screen">
        <Navigation />
        <Portfolio />
        <Footer />
      </div>
    </>
  );
} 