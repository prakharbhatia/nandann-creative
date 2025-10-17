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
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Check if debug mode is enabled
            const isDebugMode = window.location.search.includes('debug_mode=true');
            
            if (isDebugMode) {
              console.log('🔍 GA4 Debug Mode Active - Tracking ID: ${GA_TRACKING_ID}');
              console.log('🔍 Page Path:', window.location.pathname);
            }
            
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
              debug_mode: isDebugMode
            });
            
            if (isDebugMode) {
              console.log('🔍 GA4 Config sent');
            }
            
            // Send initial page view
            gtag('event', 'page_view', {
              page_path: window.location.pathname,
              page_title: document.title,
            });
            
            if (isDebugMode) {
              console.log('🔍 Page view event sent');
            }
          `,
        }}
      />
    </>
  );
}