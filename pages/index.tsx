import React from 'react';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import BlogPreview from '../components/BlogPreview';
import FAQ from '../components/FAQ';
import StructuredData from '../components/StructuredData';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Nandann Creative Agency - Premium Web Development & Design Services</title>
        <meta name="description" content="Professional web development and creative design agency. Custom websites, rapid delivery, SEO optimization, and ongoing support. Transform your digital presence today." />
        <meta name="keywords" content="web development, web design, creative agency, custom websites, SEO, digital marketing, responsive design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/" />
        <meta property="og:title" content="Nandann Creative Agency - Premium Web Development & Design Services" />
        <meta property="og:description" content="Professional web development and creative design agency. Custom websites, rapid delivery, SEO optimization, and ongoing support." />
        <meta property="og:image" content="https://www.nandann.com/images/Nandann-logo-new.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.nandann.com/" />
        <meta property="twitter:title" content="Nandann Creative Agency - Premium Web Development & Design Services" />
        <meta property="twitter:description" content="Professional web development and creative design agency. Custom websites, rapid delivery, SEO optimization, and ongoing support." />
        <meta property="twitter:image" content="https://www.nandann.com/images/Nandann-logo-new.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Nandann Creative Agency" />
        <link rel="canonical" href="https://www.nandann.com/" />
      </Head>
      
      <div className="min-h-screen">
        <StructuredData type="organization" />
        <Navigation />
        <Hero />
        <BlogPreview />
        <FAQ />
        <Footer />
      </div>
    </>
  );
} 