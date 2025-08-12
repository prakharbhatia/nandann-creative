import React from 'react';

export default function Approach() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Vision',
      description: 'We start by deeply understanding your business goals and creative vision.',
      content: 'Every great project begins with clarity. We dive deep into understanding your brand, target audience, and business objectives. Through collaborative workshops and strategic conversations, we align on your vision and establish a roadmap that transforms ideas into actionable creative solutions. This foundation ensures every decision we make serves your ultimate goals.'
    },
    {
      number: '02',
      title: 'Creative Strategy',
      description: 'We craft a tailored strategy that brings your vision to life.',
      content: 'Based on our discovery insights, we develop a comprehensive creative strategy that resonates with your audience. Our approach combines innovative design thinking with proven marketing principles. We create detailed project blueprints, mood boards, and prototypes that give you a clear preview of the final outcome before development begins.'
    },
    {
      number: '03',
      title: 'Design & Development',
      description: 'We execute with precision, keeping you involved throughout the process.',
      content: 'Our iterative approach ensures transparency and quality at every stage. You receive regular updates, preview builds, and opportunities for feedback. We believe in collaborative creation - your insights combined with our expertise create exceptional results. Our agile methodology allows for refinements while maintaining project momentum and deadlines.'
    },
    {
      number: '04',
      title: 'Launch & Growth',
      description: 'We deliver results and support your continued success.',
      content: 'Launch day is just the beginning of our partnership. We ensure smooth deployment, monitor performance, and provide ongoing optimization. Our post-launch support includes analytics insights, performance tuning, and strategic recommendations for growth. We measure success by your success and remain committed to your long-term objectives.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Approach
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We believe in transparent collaboration and proven methodologies that deliver exceptional creative solutions.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step Container */}
                <div className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Step Number and Title */}
                  <div className="lg:w-1/2 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">{step.number}</span>
                      </div>
                      <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                          {step.title}
                        </h2>
                        <p className="text-lg text-blue-300 mt-2">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="lg:w-1/2">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connecting Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-12">
                    <div className="w-px h-12 bg-gradient-to-b from-blue-400 to-purple-400 opacity-50"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how our approach can bring your creative vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start Your Project
              </a>
              <a
                href="/portfolio"
                className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}