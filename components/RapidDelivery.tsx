import React from 'react';

export default function RapidDelivery() {
  const features = [
    'Priority project queue - your work moves to the front',
    'Daily progress updates with visual previews',
    'Real-time collaboration through our project portal',
    'Dedicated project manager for seamless communication',
    'Quality assurance testing before every delivery',
    'Mobile-responsive design guaranteed'
  ];

  const workflow = [
    {
      step: '1',
      title: 'Project Brief',
      description: 'Submit your requirements through our streamlined intake process.'
    },
    {
      step: '2',
      title: 'Rapid Planning',
      description: 'We analyze, strategize, and provide delivery timeline within 2 hours.'
    },
    {
      step: '3',
      title: 'Fast-Track Development',
      description: 'Our dedicated team begins immediate development with daily check-ins.'
    },
    {
      step: '4',
      title: 'Quality Review',
      description: 'Thorough testing and refinements before handoff.'
    },
    {
      step: '5',
      title: 'Lightning Launch',
      description: 'Your project goes live with ongoing support and monitoring.'
    }
  ];

  const testimonial = {
    quote: "Nandann Creative delivered our complete website redesign in just 5 days. The quality exceeded our expectations and the communication was flawless throughout the entire process.",
    author: "Sarah Chen",
    company: "TechStart Solutions",
    results: [
      { metric: "Website Speed", before: "3.2s load time", after: "0.8s load time" },
      { metric: "Conversion Rate", before: "2.1%", after: "4.7%" },
      { metric: "Mobile Experience", before: "Poor (42/100)", after: "Excellent (96/100)" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lightning-Fast Creative Solutions
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Premium design and development delivered in days, not months. For brands that can't wait for excellence.
            </p>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-lg text-blue-200 font-semibold">
                ⚡ 7-day delivery guarantee • 📱 Mobile-first design • 🔧 Ongoing support included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              Why Speed Matters for Your Business
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-400 text-2xl">⏰</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Time is Revenue</h3>
                <p className="text-gray-300">Every day without your new website or campaign is potential revenue lost to competitors.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-400 text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Market Timing</h3>
                <p className="text-gray-300">Launch windows and seasonal opportunities won't wait for slow development cycles.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Competitive Edge</h3>
                <p className="text-gray-300">Rapid deployment means you're first to market while others are still planning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            What's Included in Every Rapid Delivery Project
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-300 text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              Real Results: TechStart Solutions
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <blockquote className="text-xl text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">SC</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Measurable Impact</h3>
                {testimonial.results.map((result, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-2">{result.metric}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-300">Before: {result.before}</span>
                      <span className="text-green-300">After: {result.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Our Lightning-Fast Process
          </h2>
          <div className="space-y-8">
            {workflow.map((item, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-bold">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block w-px h-12 bg-gradient-to-b from-blue-400 to-purple-400 opacity-50 ml-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Launch at Lightning Speed?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't let slow development cycles hold back your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start Rapid Delivery Project
              </a>
              <a
                href="/approach"
                className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10"
              >
                Learn Our Approach
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              🔒 7-day delivery guarantee • 🎯 Fixed pricing • 📞 Direct access to your team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}