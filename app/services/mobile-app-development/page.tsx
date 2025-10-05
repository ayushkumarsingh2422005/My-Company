'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaAndroid, FaApple, FaBell, FaBuilding, FaCamera, FaChartLine, FaCheckCircle, FaCode, FaCog, FaComments, FaCreditCard, FaEye, FaFileAlt, FaFingerprint, FaGamepad, FaGlobe, FaLightbulb, FaLock, FaMapMarkerAlt, FaMicrophone, FaMobileAlt, FaPlug, FaQrcode, FaReact, FaRocket, FaRocket as FaRocketIcon, FaShare, FaShieldAlt, FaStar, FaSync, FaVideo, FaWifi as FaWifiIcon } from 'react-icons/fa'

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

const developmentTypes = [
  {
    title: "Native iOS Development",
    description: "High-performance apps built specifically for iPhone and iPad using Swift and Objective-C",
    icon: FaApple,
    features: ["Swift/Objective-C", "iOS SDK", "Xcode IDE", "App Store Optimization", "Core Data", "Metal Graphics"],
    color: "from-gray-600 to-gray-800"
  },
  {
    title: "Native Android Development",
    description: "Optimized Android apps using Kotlin and Java for superior performance and user experience",
    icon: FaAndroid,
    features: ["Kotlin/Java", "Android SDK", "Android Studio", "Google Play Optimization", "Room Database", "Material Design"],
    color: "from-green-600 to-green-800"
  },
  {
    title: "Cross-Platform Development",
    description: "Single codebase solutions that work seamlessly across iOS and Android platforms",
    icon: FaReact,
    features: ["React Native", "Flutter", "Xamarin", "Ionic", "Code Reusability", "Faster Development"],
    color: "from-blue-600 to-purple-600"
  }
]

const coreFeatures = [
  {
    title: "User Authentication & Security",
    description: "Secure login systems with biometric authentication and multi-factor security",
    icon: FaShieldAlt,
    features: ["Biometric Login", "OAuth Integration", "JWT Tokens", "2FA Support", "Role-based Access", "Data Encryption"]
  },
  {
    title: "Real-time Communication",
    description: "Instant messaging, push notifications, and live updates for enhanced user engagement",
    icon: FaComments,
    features: ["Push Notifications", "In-app Messaging", "Live Chat", "Real-time Updates", "WebSocket Integration", "Offline Sync"]
  },
  {
    title: "Payment Integration",
    description: "Secure payment processing with multiple gateway support and digital wallet integration",
    icon: FaCreditCard,
    features: ["Payment Gateways", "Digital Wallets", "In-app Purchases", "Subscription Management", "Fraud Detection", "PCI Compliance"]
  },
  {
    title: "Location Services",
    description: "GPS tracking, geofencing, and location-based features for enhanced user experience",
    icon: FaMapMarkerAlt,
    features: ["GPS Tracking", "Geofencing", "Maps Integration", "Location Sharing", "Route Optimization", "Offline Maps"]
  },
  {
    title: "Media & Content",
    description: "Rich media support including camera, gallery, video streaming, and file management",
    icon: FaCamera,
    features: ["Camera Integration", "Image Processing", "Video Streaming", "File Management", "Cloud Storage", "Content Sharing"]
  },
  {
    title: "Analytics & Insights",
    description: "Comprehensive analytics and user behavior tracking for data-driven decisions",
    icon: FaChartLine,
    features: ["User Analytics", "Crash Reporting", "Performance Monitoring", "A/B Testing", "Custom Events", "Business Intelligence"]
  }
]

const advancedFeatures = [
  { name: "Offline Functionality", icon: FaWifiIcon },
  { name: "Background Processing", icon: FaSync },
  { name: "Push Notifications", icon: FaBell },
  { name: "Biometric Authentication", icon: FaFingerprint },
  { name: "QR Code Scanner", icon: FaQrcode },
  { name: "Voice Recognition", icon: FaMicrophone },
  { name: "AR/VR Integration", icon: FaEye },
  { name: "Machine Learning", icon: FaCog },
  { name: "IoT Connectivity", icon: FaPlug },
  { name: "Blockchain Integration", icon: FaLock },
  { name: "Social Media Integration", icon: FaShare },
  { name: "Gaming Features", icon: FaGamepad },
  { name: "Video/Audio Streaming", icon: FaVideo },
  { name: "Document Management", icon: FaFileAlt },
  { name: "Multi-language Support", icon: FaGlobe },
  { name: "Dark/Light Theme", icon: FaLightbulb }
]

