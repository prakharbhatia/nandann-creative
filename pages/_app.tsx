import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Analytics from '../components/Analytics';
import HolidayExitIntentPopup from '../components/HolidayExitIntentPopup';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
      <HolidayExitIntentPopup 
        enabled={true}
        minTimeOnPage={20} // Show after 20 seconds
        minScrollPercentage={15} // Or after 15% scroll
      />
    </>
  );
} 