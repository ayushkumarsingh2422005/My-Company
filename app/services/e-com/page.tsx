'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes, FaShoppingCart, FaRocket, FaCrown, FaBuilding, FaUsers, FaChartLine, FaMobileAlt, FaCreditCard, FaSearch, FaFilter, FaBox, FaFileInvoice, FaGift, FaWarehouse, FaUser, FaDownload, FaCog, FaChartBar, FaSearch as FaSearchIcon, FaPlug, FaStar, FaTruck, FaCalculator, FaUpload, FaImages, FaShoppingBag, FaPlus, FaEye, FaComments, FaGlobe } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

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

const pricingPackages = [
  {
    name: "Premium Package",
    price: "₹18,499",
    originalPrice: null,
    description: "Perfect for small to medium businesses",
    features: [
      "Domain & Hosting",
      "SSL Certificate",
      "International Selling",
      "SEO Tools",
      "Unlimited Products & Categories",
      "1150+ Features",
      "5 Working Days Delivery",
      "2 Set Revisions",
      "Normal Menu",
      "Premium Design"
    ],
    icon: FaCrown,
    popular: false,
    color: "from-purple-600 to-pink-600"
  },
  {
    name: "Advanced Package",
    price: "₹31,999",
    originalPrice: null,
    description: "Ideal for growing businesses",
    features: [
      "Domain & Hosting",
      "SSL Certificate", 
      "International Selling",
      "SEO Tools",
      "Unlimited Products & Categories",
      "2000+ Features",
      "10 Working Days Delivery",
      "3 Set Revisions",
      "Multi Vendor Menu",
      "Premium Design"
    ],
    icon: FaRocket,
    popular: true,
    color: "from-pink-600 to-purple-600"
  }
]

const coreFeatures = [
  {
    title: "Mobile-Friendly",
    description: "Responsive design that works perfectly on all devices",
    icon: FaMobileAlt
  },
  {
    title: "Payment Gateways",
    description: "Multiple secure payment options for your customers",
    icon: FaCreditCard
  },
  {
    title: "Product Management",
    description: "Easy product catalog management with variations",
    icon: FaBox
  },
  {
    title: "Order Management",
    description: "Complete order tracking and management system",
    icon: FaShoppingCart
  },
  {
    title: "Inventory Management",
    description: "Real-time inventory tracking and alerts",
    icon: FaWarehouse
  },
  {
    title: "SEO Optimization",
    description: "Built-in SEO tools for better search rankings",
    icon: FaSearchIcon
  }
]

const allFeatures = [
  { name: "Mobile-Friendly", icon: FaMobileAlt },
  { name: "Payment Gateways", icon: FaCreditCard },
  { name: "Email Notifications", icon: FaGlobe },
  { name: "Cart Page", icon: FaShoppingCart },
  { name: "Checkout Page", icon: FaShoppingBag },
  { name: "Product Search", icon: FaSearch },
  { name: "Product Filtering and Sorting", icon: FaFilter },
  { name: "Product Management", icon: FaBox },
  { name: "Order Management", icon: FaShoppingCart },
  { name: "PDF Invoice", icon: FaFileInvoice },
  { name: "Packaging Slip", icon: FaFileInvoice },
  { name: "Coupon Codes and Discount", icon: FaGift },
  { name: "Inventory Management", icon: FaWarehouse },
  { name: "Customer Accounts", icon: FaUser },
  { name: "Product Variation", icon: FaCog },
  { name: "Downloadable Product", icon: FaDownload },
  { name: "Product Attributes", icon: FaCog },
  { name: "Reporting and Analytics", icon: FaChartBar },
  { name: "SEO Optimization", icon: FaSearchIcon },
  { name: "Customization Capability", icon: FaCog },
  { name: "Extensions and Integrations", icon: FaPlug },
  { name: "Product Reviews", icon: FaStar },
  { name: "Order Notes", icon: FaComments },
  { name: "Shipping Options", icon: FaTruck },
  { name: "Tax Calculation", icon: FaCalculator },
  { name: "Product Import/Export", icon: FaUpload },
  { name: "Product Gallery", icon: FaImages },
  { name: "Guest Checkout", icon: FaShoppingBag },
  { name: "Create Order From Admin", icon: FaPlus },
  { name: "Rest API & Webhooks", icon: FaPlug },
  { name: "Customer Reviews Moderation", icon: FaEye }
]

