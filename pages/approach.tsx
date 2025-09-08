import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Approach from '../components/Approach';
import Footer from '../components/Footer';

export default function ApproachPage() {
  return (
    <>
      <Head>
        <title>Our Approach - Nandann Creative Agency</title>
        <meta name="description" content="Discover our proven methodology and collaborative approach to creating exceptional digital experiences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.nandann.com/approach" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <Approach />
        <Footer />
      </div>
    </>
  );
}