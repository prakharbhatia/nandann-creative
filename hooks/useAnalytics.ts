import { useCallback, useEffect } from 'react';
import { trackButtonClick, trackFormSubmission, trackPageScroll } from '../lib/gtag';

export const useAnalytics = () => {
  // Track button clicks
  const trackButton = useCallback((buttonName: string, location: string) => {
    trackButtonClick(buttonName, location);
  }, []);

  // Track form submissions
  const trackForm = useCallback((formName: string) => {
    trackFormSubmission(formName);
  }, []);

  // Auto-track scroll depth
  useEffect(() => {
    let scrollDepthTracker: { [key: string]: boolean } = {};
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track at 25%, 50%, 75%, and 100% milestones
      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepthTracker[milestone]) {
          scrollDepthTracker[milestone] = true;
          trackPageScroll(milestone);
        }
      });
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return {
    trackButton,
    trackForm,
  };
};