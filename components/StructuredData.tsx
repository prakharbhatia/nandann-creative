import Head from 'next/head';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'service';
  pageUrl?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export default function StructuredData({ 
  type = 'organization',
  pageUrl = 'https://www.nandann.com',
  pageTitle = 'Nandann Creative Agency',
  pageDescription = 'Professional web development and creative design agency'
}: StructuredDataProps) {
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nandann Creative Agency",
    "url": "https://www.nandann.com",
    "logo": "https://www.nandann.com/images/Nandann-logo-new.png",
    "description": "Professional web development and creative design agency specializing in custom websites, rapid delivery, and ongoing support.",
    "foundingDate": "2024",
    "areaServed": "Worldwide",
    "serviceType": [
      "Web Development",
      "Web Design",
      "SEO Services",
      "Digital Marketing",
      "E-commerce Development",
      "Website Maintenance"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.nandann.com/contact"
    },
    "sameAs": [
      "https://github.com/prakharbhatia"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": pageTitle,
    "url": pageUrl,
    "description": pageDescription,
    "publisher": {
      "@type": "Organization",
      "name": "Nandann Creative Agency"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${pageUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development & Design Services",
    "description": "Comprehensive web development and creative design services including custom websites, SEO optimization, and ongoing support.",
    "provider": {
      "@type": "Organization",
      "name": "Nandann Creative Agency",
      "url": "https://www.nandann.com"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Web Development",
            "description": "Tailored web solutions built with modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rapid Delivery Service",
            "description": "Express web development with 7-day delivery guarantee"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Optimization",
            "description": "Search engine optimization for better visibility"
          }
        }
      ]
    }
  };

  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return websiteData;
      case 'service':
        return serviceData;
      default:
        return organizationData;
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData())
        }}
      />
    </Head>
  );
}