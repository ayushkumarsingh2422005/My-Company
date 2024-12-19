'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Add these interfaces at the top of the file, after the imports
interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  category: string;
}

interface Domain {
  id: string;
  title: string;
  description: string;
  projects: Project[];
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

const domains = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Modern web applications built with cutting-edge technologies.',
    projects: [
      {
        title: 'E-commerce Platform',
        description: 'A full-featured online shopping platform with real-time inventory management.',
        image: '/projects/web/ecommerce.png',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
        link: '#',
        category: 'E-commerce'
      },
      {
        title: 'SaaS Dashboard',
        description: 'Analytics and management dashboard for SaaS businesses.',
        image: '/projects/web/saas.png',
        tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        link: '#',
        category: 'Business'
      },
      {
        title: 'Learning Management System',
        description: 'Interactive platform for online education and course management.',
        image: '/projects/web/lms.png',
        tech: ['Vue.js', 'Django', 'Redis', 'Docker'],
        link: '#',
        category: 'Education'
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications.',
    projects: [
      {
        title: 'Fitness Tracking App',
        description: 'Personal fitness tracker with social features and workout plans.',
        image: '/projects/mobile/image.png',
        tech: ['React Native', 'Firebase', 'Redux', 'Node.js'],
        link: '#',
        category: 'Health & Fitness'
      },
      {
        title: 'Food Delivery App',
        description: 'On-demand food delivery platform with real-time order tracking.',
        image: '/projects/mobile/image.png',
        tech: ['Flutter', 'GraphQL', 'MongoDB', 'Google Maps'],
        link: '#',
        category: 'Food & Beverage'
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Intelligent applications powered by machine learning.',
    projects: [
      {
        title: 'AI Content Generator',
        description: 'Advanced content generation tool using GPT models.',
        image: '/projects/ai/content.png',
        tech: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
        link: '#',
        category: 'Content Creation'
      },
      {
        title: 'Computer Vision System',
        description: 'Real-time object detection and analysis system.',
        image: '/projects/ai/content.png',
        tech: ['PyTorch', 'OpenCV', 'CUDA', 'Docker'],
        link: '#',
        category: 'Computer Vision'
      }
    ]
  }
]

const ProjectCard = ({ project }: { project: Project; index: number }) => {

  return (
    <motion.div 
      className="group backdrop-blur-sm rounded-xl  hover:border-none transition-all"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden rounded-xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-20 mx-4">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">
          <span className="text-sm text-purple-400">{project.category}</span>
          <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 bg-purple-500/10 rounded-full text-purple-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link */}
          <Link 
            href={project.link}
            className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            View Project
            <HiOutlineArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const DomainSection = ({ domain }: { domain: Domain; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section ref={ref} id={domain.id} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 text-gradient">{domain.title}</h2>
        <p className="text-gray-400">{domain.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {domain.projects.map((project: Project, i: number) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

export default function Projects() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Our Projects
            </h1>
            <p className="text-xl text-gray-400">
              Explore our portfolio of successful projects across different domains
            </p>
          </motion.div>

          {/* Domain Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {domains.map((domain) => (
              <Link
                key={domain.id}
                href={`#${domain.id}`}
                onClick={(e) => scrollToSection(e, domain.id)}
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                {domain.title}
              </Link>
            ))}
          </div>

          {/* Domain Sections */}
          {domains.map((domain, index) => (
            <DomainSection key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
} 