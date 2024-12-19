'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-purple-500">Digi</span>Craft
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#work" className="hover:text-purple-500 transition-colors">
              Our Work
            </Link>
            <Link href="#services" className="hover:text-purple-500 transition-colors">
              Services
            </Link>
            <Link href="#about" className="hover:text-purple-500 transition-colors">
              About
            </Link>
            <Link href="#contact" 
              className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-all hover:shadow-lg hover:shadow-purple-500/25"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-white transition-all"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              <Link href="#work" className="block hover:text-purple-500 transition-colors">
                Our Work
              </Link>
              <Link href="#services" className="block hover:text-purple-500 transition-colors">
                Services
              </Link>
              <Link href="#about" className="block hover:text-purple-500 transition-colors">
                About
              </Link>
              <Link href="#contact" className="block text-purple-500 hover:text-purple-400 transition-colors">
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar 