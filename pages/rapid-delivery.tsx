import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import RapidDelivery from '../components/RapidDelivery';
import Footer from '../components/Footer';

export default function RapidDeliveryPage() {
  return (
    <>
      <Head>
        <title>Same-Day Website Delivery - Nandann Creative Agency</title>
        <meta name="description" content="Professional websites delivered within 24 hours. Same-day website delivery for brands that need to launch today, not next month." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="same day website, 24 hour website delivery, urgent web development, express website design, same day web design" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <RapidDelivery />
        <Footer />
      </div>
    </>
  );
}