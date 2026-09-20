import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { industries } from '../../data/industries';

export default function IndustriesPage() {
  return (
    <>
      <Head>
        <title>Industry Web Development Experience | Nandann</title>
        <meta
          name="description"
          content="Explore Nandann's web and product development experience across marine, hospitality, architecture, AI SaaS, events, and creative businesses."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.nandann.com/industries" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Nandann Creative Agency" />
        <meta property="og:url" content="https://www.nandann.com/industries" />
        <meta property="og:title" content="Industry Web Development Experience | Nandann" />
        <meta
          property="og:description"
          content="Web and product development experience backed by relevant, working client projects and Nandann-owned products."
        />
        <meta property="og:image" content="https://www.nandann.com/images/nandann-social-card.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Industry Web Development Experience | Nandann" />
        <meta
          name="twitter:description"
          content="Explore Nandann's industry-specific web and product development experience."
        />
        <meta name="twitter:image" content="https://www.nandann.com/images/nandann-social-card.png" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white">
        <Navigation />
        <main className="pt-36 pb-24">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Industry experience</p>
              <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
                Relevant experience for specialized businesses
              </h1>
              <p className="mt-7 text-xl md:text-2xl leading-relaxed text-gray-300">
                We use the same engineering foundation across projects, then shape the website around how each industry explains, proves, and sells its work.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {industries.map((industry) => (
                <article key={industry.slug} className="glass group overflow-hidden rounded-3xl border border-white/10 hover-lift">
                  <Link href={`/industries/${industry.slug}`} className="relative block aspect-[16/8] overflow-hidden border-b border-white/10">
                    <Image
                      src={industry.bannerImage}
                      alt={industry.bannerAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/55 via-transparent to-transparent" />
                  </Link>
                  <div className="p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">{industry.label}</p>
                    <h2 className="mt-4 text-2xl md:text-3xl font-bold">{industry.title}</h2>
                    <p className="mt-4 leading-relaxed text-gray-300">{industry.introduction}</p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">{industry.audience}</p>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="mt-7 inline-flex font-medium text-blue-300 hover:text-blue-200 transition-colors"
                    >
                      View experience →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 glass rounded-3xl border border-white/10 p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Do not see your industry?</h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                The useful question is whether your project shares the same product, content, integration, or buyer-journey challenges.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 font-semibold hover:from-blue-500 hover:to-purple-500 transition"
              >
                Tell Us About the Project
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
