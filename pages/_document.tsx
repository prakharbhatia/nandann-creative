import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/images/Nandann-favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/images/Nandann-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/Nandann-favicon.png" />
        {/* Preconnect for GA when it loads later (low-cost DNS prefetch) */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        {/* RSS feed */}
        <link rel="alternate" type="application/rss+xml" title="Nandann Creative Blog RSS" href="/rss.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 