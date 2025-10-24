'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaBrain, FaBullseye, FaChartLine, FaCheck, FaCode, FaCog, FaComments, FaDatabase, FaEye, FaGem, FaHandshake, FaLightbulb, FaPen, FaPlug, FaRobot, FaRocket, FaSearch, FaShieldAlt, FaUsers } from 'react-icons/fa'

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

const aiServices = [
  {
    title: "AI Chatbots",
    description: "Intelligent chatbots that provide 24/7 customer support and automate business processes",
    icon: FaRobot,
    features: ["Natural Language Processing", "Multi-language Support", "Integration with CRM", "Analytics & Insights", "Custom Training", "Voice & Text Support"],
    color: "from-blue-600 to-blue-800",
    examples: ["Customer Support", "Sales Assistant", "Lead Generation", "FAQ Automation"]
  },
  {
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into your existing software and workflows",
    icon: FaPlug,
    features: ["API Integration", "Legacy System Integration", "Real-time Processing", "Custom AI Models", "Data Pipeline Setup", "Performance Optimization"],
    color: "from-green-600 to-green-800",
    examples: ["ERP Integration", "CRM Enhancement", "E-commerce AI", "Business Intelligence"]
  },
  {
    title: "Machine Learning Models",
    description: "Custom ML models tailored to your business needs and data patterns",
    icon: FaBrain,
    features: ["Predictive Analytics", "Data Classification", "Recommendation Systems", "Anomaly Detection", "Model Training", "Performance Monitoring"],
    color: "from-purple-600 to-pink-600",
    examples: ["Sales Forecasting", "Customer Segmentation", "Fraud Detection", "Price Optimization"]
  },
  {
    title: "Computer Vision",
    description: "AI-powered image and video analysis for automated visual processing",
    icon: FaEye,
    features: ["Image Recognition", "Object Detection", "Facial Recognition", "Document Processing", "Quality Control", "Video Analytics"],
    color: "from-orange-600 to-red-600",
    examples: ["Quality Inspection", "Security Systems", "Medical Imaging", "Content Moderation"]
  },
  {
    title: "Natural Language Processing",
    description: "Advanced text analysis and language understanding for business applications",
    icon: FaComments,
    features: ["Text Analysis", "Sentiment Analysis", "Language Translation", "Content Generation", "Document Processing", "Voice Recognition"],
    color: "from-indigo-600 to-purple-600",
    examples: ["Content Analysis", "Customer Feedback", "Document Automation", "Language Translation"]
  },
  {
    title: "AI Automation",
    description: "Intelligent automation solutions to streamline business processes and reduce manual work",
    icon: FaCog,
    features: ["Process Automation", "Workflow Optimization", "Decision Making", "Task Scheduling", "Resource Allocation", "Performance Monitoring"],
    color: "from-pink-600 to-purple-600",
    examples: ["Workflow Automation", "Inventory Management", "Customer Onboarding", "Report Generation"]
  }
]

const coreAICapabilities = [
  {
    title: "Custom AI Development",
    description: "Tailored AI solutions designed specifically for your business requirements",
    icon: FaCode,
    features: ["Custom Algorithm Development", "Model Training", "Data Preprocessing", "Feature Engineering", "Model Optimization", "Deployment & Scaling"]
  },
  {
    title: "Data Analytics & Insights",
    description: "Transform your data into actionable insights using advanced AI and ML techniques",
    icon: FaChartLine,
    features: ["Predictive Analytics", "Data Visualization", "Pattern Recognition", "Trend Analysis", "Business Intelligence", "Real-time Dashboards"]
  },
  {
    title: "AI-Powered Automation",
    description: "Intelligent automation that learns and adapts to improve efficiency over time",
    icon: FaRocket,
    features: ["Process Automation", "Smart Workflows", "Decision Automation", "Resource Optimization", "Performance Monitoring", "Continuous Learning"]
  },
  {
    title: "Integration & Deployment",
    description: "Seamless integration of AI solutions into your existing infrastructure",
    icon: FaPlug,
    features: ["API Development", "Cloud Deployment", "Legacy System Integration", "Real-time Processing", "Scalable Architecture", "Security Implementation"]
  },
  {
    title: "AI Training & Support",
    description: "Comprehensive training and ongoing support for your AI implementations",
    icon: FaUsers,
    features: ["Team Training", "Documentation", "Technical Support", "Model Maintenance", "Performance Monitoring", "Continuous Improvement"]
  },
  {
    title: "AI Strategy & Consulting",
    description: "Strategic guidance to help you leverage AI for maximum business impact",
    icon: FaLightbulb,
    features: ["AI Strategy Development", "Technology Assessment", "ROI Analysis", "Implementation Planning", "Risk Assessment", "Best Practices"]
  }
]

