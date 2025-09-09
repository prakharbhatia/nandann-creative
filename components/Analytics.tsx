import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '../lib/gtag';

export default function Analytics() {
  const router = useRouter();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (shouldLoad) {
        pageview(url);
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);

    if (!shouldLoad) {
      let loaded = false;
      const enable = () => {
        if (loaded) return;
        loaded = true;
        setShouldLoad(true);
        removeListeners();
      };

      const removeListeners = () => {
        window.removeEventListener('scroll', enable, { passive: true } as any);
        window.removeEventListener('pointerdown', enable, { passive: true } as any);
        window.removeEventListener('keydown', enable);
        window.removeEventListener('touchstart', enable, { passive: true } as any);
        window.removeEventListener('mousemove', enable, { passive: true } as any);
      };

      // Delay GTM loading by 7 seconds after page load
      const delayTimer = setTimeout(() => {
        enable();
      }, 7000);

      // Also enable on user interaction for better UX
      window.addEventListener('scroll', enable, { passive: true });
      window.addEventListener('pointerdown', enable, { passive: true });
      window.addEventListener('keydown', enable);
      window.addEventListener('touchstart', enable, { passive: true });
      window.addEventListener('mousemove', enable, { passive: true });

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
        removeListeners();
        clearTimeout(delayTimer);
      };
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, shouldLoad]);

  return (
    <>
      {shouldLoad && (
        <>
          {/* Optimized Google Analytics loading */}
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            onLoad={() => {
              // Initialize GA immediately after script loads
              window.dataLayer = window.dataLayer || [];
              function gtag(...args: any[]) { window.dataLayer.push(args); }
              (window as any).gtag = gtag;
              
              gtag('js', new Date());
              gtag('config', GA_TRACKING_ID, {
                page_path: window.location.pathname,
                send_page_view: false,
                cookie_flags: 'SameSite=None;Secure',
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                // Performance optimizations
                transport_type: 'beacon',
                custom_map: {
                  'custom_parameter': 'value'
                }
              });
              
              // Initial page view
              gtag('event', 'page_view', {
                page_path: window.location.pathname,
                page_title: document.title,
              });
            }}
          />
        </>
      )}
    </>
  );
}