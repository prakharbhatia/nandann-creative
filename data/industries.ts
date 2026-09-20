export interface IndustryPage {
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  introduction: string;
  audience: string;
  priorities: string[];
  capabilities: Array<{
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
    projectIds: ['ai-brand-exhibit', 'super-boss-studio']
  }
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
