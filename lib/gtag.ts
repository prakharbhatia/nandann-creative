// Google Analytics configuration
export const GA_TRACKING_ID = 'G-9BJFQ3F2JZ';

// Check if GA_TRACKING_ID is available
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track custom events for better insights
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${buttonName} - ${location}`,
  });
};

export const trackFormSubmission = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  });
};

export const trackPageScroll = (percentage: number) => {
  event({
    action: 'scroll',
    category: 'Engagement',
    label: `${percentage}% scrolled`,
    value: percentage,
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}