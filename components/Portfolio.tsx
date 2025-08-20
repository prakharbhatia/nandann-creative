import React from 'react';
import Link from 'next/link';
import FAQ from './FAQ';

export default function Portfolio() {
  const projects = [
    {
      title: "Reset File and Folder Permissions",
      description: "A powerful WordPress plugin to safely reset file and directory permissions with batch processing and real-time progress tracking.",
      image: "/images/plugin-banner.webp",
      tech: ["WordPress", "PHP", "JavaScript", "AJAX"],
      category: "WordPress Plugin",
      link: "/wordpress-plugin",
      external: false,
      featured: true,
      status: "Live on WordPress.org"
    },
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with advanced features, payment integration, and admin dashboard.",
      image: "/images/project1.jpg",
      tech: ["React", "Next.js", "Stripe", "MongoDB"],
      category: "Web Development",
      link: "/contact"
    },
    {
      title: "Algorithmic Trading Platform",
      description: "Advanced trading platform for a leading hedge fund featuring real-time analytics, currency pair configuration, and automated trading algorithms.",
      image: "/images/trading-platform-1.webp",
      tech: ["Python", "React", "WebSocket", "TradingView"],
      category: "FinTech Solutions",
      link: "/contact"
    },
    {
      title: "Data Analytics Dashboard",
      description: "Real-time analytics platform for business intelligence with interactive visualizations.",
      image: "/images/project3.jpg",
      tech: ["Python", "Django", "React", "D3.js"],
      category: "Python Solutions",
      link: "/contact"
    },
    {
      title: "SaaS Platform",
      description: "Complete SaaS solution with subscription management, user authentication, and API integration.",
      image: "/images/project4.jpg",
      tech: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
      category: "Web Development",
      link: "/contact"
    }
  ]

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses 
            transform their digital presence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className={`glass rounded-3xl overflow-hidden hover-lift group ${project.featured ? 'ring-2 ring-blue-500/30' : ''}`}>
              {/* Project Image */}
              <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                {project.image && (project.title === "Reset File and Folder Permissions" || project.title === "Algorithmic Trading Platform") ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                ) : null}
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
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
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
                    href={project.link}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    {project.external === false ? 'View Details →' : 'Get Quote →'}
                  </Link>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm">{project.status || 'Live'}</span>
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
  )
} 