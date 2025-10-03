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
    document.body.style.overflow = 'unset';
    trackButton('Exit Intent Popup Closed', 'Holiday Blog');
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
    window.location.href = '/rapid-same-day-website-delivery';
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
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              ⏰ HOLIDAY PREP LIMITED TIME
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Don't Lose Holiday Sales to Slow Performance!
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              The busiest shopping season is approaching fast. Ensure your website can handle the traffic spike with our <strong className="text-blue-300">free performance audit</strong> and <strong className="text-purple-300">rapid optimization package</strong>.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl">
              <span className="text-blue-400 mt-1">✓</span>
              <div>
                <div className="text-white font-semibold">Free Performance Audit</div>
                <div className="text-gray-300 text-sm">Core Web Vitals analysis & actionable recommendations</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl">
              <span className="text-purple-400 mt-1">✓</span>
              <div>
                <div className="text-white font-semibold">WordPress to Next.js Migration</div>
                <div className="text-gray-300 text-sm">40-60% faster load times for holiday traffic</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl">
              <span className="text-green-400 mt-1">✓</span>
              <div>
                <div className="text-white font-semibold">Rapid Optimization</div>
                <div className="text-gray-300 text-sm">Multiple WebVitals improvements & caching strategies</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl">
              <span className="text-orange-400 mt-1">✓</span>
              <div>
                <div className="text-white font-semibold">24-48 Hour Turnaround</div>
                <div className="text-gray-300 text-sm">Get your site ready before Black Friday rush</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Project Type</label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="" className="bg-gray-800 text-white">Select project type</option>
                  <option value="holiday-optimization" className="bg-gray-800 text-white">Holiday Performance Optimization</option>
                  <option value="wp-migration" className="bg-gray-800 text-white">WordPress to Next.js Migration</option>
                  <option value="audit" className="bg-gray-800 text-white">Free Performance Audit Only</option>
                  <option value="rapid-delivery" className="bg-gray-800 text-white">Rapid Website Delivery</option>
                  <option value="other" className="bg-gray-800 text-white">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Message *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Tell us about your current site and holiday traffic concerns..."
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 rounded-xl text-white font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                🚀 Get Free Performance Audit
              </button>
              
              <button
                type="button"
                onClick={handleLearnMore}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 px-8 py-3 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300"
              >
                Learn About Our Holiday Package →
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              ⚡ Response guaranteed within 24 hours • 🔒 No spam, ever
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
