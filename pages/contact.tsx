import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navigation from '../components/Navigation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScheduleCallModal from '../components/ScheduleCallModal';

export default function ContactPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Auto-open modal if ?ref= query param is present or internal referrer detected
    const hasRefParam = typeof router.query.ref === 'string' && router.query.ref.length > 0;
    const hasInternalReferrer =
      typeof document !== 'undefined' &&
      document.referrer.includes('nandann.com');

    if (hasRefParam || hasInternalReferrer) {
      const timer = setTimeout(() => setModalOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, [router.query.ref]);

  return (
    <>
      <Head>
        <title>Contact Nandann Creative — Start Your Web Development Project</title>
        <meta name="description" content="Ready to build a fast, modern website? Contact Nandann Creative for Next.js, React, WordPress, or Rust development. Same-day consultations available. Response within 24 hours." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:url" content="https://www.nandann.com/contact" />
        <meta property="og:title" content="Contact Nandann Creative — Start Your Web Development Project" />
        <meta property="og:description" content="Ready to build? Contact Nandann Creative for Next.js, React, WordPress, or Rust development. Same-day consultations. Response within 24 hours." />
        <meta property="og:image" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nandanncreative" />
        <meta name="twitter:title" content="Contact Nandann Creative — Start Your Web Project" />
        <meta name="twitter:description" content="Ready to build? Contact us for Next.js, React, WordPress, or Rust development. Same-day consultations available." />
        <meta name="twitter:image" content="https://www.nandann.com/images/nandann-social-card.png" />
      </Head>

      <div className="min-h-screen">
        <Navigation />
        <Contact onScheduleCall={() => setModalOpen(true)} />
        <Footer />
      </div>

      {modalOpen && <ScheduleCallModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
