import React from 'react';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: "Python Solutions",
      description: "Backend APIs, data analytics, and automation solutions powered by Python and modern frameworks.",
      features: ["Django & FastAPI", "Data Analytics", "Automation Scripts", "Machine Learning"],
      icon: "🐍"
    },
    {
      title: "AWS & Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions using AWS and modern DevOps practices.",
      features: ["AWS Infrastructure", "Docker & Kubernetes", "CI/CD Pipelines", "Cloud Migration"],
      icon: "☁️"
    },
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies. From responsive websites to complex web platforms.",
      features: ["React & Next.js", "E-commerce Solutions", "CMS Development", "Progressive Web Apps"],
      icon: "🌐"
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["iOS & Android Apps", "React Native", "App Store Optimization", "Mobile-First Design"],
      icon: "📱"
    },
    {
      title: "Creative Design",
      description: "Beautiful, user-centered design that combines aesthetics with functionality and great user experience.",
      features: ["UI/UX Design", "Brand Identity", "Design Systems", "Prototyping"],
      icon: "🎨"
    },
    {
      title: "Lead Generation",
      description: "Strategic digital marketing and lead generation campaigns to grow your business and customer base.",
      features: ["SEO Optimization", "Social Media Marketing", "Email Campaigns", "Analytics & Tracking"],
      icon: "📈"
    }
  ]

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to bring your ideas to life. 
            From concept to deployment, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass rounded-3xl p-8 hover-lift group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-gradient">Process</span>
            </h3>
            <p className="text-lg text-gray-300">
              A streamlined approach to bring your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your vision" },
              { step: "02", title: "Strategy", desc: "Planning the approach" },
              { step: "03", title: "Design", desc: "Creating the experience" },
              { step: "04", title: "Development", desc: "Building the solution" },
              { step: "05", title: "Testing", desc: "Ensuring quality" },
              { step: "06", title: "Launch", desc: "Going live" }
            ].map((item, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center group hover-lift">
                <div className="text-2xl font-bold text-gradient mb-3">{item.step}</div>
                <div className="text-white font-semibold mb-2">{item.title}</div>
                <div className="text-gray-400 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 