export interface IndustryPage {
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  introduction: string;
  audience: string;
  bannerImage: string;
  bannerAlt: string;
  priorities: string[];
  capabilities: Array<{
    title: string;
    description: string;
  }>;
  deliverables: Array<{
    title: string;
    description: string;
  }>;
  projectIds: string[];
}

export const industries: IndustryPage[] = [
  {
    slug: 'marine-industrial-web-development',
    label: 'Marine & Industrial',
    title: 'Web Development for Marine and Industrial Companies',
    metaTitle: 'Web Development for Marine & Industrial Companies',
    metaDescription: 'Web development for marine and industrial companies, backed by our work for Aquadrive USA and Mack Boring & Parts Co.',
    eyebrow: 'Technical products, made easier to understand',
    introduction: 'We build websites that help technical buyers move from a complex product catalogue to the right product, dealer, or sales conversation.',
    audience: 'For manufacturers, distributors, engineering firms, equipment suppliers, and dealer networks that need a clearer digital sales experience.',
    bannerImage: '/images/industries/marine-industrial.webp',
    bannerAlt: 'Marine engineer reviewing drivetrain equipment in a yacht engine room',
    priorities: [
      'Make technical products understandable without removing important detail.',
      'Organize models, brands, applications, training, and support logically.',
      'Give customers and dealers a direct route to the right next step.'
    ],
    capabilities: [
      {
        title: 'Product architecture',
        description: 'Clear catalogue structures for models, applications, brands, and supporting documentation.'
      },
      {
        title: 'Technical storytelling',
        description: 'Product pages that explain how a system works, where it fits, and why it matters.'
      },
      {
        title: 'Dealer and enquiry journeys',
        description: 'Practical paths to dealer discovery, technical support, training, or sales contact.'
      }
    ],
    deliverables: [
      { title: 'Product and model catalogue', description: 'A structure buyers can browse by product, brand, application, or specification.' },
      { title: 'Technical resource library', description: 'Specifications, manuals, drawings, training, and support content in one useful system.' },
      { title: 'Application pages', description: 'Focused explanations for the vessels, equipment, and operating conditions you serve.' },
      { title: 'Dealer and quote routing', description: 'Location-aware paths to a dealer, distributor, technical expert, or sales enquiry.' },
      { title: 'Buyer confidence content', description: 'Installation details, comparisons, certifications, and customer evidence.' },
      { title: 'Field-ready performance', description: 'Fast, accessible pages that work well on mobile devices and slower connections.' }
    ],
    projectIds: ['aquadrive-usa', 'mack-boring']
  },
  {
    slug: 'hospitality-creative-venue-web-development',
    label: 'Hospitality & Creative Venues',
    title: 'Web Development for Hospitality and Creative Venues',
    metaTitle: 'Hospitality & Creative Venue Web Development',
    metaDescription: 'Web development for boutique hospitality and creative venues, informed by our work for Birch House and SuperBoss Studio.',
    eyebrow: 'Sell the experience before the booking',
    introduction: 'We create visual, fast websites that help guests and creative teams understand a property, compare spaces, and take the next step with confidence.',
    audience: 'For boutique hotels, private stays, production studios, event spaces, and experience-led businesses where atmosphere is part of the product.',
    bannerImage: '/images/industries/hospitality-creative-venues.webp',
    bannerAlt: 'Creative team planning a hospitality campaign at a coastal boutique property',
    priorities: [
      'Present rooms or spaces with enough context to support a decision.',
      'Keep photography and video immersive without sacrificing mobile performance.',
      'Connect inspiration to availability, booking, or enquiry.'
    ],
    capabilities: [
      {
        title: 'Experience-led design',
        description: 'Digital presentation that reflects the tone, setting, and character of the physical space.'
      },
      {
        title: 'Room and venue discovery',
        description: 'Structured pages for suites, studios, equipment, amenities, and use cases.'
      },
      {
        title: 'Booking journeys',
        description: 'Clear paths from exploration to availability, reservation, or a tailored enquiry.'
      }
    ],
    deliverables: [
      { title: 'Room and space pages', description: 'Clear details for suites, studios, venues, capacities, layouts, and equipment.' },
      { title: 'Immersive media galleries', description: 'Photography and video presentation designed to stay fast on mobile.' },
      { title: 'Booking integration', description: 'A direct route to availability, reservation, rental, or a tailored enquiry.' },
      { title: 'Local discovery', description: 'Location, neighborhood, travel, and nearby-experience content for search and guests.' },
      { title: 'Use-case journeys', description: 'Dedicated paths for stays, shoots, private events, productions, and brand work.' },
      { title: 'Enquiry qualification', description: 'Forms that capture dates, group size, space, equipment, and special requirements.' }
    ],
    projectIds: ['birch-house', 'super-boss-studio']
  },
  {
    slug: 'architecture-professional-services-web-development',
    label: 'Architecture & Professional Services',
    title: 'Web Development for Architecture and Professional Services',
    metaTitle: 'Web Development for Architecture Firms',
    metaDescription: 'Web development for architecture and professional-service firms, backed by our bilingual portfolio work for Ligne Carré.',
    eyebrow: 'Turn expertise into visible proof',
    introduction: 'We build professional-service websites that communicate expertise through real projects, clear services, and thoughtful paths to consultation.',
    audience: 'For architecture practices, design consultancies, project managers, and specialist firms selling expertise rather than a standard product.',
    bannerImage: '/images/industries/architecture-professional-services.webp',
    bannerAlt: 'Architects reviewing a building model and drawings in a modern studio',
    priorities: [
      'Show the depth and range of project experience without creating a cluttered portfolio.',
      'Explain services in language prospective clients can understand.',
      'Support multilingual markets and high-consideration enquiries.'
    ],
    capabilities: [
      {
        title: 'Project portfolios',
        description: 'Structured casework with useful details about project type, scope, location, and responsibilities.'
      },
      {
        title: 'Bilingual experiences',
        description: 'Consistent navigation and complete service content for multilingual audiences.'
      },
      {
        title: 'Authority and enquiries',
        description: 'Credentials, sector experience, and consultation paths presented without unnecessary sales language.'
      }
    ],
    deliverables: [
      { title: 'Structured project portfolio', description: 'Filterable work organized by sector, service, location, scale, or project type.' },
      { title: 'Sector and service pages', description: 'Focused explanations of what you do and who each service is designed for.' },
      { title: 'Bilingual content system', description: 'Complete, consistent experiences for each market rather than partial translations.' },
      { title: 'Credentials and expertise', description: 'Team experience, awards, methodology, and responsibilities presented as proof.' },
      { title: 'Consultation journeys', description: 'Enquiries that capture project type, location, stage, scope, and timing.' },
      { title: 'Image-led performance', description: 'High-resolution project imagery delivered without sacrificing speed or accessibility.' }
    ],
    projectIds: ['ligne-carre']
  },
  {
    slug: 'ai-saas-product-development',
    label: 'AI & SaaS Products',
    title: 'AI and SaaS Product Development',
    metaTitle: 'AI & SaaS Product Development Services',
    metaDescription: 'AI and SaaS product development from working concept to customer-facing product, demonstrated by Nandann-owned Monkbot.',
    eyebrow: 'Working products, not AI demonstrations',
    introduction: 'We design and build AI products around real workflows, with clear user actions, controlled execution, and a product experience customers can understand.',
    audience: 'For founders and teams building AI agents, workflow automation, SaaS tools, internal platforms, or new digital products.',
    bannerImage: '/images/industries/ai-saas-product-development.webp',
    bannerAlt: 'Product engineers reviewing an AI workflow in a software operations workspace',
    priorities: [
      'Start with a valuable workflow instead of adding AI without a clear job.',
      'Make agent actions understandable, controlled, and observable.',
      'Ship a usable product experience around the underlying model or automation.'
    ],
    capabilities: [
      {
        title: 'Agentic workflows',
        description: 'Natural-language systems that connect models to tools, APIs, content, and operational tasks.'
      },
      {
        title: 'Product engineering',
        description: 'Customer-facing interfaces, backend services, authentication, and deployment for production use.'
      },
      {
        title: 'Safety and operations',
        description: 'Logged actions, controlled permissions, and practical workflows for ongoing product operation.'
      }
    ],
    deliverables: [
      { title: 'Workflow and use-case design', description: 'A product flow built around a repeatable customer job and measurable outcome.' },
      { title: 'Interactive product experience', description: 'Clear onboarding, dashboards, actions, feedback, and failure states.' },
      { title: 'Accounts and billing', description: 'Authentication, plans, payments, account settings, and customer lifecycle basics.' },
      { title: 'Tool and API integrations', description: 'Secure connections to the services, data, and operational systems the product needs.' },
      { title: 'Controls and observability', description: 'Permissions, approvals, logs, and status visibility for consequential AI actions.' },
      { title: 'Go-to-market foundation', description: 'Product pages, pricing, documentation, analytics, and conversion measurement.' }
    ],
    projectIds: ['monkbot']
  },
  {
    slug: 'events-experiential-web-development',
    label: 'Events & Experiential',
    title: 'Web Development for Events and Experiential Brands',
    metaTitle: 'Web Development for Events & Experiential Brands',
    metaDescription: 'Web development for event, exhibition, production, and experiential brands, backed by AI Brand Exhibit and SuperBoss Studio.',
    eyebrow: 'Make a broad creative offer easy to buy',
    introduction: 'We organize complex event and production capabilities into focused service pages, visual proof, and direct enquiry paths.',
    audience: 'For event companies, exhibition specialists, production studios, brand-activation teams, and creative spaces.',
    bannerImage: '/images/industries/events-experiential.webp',
    bannerAlt: 'Event production crew preparing a large experiential exhibition space',
    priorities: [
      'Separate related services without fragmenting the brand story.',
      'Use client and project proof to reduce uncertainty for buyers.',
      'Route each visitor toward the right event, production, or venue enquiry.'
    ],
    capabilities: [
      {
        title: 'Service positioning',
        description: 'Dedicated paths for events, exhibitions, launches, production, activations, and supporting services.'
      },
      {
        title: 'Visual proof',
        description: 'Project galleries and client evidence organized around buyer questions rather than decoration alone.'
      },
      {
        title: 'Qualified enquiries',
        description: 'Calls to action that capture the type, scale, location, and timing of an upcoming project.'
      }
    ],
    deliverables: [
      { title: 'Service architecture', description: 'Distinct pages for events, exhibitions, launches, activations, production, and venues.' },
      { title: 'Project and event gallery', description: 'Work organized by event type, audience, scale, location, and delivered capabilities.' },
      { title: 'Client and capability proof', description: 'Recognizable clients, production credentials, venues, equipment, and partner evidence.' },
      { title: 'Project brief capture', description: 'Enquiries covering date, location, audience, format, scale, and required services.' },
      { title: 'Mobile-first discovery', description: 'A fast experience for buyers reviewing work while travelling or on-site.' },
      { title: 'Media performance', description: 'Optimized photography and showreels that preserve visual impact without slowing the site.' }
    ],
    projectIds: ['ai-brand-exhibit', 'super-boss-studio']
  }
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
