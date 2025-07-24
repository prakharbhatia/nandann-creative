import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - Nandann Creative Agency</title>
        <meta name="description" content="Get in touch with Nandann Creative Agency for your next project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <Contact />
        <Footer />
      </div>
    </>
  );
} 