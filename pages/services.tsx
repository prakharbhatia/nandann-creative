import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services - Nandann Creative Agency</title>
        <meta name="description" content="Our digital services including web development, UI/UX design, and digital strategy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen">
        <Navigation />
        <Services />
        <Footer />
      </div>
    </>
  );
} 