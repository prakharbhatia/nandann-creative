import React from 'react';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import IndustryPageLayout from '../../components/IndustryPageLayout';
import { getIndustryBySlug, industries, type IndustryPage } from '../../data/industries';
import { projects, type Project } from '../../data/projects';

interface IndustryRouteProps {
  industry: IndustryPage;
  featuredProjects: Project[];
}

export default function IndustryRoute({ industry, featuredProjects }: IndustryRouteProps) {
  const canonical = `https://www.nandann.com/industries/${industry.slug}`;
  const socialImage = `https://www.nandann.com${industry.bannerImage}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: industry.title,
        description: industry.metaDescription,
        url: canonical,
        areaServed: {
          '@type': 'Country',
          name: 'United States'
        },
        provider: {
          '@type': 'Organization',
          name: 'Nandann Creative Agency',
          url: 'https://www.nandann.com/'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.nandann.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Industries',
            item: 'https://www.nandann.com/industries'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: industry.label,
            item: canonical
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{industry.metaTitle}</title>
        <meta name="description" content={industry.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={industry.metaTitle} />
        <meta property="og:description" content={industry.metaDescription} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content={industry.bannerAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={industry.metaTitle} />
        <meta name="twitter:description" content={industry.metaDescription} />
        <meta name="twitter:image" content={socialImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <IndustryPageLayout industry={industry} featuredProjects={featuredProjects} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: industries.map((industry) => ({ params: { slug: industry.slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps<IndustryRouteProps> = async ({ params }) => {
  const industry = getIndustryBySlug(String(params?.slug || ''));

  if (!industry) {
    return { notFound: true };
  }

  return {
    props: {
      industry,
      featuredProjects: industry.projectIds
        .map((projectId) => projects.find((project) => project.id === projectId))
        .filter((project): project is Project => Boolean(project))
    }
  };
};
