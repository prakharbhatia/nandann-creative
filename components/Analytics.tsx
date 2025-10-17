import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '../lib/gtag';

export default function Analytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics 4 - Loads immediately */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          // Initialize GA immediately after script loads
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) { 
            window.dataLayer.push(args); 
          }
          (window as any).gtag = gtag;
          
          gtag('js', new Date());
          
          // Check if debug mode is enabled via URL parameter
          const urlParams = new URLSearchParams(window.location.search);
          const isDebugMode = urlParams.get('debug_mode') === 'true';
          
          if (isDebugMode) {
            console.log('🔍 GA4 Debug Mode Active');
          }
          
          gtag('config', GA_TRACKING_ID, {
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure',
            // Enable debug mode for DebugView
            debug_mode: isDebugMode
          });
          
          // Send initial page view
          gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title,
          });
        }}
      />
    </>
  );
}