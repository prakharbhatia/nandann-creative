import React from 'react';
import Link from 'next/link';
import FAQ from '../components/FAQ';

export default function PortfolioTest() {
  const projects = [
    {
      title: "Enterprise FinTech Platform",
      industry: "Financial Services",
      description: "Real-time algorithmic trading system with microsecond latency requirements",
      technologies: ["Python", "React", "WebSocket", "Redis"],
      results: "Successfully processed over 10 million trades daily with 99.99% uptime",
      category: "FinTech Solutions"
    },
    {
      title: "High-Performance WordPress Migration", 
      industry: "Media & Publishing",
      description: "Migrated large-scale WordPress site with 5M+ monthly visitors",
      technologies: ["WordPress", "Next.js", "React", "Cloudflare"],
      results: "Achieved 78% faster page load times and boosted Core Web Vitals scores to 95+",
      category: "Performance Optimization"
    },
    {
      title: "Next.js Migration & Optimization",
      industry: "E-commerce",
      description: "Transformed legacy e-commerce platform into modern Next.js application",
      technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      results: "Improved Largest Contentful Paint from 4.2s to 0.9s and increased mobile conversions by 25%",
      category: "Web Development"
    },
    {
      title: "WordPress Plugin Development",
      industry: "WordPress Ecosystem", 
      description: "Developed utility plugin to address common file permission issues",
      technologies: ["WordPress", "PHP", "JavaScript", "AJAX"],
      results: "Achieved over 10,000 active installs with a 4.9-star rating on WordPress.org",
      category: "WordPress Plugin"
    },
    {
      title: "Healthcare Management System",
      industry: "Healthcare",
      description: "Built comprehensive patient management system with HIPAA compliance",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      results: "Streamlined patient workflows by 60% and improved data accuracy to 99.8%",
      category: "Healthcare Solutions"
    },
    {
      title: "Real Estate Portal",
      industry: "Real Estate",
      description: "Developed property listing platform with advanced search and virtual tours",
      technologies: ["Next.js", "MongoDB", "Stripe", "Google Maps API"],
      results: "Increased property inquiries by 150% and reduced time-to-lease by 40%",
      category: "Real Estate Platform"
    },
    {
      title: "Educational Learning Management System",
      industry: "Education",
      description: "Created online learning platform with video streaming and progress tracking",
      technologies: ["React", "Express.js", "MySQL", "AWS S3"],
      results: "Enabled 50,000+ students to access courses with 95% completion rate",
      category: "EdTech Solutions"
    },
    {
      title: "Restaurant Ordering System",
      industry: "Food & Beverage",
      description: "Built mobile-first ordering platform with real-time kitchen management",
      technologies: ["React Native", "Firebase", "Stripe", "Twilio"],
      results: "Reduced order processing time by 45% and increased customer satisfaction by 30%",
      category: "Food Tech Platform"
    },
    {
      title: "Manufacturing ERP System",
      industry: "Manufacturing",
      description: "Developed enterprise resource planning system for production management",
      technologies: ["Angular", "Java", "Oracle", "Docker"],
      results: "Optimized production scheduling and reduced inventory costs by 25%",
      category: "Manufacturing Solutions"
    },
    {
      title: "Fitness Tracking Application",
      industry: "Health & Fitness",
      description: "Created comprehensive fitness app with workout plans and progress analytics",
      technologies: ["React Native", "Node.js", "MongoDB", "Chart.js"],
      results: "Achieved 100,000+ downloads with 4.7-star rating and 80% user retention",
      category: "Fitness App"
    },
    {
      title: "Legal Case Management System",
      industry: "Legal Services",
      description: "Built secure case management platform with document automation",
      technologies: ["Vue.js", "Python", "PostgreSQL", "AWS"],
      results: "Reduced case processing time by 50% and improved document accuracy by 90%",
      category: "Legal Tech Solutions"
    },
    {
      title: "Travel Booking Platform",
      industry: "Travel & Tourism",
      description: "Developed comprehensive travel booking system with multi-vendor integration",
      technologies: ["React", "Express.js", "MySQL", "Payment Gateway"],
      results: "Processed $2M+ in bookings with 99.5% transaction success rate",
      category: "Travel Platform"
    },
    {
      title: "Non-Profit Donation Portal",
      industry: "Non-Profit",
      description: "Created donation management system with campaign tracking and reporting",
      technologies: ["Next.js", "Stripe", "MongoDB", "EmailJS"],
      results: "Increased donation collection by 200% and reduced administrative overhead by 60%",
      category: "Non-Profit Solutions"
    },
    {
      title: "Automotive Parts Marketplace",
      industry: "Automotive",
      description: "Built B2B marketplace for automotive parts with inventory management",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      results: "Connected 500+ suppliers with 2,000+ buyers, processing $5M+ in transactions",
      category: "B2B Marketplace"
    },
    {
      title: "Crypto Meme Coin Analysis & Copy Trading System",
      industry: "Cryptocurrency Trading",
      description: "Built Rust-based system to identify profitable meme coin traders and implement automated copy trading using Solana RPC",
      technologies: ["Rust", "Solana RPC", "Web3", "PostgreSQL"],
      results: "Identified top-performing traders with 85% accuracy and achieved 40% average returns through automated copy trading",
      category: "Crypto Trading Solutions"
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
      text: "Nandann Creative Agency delivered exceptional results, reducing our page load time by 78% and significantly improving our Core Web Vitals scores.",
      author: "CTO, Fortune 500 Financial Services",
      rating: 5
    },
    {
      text: "The WordPress to Next.js migration by Nandann Creative Agency was flawless. Zero downtime and 45% increase in conversions within the first month.",
      author: "VP Engineering, Series B SaaS Startup", 
      rating: 5
    },
    {
      text: "Working with Nandann Creative Agency on our trading platform was a game-changer. The system handles 10M+ trades daily with 99.99% uptime.",
      author: "Technical Director, Global E-commerce Platform",
      rating: 5
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            20 Years of Building <span className="text-gradient">High-Performance Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From WordPress plugins to enterprise trading systems, I've delivered measurable results 
            across diverse industries with a focus on performance and reliability.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass rounded-3xl overflow-hidden hover-lift group">
              {/* Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="text-white font-bold text-xl mb-2">{project.title}</div>
                    <div className="text-gray-300">{project.industry}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="glass px-3 py-1 rounded-full text-sm text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-3">
                  <span className="font-semibold text-blue-300">Industry:</span> {project.industry}
                </p>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  <span className="font-semibold text-blue-300">Results:</span> {project.results}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string, techIndex: number) => (
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
                    href="/contact"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Get Quote →
                  </Link>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm">Live</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-gradient">Project</span>?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and create something amazing together. 
              We're here to bring your vision to life.
            </p>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-semibold text-lg hover-lift hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>

      {/* Portfolio FAQs */}
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
          },
          {
            question: "Can you provide references or testimonials from past clients?",
            answer: "Yes! We're happy to provide client references and testimonials upon request. We have strong relationships with our past clients and many are willing to share their experience working with us and the results they achieved."
          },
          {
            question: "How do you ensure the projects in your portfolio represent quality work?",
            answer: "Every project in our portfolio represents our commitment to quality, having gone through our rigorous 4-step approach: Discovery & Vision, Creative Strategy, Design & Development, and Launch & Growth. Each project demonstrates our technical expertise and attention to detail."
          }
        ]}
      />
    </section>
  );
}