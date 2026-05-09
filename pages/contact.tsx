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
        <link rel="canonical" href="https://www.nandann.com/contact" />
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
