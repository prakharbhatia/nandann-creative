import Head from 'next/head';
import Navigation from '../components/Navigation';
import WordPressPlugin from '../components/WordPressPlugin';
import Footer from '../components/Footer';

export default function WordPressPluginPage() {
  const pageTitle = "Reset File and Folder Permissions - WordPress Plugin by Nandann";
  const pageDescription = "A powerful yet safe WordPress plugin to reset file and directory permissions to secure values. Features batch processing, real-time progress, and comprehensive safety checks.";
  const pageUrl = "https://www.nandann.com/reset-file-and-folder-permissions";
  const pageImage = "https://www.nandann.com/api/og?title=WordPress%20Plugin&subtitle=Reset%20File%20and%20Folder%20Permissions";

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
            "name": "WordPress Plugin"
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
          "reviewCount": "1",
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
        "softwareVersion": "1.0.0",
        "datePublished": "2025-08-19",
        "downloadUrl": "https://wordpress.org/plugins/reset-file-and-folder-permissions/",
        "screenshot": "https://www.nandann.com/images/plugin-icon.webp",
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
        ]
      },

    ]
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="WordPress plugin, file permissions, folder permissions, WordPress security, site migration, chmod, WordPress maintenance, file access, directory permissions, WordPress admin" />
        <meta name="author" content="Prakhar Bhatia" />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:image:secure_url" content={pageImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        <meta name="twitter:creator" content="@nandann" />
        
        {/* Additional Meta */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
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