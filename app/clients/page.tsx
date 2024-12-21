'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FiExternalLink, FiStar } from 'react-icons/fi'
import { useState, useEffect } from 'react'

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

interface Client {
  _id: string;
  name: string;
  role: string;
  image: {
    url: string;
    publicId: string;
  };
  testimonial: string;
  project: {
    title: string;
    link: string;
    description: string;
  };
  rating: number;
  location: string;
  order: number;
  isActive: boolean;
}

export default function Clients() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        const data = await response.json();

        if (data.success) {
          setClients(data.data);
        } else {
          setError('Failed to fetch clients');
        }
      } catch (error) {
        setError('An error occurred while fetching clients: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Our Success Stories
            </h1>
            <p className="text-xl text-gray-400">
              Meet the amazing clients who trusted us with their vision and see how we helped them achieve their goals.
            </p>
          </motion.div>

          {/* Client Testimonials */}
          {loading ? (
            <div className="text-center text-white">Loading clients...</div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <div className="space-y-24 mb-20">
              {clients.map((client, index) => (
                <motion.div
                  key={client._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connection Lines */}
                  <div className="absolute left-1/2 -translate-x-1/2 h-full top-full">
                    <div className="h-24 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
                  </div>

                  <div className="glass-effect p-8 rounded-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Client Info & Testimonial */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-6">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden">
                            <Image
                              src={client.image.url}
                              alt={client.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{client.name}</h3>
                            <p className="text-purple-400">{client.role}</p>
                            <p className="text-sm text-gray-400">{client.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {[...Array(client.rating)].map((_, i) => (
                            <FiStar key={i} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>

                        <blockquote className="text-gray-300 italic border-l-4 border-purple-500/50 pl-4">
                          &quot;{client.testimonial}&quot;
                        </blockquote>
                      </div>

                      {/* Project Showcase */}
                      <div className="glass-effect p-6 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-semibold">Project Showcase</h4>
                          <Link 
                            href={client.project.link}
                            target="_blank"
                            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <span className="mr-2">Visit Project</span>
                            <FiExternalLink />
                          </Link>
                        </div>
                        <h5 className="text-lg font-medium mb-2">{client.project.title}</h5>
                        <p className="text-gray-400">{client.project.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="glass-effect p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Want to Be Our Next Success Story?</h2>
              <p className="text-gray-400 mb-6">
                Join our growing list of satisfied clients and let us help you transform your ideas into reality.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Start Your Project
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
} 