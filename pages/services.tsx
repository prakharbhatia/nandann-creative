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
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:url" content="https://www.nandann.com/services" />
        <meta property="og:title" content="Web Development Services: Next.js, React, WordPress & Rust | Nandann Creative" />
        <meta property="og:description" content="Custom web development using Next.js, React, WordPress, Rust, and Python. Fast delivery, SEO-optimized builds, and ongoing support." />
        <meta property="og:image" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nandanncreative" />
        <meta name="twitter:title" content="Web Development Services | Nandann Creative" />
        <meta name="twitter:description" content="Custom web development using Next.js, React, WordPress, Rust, and Python. Fast delivery, SEO-optimized builds, and ongoing support." />
        <meta name="twitter:image" content="https://www.nandann.com/images/nandann-social-card.png" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <Services />
        <Footer />
      </div>
    </>
  );
} 