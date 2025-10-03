import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useExitIntent } from '../hooks/useExitIntent';

interface HolidayExitIntentPopupProps {
  enabled?: boolean;
  minTimeOnPage?: number; // Minimum seconds before popup can trigger
  minScrollPercentage?: number; // Minimum scroll percentage before popup can trigger
}

export default function HolidayExitIntentPopup({
  enabled = true,
  minTimeOnPage = 30, // 30 seconds
  minScrollPercentage = 25 // 25% scroll
}: HolidayExitIntentPopupProps) {
  const { trackForm, trackButton } = useAnalytics();
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  });
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeOnPage(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = Math.round((scrollTop / docHeight) * 100);
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user meets criteria for popup
  const canShowPopup = timeOnPage >= minTimeOnPage && scrollPercentage >= minScrollPercentage;

  // Exit intent detection
  const { reset } = useExitIntent(() => {
    if (enabled && canShowPopup && !showPopup) {
      setShowPopup(true);
      trackButton('Exit Intent Popup Shown', 'Holiday Blog');
      
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }
  }, {
    enabled: enabled && canShowPopup && !showPopup,
    delay: 100,
    threshold: 100, // Trigger when mouse moves into top 100px
    sensitivity: 5
  });

  const handleClose = () => {
    setShowPopup(false);
    setShowForm(false);
    document.body.style.overflow = 'unset';
    trackButton('Exit Intent Popup Closed', 'Holiday Blog');
  };

  const handleGetAudit = () => {
    setShowForm(true);
    trackButton('Exit Intent Get Audit Clicked', 'Holiday Blog');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackForm('Holiday Exit Intent Form');
    
    try {
      const response = await fetch('https://formspree.io/f/mrblqbgw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Holiday Exit Intent Popup',
          type: 'Performance Audit Request'
        }),
      });

      if (response.ok) {
        trackButton('Exit Intent Form Submitted', 'Holiday Blog');
        alert('Thank you! We\'ll get back to you within 24 hours with your free performance audit.');
        
        // Reset form and close popup
        setFormData({
          name: '',
          email: '',
          company: '',
          project: '',
          message: ''
        });
        handleClose();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Sorry, there was an error. Please email us directly at prakhar@nandann.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLearnMore = () => {
    trackButton('Exit Intent Learn More', 'Holiday Blog');
    window.location.href = '/blog/get-ready-2025-holiday-sales-traffic';
    handleClose();
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup Content */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-2xl max-w-md w-full shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors duration-200 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {!showForm ? (
            // Initial compact view
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-bold mb-3">
                  ⏰ LIMITED TIME
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">
                  Prepare for Holiday Traffic
                </h2>
                
                <p className="text-gray-300 text-sm mb-4">
                  Black Friday is coming! Get a <strong className="text-blue-300">free performance audit</strong> before the rush.
                </p>
              </div>

              {/* Compact Benefits */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">Free Core Web Vitals audit</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">WordPress to Next.js migration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">24-48 hour turnaround</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleGetAudit}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-6 py-3 rounded-xl text-white font-bold hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  Get Free Audit →
                </button>
                
                <button
                  onClick={handleLearnMore}
                  className="w-full text-gray-400 hover:text-white text-sm underline transition-colors duration-200"
                >
                  Learn more about our services
                </button>
              </div>
            </>
          ) : (
            // Form view
            <>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">Get Your Free Audit</h3>
                <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Your name *"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="your@email.com *"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Company (optional)"
                  />
                </div>

                <div>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="" className="bg-gray-800 text-white">What do you need?</option>
                    <option value="audit" className="bg-gray-800 text-white">Free Performance Audit</option>
                    <option value="holiday-optimization" className="bg-gray-800 text-white">Holiday Optimization</option>
                    <option value="wp-migration" className="bg-gray-800 text-white">WordPress Migration</option>
                    <option value="other" className="bg-gray-800 text-white">Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                    placeholder="Tell us about your site *"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-6 py-3 rounded-lg text-white font-bold hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  Submit →
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full text-gray-400 hover:text-white text-sm underline transition-colors duration-200"
                >
                  ← Back
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
