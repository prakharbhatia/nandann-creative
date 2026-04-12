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
    "@type": ["Organization", "LocalBusiness"],
    "name": "Nandann Creative Agency",
    "alternateName": "Nandann Creative",
    "url": "https://www.nandann.com",
    "logo": "https://www.nandann.com/images/Nandann-logo-new.png",
    "priceRange": "$2,500 - $15,000+",
    "image": "https://www.nandann.com/images/prakhar.jpg",
    "description": "Professional web development and creative design agency specializing in AI-enhanced development, same-day delivery, and performance optimization. Led by Prakhar Bhatia with 16+ years of experience.",
    "foundingDate": "2008",
    "founder": {
      "@type": "Person",
      "name": "Prakhar Bhatia",
      "image": "https://www.nandann.com/images/prakhar.jpg",
      "jobTitle": "Founder & Lead Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Nandann Creative Agency"
      }
    },
    "areaServed": ["United States", "Canada", "United Kingdom", "Australia", "India"],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "hello@nandann.com",
      "url": "https://www.nandann.com/contact",
      "availableLanguage": ["English"],
      "areaServed": "Worldwide"
    },
    "sameAs": [
      "https://github.com/prakharbhatia",
      "https://www.linkedin.com/company/nandann-creative"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "2500",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Web Development",
            "description": "AI-enhanced web development with 16+ years expertise. Projects from $2,500 to $15,000+."
          }
        },
        {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": "2500",
          "itemOffered": {
            "@type": "Service",
            "name": "Same-Day Website Delivery",
            "description": "Express website development delivered within 24 hours. Starting from $2,500."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
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