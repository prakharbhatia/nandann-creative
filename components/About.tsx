import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from './FAQ';

export default function About() {
  const coreValues = [
    "Quality-Driven",
    "Client-Focused", 
    "Innovation-Led",
    "Results-Oriented",
    "Transparency-First"
  ];

  const stats = [
    { number: "16+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nandann Creative Agency
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A passionate digital creative consultancy founded by Prakhar Bhatia, specializing in transforming innovative ideas into powerful digital experiences.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                <span className="text-blue-300 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <Image
                    src="/images/prakhar.jpg"
                    alt="Prakhar Bhatia - Founder of Nandann Creative Agency"
                    width={400}
                    height={500}
                    className="rounded-2xl w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  About the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Founder</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    I founded Nandann Creative Agency with a clear vision: to create digital solutions that don't just look good, but deliver real business value. With over 16 years in the industry, I've learned that the best results come from truly understanding each client's unique challenges and goals.
                  </p>
                  <p>
                    My approach combines technical expertise with creative problem-solving. Whether it's a startup needing their first website or an established business requiring complex automation, I believe in building lasting partnerships, not just completing projects.
                  </p>
                  <p>
                    At Nandann, we don't believe in unnecessary complexity or inflated timelines. Our focus is on efficient, high-quality delivery that gets your business moving forward quickly. Every project receives my personal attention, ensuring the final result exceeds expectations.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Philosophy</span>
            </h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold text-blue-300 mb-4">AI-Enhanced Development</h4>
                <p className="text-gray-300 leading-relaxed">
                  We leverage cutting-edge AI tools to accelerate development cycles, perform comprehensive performance audits, and ensure optimal code quality. This allows us to deliver faster results without compromising on excellence, giving you competitive advantages through efficient, modern development practices.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-blue-300 mb-4">Transparent Communication</h4>
                <p className="text-gray-300 leading-relaxed">
                  No technical jargon, no hidden surprises. We believe in clear, honest communication throughout every project. You'll always know exactly where things stand and what to expect next.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-blue-300 mb-4">Future-Focused Solutions</h4>
                <p className="text-gray-300 leading-relaxed">
                  Technology evolves rapidly, and so do business needs. We build solutions that aren't just perfect for today, but adaptable for tomorrow's challenges and opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can bring your digital vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start a Conversation
              </Link>
              <Link
                href="/portfolio"
                className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About FAQs */}
      <FAQ 
        title="About Nandann Creative"
        faqs={[
          {
            question: "Who is Prakhar Bhatia and what's his background?",
            answer: "Prakhar Bhatia is the founder of Nandann Creative Agency with over 16 years of experience in digital development and design. He specializes in creating digital solutions that combine technical expertise with creative problem-solving, focusing on building lasting partnerships with clients rather than just completing projects."
          },
          {
            question: "What makes Nandann Creative Agency different from other agencies?",
            answer: "We differentiate ourselves through AI-enhanced development practices that accelerate delivery while maintaining exceptional quality. Every project receives hands-on involvement from our founder with 16+ years of experience. We leverage modern tools for performance audits and efficient development, ensuring you get cutting-edge solutions delivered faster."
          },
          {
            question: "What types of clients do you work with?",
            answer: "We work with businesses of all sizes, from startups needing their first website to established companies requiring complex automation solutions. Our approach is to understand each client's unique challenges and goals, whether you're a small business or a growing enterprise."
          },
          {
            question: "What is your company philosophy?",
            answer: "Our philosophy centers on three key pillars: AI-Enhanced Development (leveraging cutting-edge tools for faster delivery and performance optimization), Transparent Communication (clear, honest updates without technical jargon), and Future-Focused Solutions (building adaptable technology that grows with your business)."
          },
          {
            question: "How hands-on is the founder in projects?",
            answer: "Prakhar Bhatia is personally involved in every project to ensure the final result exceeds expectations. This hands-on approach allows us to maintain high quality standards and ensures that each client receives the expertise and attention their project deserves."
          },
          {
            question: "Where is Nandann Creative Agency located?",
            answer: "While we operate with a global perspective serving clients worldwide, we maintain a focused approach that allows for direct communication and personalized service regardless of location. We believe in building strong relationships with clients no matter where they're located."
          }
        ]}
      />
    </div>
  )
} 