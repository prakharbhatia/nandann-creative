import React from 'react';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { normalizeMetaDescription, normalizeSeoTitle } from '../lib/seo';

function normalizeHeadElement(element: React.ReactElement | null): React.ReactElement | null {
  if (!element) return element;

  const props = element.props as Record<string, unknown>;

  if (element.type === 'title' && typeof props.children === 'string') {
    return React.cloneElement(element, undefined, normalizeSeoTitle(props.children));
  }

  if (
    element.type === 'meta' &&
    props.name === 'description' &&
    typeof props.content === 'string'
  ) {
    return React.cloneElement(element as React.ReactElement<{ content?: string }>, {
      content: normalizeMetaDescription(props.content),
    });
  }

  return element;
}

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      head: initialProps.head?.map(normalizeHeadElement),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        {/* Favicon */}
        <link rel="icon" href="/images/Nandann-favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/images/Nandann-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/Nandann-favicon.png" />
        
        {/* Referrer Policy for better security and GA compatibility */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Preconnect for GA when it loads later (low-cost DNS prefetch) */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        {/* RSS feed */}
        <link rel="alternate" type="application/rss+xml" title="Nandann Creative Blog RSS" href="/rss.xml" />
        {/* Schema aggregation for AI crawlers and schema tools */}
        <link rel="schema-aggregation" type="application/ld+json" href="https://www.nandann.com/api/schema" />
        {/* LLMs.txt for AI discovery */}
        <link rel="llms-txt" type="text/plain" href="https://www.nandann.com/llms.txt" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
