import Head from 'next/head';
import LocationNavigation from '../components/LocationNavigation';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';

export default function PluginSupport() {
  return (
    <>
      <Head>
        <title>Plugin Support Request - Nandann Creative Agency</title>
        <meta name="description" content="Get support for Nandann Creative plugins. Submit support requests for Scheduled Cloud Backups, Core Web Vitals RUM, AI Smart 404 Redirects, File Permissions, and TG Live Chat plugins." />
        <meta name="keywords" content="plugin support, WordPress plugin support, Nandann plugin help, plugin troubleshooting" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/plugin-support" />

        {/* Open Graph */}
        <meta property="og:title" content="Plugin Support Request - Nandann Creative Agency" />
        <meta property="og:description" content="Get support for Nandann Creative plugins. Submit support requests for all our WordPress plugins." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.nandann.com/plugin-support" />
        <meta property="og:image" content="https://www.nandann.com/api/og?title=Plugin%20Support&subtitle=Get%20Help%20with%20Nandann%20Plugins" />
        <meta property="og:site_name" content="Nandann Creative" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plugin Support Request - Nandann Creative Agency" />
        <meta name="twitter:description" content="Get support for Nandann Creative plugins. Submit support requests for all our WordPress plugins." />
        <meta name="twitter:image" content="https://www.nandann.com/api/og?title=Plugin%20Support&subtitle=Get%20Help%20with%20Nandann%20Plugins" />
      </Head>

      <StructuredData
        type="website"
        pageUrl="https://www.nandann.com/plugin-support"
        pageTitle="Plugin Support Request - Nandann Creative Agency"
        pageDescription="Get support for Nandann Creative plugins. Submit support requests for Scheduled Cloud Backups, Core Web Vitals RUM, AI Smart 404 Redirects, File Permissions, and TG Live Chat plugins."
      />

      <LocationNavigation location="Plugin Support" locationShort="Support" />

      <main className="min-h-screen bg-white pt-32">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Plugin <span className="text-gradient">Support</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Need help with one of our plugins? We're here to assist you.
                Submit a support request and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Support Form */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
              <PluginSupportForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Plugin Support Form Component
import React, { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

function PluginSupportForm() {
  const { trackForm } = useAnalytics();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plugin: '',
    website: '',
    issueDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const plugins = [
    'Bhairav Scheduled Cloud Backup',
    'Core Web Vitals - Real User Monitoring (RUM)',
    'Nandann AI Smart 404 Redirects - Auto Fix Broken Links & Typos',
    'Reset File and Folder Permissions',
    'TG Live Chat - Reply from Telegram'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    trackForm('Plugin Support Form');

    try {
      // Send email using Formspree
      const response = await fetch('https://formspree.io/f/mrblqbgw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          plugin: formData.plugin,
          website: formData.website,
          issueDescription: formData.issueDescription,
        }),
      });

      if (response.ok) {
        alert('Thank you for your support request! We will get back to you soon.');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          plugin: '',
          website: '',
          issueDescription: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Sorry, there was an error submitting your request. Please try again or contact us directly at prakhar@nandann.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-900 font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-900 font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="plugin" className="block text-gray-900 font-medium mb-2">
          Plugin *
        </label>
        <select
          id="plugin"
          name="plugin"
          required
          value={formData.plugin}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <option value="">Select a plugin</option>
          {plugins.map((plugin) => (
            <option key={plugin} value={plugin} className="bg-white text-gray-900">
              {plugin}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="website" className="block text-gray-900 font-medium mb-2">
          Website Link *
        </label>
        <input
          type="url"
          id="website"
          name="website"
          required
          value={formData.website}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div>
        <label htmlFor="issueDescription" className="block text-gray-900 font-medium mb-2">
          Issue Description *
        </label>
        <textarea
          id="issueDescription"
          name="issueDescription"
          required
          rows={6}
          value={formData.issueDescription}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
          placeholder="Please describe the issue you're experiencing in detail..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-xl text-white font-semibold text-lg hover-lift hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
      </button>
    </form>
  );
}

