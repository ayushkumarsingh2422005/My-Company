'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaBell, FaBox, FaBuilding, FaCalculator, FaCalendar, FaChartBar, FaCheck, FaCheckCircle, FaCloud, FaCode, FaCog, FaComments, FaCreditCard, FaDatabase, FaDesktop, FaDocker, FaDownload, FaEye, FaFileAlt, FaFileInvoice, FaFilter, FaGift, FaGlobe, FaImages, FaLaptop, FaLock, FaMobileAlt, FaPalette, FaPlug, FaRocket, FaSearch, FaSearch as FaSearchIcon, FaShare, FaShieldAlt, FaShoppingBag, FaShoppingCart, FaStar, FaSync, FaTruck, FaUpload, FaUser, FaUsers, FaVideo, FaWarehouse, FaWifi } from 'react-icons/fa'

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

const webDevelopmentTypes = [
  {
    title: "Business Websites",
    description: "Professional corporate websites that represent your brand and drive business growth",
    icon: FaBuilding,
    features: ["Responsive Design", "SEO Optimization", "Contact Forms", "Analytics Integration", "Content Management", "Multi-page Layout"],
    color: "from-blue-600 to-blue-800",
    examples: ["Corporate Sites", "Service Pages", "About Us Pages", "Contact Pages"]
  },
  {
    title: "E-commerce Platforms",
    description: "Complete online stores with payment processing, inventory management, and customer features",
    icon: FaShoppingCart,
    features: ["Product Catalog", "Payment Gateway", "Order Management", "Customer Accounts", "Inventory System", "Admin Dashboard"],
    color: "from-green-600 to-green-800",
    examples: ["Online Stores", "Marketplace", "Digital Products", "Subscription Services"]
  },
  {
    title: "Portfolio Websites",
    description: "Showcase your work, skills, and achievements with stunning visual presentations",
    icon: FaPalette,
    features: ["Gallery Display", "Project Showcase", "Resume Integration", "Contact Forms", "Social Media Links", "Blog Integration"],
    color: "from-purple-600 to-pink-600",
    examples: ["Artist Portfolios", "Photography Sites", "Designer Portfolios", "Freelancer Sites"]
  },
  {
    title: "CRM & Management Systems",
    description: "Custom customer relationship management and business process automation solutions",
    icon: FaUsers,
    features: ["Customer Database", "Lead Management", "Task Automation", "Reporting Dashboard", "User Roles", "Data Analytics"],
    color: "from-orange-600 to-red-600",
    examples: ["Sales CRM", "Client Management", "Project Tracking", "Team Collaboration"]
  },
  {
    title: "Web Applications",
    description: "Custom web applications with advanced functionality and user interactions",
    icon: FaCode,
    features: ["User Authentication", "Real-time Updates", "API Integration", "Database Management", "Custom Features", "Scalable Architecture"],
    color: "from-indigo-600 to-purple-600",
    examples: ["SaaS Platforms", "Internal Tools", "Data Management", "Workflow Automation"]
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages designed to capture leads and drive specific actions",
    icon: FaRocket,
    features: ["Conversion Optimization", "A/B Testing", "Lead Capture", "Analytics Tracking", "Mobile Optimization", "Fast Loading"],
    color: "from-pink-600 to-purple-600",
    examples: ["Marketing Campaigns", "Product Launches", "Event Registration", "Lead Generation"]
  }
]

