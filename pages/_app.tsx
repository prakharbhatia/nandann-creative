import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Analytics from '../components/Analytics';
import HolidayExitIntentPopup from '../components/HolidayExitIntentPopup';
import WebVitalsTracking from '../components/WebVitalsTracking';
import ChatWidget from '../components/chat/ChatWidget';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Analytics />
      <WebVitalsTracking />
      <Component {...pageProps} />
      <HolidayExitIntentPopup 
        enabled={true}
        minTimeOnPage={20} // Show after 20 seconds
        minScrollPercentage={15} // Or after 15% scroll
      />
      <ChatWidget />
    </>
  );
} 