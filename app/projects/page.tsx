'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { Project } from '@/app/types/project'

interface ApiResponse {
  success: boolean;
  data: Project[];
  error?: string;
}

interface ProjectsByDomain {
  [key: string]: Project[];
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

const DOMAIN_INFO = {
  web: {
    id: 'web',
    title: 'Web Development',
    description: 'Modern web applications built with cutting-edge technologies.',
  },
  mobile: {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications.',
  },
  ai: {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Intelligent applications powered by machine learning.',
  }
} as const;

const ProjectCard = ({ project }: { project: Project; index: number }) => {
  return (
    <motion.div 
      className="group backdrop-blur-sm rounded-xl hover:border-none transition-all"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative h-64 overflow-hidden rounded-xl">
        <Image
          src={project.image.url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative -mt-20 mx-4">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">
          <span className="text-sm text-purple-400">{project.category}</span>
          <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          
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
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

export default function Projects() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const { success, data, error } = await response.json() as ApiResponse;

        if (success && data) {
          // Group projects by domainId
          const projectsByDomain = data.reduce<ProjectsByDomain>((acc, project) => {
            if (!acc[project.domainId]) {
              acc[project.domainId] = [];
            }
            if (project.isActive) {
              acc[project.domainId].push(project);
            }
            return acc;
          }, {});

          // Create domain objects with their respective projects
          const domainData = Object.entries(projectsByDomain).map(([domainId, projects]) => ({
            ...DOMAIN_INFO[domainId as keyof typeof DOMAIN_INFO],
            projects: [...projects].sort((a, b) => a.order - b.order)
          }));

          setDomains(domainData);
        } else {
          setError(error || 'Failed to fetch projects');
        }
      } catch (error) {
        setError('An error occurred while fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 relative">
        <motion.div 
          className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]"
          style={{ y }}
        />
        <GradientOrbs />
        <GridBackground />

        <div className="max-w-7xl mx-auto px-4 relative">
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

          {domains.map((domain, index) => (
            <DomainSection key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
} 