const coreFeatures = [
  {
    title: "Responsive Design",
    description: "Perfect display across all devices - desktop, tablet, and mobile",
    icon: FaMobileAlt,
    features: ["Mobile-First Approach", "Cross-Browser Compatibility", "Touch-Friendly Interface", "Adaptive Layouts", "Performance Optimization", "User Experience Focus"]
  },
  {
    title: "SEO Optimization",
    description: "Built-in SEO features to improve your search engine rankings",
    icon: FaSearch,
    features: ["Meta Tags Optimization", "Schema Markup", "Site Speed Optimization", "Mobile-Friendly Design", "Content Optimization", "Analytics Integration"]
  },
  {
    title: "Content Management",
    description: "Easy-to-use CMS for updating your website content without technical knowledge",
    icon: FaFileAlt,
    features: ["User-Friendly Interface", "Media Management", "Content Scheduling", "Version Control", "Multi-User Access", "Custom Fields"]
  },
  {
    title: "Security & Performance",
    description: "Enterprise-grade security and lightning-fast performance",
    icon: FaShieldAlt,
    features: ["SSL Certificates", "Security Headers", "Regular Backups", "Performance Monitoring", "CDN Integration", "Database Optimization"]
  },
  {
    title: "Analytics & Insights",
    description: "Comprehensive analytics to track your website performance and user behavior",
    icon: FaChartBar,
    features: ["Google Analytics", "User Behavior Tracking", "Conversion Tracking", "Performance Metrics", "Custom Reports", "Real-time Data"]
  },
  {
    title: "Integration Capabilities",
    description: "Seamless integration with third-party services and APIs",
    icon: FaPlug,
    features: ["Payment Gateways", "Social Media APIs", "Email Marketing", "CRM Systems", "E-commerce Platforms", "Custom Integrations"]
  }
]

const allFeatures = [
  { name: "Responsive Design", icon: FaMobileAlt },
  { name: "SEO Optimization", icon: FaSearch },
  { name: "Content Management System", icon: FaFileAlt },
  { name: "User Authentication", icon: FaUser },
  { name: "Database Integration", icon: FaDatabase },
  { name: "Payment Gateway Integration", icon: FaCreditCard },
  { name: "Email Notifications", icon: FaGlobe },
  { name: "Contact Forms", icon: FaComments },
  { name: "Image Gallery", icon: FaImages },
  { name: "Blog System", icon: FaFileAlt },
  { name: "Search Functionality", icon: FaSearchIcon },
  { name: "Social Media Integration", icon: FaShare },
  { name: "Analytics Integration", icon: FaChartBar },
  { name: "Security Features", icon: FaShieldAlt },
  { name: "Performance Optimization", icon: FaRocket },
  { name: "Multi-language Support", icon: FaGlobe },
  { name: "Custom Admin Panel", icon: FaCog },
  { name: "API Development", icon: FaPlug },
  { name: "Third-party Integrations", icon: FaPlug },
  { name: "E-commerce Features", icon: FaShoppingCart },
  { name: "Inventory Management", icon: FaWarehouse },
  { name: "Order Management", icon: FaShoppingBag },
  { name: "Customer Dashboard", icon: FaUser },
  { name: "Product Catalog", icon: FaBox },
  { name: "Shopping Cart", icon: FaShoppingCart },
  { name: "Checkout Process", icon: FaShoppingBag },
  { name: "Payment Processing", icon: FaCreditCard },
  { name: "Shipping Integration", icon: FaTruck },
  { name: "Tax Calculation", icon: FaCalculator },
  { name: "Coupon System", icon: FaGift },
  { name: "Product Reviews", icon: FaStar },
  { name: "Wishlist Functionality", icon: FaStar },
  { name: "Product Comparison", icon: FaEye },
  { name: "Advanced Search & Filters", icon: FaFilter },
  { name: "Product Variations", icon: FaCog },
  { name: "Inventory Tracking", icon: FaWarehouse },
  { name: "Order Tracking", icon: FaTruck },
  { name: "Invoice Generation", icon: FaFileInvoice },
  { name: "Reporting Dashboard", icon: FaChartBar },
  { name: "User Roles & Permissions", icon: FaLock },
  { name: "Data Export/Import", icon: FaUpload },
  { name: "Backup & Recovery", icon: FaDownload },
  { name: "SSL Certificate", icon: FaShieldAlt },
  { name: "CDN Integration", icon: FaWifi },
  { name: "Caching System", icon: FaSync },
  { name: "Database Optimization", icon: FaDatabase },
  { name: "Code Optimization", icon: FaCode },
  { name: "Mobile App Integration", icon: FaMobileAlt },
  { name: "Progressive Web App", icon: FaRocket },
  { name: "Offline Functionality", icon: FaWifi },
  { name: "Push Notifications", icon: FaBell },
  { name: "Real-time Updates", icon: FaSync },
  { name: "Chat Integration", icon: FaComments },
  { name: "Video Integration", icon: FaVideo },
  { name: "Document Management", icon: FaFileAlt },
  { name: "Calendar Integration", icon: FaCalendar },
  { name: "Booking System", icon: FaCalendar },
  { name: "Event Management", icon: FaCalendar },
  { name: "Newsletter System", icon: FaGlobe },
  { name: "Social Login", icon: FaShare },
  { name: "Two-Factor Authentication", icon: FaShieldAlt },
  { name: "Custom Themes", icon: FaPalette },
  { name: "Widget System", icon: FaCog },
  { name: "Plugin Architecture", icon: FaPlug },
  { name: "Webhook Support", icon: FaPlug },
  { name: "REST API", icon: FaCode },
  { name: "GraphQL API", icon: FaCode },
  { name: "Microservices Architecture", icon: FaBuilding },
  { name: "Cloud Deployment", icon: FaCloud },
  { name: "Docker Support", icon: FaDocker },
  { name: "CI/CD Pipeline", icon: FaSync },
  { name: "Version Control", icon: FaCode },
  { name: "Testing Suite", icon: FaCheck },
  { name: "Documentation", icon: FaFileAlt },
  { name: "Training & Support", icon: FaUsers }
]

