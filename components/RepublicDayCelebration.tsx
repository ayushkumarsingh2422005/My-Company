import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

// Glowing Orb Component with enhanced animations
const GlowingOrb = ({ color, delay, duration, x }: { color: string; delay: number; duration: number; x: number }) => {
  const scale = 0.4 + Math.random() * 0.3; // Reduced size variation
  const innerColor = color === '#FFFFFF' ? color : `${color}dd`;
  const outerColor = color === '#FFFFFF' ? 'rgba(255,255,255,0.3)' : `${color}33`;

  return (
    <motion.div
      initial={{ 
        y: -20, 
        x, 
        opacity: 0,
        scale 
      }}
      animate={{
        y: ['0vh', '100vh'],
        x: [x - 50, x + 20, x - 30, x + 50], // Gentle swaying
        opacity: [0, 1, 1, 0],
        scale: [scale, scale * 1.2, scale * 0.9, scale * 1.1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-0 pointer-events-none"
    >
      <div className="relative">
        {/* Outer glow */}
        <div 
          className="absolute inset-0 rounded-full blur-xl"
          style={{ 
            background: outerColor,
            width: '20px', // Reduced from 30px
            height: '20px', // Reduced from 30px
            transform: 'translate(-25%, -25%) scale(2)'
          }}
        />
        {/* Inner glow */}
        <div 
          className="absolute rounded-full blur-md"
          style={{ 
            background: innerColor,
            width: '12px', // Reduced from 20px
            height: '12px', // Reduced from 20px
            transform: 'translate(0%, 0%)'
          }}
        />
        {/* Core */}
        <div 
          className="rounded-full"
          style={{ 
            background: color,
            width: '8px', // Reduced from 12px
            height: '8px', // Reduced from 12px
            boxShadow: `0 0 8px ${color}, 0 0 15px ${color}, 0 0 20px ${color}` // Reduced shadow spread
          }}
        />
      </div>
    </motion.div>
  );
};

// Generate random glowing orbs
const PermanentOrbs = () => {
  const [orbs, setOrbs] = useState<Array<{
    id: number;
    color: string;
    delay: number;
    duration: number;
    x: number;
  }>>([]);

  useEffect(() => {
    // Generate orbs only on client side
    const generateOrbs = () => {
      const windowWidth = window.innerWidth;
      return Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        color: ['#FF9933', '#FFFFFF', '#138808'][Math.floor(Math.random() * 3)],
        delay: Math.random() * 15,
        duration: 20 + Math.random() * 30,
        x: (windowWidth * (i % 25)) / 25 + (Math.random() * 50 - 25)
      }));
    };

    setOrbs(generateOrbs());

    // Optional: Update orbs on window resize
    const handleResize = () => {
      setOrbs(generateOrbs());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {orbs.map((orb) => (
        <GlowingOrb key={orb.id} {...orb} />
      ))}
    </div>
  );
};

const RepublicDayCelebration = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const createTricolorCelebration = () => {
      const count = 150;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 100,
      };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      // Modern tricolor effect with better physics
      fire(0.25, {
        spread: 65,
        startVelocity: 75,
        colors: ['#FF9933'],
        shapes: ['square'],
        ticks: 600,
        gravity: 1.2,
        scalar: 1.2,
        drift: -0.5
      });

      setTimeout(() => {
        fire(0.35, {
          spread: 55,
          startVelocity: 65,
          colors: ['#FFFFFF'],
          shapes: ['circle'],
          ticks: 600,
          gravity: 1.3,
          scalar: 1.1,
          drift: 0
        });
      }, 200);

      setTimeout(() => {
        fire(0.25, {
          spread: 60,
          startVelocity: 55,
          colors: ['#138808'],
          shapes: ['square'],
          ticks: 600,
          gravity: 1.4,
          scalar: 1,
          drift: 0.5
        });
      }, 400);
    };

    createTricolorCelebration();
    const interval = setInterval(createTricolorCelebration, 5000);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      clearInterval(interval);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Permanent Orbs - outside AnimatePresence */}
      <PermanentOrbs />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              {/* Animated gradient lines with reduced opacity */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{ top: `${12.5 * i}%` }}
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'linear'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Main celebration content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative text-center px-6 py-8 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 max-w-3xl mx-4 shadow-2xl"
            >
              <div className="relative">
                {/* Ashoka Chakra with enhanced effects */}
                <div className="relative w-28 h-28 mx-auto mb-8">
                  <motion.div
                    className="absolute inset-0 bg-blue-500/30 rounded-full filter blur-2xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="relative z-10"
                  >
                    <img 
                      src="/ashok.png" 
                      alt="Ashoka Chakra"
                      className="w-full h-full drop-shadow-2xl"
                    />
                  </motion.div>
                </div>

                {/* Enhanced Typography */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    <motion.div 
                      className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-transparent bg-clip-text inline-block"
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      Happy Republic Day
                    </motion.div>
                  </h1>

                  <motion.div
                    className="text-xl md:text-2xl font-medium text-white/90"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="font-semibold">Celebrating 76 Years of</span>
                    <br />
                    <span className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-transparent bg-clip-text">
                      Constitutional Democracy
                    </span>
                  </motion.div>

                  <div className="space-y-3 mt-6">
                    <motion.div 
                      className="text-3xl md:text-4xl font-bold"
                      animate={{ 
                        textShadow: [
                          '0 0 8px rgba(255,153,51,0.5)',
                          '0 0 16px rgba(255,153,51,0.5)',
                          '0 0 8px rgba(255,153,51,0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      जय हिन्द 🇮🇳
                    </motion.div>
                    <p className="text-lg md:text-xl text-white/80 font-medium tracking-wide">
                      Unity in Diversity • Strength in Democracy • Pride in Heritage
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RepublicDayCelebration; 