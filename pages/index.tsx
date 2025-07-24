import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Nandann Creative Agency</title>
        <meta name="description" content="Digital creative agency specializing in web development and design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <Footer />
      </div>
    </>
  );
} 