const pricingPackages = [
  {
    name: "Basic Website",
    price: "₹15,000",
    originalPrice: null,
    description: "Perfect for small businesses and personal websites",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Basic SEO Setup",
      "Contact Form",
      "Basic Analytics",
      "1 Month Support",
      "2 Revisions",
      "Standard Design"
    ],
    icon: FaDesktop,
    popular: false,
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "Professional Website",
    price: "₹35,000",
    originalPrice: null,
    description: "Ideal for growing businesses with advanced features",
    features: [
      "Up to 10 Pages",
      "Custom Design",
      "Advanced SEO",
      "Content Management System",
      "User Authentication",
      "Database Integration",
      "3 Months Support",
      "3 Revisions",
      "Premium Features"
    ],
    icon: FaLaptop,
    popular: true,
    color: "from-purple-600 to-pink-600"
  },
  {
    name: "E-commerce Store",
    price: "₹75,000",
    originalPrice: null,
    description: "Complete online store with all e-commerce features",
    features: [
      "Unlimited Pages",
      "Product Management",
      "Payment Gateway",
      "Order Management",
      "Customer Dashboard",
      "Inventory System",
      "6 Months Support",
      "5 Revisions",
      "Advanced Analytics"
    ],
    icon: FaShoppingCart,
    popular: false,
    color: "from-green-600 to-emerald-600"
  },
  {
    name: "Custom Web Application",
    price: "₹1,50,000+",
    originalPrice: null,
    description: "Fully customized web applications with unique features",
    features: [
      "Custom Development",
      "Advanced Features",
      "API Integration",
      "Scalable Architecture",
      "Admin Dashboard",
      "Real-time Features",
      "12 Months Support",
      "Unlimited Revisions",
      "Enterprise Features"
    ],
    icon: FaCode,
    popular: false,
    color: "from-orange-600 to-red-600"
  }
]

const developmentProcess = [
  {
    phase: "Discovery & Planning",
    duration: "1-2 weeks",
    description: "Understanding your requirements and creating a detailed project roadmap",
    icon: FaEye,
    activities: ["Requirements Analysis", "Technical Planning", "UI/UX Wireframing", "Project Timeline"]
  },
  {
    phase: "Design & Prototyping",
    duration: "2-3 weeks",
    description: "Creating beautiful, intuitive designs and interactive prototypes",
    icon: FaPalette,
    activities: ["UI/UX Design", "Interactive Prototypes", "Design System", "Client Approval"]
  },
  {
    phase: "Development",
    duration: "3-8 weeks",
    description: "Building your website with clean, scalable code and best practices",
    icon: FaCode,
    activities: ["Frontend Development", "Backend Development", "Database Setup", "Integration"]
  },
  {
    phase: "Testing & Quality Assurance",
    duration: "1-2 weeks",
    description: "Comprehensive testing to ensure your website works flawlessly",
    icon: FaCheckCircle,
    activities: ["Functional Testing", "Performance Testing", "Security Testing", "Cross-browser Testing"]
  },
  {
    phase: "Deployment & Launch",
    duration: "1 week",
    description: "Publishing your website and ensuring smooth launch",
    icon: FaRocket,
    activities: ["Domain Setup", "Hosting Configuration", "SSL Installation", "Go Live"]
  }
]

const techStack = [
  {
    category: "Frontend Technologies",
    technologies: [
      { name: "React.js", description: "Modern JavaScript library" },
      { name: "Next.js", description: "React framework for production" },
      { name: "Vue.js", description: "Progressive JavaScript framework" },
      { name: "Angular", description: "TypeScript-based framework" },
      { name: "HTML5/CSS3", description: "Modern web standards" }
    ]
  },
  {
    category: "Backend Technologies",
    technologies: [
      { name: "Node.js", description: "Server-side JavaScript" },
      { name: "Python/Django", description: "Rapid development framework" },
      { name: "PHP/Laravel", description: "Popular web framework" },
      { name: "Express.js", description: "Minimal Node.js framework" },
      { name: "ASP.NET", description: "Microsoft web framework" }
    ]
  },
  {
    category: "Database & Cloud",
    technologies: [
      { name: "MongoDB", description: "NoSQL database" },
      { name: "PostgreSQL", description: "Relational database" },
      { name: "MySQL", description: "Popular SQL database" },
      { name: "AWS", description: "Cloud infrastructure" },
      { name: "Firebase", description: "Google's backend service" }
    ]
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

export default function WebDevelopmentServices() {
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
                <span className="text-purple-500 font-mono">Web Development Services</span>
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
                Professional Web
                <br />
                <span className="text-gradient">Development Solutions</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-gray-400 mb-8"
              >
                From simple business websites to complex web applications, we create digital solutions 
                that drive your business forward. Portfolio sites, CRM systems, e-commerce platforms, and more.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Web Development Types Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Our Web Development Expertise
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {webDevelopmentTypes.map((type, ) => (
                <motion.div
                  key={type.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="glass-effect p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-300"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center text-2xl text-white`}
                  >
                    <type.icon />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">{type.title}</h3>
                  <p className="text-gray-400 mb-6 text-center">{type.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {type.features.map((feature, idx) => (
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
                      {type.examples.map((example, idx) => (
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

        {/* Core Features Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Core Features & Capabilities
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {coreFeatures.map((feature, ) => (
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

        {/* Complete Features List */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Complete Feature Set
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {allFeatures.map((feature, ) => (
                <motion.div
                  key={feature.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-4 rounded-lg hover:border-purple-500/30 transition-all duration-300 flex items-center gap-3"
                >
                  <div className="text-purple-500 flex-shrink-0">
                    <feature.icon />
                  </div>
                  <span className="text-gray-300 text-xs">{feature.name}</span>
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
              Development Packages
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
                  
                  <Link href="/pricing">
                    <motion.button
                      variants={scaleOnHover}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full py-4 rounded-xl font-semibold transition-all bg-gradient-to-r ${pkg.color} hover:shadow-lg hover:shadow-purple-500/25`}
                    >
                      View Details
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Development Process Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Our Development Process
            </motion.h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />
              
              <div className="space-y-12">
                {developmentProcess.map((phase, index) => (
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

        {/* Technology Stack Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Technology Stack
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {techStack.map((category, ) => (
                <motion.div
                  key={category.category}
                  variants={fadeInUp}
                  className="glass-effect p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-6 text-center text-gradient">{category.category}</h3>
                  <div className="space-y-4">
                    {category.technologies.map((tech, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-black/20 border border-purple-500/20">
                        <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
                        <p className="text-sm text-gray-400">{tech.description}</p>
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
              Ready to Build Your Website?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Let&apos;s discuss your web development needs and create a solution that drives your business forward. 
              From simple websites to complex applications, we&apos;re here to help.
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
              <Link href="/pricing">
                <motion.button
                  variants={scaleOnHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 border border-purple-500/30 rounded-full font-semibold hover:bg-purple-500/10 transition-all"
                >
                  View Pricing
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
