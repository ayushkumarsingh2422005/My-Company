'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'


const products = [
  {
    id: 1,
    title: "DigiCraft Color Picker",
    description: "Extract and analyze colors from any image with precision and ease. Perfect for designers and developers.",
    image: "/products/color-picker.png",
    link: "https://pixel.digicraft.one/",
    features: [
      "Precision Color Picker",
      "Multiple Color Formats",
      "Smart Color Palette",
      "Drag & Drop Support"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "DigiCraft Code Editor",
    description: "A powerful, cloud-based code editor with real-time collaboration and AI assistance.",
    image: "/products/color-picker.png",
    link: "#",
    features: [
      "Real-time Collaboration",
      "AI Code Assistance",
      "Multi-language Support",
      "Git Integration"
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "DigiCraft Design System",
    description: "A comprehensive design system for building modern web applications with ease.",
    image: "/products/color-picker.png",
    link: "#",
    features: [
      "Component Library",
      "Design Tokens",
      "Responsive Layouts",
      "Theme Customization"
    ],
    gradient: "from-emerald-500 to-teal-500"
  }
]

interface ProductCardProps {
  title: string
  description: string
  image: string
  link: string
  features: string[]
  gradient: string
  index: number
}

const ProductCard = ({ title, description, image, link, features, gradient, index }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-transparent backdrop-blur-sm border border-purple-500/20"
  >
    <div className="p-6">
      <div className="relative h-48 w-full mb-6 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-20`} />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
            <span className="text-sm text-gray-400">{feature}</span>
          </div>
        ))}
      </div>
      
      <Link 
        href={link}
        target="_blank"
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r ${gradient} hover:shadow-lg transition-all`}
      >
        Try it Now
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
)

const Products = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]" />
      {/* <GradientOrbs /> */}
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Our Products
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our suite of powerful tools and applications designed to enhance your digital workflow.
            Built with precision and care for the modern web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            View All Products
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Products