import Head from 'next/head';
import Navigation from '../components/Navigation';
import HungryFileManager from '../components/HungryFileManager';
import Footer from '../components/Footer';

export default function HungryFileManagerPage() {
    const pageTitle = "Hungry File Manager - VS Code Style WordPress Plugin Manager | Nandann";
    const pageDescription = "Replace your FTP client with a powerful, modern IDE directly inside your WordPress dashboard. Built with Monaco Editor (VS Code engine). The ultimate WordPress File Manager plugin. 100% Free.";
    const pageUrl = "https://www.nandann.com/hungry-file-manager";
    const pageImage = "https://www.nandann.com/images/hungry-file-manager-banner.png";

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
                        "name": "Hungry File Manager"
                    }
                ]
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#software`,
                "name": "Hungry File Manager",
                "description": pageDescription,
                "url": pageUrl,
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
                "datePublished": "2026-04-17T00:00:00Z",
                "dateModified": "2026-04-17T00:00:00Z",
                "screenshot": pageImage,
                "softwareRequirements": [
                    "WordPress 6.2 or higher",
                    "PHP 7.4 or higher"
                ],
                "featureList": [
                    "Monaco Editor integration (VS Code engine)",
                    "Syntax highlighting for PHP, JS, CSS, JSON",
                    "Full file operations: Upload, Rename, Move, Delete",
                    "Zip and Unzip functionality",
                    "Role-Based Access Control (RBAC)",
                    "Premium Dark Mode UI",
                    "No FTP required",
                    "SPA performance"
                ],
                "keywords": "wordpress file manager, wordpress editor plugin, vs code wordpress, monaco editor wordpress, edit wordpress files without ftp, secure file manager wordpress, free wordpress plugin"
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Install and Use Hungry File Manager",
        "description": "Get started with professional file management in WordPress",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Download the Plugin",
                "text": "Click the download button on our website to get the latest hungry-file-manager.zip."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Upload to WordPress",
                "text": "Navigate to Plugins > Add New > Upload Plugin in your WordPress dashboard and select the zip file."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Activate",
                "text": "Click Activate after installation is complete."
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Manage Files",
                "text": "Go to the 'Hungry File Manager' link in your sidebar to start editing files directly."
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="wordpress file manager, wordpress editor, vs code wordpress, monaco editor, ftp replacement, edit files without ftp, secure wordpress management, free developer tools" />
                <meta name="author" content="Prakhar Bhatia" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="last-modified" content="2026-04-17T00:00:00Z" />
                <meta httpEquiv="last-modified" content="Fri, 17 Apr 2026 00:00:00 GMT" />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:secure_url" content={pageImage} />
                <meta property="og:image:alt" content="Hungry File Manager - Professional VS Code Style Editor for WordPress" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="675" />
                <meta property="og:site_name" content="Nandann Creative Agency" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="Hungry File Manager - Professional VS Code Style Editor for WordPress" />
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

            <div className="min-h-screen bg-[#0d1117]">
                <Navigation />
                <HungryFileManager />
                <Footer />
            </div>
        </>
    );
}
