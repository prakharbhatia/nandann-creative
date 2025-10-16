import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function WebVitalsTracking() {
  useEffect(() => {
    let userData: any = null;
    let webVitalsMetrics: any[] = []; // Store metrics until GA4 is ready
    
    // Function to wait for GA4 to be ready
    function waitForGA4(): Promise<void> {
      return new Promise((resolve) => {
        if (typeof window.gtag === 'function') {
          resolve();
          return;
        }
        
        // Check every 100ms for GA4 to be ready
        const checkInterval = setInterval(() => {
          if (typeof window.gtag === 'function') {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          console.warn('GA4 not loaded after 10 seconds, skipping web vitals tracking');
          resolve();
        }, 10000);
      });
    }
    
    // Function to send stored metrics to GA4
    async function sendStoredMetrics(sendToGA4: (metric: any) => void) {
      await waitForGA4();
      
      if (typeof window.gtag !== 'function') {
        console.warn('GA4 not available, skipping web vitals tracking');
        return;
      }
      
      // Send all stored metrics
      webVitalsMetrics.forEach(({ metric }) => sendToGA4(metric));
      webVitalsMetrics = []; // Clear the array
    }
    
    async function initTracking() {
      try {
        // Get user info from API
        userData = await fetch('/api/get-user-info').then(r => r.json());
        
        // Dynamically import web-vitals
        const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
        
        // Define thresholds for each metric (FID removed, replaced by INP)
        const thresholds: Record<string, [number, number]> = {
          LCP: [2000, 4000],
          INP: [200, 500],
          CLS: [0.1, 0.25],
          FCP: [1800, 3000],
          TTFB: [800, 1800]
        };
        
        // Function to send metric to GA4
        const sendToGA4 = (metric: any) => {
          const [goodThreshold, poorThreshold] = thresholds[metric.name] || [0, 0];
          let rating = 'good';
          
          if (metric.value > poorThreshold) {
            rating = 'poor';
          } else if (metric.value > goodThreshold) {
            rating = 'needs-improvement';
          }
          
          // Get connection info
          const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
          
          // Detect device type
          const userAgent = navigator.userAgent;
          let deviceType = 'desktop';
          if (/Mobile|Android|iPhone/i.test(userAgent)) {
            deviceType = 'mobile';
          } else if (/Tablet|iPad/i.test(userAgent)) {
            deviceType = 'tablet';
          }
          
          // Extract browser name
          const browserMatch = userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera)/);
          const browserName = browserMatch ? browserMatch[0] : 'Other';
          
          const eventData = {
            // User identification & location
            user_hash: userData?.user_hash || 'unknown',
            country: userData?.country || 'unknown',
            city: userData?.city || 'unknown',
            region: userData?.region || 'unknown',
            timezone: userData?.timezone || 'unknown',
            isp: userData?.isp || 'unknown',
            
            // Core Web Vitals metrics
            metric_name: metric.name,
            metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_rating: rating,
            metric_delta: Math.round(metric.delta),
            metric_id: metric.id,
            
            // Page context
            page_url: window.location.href,
            page_path: window.location.pathname,
            page_title: document.title,
            
            // Device & browser info
            device_type: deviceType,
            browser_name: browserName,
            
            // Connection info
            connection_type: connection?.effectiveType || 'unknown',
            connection_downlink: connection?.downlink || 0,
            connection_rtt: connection?.rtt || 0,
            
            // Timestamp
            timestamp: Date.now()
          };
          
          // Send event to GA4 if available, otherwise store it
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'web_vitals', eventData);
          } else {
            webVitalsMetrics.push({ metric, eventData });
          }
        };
        
        // Collect all Core Web Vitals metrics (FID removed in web-vitals v5)
        onCLS(sendToGA4);
        onFCP(sendToGA4);
        onLCP(sendToGA4);
        onTTFB(sendToGA4);
        onINP(sendToGA4);
        
        // Try to send any stored metrics after a delay
        setTimeout(() => sendStoredMetrics(sendToGA4), 1000);
        
        // Send a test event to verify GA4 connectivity
        setTimeout(async () => {
          await waitForGA4();
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'test_event', {
              test_parameter: 'web_vitals_tracking_test',
              timestamp: Date.now()
            });
          }
        }, 5000);
        
      } catch (error) {
        console.error('Web Vitals tracking error:', error);
      }
    }
    
    // Initialize tracking after page is idle (performance-safe)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        initTracking();
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        initTracking();
      }, 2000);
    }
  }, []);
  
  return null; // No UI needed
}

