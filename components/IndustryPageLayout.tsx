import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ExternalLink } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import type { IndustryPage } from '../data/industries';
import type { Project } from '../data/projects';

interface IndustryPageLayoutProps {
  industry: IndustryPage;
  featuredProjects: Project[];
}

export default function IndustryPageLayout({ industry, featuredProjects }: IndustryPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white">
      <Navigation />

      <main>
        <section className="pt-36 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/industries"
              className="inline-flex text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
              ← Industries
            </Link>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                  {industry.eyebrow}
                </p>
                <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
                  {industry.title}
                </h1>
                <p className="mt-7 text-xl md:text-2xl leading-relaxed text-gray-300">
                  {industry.introduction}
                </p>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-gray-400">
                  {industry.audience}
                </p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl shadow-purple-950/30">
                <Image
                  src={industry.bannerImage}
                  alt={industry.bannerAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/45 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {industry.priorities.map((priority, index) => (
              <div key={priority} className="glass rounded-2xl p-6 border border-white/10">
                <span className="text-sm font-semibold text-blue-300">0{index + 1}</span>
                <p className="mt-4 text-lg leading-relaxed text-gray-200">{priority}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-black/20 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-purple-300">What we build</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">A website shaped around the buying decision</h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {industry.capabilities.map((capability) => (
                <article key={capability.title} className="rounded-2xl bg-white/[0.04] border border-white/10 p-7">
                  <h3 className="text-xl font-semibold">{capability.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-400">{capability.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Industry deliverables</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">What we deliver for {industry.label.toLowerCase()} teams</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industry.deliverables.map((deliverable) => (
                <article key={deliverable.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                      <Check size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{deliverable.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{deliverable.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-black/20 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Relevant work</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">Experience behind the recommendation</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-400">
                These are working websites and products connected to this industry, not speculative examples.
              </p>
            </div>

            <div className={`mt-10 grid gap-6 ${featuredProjects.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
              {featuredProjects.map((project) => (
                <article key={project.id} className="glass group overflow-hidden rounded-2xl border border-white/10">
                  {project.images[0] ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-[16/10] overflow-hidden border-b border-white/10 bg-black/30"
                      aria-label={`Open ${project.title} website`}
                    >
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} website homepage`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                    </a>
                  ) : (
                    <div className="flex aspect-[16/7] items-center justify-center border-b border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 px-8 text-center">
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200/80">{project.title}</span>
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-500/10 border border-blue-400/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-blue-300">
                      {project.role || 'Selected work'}
                    </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold">{project.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-300">{project.description}</p>
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium transition-colors"
                      >
                        Visit website <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl border border-white/10 p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Planning a website in this industry?</h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                Share the current site or project brief. We will identify the clearest route from your offer to a qualified enquiry.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 font-semibold hover:from-blue-500 hover:to-purple-500 transition"
                >
                  Discuss Your Project
                </Link>
                <Link
                  href="/portfolio"
                  className="rounded-full border border-white/20 px-7 py-3.5 font-semibold hover:bg-white/10 transition"
                >
                  View All Work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
