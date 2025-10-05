'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiOutlineArrowRight } from 'react-icons/hi'
import type { CSSProperties } from 'react'
import { IconType } from 'react-icons'
import { useEffect, useState } from 'react'
import * as Icons from 'react-icons/fi'
import { useRouter } from 'next/navigation'

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
  order: number;
  isActive: boolean;
  slug: string;
}

// Floating Gradient Orbs
const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
  </div>
)

// Grid Background
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

const ServiceCard = ({ service, slug }: { service: Service, slug: string }) => {
  const Icon = Icons[service.icon as keyof typeof Icons] as IconType;

  if (!Icon) {
    console.warn(`Icon ${service.icon} not found`);
    return null;
  }

  return (
    <motion.div
      className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="h-full p-8">
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r opacity-20 blur-lg"
            style={{
              background: `linear-gradient(to right, var(--tw-gradient-stops))`,
              ['--tw-gradient-from' as string]: service.color.split(' ')[0].split('-')[1],
              ['--tw-gradient-to' as string]: service.color.split(' ')[2]
            } as CSSProperties}
          />
          <Icon 
            className="w-12 h-12 relative z-10 text-purple-500" 
          />
        </div>
        
        {/* Rest of the service card content */}
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-400 mb-6">{service.description}</p>
        
        <div className="space-y-2 mb-6">
          {service.features.map((feature: string) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <motion.a 
          className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
          whileHover={{ x: 5 }}
          href={`/services/${slug}`}
        >
          Learn More
          <HiOutlineArrowRight className="ml-2 w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  )
}

const StatsSection = () => {
  const stats = [
    { value: '30+', label: 'Projects Completed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '5+', label: 'Years Experience' },
    { value: '24/7', label: 'Support' },
  ]

  return (
    <div className="relative glass-effect rounded-2xl p-8 my-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-gradient mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const processSteps = [
  {
    title: "Discovery",
    description: "We dive deep into understanding your business goals, target audience, and project requirements through comprehensive research and analysis.",
    features: [
      "Requirements Gathering",
      "Market Research",
      "User Analysis",
      "Technical Assessment"
    ],
    icon: "🔍"
  },
  {
    title: "Planning",
    description: "Creating a detailed roadmap with clear milestones, technology choices, and design specifications to ensure project success.",
    features: [
      "Project Timeline",
      "Architecture Design",
      "Resource Allocation",
      "Risk Assessment"
    ],
    icon: "📋"
  },
  {
    title: "Development",
    description: "Bringing your vision to life with cutting-edge technologies, following best practices and agile methodologies.",
    features: [
      "Agile Development",
      "Quality Assurance",
      "Regular Updates",
      "Code Reviews"
    ],
    icon: "⚡"
  },
  {
    title: "Launch",
    description: "Carefully orchestrated deployment process ensuring a smooth transition from development to production environment.",
    features: [
      "Performance Testing",
      "User Training",
      "Deployment",
      "Monitoring Setup"
    ],
    icon: "🚀"
  }
]

export default function Services() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();

        if (data.success) {
          setServices(data.data);
        } else {
          setError('Failed to fetch services');
        }
      } catch (error) {
        setError('An error occurred while fetching services: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
                Our Services
              </h1>
              <p className="text-xl text-gray-400">
                Comprehensive digital solutions tailored to transform your ideas into reality.
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center text-white">Loading services...</div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <ServiceCard key={service._id} service={service} slug={service.slug} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4">
          <StatsSection />
        </div>

        {/* Process Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">Our Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A systematic and transparent approach that ensures project success and client satisfaction
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 hidden lg:block -translate-y-1/2" />
              
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-sm font-bold z-10">
                    {index + 1}
                  </div>

                  {/* Card */}
                  <div className="glass-effect p-6 rounded-xl relative z-0 h-full group-hover:border-purple-500/30 transition-all duration-300">
                    {/* Icon */}
                    <div className="text-4xl mb-4">{step.icon}</div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                    
                    {/* Features */}
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Connection Arrow */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                        >
                          <HiOutlineArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 glass-effect" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">Ready to Get Started?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can help you achieve your digital goals with our comprehensive services.
              </p>
              <motion.button
                onClick={() => router.push('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Contact Us Today
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 