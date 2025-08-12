import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GA_TRACKING_ID, pageview } from '../lib/gtag';

export default function Analytics() {
  const router = useRouter();
  const [shouldLoad, setShouldLoad] = useState(false);

  // Single effect: route tracking + deferred GA loading
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
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
      };

      window.addEventListener('scroll', enable, { passive: true });
      window.addEventListener('pointerdown', enable, { passive: true });
      window.addEventListener('keydown', enable);
      window.addEventListener('touchstart', enable, { passive: true });

      // Idle callback if supported, otherwise fallback timeout
      const idleId: number | undefined = (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(enable, { timeout: 10000 })
        : (window.setTimeout(enable, 10000) as unknown as number);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
        removeListeners();
        if ((window as any).cancelIdleCallback && idleId) {
          (window as any).cancelIdleCallback(idleId);
        }
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
          {/* Load Google Analytics after user interaction/idle */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  // Performance optimizations
                  send_page_view: false, // We'll handle this manually
                  cookie_flags: 'SameSite=None;Secure',
                  // Privacy-friendly settings
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false,
                });
                // Initial page view
                gtag('event', 'page_view', {
                  page_path: window.location.pathname,
                  page_title: document.title,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}