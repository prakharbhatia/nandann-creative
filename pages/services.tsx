import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Web Development Services: Next.js, React, WordPress & Rust | Nandann Creative</title>
        <meta name="description" content="Custom web development services using Next.js, React, WordPress, Rust, and Python. Fast delivery, SEO-optimized builds, cloud infrastructure, and ongoing support. Get a free consultation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.nandann.com/services" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <Services />
        <Footer />
      </div>
    </>
  );
} 