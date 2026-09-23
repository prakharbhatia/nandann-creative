import type { AppProps } from 'next/app';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import '../styles/globals.css';
import Analytics from '../components/Analytics';
import WebVitalsTracking from '../components/WebVitalsTracking';
import ChatWidget from '../components/chat/ChatWidget';
import ScrollProgress from '../components/ScrollProgress';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ScrollProgress />
      <Analytics />
      <VercelAnalytics />
      <WebVitalsTracking />
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}
