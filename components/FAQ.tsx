import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How long does a typical web development project take?",
    answer: "Our standard projects typically take 2-6 weeks depending on complexity. For our Rapid Delivery service, we guarantee completion within 7 days. We provide detailed timelines during our initial consultation based on your specific requirements."
  },
  {
    question: "What's included in your web development services?",
    answer: "Our comprehensive web development includes responsive design, mobile optimization, SEO setup, content management system integration, performance optimization, security implementation, and 30 days of post-launch support. We also provide ongoing maintenance packages."
  },
  {
    question: "Do you offer ongoing website maintenance and support?",
    answer: "Yes! We offer comprehensive maintenance packages including security updates, content updates, performance monitoring, backup management, and technical support. Our maintenance plans start at $99/month and can be customized to your needs."
  },
  {
    question: "Can you help improve my existing website's performance?",
    answer: "Absolutely! We specialize in website optimization including speed improvements, SEO enhancement, mobile responsiveness, user experience upgrades, and conversion rate optimization. We start with a comprehensive audit to identify improvement opportunities."
  },
  {
    question: "What's your design process like?",
    answer: "Our 4-step approach includes Discovery & Vision (understanding your goals), Creative Strategy (planning and wireframing), Design & Development (iterative creation with your feedback), and Launch & Growth (deployment and optimization). You're involved throughout the entire process."
  },
  {
    question: "Do you work with small businesses or only large companies?",
    answer: "We work with businesses of all sizes! From startups and small local businesses to established enterprises. Our solutions are scalable and we tailor our approach to fit your budget and growth plans."
  },
  {
    question: "What platforms and technologies do you use?",
    answer: "We specialize in modern web technologies including React, Next.js, WordPress, Shopify, and custom solutions. We choose the best technology stack based on your specific needs, budget, and long-term goals."
  },
  {
    question: "How much does a website cost?",
    answer: "Our projects typically range from $2,500 for basic websites to $15,000+ for complex custom solutions. Pricing depends on features, complexity, and timeline. We provide detailed, fixed-price quotes after understanding your requirements."
  },
  {
    question: "Do you provide SEO services?",
    answer: "Yes! SEO is integrated into all our web development projects. We also offer dedicated SEO services including keyword research, content optimization, technical SEO, local SEO, and ongoing SEO management to improve your search rankings."
  },
  {
    question: "Can you help with e-commerce websites?",
    answer: "Absolutely! We build custom e-commerce solutions using platforms like Shopify, WooCommerce, and custom systems. Our e-commerce services include payment integration, inventory management, shipping setup, and conversion optimization."
  }
];

export default function FAQ({ title = "Frequently Asked Questions", faqs = defaultFAQs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Get answers to the most common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transition-transform duration-300 ${
                      openIndex === index ? 'rotate-45' : ''
                    }`}>
                      <span className="text-white text-sm font-bold">+</span>
                    </div>
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-6">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-300 mb-6">
                We'd love to discuss your project and answer any specific questions you might have.
              </p>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 inline-block"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}