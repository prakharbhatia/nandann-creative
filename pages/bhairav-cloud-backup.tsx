import Head from 'next/head';
import Navigation from '../components/Navigation';
import BhairavCloudBackup from '../components/BhairavCloudBackup';
import Footer from '../components/Footer';

export default function BhairavCloudBackupPage() {
    const pageTitle = "Bhairav Scheduled Cloud Backup - Free WordPress Multi-Cloud Backup Plugin | Nandann";
    const pageDescription = "Automated WordPress backups to multiple cloud providers. No file size limits, multi-cloud redundancy, auto-cleanup. Supports AWS S3, Google Drive, Dropbox. 100% free.";
    const pageUrl = "https://www.nandann.com/bhairav-cloud-backup";
    const pageImage = "https://www.nandann.com/images/plugins/bhairav-banner.webp";

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
                        "name": "Bhairav Scheduled Cloud Backup"
                    }
                ]
            },
            {
                "@type": "SoftwareApplication",
                "@id": `${pageUrl}#software`,
                "name": "Bhairav Scheduled Cloud Backup",
                "description": pageDescription,
                "url": "https://wordpress.org/plugins/bhairav-scheduled-cloud-backup/",
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
                "datePublished": "2026-01-01",
                "dateModified": "2026-01-02",
                "downloadUrl": "https://wordpress.org/plugins/bhairav-scheduled-cloud-backup/",
                "screenshot": pageImage,
                "softwareRequirements": [
                    "WordPress 5.0 or higher",
                    "PHP 7.4 or higher"
                ],
                "featureList": [
                    "Multi-cloud backup (AWS S3, Google Drive, Dropbox, OneDrive)",
                    "No file size limits with chunked uploads",
                    "Scheduled backups (daily, weekly, fortnightly, monthly)",
                    "Automatic cleanup of old backups",
                    "Email notifications on backup completion",
                    "OAuth 2.0 authentication support",
                    "Files only, database only, or complete backup",
                    "Secure credential storage"
                ],
                "keywords": "wordpress backup, cloud backup, aws s3 backup, google drive backup, dropbox backup, scheduled backup, multi-cloud, auto backup"
            },
            {
                "@type": "FAQPage",
                "@id": `${pageUrl}#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Is Bhairav Cloud Backup really free?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, 100% free. No premium tiers. Uses your own cloud storage."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Which cloud providers are supported?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "AWS S3, Google Drive, Dropbox, and OneDrive. Run multiple destinations simultaneously."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are there file size limits?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No. Uses chunked uploads to handle large sites without timeouts."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How does auto-cleanup work?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Set retention rules. Old backups are automatically deleted to save storage."
                        }
                    }
                ]
            },
            {
                "@type": "HowTo",
                "@id": `${pageUrl}#howto`,
                "name": "How to Set Up Bhairav Cloud Backup",
                "description": "Configure automated WordPress backups",
                "step": [
                    {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Install the Plugin",
                        "text": "Download from WordPress.org or search 'Bhairav Cloud Backup' in plugins."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Connect Cloud Storage",
                        "text": "Add S3 credentials or OAuth for Google Drive/Dropbox. Test connection."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "Set Schedule",
                        "text": "Choose daily, weekly, or monthly. Set preferred time."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 4,
                        "name": "Configure Retention",
                        "text": "Set how many backups to keep. Old ones are auto-deleted."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 5,
                        "name": "Run First Backup",
                        "text": "Click Run Now to verify. Enable email notifications."
                    }
                ]
            }
        ]
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="wordpress backup plugin, cloud backup, aws s3 backup, google drive backup, dropbox backup, scheduled backup, multi-cloud backup, auto backup wordpress, free backup plugin" />
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
                <meta property="og:image:alt" content="Bhairav Scheduled Cloud Backup - Multi-cloud WordPress backup" />
                <meta property="og:image:width" content="1544" />
                <meta property="og:image:height" content="500" />
                <meta property="og:site_name" content="Nandann Creative Agency" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta name="twitter:image:alt" content="Bhairav Scheduled Cloud Backup - Multi-cloud WordPress backup" />
                <meta name="twitter:creator" content="@nandann" />
                <meta name="twitter:site" content="@nandann" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <div className="min-h-screen">
                <Navigation />
                <BhairavCloudBackup />
                <Footer />
            </div>
        </>
    );
}
