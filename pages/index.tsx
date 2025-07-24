import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Head>
        <title>Nandann Creative Agency</title>
        <meta name="description" content="Digital creative agency specializing in web development and design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen">
        <Navigation />
        <Hero />
      </div>
    </>
  );
} 