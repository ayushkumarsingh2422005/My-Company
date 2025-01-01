'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

interface Product {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    publicId: string;
  };
  features: string[];
  link: string;
  gradient: string;
  isActive: boolean;
  order: number;
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

const ProductCard = ({ product, index }: { product: Product; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-transparent backdrop-blur-sm border border-purple-500/20"
  >
    <div className="p-6">
      <div className="relative h-48 w-full mb-6 rounded-xl overflow-hidden">
        <Image
          src={product.image.url}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-tr ${product.gradient} opacity-20`} />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
      <p className="text-gray-300 mb-4">{product.description}</p>
      
      <div className="space-y-2 mb-6">
        {product.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`} />
            <span className="text-sm text-gray-400">{feature}</span>
          </div>
        ))}
      </div>
      
      <Link 
        href={product.link}
        target="_blank"
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r ${product.gradient} hover:shadow-lg transition-all`}
      >
        Try it Now
        <HiOutlineArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
)

const StatsSection = () => {
  const stats = [
    { value: '10+', label: 'Products Launched' },
    { value: '100K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
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

export default function Products() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('An error occurred while fetching products: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fallback products if API fails
  const fallbackProducts = [
    {
      _id: "1",
      title: "DigiCraft Color Picker",
      description: "Extract and analyze colors from any image with precision and ease. Perfect for designers and developers.",
      image: {
        url: "/products/color-picker.png",
        publicId: "color-picker"
      },
      link: "https://pixel.digicraft.one/",
      features: [
        "Precision Color Picker",
        "Multiple Color Formats",
        "Smart Color Palette",
        "Drag & Drop Support"
      ],
      gradient: "from-purple-500 to-pink-500",
      isActive: true,
      order: 1
    },
    {
      _id: "2",
      title: "DigiCraft Code Editor",
      description: "A powerful, cloud-based code editor with real-time collaboration and AI assistance.",
      image: {
        url: "/products/code-editor.png",
        publicId: "code-editor"
      },
      link: "#",
      features: [
        "Real-time Collaboration",
        "AI Code Assistance",
        "Multi-language Support",
        "Git Integration"
      ],
      gradient: "from-blue-500 to-cyan-500",
      isActive: true,
      order: 2
    },
    {
      _id: "3",
      title: "DigiCraft Design System",
      description: "A comprehensive design system for building modern web applications with ease.",
      image: {
        url: "/products/design-system.png",
        publicId: "design-system"
      },
      link: "#",
      features: [
        "Component Library",
        "Design Tokens",
        "Responsive Layouts",
        "Theme Customization"
      ],
      gradient: "from-emerald-500 to-teal-500",
      isActive: true,
      order: 3
    }
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

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
                Our Products
              </h1>
              <p className="text-xl text-gray-400">
                Discover our suite of powerful tools and applications designed to enhance your digital workflow.
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center text-white">Loading products...</div>
            ) : error ? (
              <div className="text-center text-red-400">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4">
          <StatsSection />
        </div>

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
                Transform your workflow with our powerful suite of products. Start your journey today.
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