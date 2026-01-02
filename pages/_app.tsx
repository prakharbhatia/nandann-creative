import type { AppProps } from 'next/app';
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
      <WebVitalsTracking />
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}
