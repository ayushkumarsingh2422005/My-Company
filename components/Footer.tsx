'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram 
} from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later: ' + error);
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-2xl font-bold mb-6 block">
              <span className="text-purple-500">Digi</span>Craft
            </Link>
            <p className="text-gray-400 mb-6">
              Crafting digital experiences that inspire, innovate, and impact.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <FaLinkedinIn size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <FaInstagram size={24} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['About', 'Services', 'Projects', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                'Web Development',
                'Mobile Apps',
                'UI/UX Design',
                'Cloud Solutions',
                'Digital Marketing'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and insights.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none transition-colors ${
                    status === 'error' 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : status === 'success'
                      ? 'border-green-500/50 focus:border-green-500'
                      : 'border-purple-500/20 focus:border-purple-500'
                  }`}
                  required
                />
                {status === 'loading' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all ${
                  status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <div
                  className={`text-sm ${
                    status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2024 DigiCraft. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-purple-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-purple-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-purple-500 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 