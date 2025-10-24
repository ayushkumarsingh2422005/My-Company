'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaChartLine, FaCheck, FaCheckCircle, FaCode, FaCrown, FaDesktop, FaGem, FaHandshake, FaLayerGroup, FaLightbulb, FaMagic, FaMobileAlt, FaPaintBrush, FaPalette, FaPencilRuler, FaRocket, FaSearch, FaShieldAlt, FaTrophy, FaUsers } from 'react-icons/fa'

// Add Floating Gradient Orbs
const GradientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
  </div>
)

// Add Grid Background
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

const designServices = [
  {
    title: "UI/UX Design",
    description: "User interface and user experience design for web and mobile applications",
    icon: FaPalette,
    features: ["Wireframing", "Prototyping", "User Research", "Usability Testing", "Design Systems", "Interactive Mockups"],
    color: "from-purple-600 to-pink-600",
    examples: ["Web Applications", "Mobile Apps", "Dashboard Design", "E-commerce UI"]
  },
  {
    title: "Web Design",
    description: "Modern, responsive web design that converts visitors into customers",
    icon: FaDesktop,
    features: ["Responsive Design", "Landing Pages", "Corporate Websites", "E-commerce Design", "Portfolio Sites", "Blog Design"],
    color: "from-blue-600 to-blue-800",
    examples: ["Business Websites", "Portfolio Sites", "Landing Pages", "E-commerce Stores"]
  },
  {
    title: "Mobile App Design",
    description: "Native and cross-platform mobile app design for iOS and Android",
    icon: FaMobileAlt,
    features: ["iOS Design", "Android Design", "Cross-platform UI", "App Icons", "Splash Screens", "Onboarding Flow"],
    color: "from-green-600 to-green-800",
    examples: ["iOS Apps", "Android Apps", "React Native", "Flutter Apps"]
  },
  {
    title: "Brand Identity",
    description: "Complete brand identity design including logo, colors, and visual guidelines",
    icon: FaCrown,
    features: ["Logo Design", "Brand Guidelines", "Color Palette", "Typography", "Business Cards", "Letterhead"],
    color: "from-orange-600 to-red-600",
    examples: ["Logo Design", "Brand Guidelines", "Business Cards", "Marketing Materials"]
  },
  {
    title: "User Research",
    description: "Comprehensive user research to understand your audience and improve user experience",
    icon: FaUsers,
    features: ["User Interviews", "Surveys", "Persona Creation", "User Journey Mapping", "Usability Testing", "Analytics Analysis"],
    color: "from-indigo-600 to-purple-600",
    examples: ["User Personas", "Journey Maps", "Usability Reports", "Research Insights"]
  },
  {
    title: "Design Systems",
    description: "Comprehensive design systems for consistent and scalable design implementation",
    icon: FaLayerGroup,
    features: ["Component Library", "Style Guide", "Design Tokens", "Documentation", "Accessibility Guidelines", "Implementation Guide"],
    color: "from-pink-600 to-purple-600",
    examples: ["Component Libraries", "Style Guides", "Design Tokens", "Documentation"]
  }
]

const coreDesignFeatures = [
  {
    title: "User-Centered Design",
    description: "Design solutions focused on user needs, behaviors, and preferences",
    icon: FaUsers,
    features: ["User Research", "Persona Development", "User Journey Mapping", "Usability Testing", "Accessibility Compliance", "User Feedback Integration"]
  },
  {
    title: "Visual Design",
    description: "Beautiful, modern visual design that captures attention and communicates effectively",
    icon: FaPalette,
    features: ["Color Theory", "Typography", "Layout Design", "Visual Hierarchy", "Icon Design", "Illustration"]
  },
  {
    title: "Interaction Design",
    description: "Intuitive and engaging interactions that guide users through your product",
    icon: FaMagic,
    features: ["Micro-interactions", "Animation Design", "Gesture Design", "Navigation Design", "Feedback Systems", "Loading States"]
  },
  {
    title: "Responsive Design",
    description: "Designs that work perfectly across all devices and screen sizes",
    icon: FaMobileAlt,
    features: ["Mobile-First Approach", "Breakpoint Design", "Touch-Friendly Interface", "Cross-Device Consistency", "Performance Optimization", "Adaptive Layouts"]
  },
  {
    title: "Prototyping & Testing",
    description: "Interactive prototypes and comprehensive testing to validate design decisions",
    icon: FaRocket,
    features: ["Interactive Prototypes", "User Testing", "A/B Testing", "Design Validation", "Iteration Cycles", "Stakeholder Feedback"]
  },
  {
    title: "Design Handoff",
    description: "Seamless handoff to development teams with detailed specifications and assets",
    icon: FaCode,
    features: ["Design Specifications", "Asset Export", "Developer Handoff", "Design Documentation", "Style Guides", "Component Libraries"]
  }
]

const designProcess = [
  {
    phase: "Discovery & Research",
    duration: "1-2 weeks",
    description: "Understanding your business, users, and project requirements through comprehensive research",
    icon: FaSearch,
    activities: ["Stakeholder Interviews", "User Research", "Competitive Analysis", "Project Briefing"]
  },
  {
    phase: "Strategy & Planning",
    duration: "1-2 weeks",
    description: "Creating a strategic foundation for your design project with clear goals and direction",
    icon: FaLightbulb,
    activities: ["User Personas", "User Journey Mapping", "Information Architecture", "Design Strategy"]
  },
  {
    phase: "Wireframing & Prototyping",
    duration: "2-3 weeks",
    description: "Creating low-fidelity wireframes and interactive prototypes to test concepts",
    icon: FaPencilRuler,
    activities: ["Wireframing", "User Flow Design", "Interactive Prototypes", "Usability Testing"]
  },
  {
    phase: "Visual Design",
    duration: "3-4 weeks",
    description: "Creating high-fidelity visual designs with attention to detail and brand consistency",
    icon: FaPaintBrush,
    activities: ["Visual Design", "Brand Integration", "Design System", "Asset Creation"]
  },
  {
    phase: "Testing & Refinement",
    duration: "1-2 weeks",
    description: "Testing designs with real users and refining based on feedback and insights",
    icon: FaCheckCircle,
    activities: ["User Testing", "Design Refinement", "Stakeholder Review", "Final Approval"]
  },
  {
    phase: "Handoff & Support",
    duration: "1 week",
    description: "Delivering final designs and supporting development team through implementation",
    icon: FaHandshake,
    activities: ["Design Handoff", "Asset Delivery", "Developer Support", "Quality Assurance"]
  }
]

const designTools = [
  {
    category: "Design & Prototyping",
    tools: [
      { name: "Figma", description: "Collaborative design tool" },
      { name: "Adobe XD", description: "UX/UI design platform" },
      { name: "Sketch", description: "Digital design toolkit" },
      { name: "InVision", description: "Prototyping and collaboration" },
      { name: "Principle", description: "Animation and interaction design" }
    ]
  },
  {
    category: "Research & Testing",
    tools: [
      { name: "UserTesting", description: "User research platform" },
      { name: "Maze", description: "User testing and research" },
      { name: "Hotjar", description: "User behavior analytics" },
      { name: "Google Analytics", description: "Web analytics service" },
      { name: "Optimal Workshop", description: "User research tools" }
    ]
  },
  {
    category: "Asset Creation",
    tools: [
      { name: "Adobe Illustrator", description: "Vector graphics editor" },
      { name: "Adobe Photoshop", description: "Image editing software" },
      { name: "Adobe After Effects", description: "Motion graphics and animation" },
      { name: "Framer", description: "Interactive design tool" },
      { name: "Lottie", description: "Animation library" }
    ]
  }
]

const pricingPackages = [
  {
    name: "Basic Design",
    price: "₹25,000",
    originalPrice: null,
    description: "Perfect for simple projects and startups",
    features: [
      "Up to 5 Pages/Screens",
      "Basic Wireframing",
      "Visual Design",
      "1 Round of Revisions",
      "Basic Prototype",
      "Design Files",
      "1 Week Delivery"
    ],
    icon: FaPalette,
    popular: false,
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "Professional Design",
    price: "₹50,000",
    originalPrice: null,
    description: "Comprehensive design solution for growing businesses",
    features: [
      "Up to 10 Pages/Screens",
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "3 Rounds of Revisions",
      "Interactive Prototype",
      "Design System",
      "2 Weeks Delivery"
    ],
    icon: FaCrown,
    popular: true,
    color: "from-purple-600 to-pink-600"
  },
  {
    name: "Premium Design",
    price: "₹1,00,000",
    originalPrice: null,
    description: "Complete design solution with advanced features",
    features: [
      "Unlimited Pages/Screens",
      "Comprehensive User Research",
      "Advanced Prototyping",
      "Premium Visual Design",
      "5 Rounds of Revisions",
      "Design System & Guidelines",
      "User Testing",
      "3 Weeks Delivery"
    ],
    icon: FaGem,
    popular: false,
    color: "from-green-600 to-emerald-600"
  },
  {
    name: "Enterprise Design",
    price: "₹2,00,000+",
    originalPrice: null,
    description: "Full-service design solution for large organizations",
    features: [
      "Custom Scope",
      "Dedicated Design Team",
      "Advanced User Research",
      "Complex Prototyping",
      "Enterprise Design System",
      "Unlimited Revisions",
      "Ongoing Support",
      "Custom Timeline"
    ],
    icon: FaTrophy,
    popular: false,
    color: "from-orange-600 to-red-600"
  }
]

const designPrinciples = [
  {
    title: "User-Centered",
    description: "Every design decision is based on user needs and behaviors",
    icon: FaUsers,
    color: "from-blue-500 to-blue-700"
  },
  {
    title: "Accessible",
    description: "Designs that work for everyone, including users with disabilities",
    icon: FaShieldAlt,
    color: "from-green-500 to-green-700"
  },
  {
    title: "Consistent",
    description: "Maintaining visual and functional consistency across all touchpoints",
    icon: FaLayerGroup,
    color: "from-purple-500 to-purple-700"
  },
  {
    title: "Scalable",
    description: "Design systems that grow with your business and product",
    icon: FaRocket,
    color: "from-pink-500 to-pink-700"
  },
  {
    title: "Innovative",
    description: "Pushing boundaries while maintaining usability and functionality",
    icon: FaLightbulb,
    color: "from-yellow-500 to-yellow-700"
  },
  {
    title: "Data-Driven",
    description: "Design decisions backed by research, testing, and analytics",
    icon: FaChartLine,
    color: "from-indigo-500 to-indigo-700"
  }
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleOnHover = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

export default function UIUXDesignServices() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 relative overflow-hidden bg-[#0f0f0f] text-white">
        {/* Background Elements */}
        <GradientOrbs />
        <GridBackground />
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6 flex items-center justify-center gap-2"
              >
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "2.5rem" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="h-0.5 bg-gradient-to-r from-purple-500 to-transparent" 
                />
                <span className="text-purple-500 font-mono">UI/UX Design Services</span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "2.5rem" }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="h-0.5 bg-gradient-to-l from-purple-500 to-transparent" 
                />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
              >
                Exceptional UI/UX
                <br />
                <span className="text-gradient">Design Solutions</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-gray-400 mb-8"
              >
                Transform your ideas into beautiful, user-friendly designs that engage your audience 
                and drive business results. From wireframes to final designs, we create exceptional user experiences.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Design Services Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Our Design Services
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {designServices.map((service, ) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-300"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl text-white`}
                  >
                    <service.icon />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-400 mb-6 text-center">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Services Include:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                          <FaCheck className="text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.examples.map((example, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Core Design Features Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Core Design Capabilities
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {coreDesignFeatures.map((feature, ) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-6 rounded-xl hover:border-purple-500/30 transition-all duration-300"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-4 text-purple-500 flex items-center justify-center"
                  >
                    <feature.icon />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Design Process Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Our Design Process
            </motion.h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />
              
              <div className="space-y-12">
                {designProcess.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-8 relative"
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:flex relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl text-white hover:scale-110 transition-transform">
                        <phase.icon />
                      </div>
                    </div>
                    
                    <div className="flex-1 glass-effect p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-gradient">{phase.phase}</h3>
                        <span className="text-purple-500 font-semibold">{phase.duration}</span>
                      </div>
                      <p className="text-gray-400 mb-4">{phase.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Our Design Principles
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {designPrinciples.map((principle, ) => (
                <motion.div
                  key={principle.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-6 rounded-xl hover:border-purple-500/30 transition-all duration-300 text-center"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${principle.color} flex items-center justify-center text-2xl text-white`}
                  >
                    <principle.icon />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                  <p className="text-gray-400">{principle.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Packages Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Design Packages
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {pricingPackages.map((pkg, ) => (
                <motion.div
                  key={pkg.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className={`relative glass-effect p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-300 ${
                    pkg.popular ? 'ring-2 ring-purple-500/50' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <motion.div 
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center text-2xl text-white`}
                    >
                      <pkg.icon />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-gray-400 mb-4">{pkg.description}</p>
                    <div className="text-4xl font-bold text-gradient mb-2">{pkg.price}</div>
                    <p className="text-sm text-gray-500">*Final pricing depends on requirements</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FaCheck className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/contact">
                    <motion.button
                      variants={scaleOnHover}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full py-4 rounded-xl font-semibold transition-all bg-gradient-to-r ${pkg.color} hover:shadow-lg hover:shadow-purple-500/25`}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Design Tools Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Design Tools & Technologies
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {designTools.map((category, ) => (
                <motion.div
                  key={category.category}
                  variants={fadeInUp}
                  className="glass-effect p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-6 text-center text-gradient">{category.category}</h3>
                  <div className="space-y-4">
                    {category.tools.map((tool, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-black/20 border border-purple-500/20">
                        <h4 className="font-semibold text-white mb-1">{tool.name}</h4>
                        <p className="text-sm text-gray-400">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6 text-gradient"
            >
              Ready to Create Amazing Designs?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Let&apos;s discuss your design needs and create something extraordinary together. 
              From concept to completion, we&apos;re here to bring your vision to life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <motion.button
                  variants={scaleOnHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Start Your Project
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  variants={scaleOnHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 border border-purple-500/30 rounded-full font-semibold hover:bg-purple-500/10 transition-all"
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
