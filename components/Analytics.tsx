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

  // Don't load analytics in development
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Load Google Analytics with performance optimizations */}
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
  );
}