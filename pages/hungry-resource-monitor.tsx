import Head from 'next/head';
import Navigation from '../components/Navigation';
import HungryResourceMonitor from '../components/HungryResourceMonitor';
import Footer from '../components/Footer';

export default function HungryResourceMonitorPage() {
    const pageTitle = "Hungry Resource Monitor - Free WordPress Performance Monitoring Plugin | Nandann";
    const pageDescription = "Monitor memory, CPU, and resource usage in WordPress. Detect bloat from plugins, themes, and database. Weekly reports, database cleanup tools, cron management. 100% free.";
    const pageUrl = "https://www.nandann.com/hungry-resource-monitor";
    const pageImage = "https://www.nandann.com/images/hungry-resource-monitor-banner.webp";

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
                        "name": "Hungry Resource Monitor"
                    }
                ]
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#software`,
                "name": "Hungry Resource Monitor",
                "description": pageDescription,
                "url": "https://wordpress.org/plugins/hungry-resource-monitor/",
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
                "softwareVersion": "1.0.1",
                "datePublished": "2026-01-10T00:00:00Z",
                "dateModified": "2026-01-15T00:00:00Z",
                "downloadUrl": "https://wordpress.org/plugins/hungry-resource-monitor/",
                "screenshot": pageImage,
                "softwareRequirements": [
                    "WordPress 6.2 or higher",
                    "PHP 7.4 or higher"
                ],
                "featureList": [
                    "Real-time memory & query monitoring",
                    "Top 5 resource consumers dashboard",
                    "Database cleanup tools",
                    "Cron management with orphaned cron detection",
                    "Email performance reports",
                    "Server limits display",
                    "Unused asset detection",
                    "Admin toolbar widget"
                ],
                "keywords": "wordpress performance, resource monitor, memory monitor, database cleanup, cron management, wordpress optimization, performance plugin"
            }
        ]
    };



    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use Hungry Resource Monitor",
        "description": "Find and fix WordPress performance issues",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Install and Activate",
                "text": "Download from WordPress.org. Dashboard widget appears immediately."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Check Top Consumers",
                "text": "See which plugins and themes use the most memory and queries."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Clean Database",
                "text": "Use cleanup tools to remove bloat (revisions, transients, etc.)."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Manage Cron Jobs",
                "text": "Review scheduled tasks. Remove orphaned crons."
            },
            {
                "@type": "HowToStep",
                "position": 5,
                "name": "Enable Reports",
                "text": "Set up weekly email digests to track improvements."
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="wordpress performance, resource monitor, memory monitor, database cleanup, cron management, wordpress optimization, performance plugin, free wordpress plugin" />
                <meta name="author" content="Prakhar Bhatia" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="last-modified" content="2026-01-12T12:00:00Z" />
                <meta httpEquiv="last-modified" content="Sun, 12 Jan 2026 12:00:00 GMT" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:secure_url" content={pageImage} />
                <meta property="og:image:alt" content="Hungry Resource Monitor - WordPress Performance Plugin" />
                <meta property="og:image:width" content="1024" />
                <meta property="og:image:height" content="538" />
                <meta property="og:site_name" content="Nandann Creative Agency" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="Hungry Resource Monitor - WordPress Performance Plugin" />
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
                <HungryResourceMonitor />
                <Footer />
            </div>
        </>
    );
}