const aiIntegrationProcess = [
  {
    phase: "Discovery & Assessment",
    duration: "1-2 weeks",
    description: "Understanding your business needs and assessing current systems for AI integration",
    icon: FaSearch,
    activities: ["Business Requirements Analysis", "Current System Assessment", "Data Audit", "AI Opportunity Identification"]
  },
  {
    phase: "Strategy & Planning",
    duration: "1-2 weeks",
    description: "Developing a comprehensive AI strategy and implementation roadmap",
    icon: FaLightbulb,
    activities: ["AI Strategy Development", "Technology Selection", "Implementation Roadmap", "Resource Planning"]
  },
  {
    phase: "Data Preparation",
    duration: "2-3 weeks",
    description: "Preparing and cleaning your data for AI model training and deployment",
    icon: FaDatabase,
    activities: ["Data Collection", "Data Cleaning", "Feature Engineering", "Data Validation"]
  },
  {
    phase: "Model Development",
    duration: "3-6 weeks",
    description: "Building and training custom AI models tailored to your specific needs",
    icon: FaBrain,
    activities: ["Model Architecture Design", "Training & Validation", "Performance Optimization", "Testing & Evaluation"]
  },
  {
    phase: "Integration & Deployment",
    duration: "2-4 weeks",
    description: "Integrating AI solutions into your existing systems and deploying to production",
    icon: FaRocket,
    activities: ["System Integration", "API Development", "Cloud Deployment", "Performance Monitoring"]
  },
  {
    phase: "Training & Support",
    duration: "1-2 weeks",
    description: "Training your team and providing ongoing support for AI implementations",
    icon: FaHandshake,
    activities: ["Team Training", "Documentation", "Support Setup", "Performance Monitoring"]
  }
]

const aiTechnologies = [
  {
    category: "AI/ML Frameworks",
    technologies: [
      { name: "TensorFlow", description: "Open-source machine learning platform" },
      { name: "PyTorch", description: "Deep learning framework" },
      { name: "Scikit-learn", description: "Machine learning library" },
      { name: "Keras", description: "High-level neural networks API" },
      { name: "OpenAI GPT", description: "Large language models" }
    ]
  },
  {
    category: "Cloud AI Services",
    technologies: [
      { name: "AWS AI Services", description: "Amazon's AI and ML services" },
      { name: "Google Cloud AI", description: "Google's AI platform" },
      { name: "Azure AI", description: "Microsoft's AI services" },
      { name: "IBM Watson", description: "Enterprise AI platform" },
      { name: "Hugging Face", description: "AI model repository" }
    ]
  },
  {
    category: "Development Tools",
    technologies: [
      { name: "Python", description: "Primary AI development language" },
      { name: "Jupyter Notebooks", description: "Interactive development environment" },
      { name: "Docker", description: "Containerization platform" },
      { name: "Kubernetes", description: "Container orchestration" },
      { name: "MLflow", description: "ML lifecycle management" }
    ]
  }
]

const pricingPackages = [
  {
    name: "AI Chatbot Basic",
    price: "₹45,000",
    originalPrice: null,
    description: "Simple chatbot for customer support and basic automation",
    features: [
      "Basic NLP Processing",
      "FAQ Automation",
      "Multi-channel Support",
      "Basic Analytics",
      "1 Month Training",
      "2 Revisions",
      "1 Week Delivery"
    ],
    icon: FaRobot,
    popular: false,
    color: "from-blue-600 to-blue-800"
  },
  {
    name: "AI Integration Pro",
    price: "₹85,000",
    originalPrice: null,
    description: "Advanced AI integration with existing business systems",
    features: [
      "Custom AI Models",
      "System Integration",
      "Real-time Processing",
      "Advanced Analytics",
      "3 Months Support",
      "3 Revisions",
      "2 Weeks Delivery"
    ],
    icon: FaPlug,
    popular: true,
    color: "from-purple-600 to-pink-600"
  },
  {
    name: "ML Solution Enterprise",
    price: "₹1,50,000",
    originalPrice: null,
    description: "Comprehensive machine learning solution with custom models",
    features: [
      "Custom ML Models",
      "Data Pipeline Setup",
      "Predictive Analytics",
      "Advanced Integration",
      "6 Months Support",
      "5 Revisions",
      "4 Weeks Delivery"
    ],
    icon: FaBrain,
    popular: false,
    color: "from-green-600 to-emerald-600"
  },
  {
    name: "AI Transformation",
    price: "₹3,00,000+",
    originalPrice: null,
    description: "Complete AI transformation with multiple AI solutions",
    features: [
      "Multiple AI Solutions",
      "Custom Development",
      "Advanced Analytics",
      "Enterprise Integration",
      "12 Months Support",
      "Unlimited Revisions",
      "Custom Timeline"
    ],
    icon: FaGem,
    popular: false,
    color: "from-orange-600 to-red-600"
  }
]

