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
        <title>Contact - Nandann Creative Agency</title>
        <meta name="description" content="Get in touch with Nandann Creative Agency for your next project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.nandann.com/contact" />
      </Head>

      <div className="min-h-screen">
        <Navigation />

        {/* Schedule a Call button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 4px 15px rgba(59,130,246,0.35)' }}
          >
            📅 Schedule a Call
          </button>
        </div>

        <Contact />
        <Footer />
      </div>

      {modalOpen && <ScheduleCallModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
