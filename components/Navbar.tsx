'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (path: string) => {
    setIsOpen(false)
    if (path.startsWith('/#')) {
      const element = document.querySelector(path.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    if (path.startsWith('/#')) return false
    return pathname.startsWith(path)
  }

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
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`relative group ${
                  isActive(item.path) ? 'text-purple-500' : 'text-gray-300'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => handleNavClick('/#contact')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
              isOpen ? 'transform rotate-45 translate-y-2' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
              isOpen ? 'opacity-0' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${
              isOpen ? 'transform -rotate-45 -translate-y-2' : ''
            }`} />
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
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block py-2 ${
                    isActive(item.path) ? 'text-purple-500' : 'text-gray-300'
                  } hover:text-purple-500 transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => handleNavClick('/#contact')}
                className="block text-purple-500 hover:text-purple-400 transition-colors"
              >
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