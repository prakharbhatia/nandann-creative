import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import About from '../components/About';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Nandann Creative Agency</title>
        <meta name="description" content="Learn about Nandann Creative Agency - our story, team, and mission" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen">
        <Navigation />
        <About />
      </div>
    </>
  );
} 