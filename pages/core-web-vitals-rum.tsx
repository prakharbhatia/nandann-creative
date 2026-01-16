import Head from 'next/head';
import Navigation from '../components/Navigation';
import CoreWebVitalsRUM from '../components/CoreWebVitalsRUM';
import Footer from '../components/Footer';

export default function CoreWebVitalsRUMPage() {
    const pageTitle = "Core Web Vitals RUM - Real User Monitoring for WordPress | Nandann";
    const pageDescription = "Track Core Web Vitals (LCP, INP, CLS, FCP, TTFB) from real users. GA4 integration, smart alerts, GDPR compliant. Free WordPress plugin for performance monitoring.";
    const pageUrl = "https://www.nandann.com/core-web-vitals-rum";
    const pageImage = "https://www.nandann.com/images/plugins/cwv-banner.webp";

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${pageUrl}#webpage`,
                "url": pageUrl,
                "name": pageTitle,
                "description": pageDescription,
                "inLanguage": "en-US",
                "isPartOf": {
                    "@id": "https://www.nandann.com/#website"
                },
                "breadcrumb": {
                    "@id": `${pageUrl}#breadcrumb`
                },
                "about": {
                    "@id": `${pageUrl}#software`
                },
                "mainEntity": {
                    "@id": `${pageUrl}#software`
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.nandann.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Portfolio",
                        "item": "https://www.nandann.com/portfolio"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Core Web Vitals RUM"
                    }
                ]
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#software`,
                "name": "Core Web Vitals RUM",
                "alternateName": "Core Web Vitals Real User Monitoring",
                "description": pageDescription,
                "url": "https://wordpress.org/plugins/core-web-vitals-real-user-monitoring-rum/",
                "applicationCategory": "WordPress Plugin",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                },
                "author": {
                    "@type": "Person",
                    "name": "Prakhar Bhatia",
                    "url": "https://www.nandann.com/about"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Nandann Creative Agency",
                    "url": "https://www.nandann.com/"
                },
                "softwareVersion": "1.0.0",
                "datePublished": "2025-12-15",
                "dateModified": "2026-01-02",
                "downloadUrl": "https://wordpress.org/plugins/core-web-vitals-real-user-monitoring-rum/",
                "screenshot": pageImage,
                "softwareRequirements": [
                    "WordPress 5.0 or higher",
                    "PHP 7.4 or higher"
                ],
                "featureList": [
                    "Real User Monitoring (RUM) for Core Web Vitals",
                    "5 metrics: LCP, INP, CLS, FCP, TTFB",
                    "Google Analytics 4 integration",
                    "Smart performance alerts",
                    "Per-page analysis",
                    "Device and browser breakdown",
                    "GDPR compliant with IP anonymization",
                    "Sample rate control for high-traffic sites"
                ],
                "keywords": "core web vitals, rum, real user monitoring, lcp, inp, cls, fcp, ttfb, performance monitoring, google analytics 4, ga4"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What metrics does it track?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All 5 Core Web Vitals: LCP, INP, CLS, FCP, and TTFB from real users."
                }
            },
            {
                "@type": "Question",
                "name": "Does it integrate with Google Analytics?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Optional GA4 integration sends metrics as custom events for deeper analysis."
                }
            },
            {
                "@type": "Question",
                "name": "Will it slow down my site?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Uses web-vitals library (~2KB) and sample rate control for high-traffic sites."
                }
            },
            {
                "@type": "Question",
                "name": "Is it GDPR compliant?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. IP anonymization, no cookies, no personal data stored."
                }
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Set Up Core Web Vitals RUM",
        "description": "Monitor real user performance",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Install and Activate",
                "text": "Install from WordPress.org. Tracking starts immediately."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Configure Sample Rate",
                "text": "Set percentage of visitors to track (100% default, lower for high traffic)."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Optional GA4 Setup",
                "text": "Enter GA4 Measurement ID to send metrics to Google Analytics."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Set Alerts",
                "text": "Configure email alerts when vitals exceed thresholds."
            },
            {
                "@type": "HowToStep",
                "position": 5,
                "name": "Review Dashboard",
                "text": "Check per-page breakdowns and device/browser analysis."
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="core web vitals, real user monitoring, rum, lcp, inp, cls, fcp, ttfb, wordpress performance, google analytics 4, page speed, web performance" />
                <meta name="author" content="Prakhar Bhatia" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:secure_url" content={pageImage} />
                <meta property="og:image:alt" content="Core Web Vitals RUM - Real User Monitoring for WordPress" />
                <meta property="og:image:width" content="772" />
                <meta property="og:image:height" content="250" />
                <meta property="og:site_name" content="Nandann Creative Agency" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="Core Web Vitals RUM - Real User Monitoring for WordPress" />
                <meta name="twitter:creator" content="@nandann" />
                <meta name="twitter:site" content="@nandann" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
                />
            </Head>

            <div className="min-h-screen">
                <Navigation />
                <CoreWebVitalsRUM />
                <Footer />
            </div>
        </>
    );
}
