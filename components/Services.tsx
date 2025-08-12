import React from 'react';
import Link from 'next/link';
import FAQ from './FAQ';

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

        {/* Approach Section */}
        <div className="mt-24">
          <div className="text-center">
            <div className="glass rounded-3xl p-12 max-w-4xl mx-auto hover-lift">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our <span className="text-gradient">Approach</span>
              </h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We believe in transparent collaboration and proven methodologies that deliver exceptional creative solutions. 
                Discover our 4-step process that transforms your vision into powerful digital experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/approach"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Explore Our Approach
                </Link>
                <Link
                  href="/rapid-delivery"
                  className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10"
                >
                  Same-Day Delivery
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Services FAQs */}
        <FAQ 
          title="Services & Solutions"
          faqs={[
            {
              question: "What web development technologies do you specialize in?",
              answer: "We specialize in modern web technologies including React, Next.js, Python (Django & FastAPI), and AWS cloud solutions. We choose the best technology stack based on your specific needs, budget, and long-term goals to ensure optimal performance and scalability."
            },
            {
              question: "Do you offer mobile app development?",
              answer: "Yes! We develop both native iOS & Android apps and cross-platform mobile applications using React Native. Our mobile development includes app store optimization, mobile-first design principles, and ensuring exceptional user experiences across all devices."
            },
            {
              question: "What's included in your creative design services?",
              answer: "Our creative design services include UI/UX design, brand identity development, design systems creation, and interactive prototyping. We focus on user-centered design that combines beautiful aesthetics with functional, intuitive user experiences."
            },
            {
              question: "Can you help with cloud infrastructure and DevOps?",
              answer: "Absolutely! We provide AWS infrastructure setup, Docker & Kubernetes deployment, CI/CD pipeline implementation, and cloud migration services. We help businesses scale their applications efficiently while maintaining security and performance."
            },
            {
              question: "What kind of Python solutions do you develop?",
              answer: "We develop backend APIs, data analytics solutions, automation scripts, and machine learning applications using Python. Our expertise includes Django and FastAPI frameworks, perfect for building robust, scalable backend systems."
            },
            {
              question: "Do you offer digital marketing and lead generation?",
              answer: "Yes, we provide comprehensive digital marketing services including SEO optimization, social media marketing, email campaigns, and analytics tracking. Our goal is to help grow your business and customer base through strategic digital marketing efforts."
            },
            {
              question: "How do you ensure the quality of your services?",
              answer: "We maintain high quality through our proven 4-step approach: Discovery & Vision, Creative Strategy, Design & Development, and Launch & Growth. Every project receives personal attention, regular testing, and ongoing support to ensure exceptional results."
            },
            {
              question: "Can you integrate with existing systems and third-party services?",
              answer: "Yes, we specialize in system integration and can connect your new solutions with existing platforms, APIs, and third-party services. We ensure seamless data flow and functionality across all your business systems."
            }
          ]}
        />
      </div>
    </section>
  )
} 