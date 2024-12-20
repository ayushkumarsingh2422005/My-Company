'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FiCheck, FiInfo } from 'react-icons/fi'

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

// Pricing Calculator Types
interface Feature {
  id: string;
  name: string;
  description: string;
  priceImpact: number;
  options?: {
    id: string;
    name: string;
    multiplier: number;
  }[];
}

interface TechStack {
  id: string;
  name: string;
  multiplier: number;
}

const features: Feature[] = [
  {
    id: 'platform',
    name: 'Platform Type',
    description: 'Choose your target platform and technology',
    priceImpact: 5000,
    options: [
      { id: 'web', name: 'Web Application', multiplier: 1 },
      { id: 'mobile', name: 'Mobile App (iOS/Android)', multiplier: 1.3 },
      { id: 'both', name: 'Cross-Platform (Web + Mobile)', multiplier: 1.8 }
    ]
  },
  {
    id: 'auth',
    name: 'Authentication & Security',
    description: 'User authentication and security features',
    priceImpact: 3000,
    options: [
      { id: 'basic', name: 'Basic (Email/Password)', multiplier: 1 },
      { id: 'social', name: 'Social & OAuth Integration', multiplier: 1.2 },
      { id: 'advanced', name: 'Enterprise Security (2FA, SSO)', multiplier: 1.5 }
    ]
  },
  {
    id: 'database',
    name: 'Data Management',
    description: 'Database and storage solutions',
    priceImpact: 4000,
    options: [
      { id: 'basic', name: 'Basic Storage & CRUD', multiplier: 1 },
      { id: 'advanced', name: 'Advanced Analytics & Reporting', multiplier: 1.3 },
      { id: 'realtime', name: 'Real-time & Big Data Solutions', multiplier: 1.6 }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Infrastructure',
    description: 'Cloud hosting and infrastructure setup',
    priceImpact: 4500,
    options: [
      { id: 'basic', name: 'Basic Cloud Hosting', multiplier: 1 },
      { id: 'managed', name: 'Managed Services & CDN', multiplier: 1.4 },
      { id: 'enterprise', name: 'Enterprise Cloud Architecture', multiplier: 1.8 }
    ]
  },
  {
    id: 'integration',
    name: 'System Integration',
    description: 'Third-party integrations and APIs',
    priceImpact: 3500,
    options: [
      { id: 'basic', name: 'Basic API Integration', multiplier: 1 },
      { id: 'advanced', name: 'Multiple System Integration', multiplier: 1.4 },
      { id: 'complex', name: 'Enterprise System Orchestra', multiplier: 1.8 }
    ]
  },
  {
    id: 'ui',
    name: 'UI/UX Design',
    description: 'User interface and experience design',
    priceImpact: 5000,
    options: [
      { id: 'basic', name: 'Standard UI Components', multiplier: 1 },
      { id: 'custom', name: 'Custom Design System', multiplier: 1.4 },
      { id: 'advanced', name: 'Premium UI/UX Experience', multiplier: 1.8 }
    ]
  },
  {
    id: 'maintenance',
    name: 'Maintenance & Support',
    description: 'Ongoing maintenance and support services',
    priceImpact: 3000,
    options: [
      { id: 'basic', name: 'Basic Support', multiplier: 1 },
      { id: 'priority', name: 'Priority Support & Updates', multiplier: 1.3 },
      { id: '24x7', name: '24/7 Enterprise Support', multiplier: 1.7 }
    ]
  }
];

const techStacks: TechStack[] = [
  { id: 'basic', name: 'Standard Stack', multiplier: 1 },
  { id: 'modern', name: 'Premium Stack', multiplier: 1.2 },
  { id: 'enterprise', name: 'Enterprise Stack', multiplier: 1.4 }
];

// Add feature descriptions
const featureDetails: Record<string, string> = {
  platform: `Choose your target platform:
• Web Application: Responsive web apps with modern frameworks
• Mobile App: Native iOS/Android development
• Cross-Platform: Unified solution for web and mobile`,

  auth: `Security and authentication features:
• Basic: Secure user authentication system
• Social & OAuth: Integration with major platforms
• Enterprise: Advanced security with SSO, 2FA, role management`,

  database: `Data management solutions:
• Basic: Essential data storage and operations
• Advanced: Complex queries, analytics, data visualization
• Real-time: Big data processing, real-time sync, data warehousing`,

  cloud: `Cloud infrastructure options:
• Basic: Simple cloud deployment and hosting
• Managed: CDN, auto-scaling, managed services
• Enterprise: Multi-region, high availability, disaster recovery`,

  integration: `System integration capabilities:
• Basic: Essential API integrations
• Advanced: Multiple third-party system integration
• Complex: Enterprise-grade system orchestration`,

  ui: `Design and user experience:
• Standard: Clean, functional interface
• Custom: Branded design system and components
• Premium: Advanced animations, micro-interactions`,

  maintenance: `Support and maintenance services:
• Basic: Standard support during business hours
• Priority: Fast response, regular updates
• 24/7: Round-the-clock enterprise support`
};

const PricingCalculator = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, string>>({});
  const [selectedStack, setSelectedStack] = useState<string>('basic');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const calculatePrice = () => {
    let basePrice = 35000; // Competitive base price in INR for a React + Express stack
    let totalMultiplier = techStacks.find(stack => stack.id === selectedStack)?.multiplier || 1;

    // Calculate feature prices
    let featurePrice = 0;
    Object.entries(selectedFeatures).forEach(([featureId, optionId]) => {
      const feature = features.find(f => f.id === featureId);
      const option = feature?.options?.find(o => o.id === optionId);
      if (feature && option) {
        featurePrice += feature.priceImpact * option.multiplier;
      }
    });

    return Math.round((basePrice + featurePrice) * totalMultiplier);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* Tech Stack Selection */}
      <div className="glass-effect p-6 rounded-xl">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">Select Technology Stack</h3>
          <button
            onClick={() => toggleSection('stack')}
            className="text-gray-400 hover:text-purple-500 transition-colors"
            aria-label="More information"
          >
            <FiInfo size={20} />
          </button>
        </div>
        
        <motion.div
          initial={false}
          animate={{ height: expandedSection === 'stack' ? 'auto' : 0 }}
          className="overflow-hidden mb-4"
        >
          <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
            <p className="text-sm text-gray-300 leading-relaxed">
              Choose your preferred technology stack:
              <br /><br />
              • Basic: React.js frontend with Express.js backend
              <br />
              • Modern: Next.js with Node.js and TypeScript
              <br />
              • Enterprise: Full MERN stack with microservices
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techStacks.map((stack) => (
            <button
              key={stack.id}
              onClick={() => setSelectedStack(stack.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedStack === stack.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 hover:border-purple-500/50'
              }`}
            >
              {stack.name}
            </button>
          ))}
        </div>
      </div>

      {/* Features Selection */}
      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature.id} className="glass-effect p-6 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{feature.name}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
              <button
                onClick={() => toggleSection(feature.id)}
                className="text-gray-400 hover:text-purple-500 transition-colors"
                aria-label="More information"
              >
                <FiInfo size={20} />
              </button>
            </div>

            <motion.div
              initial={false}
              animate={{ height: expandedSection === feature.id ? 'auto' : 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                  {featureDetails[feature.id]}
                </div>
                <div className="mt-3 pt-3 border-t border-purple-500/20">
                  <div className="text-sm font-semibold text-purple-400">Price Impact:</div>
                  <div className="text-sm text-gray-400">
                    Base: {formatPrice(feature.priceImpact)}
                    {feature.options?.map(opt => (
                      <div key={opt.id} className="ml-2">
                        • {opt.name}: {opt.multiplier}x multiplier
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {feature.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFeatures(prev => ({
                    ...prev,
                    [feature.id]: option.id
                  }))}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedFeatures[feature.id] === option.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.name}</span>
                    {selectedFeatures[feature.id] === option.id && (
                      <FiCheck className="text-purple-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Price Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect p-8 rounded-xl text-center"
      >
        <h3 className="text-2xl font-bold mb-2">Estimated Project Cost</h3>
        <div className="text-4xl font-bold text-gradient mb-4">
          {formatPrice(calculatePrice())}
        </div>
        <p className="text-gray-400">
          This is an estimated cost based on your selections. 
          Contact us for a detailed quote and customization options.
        </p>
        <button
          onClick={() => window.location.href = '/contact'}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          Get Detailed Quote
        </button>
      </motion.div>
    </div>
  );
};

const serviceCategories = [
  {
    id: 'web',
    icon: '🌐',
    name: 'Web Development',
    description: 'Custom web applications and solutions',
    pricing: [
      {
        name: 'Basic Website',
        price: '15,000',
        duration: '2-3 weeks',
        features: [
          'Responsive Design',
          'Up to 5 Pages',
          'Basic SEO',
          'Contact Form',
          'Basic Analytics'
        ]
      },
      {
        name: 'E-commerce Store',
        price: '45,000',
        duration: '4-6 weeks',
        features: [
          'Product Management',
          'Payment Gateway',
          'Order Management',
          'Customer Dashboard',
          'Inventory System'
        ]
      },
      {
        name: 'Custom Web App',
        price: '75,000+',
        duration: '8-12 weeks',
        features: [
          'Custom Features',
          'User Authentication',
          'Database Integration',
          'API Development',
          'Advanced Analytics'
        ]
      }
    ]
  },
  {
    id: 'mobile',
    icon: '📱',
    name: 'Mobile Development',
    description: 'Native and cross-platform mobile applications',
    pricing: [
      {
        name: 'Basic App',
        price: '35,000',
        duration: '4-6 weeks',
        features: [
          'Single Platform (iOS/Android)',
          'Basic Features',
          'User Authentication',
          'Data Storage',
          'Push Notifications'
        ]
      },
      {
        name: 'Professional App',
        price: '75,000',
        duration: '8-12 weeks',
        features: [
          'Cross-Platform',
          'Custom UI/UX',
          'API Integration',
          'Offline Mode',
          'Analytics Integration'
        ]
      },
      {
        name: 'Enterprise App',
        price: '1,50,000+',
        duration: '12-16 weeks',
        features: [
          'Advanced Features',
          'Complex Integrations',
          'High Security',
          'Scalable Architecture',
          'Custom Backend'
        ]
      }
    ]
  },
  {
    id: 'cloud',
    icon: '☁️',
    name: 'Cloud Solutions',
    description: 'Cloud infrastructure and deployment services',
    pricing: [
      {
        name: 'Basic Setup',
        price: '25,000',
        duration: '1-2 weeks',
        features: [
          'Cloud Server Setup',
          'Basic Security',
          'Domain Configuration',
          'SSL Certificate',
          'Basic Monitoring'
        ]
      },
      {
        name: 'Business Cloud',
        price: '60,000',
        duration: '2-4 weeks',
        features: [
          'Load Balancing',
          'Auto Scaling',
          'Backup System',
          'CDN Setup',
          'Advanced Security'
        ]
      },
      {
        name: 'Enterprise Cloud',
        price: '1,20,000+',
        duration: '4-8 weeks',
        features: [
          'Multi-Region Setup',
          'Disaster Recovery',
          'Custom Security',
          '24/7 Monitoring',
          'Performance Optimization'
        ]
      }
    ]
  },
  {
    id: 'devops',
    icon: '🔄',
    name: 'DevOps & Management',
    description: 'Continuous integration and deployment services',
    pricing: [
      {
        name: 'Basic DevOps',
        price: '30,000',
        duration: '2-3 weeks',
        features: [
          'CI/CD Pipeline',
          'Basic Automation',
          'Version Control',
          'Basic Monitoring',
          'Documentation'
        ]
      },
      {
        name: 'Advanced DevOps',
        price: '70,000',
        duration: '4-6 weeks',
        features: [
          'Container Orchestration',
          'Infrastructure as Code',
          'Advanced Monitoring',
          'Log Management',
          'Security Integration'
        ]
      },
      {
        name: 'Enterprise DevOps',
        price: '1,40,000+',
        duration: '8-12 weeks',
        features: [
          'Custom DevOps Strategy',
          'Multi-Environment Setup',
          'Advanced Security',
          'Custom Automation',
          'Team Training'
        ]
      }
    ]
  }
];

export default function Pricing() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Solution Cost Calculator
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Get an instant estimate for your tech solution - whether it's web, mobile, cloud, or enterprise applications.
            </p>
          </motion.div>

          {/* Budget Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-16 text-center"
          >
            <div className="glass-effect p-8 rounded-xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-4 text-gradient">We Work With All Budgets! 🚀</h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  Whether you're a startup with a tight budget or an enterprise with complex needs, we have solutions for everyone.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-black/20">
                    <div className="text-xl mb-2">💡</div>
                    <h3 className="font-semibold text-purple-400 mb-1">Small Budget?</h3>
                    <p className="text-gray-400">Starting from just ₹15,000 for basic solutions. We'll help you get started!</p>
                  </div>
                  <div className="p-4 rounded-lg bg-black/20">
                    <div className="text-xl mb-2">🌱</div>
                    <h3 className="font-semibold text-purple-400 mb-1">Growing Business?</h3>
                    <p className="text-gray-400">Flexible payment plans and scalable solutions to grow with you.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-black/20">
                    <div className="text-xl mb-2">💼</div>
                    <h3 className="font-semibold text-purple-400 mb-1">Custom Needs?</h3>
                    <p className="text-gray-400">Let's discuss your requirements and find the perfect solution within your budget.</p>
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-400">
                  <p className="mb-2">✨ No project is too small - we're here to help you succeed! ✨</p>
                  <p className="text-xs">
                    Below you'll find our standard pricing for different services, but remember - 
                    we can always customize a solution to fit your budget.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service Categories with Pricing */}
          <div className="space-y-16 mb-20">
            {serviceCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect p-8 rounded-xl"
              >
                <div className="text-center mb-8">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.pricing.map((plan, index) => (
                    <div
                      key={index}
                      className="glass-effect p-6 rounded-xl hover:border-purple-500/50 transition-all border border-white/10"
                    >
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold text-gradient">₹{plan.price}</div>
                        <p className="text-sm text-gray-400 mt-1">Estimated: {plan.duration}</p>
                      </div>
                      <div className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-300">
                            <FiCheck className="text-purple-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => window.location.href = '/contact'}
                        className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                      >
                        Get Started
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Calculator section remains the same */}
          <PricingCalculator />
        </div>
      </main>
      <Footer />
    </>
  )
} 