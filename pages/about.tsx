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
        <link rel="canonical" href="https://www.nandann.com/about" />
      </Head>
      
      <div className="min-h-screen">
        <Navigation />
        <About />
        <Footer />
      </div>
    </>
  );
} 