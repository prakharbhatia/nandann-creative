export interface Project {
    id: string;
    title: string;
    clientName?: string;
    category: 'plugin' | 'website' | 'blockchain' | 'fintech' | 'backend';
    techStack: string[];
    description: string;
    challenge?: string;
    solution?: string;
    images: string[];
    link?: string;
    hostingProvider?: string;
    isLive: boolean;
    isConfidential?: boolean;
    date: string;
}

export const projects: Project[] = [
    // Plugins
    {
        id: 'tg-live-chat',
        title: "TG Live Chat",
        category: 'plugin',
        techStack: ["WordPress", "PHP", "Telegram API", "JavaScript"],
        description: "Seamlessly integrate Telegram for real-time customer support directly on your WordPress site.",
        challenge: "Businesses needed a way to provide instant support without expensive chat solutions.",
        solution: "Created a lightweight WordPress plugin that connects directly to Telegram, allowing support agents to reply from their phones.",
        images: ["/images/tg-live-chat-banner.webp"],
        link: "https://www.nandann.com/tg-live-chat",
        isLive: true,
        date: "2025-12-01"
    },
    {
        id: 'core-web-vitals-rum',
        title: "Core Web Vitals RUM",
        category: 'plugin',
        techStack: ["JavaScript", "Performance API", "Analytics", "React"],
        description: "Real-time user monitoring for Core Web Vitals to optimize website performance.",
        challenge: "Google's Core Web Vitals are critical for SEO, but lab data doesn't always reflect real user experience.",
        solution: "Developed a RUM (Real User Monitoring) tool that captures actual field data from visitors to identify performance bottlenecks.",
        images: ["/images/plugins/cwv-banner.webp"],
        link: "https://www.nandann.com/core-web-vitals-rum",
        isLive: true,
        date: "2025-11-15"
    },
    {
        id: 'ai-smart-404-redirect',
        title: "AI Smart 404 Redirect",
        category: 'plugin',
        techStack: ["AI/ML", "WordPress", "PHP", "SEO"],
        description: "Intelligent 404 error handling that redirects users to relevant content using AI.",
        challenge: "Lost visitors on 404 pages increase bounce rates and hurt SEO rankings.",
        solution: "Implemented an AI-driven engine that analyzes the broken URL and automatically redirects users to the most relevant existing page.",
        images: ["/images/plugins/ai404-banner.webp"],
        link: "https://www.nandann.com/ai-smart-404-redirect",
        isLive: true,
        date: "2025-10-20"
    },
    {
        id: 'bhairav-cloud-backup',
        title: "Bhairav Cloud Backup",
        category: 'plugin',
        techStack: ["Cloud Storage", "PHP", "WordPress", "Security"],
        description: "Automated cloud backup solution for WordPress sites ensuring data safety.",
        challenge: "Manual backups are unreliable, and many plugins are too complex or expensive.",
        solution: "Built a set-and-forget backup solution that automatically syncs to secure cloud storage with one-click restoration.",
        images: ["/images/plugins/bhairav-banner.webp"],
        link: "https://www.nandann.com/bhairav-cloud-backup",
        isLive: true,
        date: "2025-09-10"
    },

    // Websites
    {
        id: 'summit-drilling',
        title: "Summit Drilling",
        clientName: "Summit Drilling",
        category: 'website',
        techStack: ["Next.js", "React", "Tailwind CSS"],
        description: "Corporate website for a leading environmental drilling company.",
        images: ["/images/portfolio/summit-drilling.webp"], // Placeholder path
        link: "https://summitdrilling.com/",
        isLive: true,
        date: "2024-05-15"
    },
    {
        id: 'aquadrive-usa',
        title: "Aquadrive USA",
        clientName: "Aquadrive USA",
        category: 'website',
        techStack: ["WordPress", "WooCommerce", "PHP"],
        description: "E-commerce platform for marine propulsion systems.",
        images: [], // No image due to IP agreement
        link: "https://www.aquadriveusa.com/",
        isLive: true,
        date: "2024-03-22"
    },
    {
        id: 'super-boss-studio',
        title: "Super Boss Studio",
        clientName: "Super Boss Studio",
        category: 'website',
        techStack: ["React", "Three.js", "GSAP"],
        description: "Creative portfolio for a design studio featuring immersive 3D interactions.",
        images: ["/images/portfolio/superboss.webp"], // Placeholder path
        link: "https://superbossstudio.com",
        isLive: true,
        date: "2024-08-10"
    },
    {
        id: 'pillars-hotel',
        title: "Pillars Hotel",
        clientName: "Pillars Hotel",
        category: 'website',
        techStack: ["Next.js", "Booking Engine API", "Stripe"],
        description: "Luxury hotel booking website with virtual tours and real-time availability.",
        images: ["/images/portfolio/pillars-hotel.webp"], // Placeholder path
        link: "https://pillarshotel.com/",
        isLive: true,
        date: "2024-06-05"
    },
    {
        id: 'ligne-carre',
        title: "Ligne Carre",
        clientName: "Ligne Carre",
        category: 'website',
        techStack: ["Vue.js", "Nuxt", "Shopify Headless"],
        description: "Minimalist fashion e-commerce store with a focus on visual storytelling.",
        images: ["/images/portfolio/ligne-carre.webp"], // Placeholder path
        link: "https://lignecarre.com",
        isLive: true,
        date: "2024-04-18"
    },
    {
        id: 'orila-center',
        title: "Orila Center",
        clientName: "Orila Center",
        category: 'website',
        techStack: ["WordPress", "Elementor", "Custom PHP"],
        description: "Wellness center website with appointment scheduling and event management.",
        images: [], // Placeholder removed
        link: "https://orilacenter.com/",
        isLive: true,
        date: "2024-02-28"
    },
    {
        id: 'prakhar-psychological-test',
        title: "Prakhar Psychological Test",
        clientName: "Prakhar Psychological Test",
        category: 'website',
        techStack: ["React", "Node.js", "MongoDB"],
        description: "Online psychological assessment platform with automated scoring and reporting.",
        images: ["/images/portfolio/psych-test.webp"], // Placeholder path
        link: "https://www.prakharpsychologicaltest.com/",
        isLive: true,
        date: "2024-07-12"
    },
    {
        id: 'gale-family-remodeling',
        title: "Gale Family Remodeling",
        clientName: "Gale Family Remodeling",
        category: 'website',
        techStack: ["Next.js", "Sanity CMS", "Tailwind CSS"],
        description: "Home remodeling services website showcasing project galleries and testimonials.",
        images: ["/images/portfolio/gale-family.webp"], // Placeholder path
        link: "https://galefamilyremodeling.com/",
        isLive: true,
        date: "2024-09-01"
    },

    // Blockchain & FinTech (Confidential / Placeholders)
    {
        id: 'rust-solana-trading-bot',
        title: "High-Frequency Solana Trading Bot",
        category: 'blockchain',
        techStack: ["Rust", "Solana RPC", "Tokio", "PostgreSQL"],
        description: "Automated trading system monitoring Solana mempool for arbitrage opportunities.",
        challenge: "Standard nodes were too slow to capture arbitrage opportunities in volatile markets.",
        solution: "Built a custom Rust-based engine with direct RPC connections and optimized transaction signing for sub-millisecond execution.",
        images: [], // Placeholder removed
        isLive: true,
        isConfidential: true,
        date: "2024-11-05"
    },
    {
        id: 'fintech-trading-dashboard',
        title: "Institutional Trading Dashboard",
        category: 'fintech',
        techStack: ["React", "TypeScript", "WebSocket", "D3.js"],
        description: "Real-time analytics dashboard for monitoring multi-asset portfolio performance.",
        challenge: "Traders needed a unified view of positions across multiple exchanges with real-time P&L updates.",
        solution: "Developed a high-performance dashboard using WebSockets for live data streaming and D3.js for complex financial visualizations.",
        images: [], // Placeholder removed
        isLive: true,
        isConfidential: true,
        date: "2024-10-15"
    },
    {
        id: 'python-algo-backtester',
        title: "Algorithmic Strategy Backtester",
        category: 'backend',
        techStack: ["Python", "Pandas", "NumPy", "Docker"],
        description: "High-performance backtesting engine for validating trading strategies against historical data.",
        images: [], // Placeholder removed
        isLive: false,
        isConfidential: true,
        date: "2024-08-20"
    }
];
