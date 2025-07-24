import React from 'react';
import { useState } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'

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
      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          project_type: formData.project,
          message: formData.message,
          to_email: 'prakhar@nandann.com'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      
      console.log('Email sent successfully:', result.text)
      alert('Thank you for your message! We will get back to you soon.')
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        message: ''
      })
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

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-white/10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            {/* Logo */}
            {!logoError ? (
              <Image
                                            src="/images/Nandann-logo-new.png"
                alt="Nandann Creative Agency"
                width={150}
                height={50}
                className="h-12 w-auto brightness-0 invert"
                onError={() => setLogoError(true)}
                style={{
                  filter: 'brightness(0) invert(1)',
                  maxHeight: '48px',
                  width: 'auto'
                }}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-white font-bold text-xl">Nandann Creative Agency</span>
              </div>
            )}
          </div>
          <p className="text-gray-400 mb-6">
            Crafting digital experiences that drive results
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 Nandann Creative Agency. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
} 