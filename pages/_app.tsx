import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Analytics from '../components/Analytics';
import WebVitalsTracking from '../components/WebVitalsTracking';
import ChatWidget from '../components/chat/ChatWidget';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Analytics />
      <WebVitalsTracking />
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}
