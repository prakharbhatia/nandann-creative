import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FAQ from '../components/FAQ';

export default function PortfolioTest() {
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    transactions: 0,
    uptime: 0,
    volume: 0,
    downloads: 0
  });

  // Animated counters
  useEffect(() => {
    const targets = {
      years: 20,
      projects: 500,
      transactions: 50,
      uptime: 99.99,
      volume: 2,
      downloads: 10
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateCounters = () => {
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          years: Math.floor(targets.years * progress),
          projects: Math.floor(targets.projects * progress),
          transactions: Math.floor(targets.transactions * progress),
          uptime: Math.round(targets.uptime * progress * 100) / 100,
          volume: Math.round(targets.volume * progress * 100) / 100,
          downloads: Math.floor(targets.downloads * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "Enterprise FinTech Platform",
      industry: "Financial Services / Hedge Fund",
      challenge: "Real-time algorithmic trading with microsecond latency requirements",
      solution: "Built Python/React system with WebSocket streaming and advanced caching",
      results: [
        "Processed 10M+ trades/day",
        "99.99% uptime achieved",
        "Sub-millisecond response times"
      ],
      metrics: {
        trades: "10M+",
        uptime: "99.99%",
        latency: "<1ms"
      },
      tech: ["Python", "React", "WebSocket", "TradingView", "Redis"],
      category: "FinTech Solutions",
      featured: true,
      visual: "architecture"
    },
    {
      title: "High-Performance WordPress Migration",
      industry: "Media & Publishing",
      challenge: "WordPress site with 5M+ monthly visitors experiencing slow performance",
      solution: "Optimized WordPress architecture with CDN integration and advanced caching",
      results: [
        "78% faster load times",
        "95+ Core Web Vitals score",
        "40% increase in user engagement"
      ],
      metrics: {
        visitors: "5M+",
        improvement: "78%",
        score: "95+"
      },
      tech: ["WordPress", "PHP", "Redis", "CloudFlare", "Next.js"],
      category: "Performance Optimization",
      featured: true,
      visual: "performance"
    },
    {
      title: "Next.js Migration & Optimization",
      industry: "E-commerce",
      challenge: "Legacy WordPress site with poor mobile performance affecting conversions",
      solution: "Migrated to Next.js with SSG/ISR and optimized Core Web Vitals",
      results: [
        "LCP improved from 4.2s to 0.9s",
        "45% increase in conversions",
        "98+ Core Web Vitals score"
      ],
      metrics: {
        lcp: "0.9s",
        conversions: "+45%",
        score: "98+"
      },
      tech: ["Next.js", "React", "WordPress API", "Vercel"],
      category: "Modern Web Apps",
      featured: true,
      visual: "migration"
    },
    {
      title: "Reset File and Folder Permissions",
      industry: "Open Source / WordPress Community",
      challenge: "File permission issues wasting developer time across WordPress sites",
      solution: "Automated batch processing plugin with real-time progress tracking",
      results: [
        "10,000+ active installs",
        "5-star rating on WordPress.org",
        "Saves hours of manual work"
      ],
      metrics: {
        installs: "10K+",
        rating: "5★",
        timeSaved: "Hours"
      },
      tech: ["WordPress", "PHP", "JavaScript", "AJAX"],
      category: "WordPress Plugin",
      featured: true,
      visual: "plugin",
      link: "/reset-file-and-folder-permissions",
      external: false
    }
  ];

  const capabilities = [
    {
      title: "High-Performance Web Applications",
      description: "Build fast, scalable applications using modern frameworks and optimization techniques",
      features: ["Next.js", "React", "Core Web Vitals", "Performance Optimization"]
    },
    {
      title: "WordPress to Next.js Migrations",
      description: "Seamless migration with zero downtime and improved performance",
      features: ["Zero Downtime", "SSG/ISR", "API Integration", "SEO Preservation"]
    },
    {
      title: "Core Web Vitals Optimization",
      description: "Achieve optimal performance scores and improve search rankings",
      features: ["LCP < 1s", "CLS < 0.1", "FID < 100ms", "SEO Improvement"]
    },
    {
      title: "Trading & FinTech Systems",
      description: "Real-time systems handling millions of transactions with microsecond precision",
      features: ["Microsecond Latency", "High Availability", "Real-time Data", "Scalability"]
    },
    {
      title: "Enterprise-Scale Solutions",
      description: "Architect and build systems for large-scale enterprise applications",
      features: ["High Availability", "Disaster Recovery", "Security", "Compliance"]
    },
    {
      title: "WordPress Custom Development",
      description: "Two decades of WordPress expertise delivering custom solutions",
      features: ["Custom Plugins", "Theme Development", "API Integration", "Performance"]
    }
  ];

  const testimonials = [
    {
      text: "Prakhar delivered exceptional results, reducing our page load time by 78% and significantly improving our Core Web Vitals scores.",
      author: "CTO, Fortune 500 Financial Services",
      rating: 5
    },
    {
      text: "The WordPress to Next.js migration was flawless. Zero downtime and 45% increase in conversions within the first month.",
      author: "VP Engineering, Series B SaaS Startup",
      rating: 5
    },
    {
      text: "Working with Prakhar on our trading platform was a game-changer. The system handles 10M+ trades daily with 99.99% uptime.",
      author: "Technical Director, Global E-commerce Platform",
      rating: 5
    }
  ];

  const techTimeline = [
    { year: "2004-2008", tech: ["HTML", "CSS", "PHP", "JavaScript"], description: "Foundation Years" },
    { year: "2005-Present", tech: ["WordPress"], description: "20 Years of WordPress Mastery" },
    { year: "2008-2012", tech: ["Joomla", "Magento"], description: "CMS Expertise" },
    { year: "2012-2016", tech: ["Node.js", "Python", "React"], description: "Modern Frameworks" },
    { year: "2016-Present", tech: ["Next.js", "FastAPI", "Rust"], description: "Cutting Edge" },
    { year: "Ongoing", tech: ["AI-Enhanced Development"], description: "Future Ready" }
  ];

  // SVG Components
  const ArchitectureDiagram = () => (
    <svg viewBox="0 0 400 300" className="w-full h-64">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Database */}
      <rect x="50" y="200" width="80" height="60" rx="10" fill="url(#grad1)" opacity="0.8" />
      <text x="90" y="235" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Database</text>
      
      {/* API Layer */}
      <rect x="180" y="150" width="80" height="60" rx="10" fill="url(#grad1)" opacity="0.8" />
      <text x="220" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">API Layer</text>
      
      {/* Frontend */}
      <rect x="310" y="100" width="80" height="60" rx="10" fill="url(#grad1)" opacity="0.8" />
      <text x="350" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Frontend</text>
      
      {/* CDN */}
      <rect x="310" y="200" width="80" height="60" rx="10" fill="url(#grad1)" opacity="0.8" />
      <text x="350" y="235" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CDN</text>
      
      {/* Connections */}
      <line x1="130" y1="230" x2="180" y2="180" stroke="#60A5FA" strokeWidth="2" />
      <line x1="260" y1="180" x2="310" y2="130" stroke="#60A5FA" strokeWidth="2" />
      <line x1="260" y1="180" x2="310" y2="230" stroke="#60A5FA" strokeWidth="2" />
      
      {/* Performance indicators */}
      <circle cx="200" cy="50" r="20" fill="#10B981" />
      <text x="200" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">99.99%</text>
      <text x="200" y="80" textAnchor="middle" fill="#10B981" fontSize="8">Uptime</text>
    </svg>
  );

  const PerformanceChart = () => (
    <svg viewBox="0 0 400 200" className="w-full h-48">
      <defs>
        <linearGradient id="beforeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="afterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1="50" y1={40 + i * 30} x2="350" y2={40 + i * 30} stroke="#374151" strokeWidth="1" opacity="0.3" />
      ))}
      
      {/* Before bars */}
      <rect x="80" y="100" width="40" height="60" fill="url(#beforeGrad)" />
      <text x="100" y="95" textAnchor="middle" fill="#EF4444" fontSize="10">4.2s</text>
      
      <rect x="140" y="120" width="40" height="40" fill="url(#beforeGrad)" />
      <text x="160" y="115" textAnchor="middle" fill="#EF4444" fontSize="10">0.3</text>
      
      <rect x="200" y="110" width="40" height="50" fill="url(#beforeGrad)" />
      <text x="220" y="105" textAnchor="middle" fill="#EF4444" fontSize="10">150ms</text>
      
      {/* After bars */}
      <rect x="80" y="160" width="40" height="20" fill="url(#afterGrad)" />
      <text x="100" y="155" textAnchor="middle" fill="#10B981" fontSize="10">0.9s</text>
      
      <rect x="140" y="170" width="40" height="10" fill="url(#afterGrad)" />
      <text x="160" y="165" textAnchor="middle" fill="#10B981" fontSize="10">0.05</text>
      
      <rect x="200" y="175" width="40" height="5" fill="url(#afterGrad)" />
      <text x="220" y="170" textAnchor="middle" fill="#10B981" fontSize="10">50ms</text>
      
      {/* Labels */}
      <text x="100" y="190" textAnchor="middle" fill="#9CA3AF" fontSize="8">LCP</text>
      <text x="160" y="190" textAnchor="middle" fill="#9CA3AF" fontSize="8">CLS</text>
      <text x="220" y="190" textAnchor="middle" fill="#9CA3AF" fontSize="8">FID</text>
      
      {/* Legend */}
      <rect x="280" y="50" width="15" height="15" fill="#EF4444" opacity="0.8" />
      <text x="300" y="62" fill="#9CA3AF" fontSize="10">Before</text>
      <rect x="280" y="70" width="15" height="15" fill="#10B981" opacity="0.8" />
      <text x="300" y="82" fill="#9CA3AF" fontSize="10">After</text>
    </svg>
  );

  const TechStackVisualization = () => (
    <svg viewBox="0 0 400 300" className="w-full h-64">
      <defs>
        <radialGradient id="techGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      
      {/* Central node */}
      <circle cx="200" cy="150" r="30" fill="url(#techGrad)" />
      <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Core</text>
      
      {/* Technology nodes */}
      {[
        { x: 100, y: 80, tech: "WordPress", years: "20" },
        { x: 300, y: 80, tech: "Next.js", years: "8" },
        { x: 100, y: 220, tech: "Python", years: "12" },
        { x: 300, y: 220, tech: "React", years: "10" },
        { x: 200, y: 50, tech: "PHP", years: "20" },
        { x: 200, y: 250, tech: "JavaScript", years: "20" }
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="20" fill="#60A5FA" opacity="0.7" />
          <text x={node.x} y={node.y - 5} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{node.tech}</text>
          <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="6">{node.years}y</text>
          <line x1="200" y1="150" x2={node.x} y2={node.y} stroke="#60A5FA" strokeWidth="2" opacity="0.5" />
        </g>
      ))}
    </svg>
  );

  function ProjectCard({ project }: { project: any }) {
    const getVisual = () => {
      switch (project.visual) {
        case 'architecture':
          return <ArchitectureDiagram />;
        case 'performance':
          return <PerformanceChart />;
        case 'migration':
          return <TechStackVisualization />;
        case 'plugin':
          return (
            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
              <div className="text-center">
                <div className="text-white font-bold text-xl mb-2">WordPress Plugin</div>
                <div className="text-gray-300">10,000+ Active Installs</div>
                <div className="text-blue-300 text-sm mt-2">Reset File and Folder Permissions</div>
              </div>
            </div>
          );
        default:
          return <ArchitectureDiagram />;
      }
    };

    return (
      <div className={`glass rounded-3xl overflow-hidden hover-lift group ${project.featured ? 'ring-2 ring-blue-500/30' : ''}`}>
        {/* Visual */}
        <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
          {getVisual()}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <span className={`glass px-3 py-1 rounded-full text-sm text-white ${project.featured ? 'bg-blue-500/30' : ''}`}>
              {project.category}
            </span>
          </div>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full text-xs text-white font-medium">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-blue-300 text-sm mb-4 font-medium">{project.industry}</p>
          
          <div className="mb-4">
            <h4 className="text-white font-semibold mb-2">Challenge:</h4>
            <p className="text-gray-300 text-sm mb-3">{project.challenge}</p>
            
            <h4 className="text-white font-semibold mb-2">Solution:</h4>
            <p className="text-gray-300 text-sm mb-3">{project.solution}</p>
          </div>

          {/* Results */}
          <div className="mb-4">
            <h4 className="text-white font-semibold mb-2">Results:</h4>
            <ul className="space-y-1">
              {project.results.map((result: string, index: number) => (
                <li key={index} className="text-gray-300 text-sm flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  {result}
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Object.entries(project.metrics).map(([key, value]: [string, any]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {value}
                </div>
                <div className="text-gray-400 text-xs capitalize">{key}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="glass-dark px-3 py-1 rounded-full text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Link
              href={project.link || "/contact"}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              {project.external === false ? 'View Details →' : 'Get Quote →'}
            </Link>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">Live</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-white font-bold text-xl">
              ← Back to Home
            </Link>
            <div className="text-white text-sm">
              Portfolio Test Page
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              20 Years of Building <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">High-Performance Solutions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
              From WordPress plugins to enterprise trading systems, I've delivered measurable results 
              across diverse industries with a focus on performance and reliability.
            </p>
          </div>
        </section>

        {/* By The Numbers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              By The <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Numbers</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { label: "Years Experience", value: `${counters.years}+` },
                { label: "Projects Delivered", value: `${counters.projects}+` },
                { label: "Daily Transactions", value: `${counters.transactions}M+` },
                { label: "Average Uptime", value: `${counters.uptime}%` },
                { label: "Transaction Volume", value: `$${counters.volume}B+` },
                { label: "Plugin Downloads", value: `${counters.downloads}K+` }
              ].map((stat, index) => (
                <div key={index} className="glass rounded-2xl p-6 text-center hover-lift">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Technology <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Evolution</span>
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              <div className="space-y-12">
                {techTimeline.map((period, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="glass rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{period.year}</h3>
                        <p className="text-gray-300 mb-4">{period.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {period.tech.map((tech, techIndex) => (
                            <span key={techIndex} className="glass-dark px-3 py-1 rounded-full text-sm text-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 z-10"></div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              What I Can <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Build For You</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => (
                <div key={index} className="glass rounded-2xl p-6 hover-lift group">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {capability.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{capability.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {capability.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="glass-dark px-3 py-1 rounded-full text-sm text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Client <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass rounded-2xl p-8 hover-lift">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <p className="text-blue-300 font-medium">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-3xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Project</span>?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss your requirements and build a solution that delivers results. 
                With 20 years of experience, I can help bring your project to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 inline-block"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/portfolio"
                  className="glass px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift transition-all duration-300 inline-block"
                >
                  View Live Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FAQ 
          title="Portfolio & Projects"
          faqs={[
            {
              question: "Can you show examples of websites you've built for businesses like mine?",
              answer: "Yes! Our portfolio includes diverse projects across various industries including e-commerce platforms, corporate websites, mobile applications, and custom web solutions. We'd be happy to share specific examples relevant to your industry and requirements during our consultation."
            },
            {
              question: "What information do you provide about each project in your portfolio?",
              answer: "For each portfolio project, we showcase the technologies used, key features implemented, challenges solved, and results achieved. We also highlight the specific approaches and strategies that made each project successful for our clients."
            },
            {
              question: "How recent are the projects in your portfolio?",
              answer: "Our portfolio features recent projects from the past 2-3 years, showcasing current technologies and design trends. We regularly update our portfolio to reflect our latest work and evolving expertise in modern web development and design."
            },
            {
              question: "Can you provide case studies or detailed project breakdowns?",
              answer: "Absolutely! We can provide detailed case studies including project objectives, challenges faced, solutions implemented, and measurable results achieved. These case studies offer deeper insights into our problem-solving approach and project management methodology."
            },
            {
              question: "Do you have experience in my specific industry?",
              answer: "We've worked across various industries including e-commerce, healthcare, finance, education, and technology startups. Even if we haven't worked in your exact industry, our adaptable approach allows us to quickly understand your unique requirements and market needs."
            },
            {
              question: "What technologies are featured in your recent projects?",
              answer: "Our recent projects feature modern technologies including React, Next.js, Python, AWS cloud services, mobile development with React Native, and various CMS platforms. We always choose the best technology stack for each project's specific requirements."
            }
          ]}
        />
      </div>
    </div>
  );
}
