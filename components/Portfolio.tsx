import React from 'react';
import Link from 'next/link';

export default function Portfolio() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with advanced features, payment integration, and admin dashboard.",
      image: "/images/project1.jpg",
      tech: ["React", "Next.js", "Stripe", "MongoDB"],
      category: "Web Development",
      link: "/contact"
    },
    {
      title: "Health & Fitness App",
      description: "Mobile application for tracking workouts, nutrition, and connecting with fitness communities.",
      image: "/images/project2.jpg",
      tech: ["React Native", "Firebase", "Python", "ML"],
      category: "Mobile App",
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
            <div key={index} className="glass rounded-3xl overflow-hidden hover-lift group">
              {/* Project Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
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
    </section>
  )
} 