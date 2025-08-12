import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import RapidDelivery from '../components/RapidDelivery';
import Footer from '../components/Footer';

export default function RapidDeliveryPage() {
  return (
    <>
      <Head>
        <title>Rapid Delivery Service - Nandann Creative Agency</title>
        <meta name="description" content="Lightning-fast creative solutions delivered in days, not months. Premium design and development for brands that can't wait for excellence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="fast web development, rapid design, quick turnaround, express creative services" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <RapidDelivery />
        <Footer />
      </div>
    </>
  );
}