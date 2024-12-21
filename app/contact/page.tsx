'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FiCheck } from 'react-icons/fi'

// Background Components
const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
  </div>
)

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0" 
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(123,49,255,0.1) 1px, transparent 1px),
                         linear-gradient(rgba(123,49,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '4rem 4rem',
      }}
    />
  </div>
)

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    requirements: ''
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          serviceType: '',
          projectType: '',
          budget: '',
          timeline: '',
          description: '',
          requirements: ''
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.' + error);
    }
  }

  const serviceTypes = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Cloud Solutions',
    'Digital Marketing',
    'Other'
  ]

  const projectTypes = [
    'New Project',
    'Existing Project Modification',
    'Maintenance',
    'Consultation',
    'Other'
  ]

  const budgetRanges = [
    'Less than ₹10,000',
    '₹10,000 - ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹100,000',
    '₹100,000+'
  ]

  const timelines = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Ongoing'
  ]

  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (123) 456-7890"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-2">
              Service Type *
            </label>
            <select
              id="serviceType"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              required
            >
              <option value="">Select a service</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type} className="bg-[#1a1a1a]">
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
              Project Type *
            </label>
            <select
              id="projectType"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              required
            >
              <option value="">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-[#1a1a1a]">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
              Budget Range *
            </label>
            <select
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              required
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range} className="bg-[#1a1a1a]">
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
              Project Timeline *
            </label>
            <select
              id="timeline"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              required
            >
              <option value="">Select timeline</option>
              {timelines.map((timeline) => (
                <option key={timeline} value={timeline} className="bg-[#1a1a1a]">
                  {timeline}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Project Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Please describe your project, goals, and any specific requirements..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
            required
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-2">
            Additional Requirements
          </label>
          <textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            placeholder="Any specific technical requirements, integrations, or preferences..."
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all ${
            status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
        </motion.button>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg text-center ${
              status === 'success' 
                ? 'bg-green-900/30 text-green-400 border border-green-900'
                : 'bg-red-900/30 text-red-400 border border-red-900'
            }`}
          >
            {message}
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default function Contact() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 relative">
        {/* Background Elements */}
        <motion.div 
          className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]"
          style={{ y }}
        />
        <GradientOrbs />
        <GridBackground />
        
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Let&apos;s Work Together
            </h1>
            <p className="text-xl text-gray-400">
              Transform your ideas into reality with our expertise. Get in touch for a free consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <div className="glass-effect p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="glass-effect p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Quick Contact</h2>
                <div className="space-y-6">
                  <a 
                    href="tel:+918299797516" 
                    className="flex items-start p-4 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-gray-400">+91 8299797516</p>
                      <p className="text-sm text-gray-500 mt-1">Available Mon-Sat, 9:00 AM - 6:00 PM IST</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:ayush.mauraya.dev@gmail.com"
                    className="flex items-start p-4 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-400">ayush.mauraya.dev@gmail.com</p>
                      <p className="text-sm text-gray-500 mt-1">We&apos;ll respond within 24 hours</p>
                    </div>
                  </a>

                  <div className="flex items-start p-4 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 group-hover:bg-purple-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-gray-400">Jamui, Chunar</p>
                      <p className="text-gray-400">Mirzapur, Uttar Pradesh</p>
                      <p className="text-gray-400">India - 231304</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="glass-effect p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Why Work With Us?</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                      <FiCheck className="w-4 h-4" />
                    </div>
                    <p className="ml-3 text-gray-300">Competitive rates starting from ₹15,000</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                      <FiCheck className="w-4 h-4" />
                    </div>
                    <p className="ml-3 text-gray-300">Flexible payment plans available</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                      <FiCheck className="w-4 h-4" />
                    </div>
                    <p className="ml-3 text-gray-300">Quick response within 24 hours</p>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                      <FiCheck className="w-4 h-4" />
                    </div>
                    <p className="ml-3 text-gray-300">Free consultation and project estimate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: 'Project Discussion',
                value: 'Schedule a call to discuss your project requirements and get a free consultation.',
                icon: '💡',
              },
              {
                title: 'Support Hours',
                value: 'Monday to Saturday\n9:00 AM - 6:00 PM (IST)',
                icon: '⏰',
              },
              {
                title: 'Response Time',
                value: 'We aim to respond to all inquiries within 24 hours during business days.',
                icon: '⚡',
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="p-8 text-center glass-effect rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 whitespace-pre-line">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}