const pricingTiers = [
  {
    name: "Basic App",
    price: "Starting from ₹35,000",
    duration: "4-6 weeks",
    description: "Perfect for simple apps with core functionality",
    features: [
      "Single Platform (iOS/Android)",
      "Basic UI/UX Design",
      "User Authentication",
      "Simple Data Storage",
      "Basic Push Notifications",
      "App Store Deployment",
      "1 Month Support"
    ],
    icon: FaMobileAlt,
    popular: false,
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "Professional App",
    price: "Starting from ₹75,000",
    duration: "8-12 weeks",
    description: "Feature-rich apps with advanced functionality",
    features: [
      "Cross-Platform Development",
      "Custom UI/UX Design",
      "Advanced Authentication",
      "Real-time Database",
      "Payment Integration",
      "Location Services",
      "Analytics Integration",
      "3 Months Support"
    ],
    icon: FaRocket,
    popular: true,
    color: "from-purple-600 to-pink-600"
  },
  {
    name: "Enterprise App",
    price: "Starting from ₹1,50,000",
    duration: "12-16 weeks",
    description: "Complex enterprise solutions with custom features",
    features: [
      "Multi-Platform Support",
      "Premium UI/UX Design",
      "Enterprise Security",
      "Custom Backend Development",
      "Advanced Integrations",
      "Scalable Architecture",
      "Admin Dashboard",
      "6 Months Support",
      "Custom Features"
    ],
    icon: FaBuilding,
    popular: false,
    color: "from-green-600 to-emerald-600"
  }
]

const developmentProcess = [
  {
    phase: "Discovery & Planning",
    duration: "1-2 weeks",
    description: "Understanding your requirements and creating a detailed project roadmap",
    icon: FaLightbulb,
    activities: ["Requirements Analysis", "Technical Planning", "UI/UX Wireframing", "Project Timeline"]
  },
  {
    phase: "Design & Prototyping",
    duration: "2-3 weeks",
    description: "Creating beautiful, intuitive designs and interactive prototypes",
    icon: FaStar,
    activities: ["UI/UX Design", "Interactive Prototypes", "Design System", "User Testing"]
  },
  {
    phase: "Development",
    duration: "4-12 weeks",
    description: "Building your app with clean, scalable code and best practices",
    icon: FaCode,
    activities: ["Frontend Development", "Backend Development", "API Integration", "Testing"]
  },
  {
    phase: "Testing & Quality Assurance",
    duration: "1-2 weeks",
    description: "Comprehensive testing to ensure your app works flawlessly",
    icon: FaCheckCircle,
    activities: ["Functional Testing", "Performance Testing", "Security Testing", "User Acceptance"]
  },
  {
    phase: "Deployment & Launch",
    duration: "1 week",
    description: "Publishing your app to app stores and ensuring smooth launch",
    icon: FaRocketIcon,
    activities: ["App Store Submission", "Play Store Submission", "Launch Strategy", "Post-launch Support"]
  }
]

const techStack = [
  {
    category: "Frontend Technologies",
    technologies: [
      { name: "React Native", description: "Cross-platform development" },
      { name: "Flutter", description: "Google's UI toolkit" },
      { name: "Swift", description: "iOS native development" },
      { name: "Kotlin", description: "Android native development" },
      { name: "JavaScript/TypeScript", description: "Web technologies" }
    ]
  },
  {
    category: "Backend Technologies",
    technologies: [
      { name: "Node.js", description: "Server-side JavaScript" },
      { name: "Python/Django", description: "Rapid development" },
      { name: "Firebase", description: "Google's backend service" },
      { name: "AWS", description: "Cloud infrastructure" },
      { name: "MongoDB/PostgreSQL", description: "Database solutions" }
    ]
  },
  {
    category: "Tools & Services",
    technologies: [
      { name: "Git/GitHub", description: "Version control" },
      { name: "Docker", description: "Containerization" },
      { name: "CI/CD", description: "Automated deployment" },
      { name: "Analytics", description: "User tracking" },
      { name: "Crashlytics", description: "Error monitoring" }
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

export default function MobileAppDevelopment() {
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
                <span className="text-purple-500 font-mono">Mobile App Development</span>
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
                Professional Mobile
                <br />
                <span className="text-gradient">App Development</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-gray-400 mb-8"
              >
                Transform your ideas into powerful mobile applications. From native iOS and Android apps 
                to cross-platform solutions, we deliver exceptional mobile experiences.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Development Types Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Our Development Expertise
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {developmentTypes.map((type, ) => (
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
                  
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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

        {/* Advanced Features Grid */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Advanced Features & Integrations
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {advancedFeatures.map((feature, ) => (
                <motion.div
                  key={feature.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-4 rounded-lg hover:border-purple-500/30 transition-all duration-300 text-center"
                >
                  <div className="text-2xl mb-2 text-purple-500 flex items-center justify-center">
                    <feature.icon />
                  </div>
                  <span className="text-gray-300 text-xs">{feature.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
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
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {pricingTiers.map((tier, ) => (
                <motion.div
                  key={tier.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className={`relative glass-effect p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-300 ${
                    tier.popular ? 'ring-2 ring-purple-500/50' : ''
                  }`}
                >
                  {tier.popular && (
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
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center text-2xl text-white`}
                    >
                      <tier.icon />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-gray-400 mb-4">{tier.description}</p>
                    <div className="text-3xl font-bold text-gradient mb-2">{tier.price}</div>
                    <p className="text-sm text-gray-500">Estimated: {tier.duration}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
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
                      className={`w-full py-4 rounded-xl font-semibold transition-all bg-gradient-to-r ${tier.color} hover:shadow-lg hover:shadow-purple-500/25`}
                    >
                      Get Started
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
              Ready to Build Your Mobile App?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Let&apos;s discuss your mobile app idea and create a solution that exceeds your expectations. 
              From concept to app store, we&apos;re with you every step of the way.
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
              <Link href="/portfolio">
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
