import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/images/Nandann-favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/images/Nandann-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/Nandann-favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 