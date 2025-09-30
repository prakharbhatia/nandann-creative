import Head from 'next/head';
import Navigation from '../components/Navigation';
import WordPressPlugin from '../components/WordPressPlugin';
import Footer from '../components/Footer';

export default function WordPressPluginPage() {
  const pageTitle = "Fix WordPress Permission Errors Instantly - Free Plugin | Nandann";
  const pageDescription = "Struggling with WordPress file permission errors? Download our FREE plugin that fixes permission issues in seconds. Used by 10,000+ sites. Batch processing, safety checks, real-time progress.";
  const pageUrl = "https://www.nandann.com/reset-file-and-folder-permissions";
  const pageImage = "https://www.nandann.com/images/plugin-banner.webp";

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
            "name": "Tools",
            "item": "https://www.nandann.com/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "WordPress Permission Fixer"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#software`,
        "name": "Reset File and Folder Permissions",
        "description": pageDescription,
        "url": "https://wordpress.org/plugins/reset-file-and-folder-permissions/",
        "applicationCategory": "WordPress Plugin",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
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
        "softwareVersion": "1.2.0",
        "datePublished": "2025-08-19",
        "dateModified": "2025-09-09",
        "downloadUrl": "https://wordpress.org/plugins/reset-file-and-folder-permissions/",
        "screenshot": "https://www.nandann.com/images/plugin-banner.webp",
        "softwareRequirements": [
          "WordPress 5.0 or higher",
          "PHP 7.4 or higher",
          "PHP chmod() function"
        ],
        "featureList": [
          "Batch Processing",
          "Real-time Progress Tracking",
          "Safety Checks and Confirmations",
          "Selective Directory Processing",
          "Comprehensive Error Handling",
          "Responsive Admin Interface"
        ],
        "keywords": "wordpress permissions, file permissions, chmod, wordpress security, site migration, permission errors"
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="wordpress permission errors, fix wordpress permissions, wordpress chmod, file permission plugin, wordpress security plugin, permission fixer, wordpress maintenance, site migration tool, free wordpress plugin, permission errors" />
        <meta name="author" content="Prakhar Bhatia" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="last-modified" content="2025-09-09T12:00:00Z" />
        <meta httpEquiv="last-modified" content="Mon, 09 Sep 2025 12:00:00 GMT" />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:secure_url" content={pageImage} />
        <meta property="og:image:alt" content="WordPress Permission Fixer Plugin - Fix file permission errors instantly" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="twitter:image:alt" content="WordPress Permission Fixer Plugin - Fix file permission errors instantly" />
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
        <WordPressPlugin />
        <Footer />
      </div>
    </>
  );
}