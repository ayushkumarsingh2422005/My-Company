'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline'

const GradientBlob = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -inset-[10px] opacity-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-pink-500 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
    </div>
  </div>
)

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    opacity: number;
    scale: number;
  }>>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const particlesArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: 0.2 + Math.random() * 0.5,
      scale: 0.2 + Math.random() * 0.8,
    }));
    
    setParticles(particlesArray);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity,
            scale: particle.scale,
          }}
          animate={{
            y: [particle.y, particle.y - 1000],
            opacity: [particle.opacity, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const textRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    tl.to(textRef.current, {
      y: 200,
      opacity: 0,
    })
  }, [])

  return (
    <div ref={sectionRef} className="h-screen relative overflow-hidden bg-gradient-to-b from-purple-900/20 to-black">
      <GradientBlob />
      <FloatingParticles />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.1)_0%,transparent_100%)]" />
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-5xl px-4" ref={textRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 flex items-center justify-center gap-2"
          >
            <SparklesIcon className="w-5 h-5 text-purple-500" />
            <span className="text-purple-500 font-mono">Welcome to the future</span>
            <SparklesIcon className="w-5 h-5 text-purple-500" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Creative Digital
            <br />
            Craftsmen
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            We transform visionary ideas into exceptional digital experiences,
            crafting the future of web one pixel at a time.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button 
              className="group px-8 py-4 border border-purple-500 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Let&apos;s Connect</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDownIcon className="w-6 h-6 text-gray-400" />
      </motion.div>
    </div>
  )
}

export default Hero 