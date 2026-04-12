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
        
        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://www.nandann.com/" />
        <meta property="og:title" content="Nandann Creative Agency - Premium Web Development & Design Services" />
        <meta property="og:description" content="Professional web development and creative design agency. Custom websites, rapid delivery, SEO optimization, and ongoing support." />
        <meta property="og:image" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta property="og:image:secure_url" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Nandann Creative Agency - Next.js, React, WordPress, Rust, Salesforce" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nandanncreative" />
        <meta name="twitter:creator" content="@prakharbhatia" />
        <meta name="twitter:url" content="https://www.nandann.com/" />
        <meta name="twitter:title" content="Nandann Creative Agency - Premium Web Development & Design Services" />
        <meta name="twitter:description" content="Professional web development and creative design agency. Custom websites, rapid delivery, SEO optimization, and ongoing support." />
        <meta name="twitter:image" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta name="twitter:image:alt" content="Nandann Creative Agency - Next.js, React, WordPress, Rust, Salesforce" />

        {/* hreflang - English US (canonical), x-default fallback */}
        <link rel="alternate" hrefLang="en" href="https://www.nandann.com/" />
        <link rel="alternate" hrefLang="en-US" href="https://www.nandann.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.nandann.com/" />

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