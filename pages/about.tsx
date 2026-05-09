import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Nandann Creative — Next.js & Rust Web Development Agency</title>
        <meta name="description" content="Nandann Creative is a web development agency specializing in Next.js, React, WordPress, and Rust. 16+ years of experience building fast, modern, SEO-optimized websites for businesses worldwide." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:url" content="https://www.nandann.com/about" />
        <meta property="og:title" content="About Nandann Creative — Next.js & Rust Web Development Agency" />
        <meta property="og:description" content="Web development agency led by Prakhar Bhatia with 16+ years of experience. Specializing in Next.js, React, WordPress, and Rust for businesses worldwide." />
        <meta property="og:image" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nandanncreative" />
        <meta name="twitter:title" content="About Nandann Creative — Next.js & Rust Agency" />
        <meta name="twitter:description" content="Web development agency led by Prakhar Bhatia with 16+ years of experience. Next.js, React, WordPress, and Rust." />
        <meta name="twitter:image" content="https://www.nandann.com/images/nandann-social-card.png" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <About />
        <Footer />
      </div>
    </>
  );
} 