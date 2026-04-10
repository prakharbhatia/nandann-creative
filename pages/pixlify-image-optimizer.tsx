import Head from 'next/head';
import Navigation from '../components/Navigation';
import PixlifyImageOptimizer from '../components/PixlifyImageOptimizer';
import Footer from '../components/Footer';

export default function PixlifyImageOptimizerPage() {
    const pageTitle = "Pixlify Image Optimizer - Serve AVIF & WebP on Any WordPress Host | Nandann";
    const pageDescription = "WordPress image optimizer that actually works on WP Engine and Kinsta. Serves AVIF and WebP without .htaccess. Handles Elementor background images, external CSS, and JS-set styles. Built for real-world sites.";
    const pageUrl = "https://www.nandann.com/pixlify-image-optimizer";
    const pageImage = "https://www.nandann.com/images/pixlify-image-optimizer-banner.webp";

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
                        "name": "Pixlify Image Optimizer"
                    }
                ]
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#software`,
                "name": "Pixlify Image Optimizer",
                "description": pageDescription,
                "url": pageUrl,
                "applicationCategory": "WordPress Plugin",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
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
                "softwareVersion": "1.3.3",
                "datePublished": "2025-01-01T00:00:00Z",
                "dateModified": "2026-04-09T00:00:00Z",
                "screenshot": pageImage,
                "softwareRequirements": [
                    "WordPress 5.8 or higher",
                    "PHP 7.4 or higher",
                    "GD or Imagick extension",
                    "Imagick with libavif for AVIF support"
                ],
                "featureList": [
                    "Converts JPEG and PNG to WebP and AVIF",
                    "PHP output buffer rewriting — works on WP Engine and Kinsta without .htaccess",
                    "Handles Elementor background images set via inline styles",
                    "Intercepts external CSS files (Elementor CSS Print Method: External File)",
                    "JS MutationObserver for dynamically-set background images",
                    "Bulk optimizer with force re-optimize",
                    "WP-CLI commands for automation",
                    "Per-request file existence cache",
                    "AVIF priority with WebP fallback",
                    "image-set() CSS dual declaration"
                ],
                "keywords": "wordpress image optimizer, webp wordpress, avif wordpress, wp engine webp, elementor background image webp, image compression wordpress"
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Set Up Pixlify Image Optimizer",
        "description": "Install and configure Pixlify to serve AVIF and WebP on your WordPress site",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Install the Plugin",
                "text": "Upload the plugin to /wp-content/plugins/ and activate it from the Plugins screen."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Choose Output Format",
                "text": "Go to Pixlify Settings and choose WebP, AVIF, or both. If your server has Imagick with libavif, pick both."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Run the Bulk Optimizer",
                "text": "Go to Pixlify Bulk Optimizer and click Start. The plugin converts your existing media library in batches."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Enable URL Rewriting",
                "text": "Toggle on Serve WebP and/or Serve AVIF in Settings. Purge your page cache. Done."
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="wordpress image optimizer, webp wordpress plugin, avif wordpress, wp engine webp no htaccess, elementor background image optimization, wordpress image compression, serve webp kinsta, image format converter wordpress" />
                <meta name="author" content="Prakhar Bhatia" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="last-modified" content="2026-04-09T00:00:00Z" />
                <meta httpEquiv="last-modified" content="Thu, 09 Apr 2026 00:00:00 GMT" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:secure_url" content={pageImage} />
                <meta property="og:image:alt" content="Pixlify Image Optimizer - Serve AVIF and WebP on any WordPress host" />
                <meta property="og:image:width" content="1500" />
                <meta property="og:image:height" content="486" />
                <meta property="og:site_name" content="Nandann Creative Agency" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="Pixlify Image Optimizer - Serve AVIF and WebP on any WordPress host" />
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
                <PixlifyImageOptimizer />
                <Footer />
            </div>
        </>
    );
}
