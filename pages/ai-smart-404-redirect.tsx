import Head from 'next/head';
import Navigation from '../components/Navigation';
import AISmartRedirect from '../components/AISmartRedirect';
import Footer from '../components/Footer';

export default function AISmartRedirectPage() {
    const pageTitle = "AI Smart 404 Redirect - AI-Powered WordPress 404 Handler | Nandann";
    const pageDescription = "Stop losing visitors to broken links. AI-powered 404 redirect plugin with smart matching, typo detection, and comprehensive analytics. Free WordPress plugin.";
    const pageUrl = "https://www.nandann.com/ai-smart-404-redirect";
    const pageImage = "https://www.nandann.com/images/plugins/ai404-banner.webp";

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
                        "name": "AI Smart 404 Redirect"
                    }
                ]
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#software`,
                "name": "Nandann AI Smart 404 Redirect",
                "alternateName": "AI Smart 404 Redirect",
                "description": pageDescription,
                "url": "https://wordpress.org/plugins/nandann-ai-smart-404-redirect/",
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
                "datePublished": "2025-12-01",
                "dateModified": "2026-01-02",
                "downloadUrl": "https://wordpress.org/plugins/nandann-ai-smart-404-redirect/",
                "screenshot": pageImage,
                "softwareRequirements": [
                    "WordPress 5.0 or higher",
                    "PHP 7.4 or higher"
                ],
                "featureList": [
                    "AI-powered smart URL matching",
                    "Levenshtein typo detection algorithm",
                    "Confidence scoring (0-100%)",
                    "Comprehensive 404 analytics dashboard",
                    "Email notifications (daily/weekly/monthly)",
                    "301, 302, 307 redirect support",
                    "Custom post type support",
                    "Referrer tracking"
                ],
                "keywords": "404 redirect, broken links, AI redirect, typo detection, smart redirect, wordpress 404, seo redirect, link fixer",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "reviewCount": "2",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Set Up AI Smart 404 Redirect",
        "description": "Configure intelligent 404 handling",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Install and Activate",
                "text": "Install from WordPress.org. The plugin starts working immediately."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Build the Index",
                "text": "Index your content for AI matching. Runs automatically on changes."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Set Confidence Threshold",
                "text": "Choose minimum match score (0-100%) for auto-redirects."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Configure Notifications",
                "text": "Enable email digests for 404 reports (daily/weekly/monthly)."
            },
            {
                "@type": "HowToStep",
                "position": 5,
                "name": "Review Analytics",
                "text": "Check dashboard for broken links and redirect performance."
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="404 redirect plugin, ai redirect, broken links fixer, typo detection, smart 404, wordpress 404 handler, seo redirect, levenshtein algorithm" />
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
                <meta property="og:image:alt" content="AI Smart 404 Redirect - Intelligent broken link handler" />
                <meta property="og:image:width" content="772" />
                <meta property="og:image:height" content="250" />
                <meta property="og:site_name" content="Nandann Creative Agency" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="AI Smart 404 Redirect - Intelligent broken link handler" />
                <meta name="twitter:creator" content="@nandann" />
                <meta name="twitter:site" content="@nandann" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
                />
            </Head>

            <div className="min-h-screen">
                <Navigation />
                <AISmartRedirect />
                <Footer />
            </div>
        </>
    );
}
