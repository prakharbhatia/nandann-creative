import React from 'react';
import { useState } from 'react'
import Image from 'next/image'
import FAQ from './FAQ';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  })

  const [logoError, setLogoError] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    try {
      // Send email using Formspree
      const response = await fetch('https://formspree.io/f/mrblqbgw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          project: formData.project,
          message: formData.message,
        }),
      })

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.')
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          company: '',
          project: '',
          message: ''
        })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      alert('Sorry, there was an error sending your message. Please try again or contact us directly at prakhar@nandann.com')
    }
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Let's discuss your project 
            and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                We're here to help bring your vision to life. Whether you need a 
                custom web application, mobile app, or Python solution, our team 
                is ready to deliver exceptional results.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Email Us</div>
                  <div className="text-gray-300">prakhar@nandann.com</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Why Choose Nandann Creative Agency?</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Free consultation & project estimation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Agile development with regular updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Post-launch support & maintenance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-gray-300">100% client satisfaction guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Project Type</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="" className="bg-white text-gray-800">Select project type</option>
                    <option value="web" className="bg-white text-gray-800">Web Development</option>
                    <option value="mobile" className="bg-white text-gray-800">Mobile App</option>
                    <option value="python" className="bg-white text-gray-800">Python Solutions</option>
                    <option value="design" className="bg-white text-gray-800">UI/UX Design</option>
                    <option value="other" className="bg-white text-gray-800">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/90 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl text-white font-semibold text-lg hover-lift hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    {/* Contact FAQs */}
    <FAQ 
      title="Getting Started"
      faqs={[
        {
          question: "What's the best way to start a project with you?",
          answer: "The best way to start is by filling out our contact form with details about your project, or scheduling a consultation call. We'll discuss your goals, timeline, and budget to determine if we're a good fit for each other."
        },
        {
          question: "How quickly do you respond to project inquiries?",
          answer: "We typically respond to all inquiries within 24 hours during business days. For urgent projects or same-day delivery requests, we often respond within a few hours to discuss your immediate needs."
        },
        {
          question: "What information should I include in my project inquiry?",
          answer: "Please include your project goals, preferred timeline, budget range, any specific requirements or features needed, and examples of websites or applications you admire. The more details you provide, the better we can understand your vision."
        },
        {
          question: "Do you offer free consultations or project estimates?",
          answer: "Yes! We provide free initial consultations to discuss your project requirements and goals. After our consultation, we'll provide a detailed, fixed-price proposal outlining the scope, timeline, and investment required."
        },
        {
          question: "What happens after I submit the contact form?",
          answer: "After you submit the form, we'll review your project details and respond with next steps, which typically include scheduling a consultation call to discuss your requirements in detail and answer any questions you may have."
        },
        {
          question: "Can you work with clients outside your local area?",
          answer: "Absolutely! We work with clients worldwide and have experience managing projects remotely. We use modern communication tools and project management systems to ensure smooth collaboration regardless of location."
        },
        {
          question: "What if I'm not sure exactly what I need?",
          answer: "That's perfectly fine! Many clients come to us with general ideas or business challenges rather than specific technical requirements. Our Discovery & Vision phase is designed to help clarify your needs and identify the best solutions."
        },
        {
          question: "How do you handle project communication and updates?",
          answer: "We believe in transparent communication with regular updates, preview builds, and scheduled check-ins. You'll always know the current project status and what to expect next. We adapt our communication style to your preferences."
        }
      ]}
    />
  )
} 