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