const enterpriseCriteria = [
  {
    title: "Expected Sales",
    value: "More than 10 Lakh per month",
    icon: FaChartLine
  },
  {
    title: "Turn Over", 
    value: "More than 20 Lakh per month",
    icon: FaBuilding
  },
  {
    title: "Team Size",
    value: "More than 50+ Employees",
    icon: FaUsers
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

export default function ECommerceServices() {
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
                <span className="text-purple-500 font-mono">E-Commerce Solutions</span>
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
                Professional E-Commerce
                <br />
                <span className="text-gradient">Web Solutions</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-gray-400 mb-8"
              >
                Transform your business with our comprehensive e-commerce solutions. 
                From premium packages to enterprise solutions, we've got you covered.
              </motion.p>
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
              Choose Your Package
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {pricingPackages.map((pkg, index) => (
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
                    <div className="text-4xl font-bold text-gradient mb-2">Starting from {pkg.price}</div>
                    <p className="text-sm text-gray-500 mb-4">*Final pricing depends on requirements</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FaCheck className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="https://marketplace.digicraft.one/marketplace" target="_blank" rel="noopener noreferrer">
                    <motion.button
                      variants={scaleOnHover}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className={`w-full py-4 rounded-xl font-semibold transition-all bg-gradient-to-r ${pkg.color} hover:shadow-lg hover:shadow-purple-500/25`}
                    >
                      Explore Details
                    </motion.button>
                  </Link>
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
              Core Features
            </motion.h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-6 rounded-xl text-center hover:border-purple-500/30 transition-all duration-300"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-4 text-purple-500 flex items-center justify-center"
                  >
                    <feature.icon />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {allFeatures.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-4 rounded-lg hover:border-purple-500/30 transition-all duration-300 flex items-center gap-3"
                >
                  <div className="text-purple-500 flex-shrink-0">
                    <feature.icon />
                  </div>
                  <span className="text-gray-300 text-sm">{feature.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mobile App Integration Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-16 text-center text-gradient"
            >
              Mobile App Integration
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-effect p-12 rounded-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl text-white"
                  >
                    <FaMobileAlt />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gradient">What Happens When You Add Mobile App?</h3>
                  <p className="text-gray-400 mb-6">
                    When you choose to include a mobile app with your e-commerce solution, you get a complete 
                    omnichannel experience that maximizes your business potential.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Unified Dashboard</h4>
                        <p className="text-gray-400 text-sm">Single admin panel to manage both web and mobile orders</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Cross-Platform Sync</h4>
                        <p className="text-gray-400 text-sm">Real-time synchronization between web and mobile platforms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Push Notifications</h4>
                        <p className="text-gray-400 text-sm">Direct customer engagement through mobile notifications</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheck className="text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">Enhanced User Experience</h4>
                        <p className="text-gray-400 text-sm">Native mobile features like camera, GPS, and offline access</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-bold mb-3 text-purple-400">📱 Mobile App Features</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Native iOS & Android apps</li>
                      <li>• Offline browsing capability</li>
                      <li>• Push notifications for offers</li>
                      <li>• Barcode scanning for products</li>
                      <li>• Location-based services</li>
                      <li>• Social media integration</li>
                      <li>• In-app chat support</li>
                      <li>• Biometric authentication</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-bold mb-3 text-pink-400">💰 Pricing Impact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Web Only:</span>
                        <span className="text-white">Starting from ₹18,499</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Web + Mobile App:</span>
                        <span className="text-green-400 font-semibold">+₹25,000 - ₹40,000</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-white font-semibold">Total Package:</span>
                          <span className="text-purple-400 font-bold">Starting from ₹43,499</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">*Final pricing depends on requirements</p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-effect p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-bold mb-3 text-blue-400">⏱️ Development Timeline</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Web Development:</span>
                        <span className="text-white">5-10 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mobile App Development:</span>
                        <span className="text-white">+15-25 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Testing & Deployment:</span>
                        <span className="text-white">+5-7 days</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-white">Total Timeline:</span>
                          <span className="text-purple-400 font-bold">25-42 days</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enterprise Solution Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-effect p-12 rounded-2xl text-center"
            >
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl text-white"
              >
                <FaBuilding />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-6 text-gradient">Enterprise Solution</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                For businesses looking for more advanced and completely unique designs tailored just for your business, 
                we offer enterprise solutions starting from <span className="text-purple-500 font-bold">₹60,000/-</span>
                <br />
                <span className="text-sm text-gray-500">*Final pricing depends on specific requirements and features</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {enterpriseCriteria.map((criteria, index) => (
                  <motion.div
                    key={criteria.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl mb-3 text-purple-500 flex items-center justify-center">
                      <criteria.icon />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{criteria.title}</h3>
                    <p className="text-gray-400">{criteria.value}</p>
                  </motion.div>
                ))}
              </div>
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
              Ready to Launch Your E-Commerce Store?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Let's transform your business with a professional e-commerce solution that drives sales and growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="https://marketplace.digicraft.one/marketplace" target="_blank" rel="noopener noreferrer">
                <motion.button
                  variants={scaleOnHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Explore Marketplace
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  variants={scaleOnHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 border border-purple-500/30 rounded-full font-semibold hover:bg-purple-500/10 transition-all"
                >
                  Let's Talk
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