const aiUseCases = [
  {
    title: "Customer Service",
    description: "24/7 AI-powered customer support with intelligent responses",
    icon: FaComments,
    color: "from-blue-500 to-blue-700",
    benefits: ["24/7 Availability", "Instant Responses", "Cost Reduction", "Improved Satisfaction"]
  },
  {
    title: "Sales Automation",
    description: "AI-driven sales processes and lead qualification",
    icon: FaBullseye,
    color: "from-green-500 to-green-700",
    benefits: ["Lead Scoring", "Sales Forecasting", "Automated Follow-ups", "Increased Conversion"]
  },
  {
    title: "Data Analysis",
    description: "Advanced analytics and insights from your business data",
    icon: FaChartLine,
    color: "from-purple-500 to-purple-700",
    benefits: ["Predictive Insights", "Pattern Recognition", "Automated Reporting", "Better Decisions"]
  },
  {
    title: "Process Automation",
    description: "Intelligent automation of repetitive business processes",
    icon: FaCog,
    color: "from-pink-500 to-pink-700",
    benefits: ["Reduced Manual Work", "Faster Processing", "Error Reduction", "Cost Savings"]
  },
  {
    title: "Content Generation",
    description: "AI-powered content creation and management",
    icon: FaPen,
    color: "from-yellow-500 to-yellow-700",
    benefits: ["Automated Content", "Consistent Quality", "Time Savings", "Scalable Production"]
  },
  {
    title: "Security & Monitoring",
    description: "AI-enhanced security and real-time monitoring systems",
    icon: FaShieldAlt,
    color: "from-red-500 to-red-700",
    benefits: ["Threat Detection", "Real-time Monitoring", "Automated Responses", "Enhanced Security"]
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

export default function AIMLServices() {
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
                <span className="text-purple-500 font-mono">AI & Machine Learning Services</span>
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
                Intelligent AI
                <br />
                <span className="text-gradient">Solutions for Business</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-gray-400 mb-8"
              >
                Transform your business with AI-powered chatbots, machine learning models, and intelligent automation. 
                From customer service to data analysis, we help you leverage AI for competitive advantage.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* AI Services Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Our AI & ML Services
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {aiServices.map((service, ) => (
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
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Key Features:</h4>
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
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Use Cases:</h4>
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

        {/* Core AI Capabilities Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Core AI Capabilities
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {coreAICapabilities.map((capability, ) => (
                <motion.div
                  key={capability.title}
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
                    <capability.icon />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
                  <p className="text-gray-400 mb-4">{capability.description}</p>
                  <ul className="space-y-1">
                    {capability.features.map((item, idx) => (
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

        {/* AI Use Cases Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              AI Use Cases & Benefits
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {aiUseCases.map((useCase, ) => (
                <motion.div
                  key={useCase.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-6 rounded-xl hover:border-purple-500/30 transition-all duration-300"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${useCase.color} flex items-center justify-center text-2xl text-white`}
                  >
                    <useCase.icon />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-center">{useCase.title}</h3>
                  <p className="text-gray-400 mb-4 text-center">{useCase.description}</p>
                  <div className="space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <FaCheck className="text-green-500 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AI Integration Process Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              AI Integration Process
            </motion.h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />
              
              <div className="space-y-12">
                {aiIntegrationProcess.map((phase, index) => (
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

        {/* Pricing Packages Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              AI/ML Packages
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

        {/* AI Technologies Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              AI Technologies & Tools
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {aiTechnologies.map((category, ) => (
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
              Ready to Transform Your Business with AI?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Let&apos;s discuss how AI can revolutionize your business processes, improve customer experience, 
              and drive growth. From chatbots to machine learning, we&apos;re here to help you succeed.
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
                  Start Your AI Journey
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
                  View AI Projects
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
