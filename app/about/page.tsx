'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

const goals = [
  {
    title: "Digital Excellence",
    description: "Striving to deliver exceptional digital solutions that exceed expectations",
    icon: "🎯"
  },
  {
    title: "Global Impact",
    description: "Creating meaningful impact through innovative digital solutions worldwide",
    icon: "🌍"
  },
  {
    title: "Client Success",
    description: "Ensuring our clients&apos; success through dedicated partnership and support",
    icon: "🚀"
  }
]

const achievements = [
  {
    title: "Industry Recognition",
    description: "Awarded Best Digital Agency 2023",
    icon: "🏆"
  },
  {
    title: "Global Presence",
    description: "Successfully delivered projects across 15+ countries",
    icon: "🌐"
  },
  {
    title: "Client Trust",
    description: "95% client retention rate with long-term partnerships",
    icon: "🤝"
  },
  {
    title: "Project Success",
    description: "100+ successful project deliveries",
    icon: "✨"
  }
]

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "/team/member1.png",
    bio: "Visionary leader with 10+ years in digital innovation",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  // Add more team members...
]

const coreValues = [
  {
    title: "Excellence",
    description: "Striving for perfection in every project we undertake",
    icon: "⭐"
  },
  {
    title: "Innovation",
    description: "Pushing boundaries with creative solutions",
    icon: "💡"
  },
  {
    title: "Integrity",
    description: "Building trust through transparent relationships",
    icon: "🤝"
  },
  {
    title: "Growth",
    description: "Continuous learning and improvement",
    icon: "📈"
  }
]

const satisfactionMetrics = [
  { label: "Client Satisfaction", value: "98%", icon: "😊" },
  { label: "Project Success Rate", value: "100%", icon: "🎯" },
  { label: "On-time Delivery", value: "95%", icon: "⏰" },
  { label: "Client Retention", value: "92%", icon: "🤝" }
]

const stats = [
  { label: "Projects Completed", value: "200+", icon: "🚀" },
  { label: "Team Members", value: "50+", icon: "👥" },
  { label: "Years Experience", value: "5+", icon: "⏳" },
  { label: "Global Clients", value: "100+", icon: "🌍" }
]

// Add animation variants
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

// Component for Goals Section
const GoalsSection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-16 text-center text-gradient"
      >
        Our Goals
      </motion.h2>
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-8 rounded-xl text-center hover:border-purple-500/30 transition-all duration-300"
          >
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-4xl mb-4"
            >
              {goal.icon}
            </motion.div>
            <h3 className="text-xl font-bold mb-4">{goal.title}</h3>
            <p className="text-gray-400">{goal.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

// Component for Achievements Section
const AchievementsSection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-16 text-center text-gradient"
      >
        Our Achievements
      </motion.h2>
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.title}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center group"
          >
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-4xl mb-4"
            >
              {achievement.icon}
            </motion.div>
            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
            <p className="text-gray-400">{achievement.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

// Component for Client Satisfaction Section
const SatisfactionSection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-16 text-center text-gradient"
      >
        Client Satisfaction
      </motion.h2>
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {satisfactionMetrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center group"
          >
            <motion.div 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-4xl mb-4"
            >
              {metric.icon}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold text-gradient mb-2"
            >
              {metric.value}
            </motion.div>
            <div className="text-gray-400">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

// Add Journey Timeline component
const journeyMilestones = [
  {
    year: "2019",
    title: "Our Beginning",
    description: "Started with a vision to transform digital landscapes",
    icon: "🚀"
  },
  {
    year: "2020",
    title: "First Major Project",
    description: "Successfully delivered enterprise-level solutions",
    icon: "💼"
  },
  {
    year: "2021",
    title: "Team Expansion",
    description: "Grew our talented team across multiple domains",
    icon: "👥"
  },
  {
    year: "2022",
    title: "Global Reach",
    description: "Extended our services to international clients",
    icon: "🌍"
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description: "Launched our R&D division for cutting-edge solutions",
    icon: "💡"
  }
]

// Add this section after the stats section
const JourneySection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 
        className="text-3xl font-bold mb-16 text-center text-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Our Journey
      </motion.h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />
        
        {journeyMilestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex items-center gap-8 mb-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <div className="text-purple-500 text-xl font-bold mb-2">{milestone.year}</div>
              <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
              <p className="text-gray-400">{milestone.description}</p>
            </div>
            
            <div className="relative hidden md:block">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                {milestone.icon}
              </div>
            </div>
            
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)



// Component for Core Values Section
const CoreValuesSection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 className="text-3xl font-bold mb-16 text-center text-gradient">
        Our Core Values
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {coreValues.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect p-6 rounded-xl text-center group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
            <p className="text-gray-400">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// Component for Team Section
const TeamSection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2 className="text-3xl font-bold mb-16 text-center text-gradient">
        Our Team
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect p-6 rounded-xl text-center group"
          >
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
            <p className="text-purple-500 mb-4">{member.role}</p>
            <p className="text-gray-400 mb-4">{member.bio}</p>
            <div className="flex justify-center gap-4">
              <Link href={member.social.linkedin} className="hover:text-purple-500">
                <FaLinkedinIn />
              </Link>
              <Link href={member.social.twitter} className="hover:text-purple-500">
                <FaTwitter />
              </Link>
              <Link href={member.social.github} className="hover:text-purple-500">
                <FaGithub />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default function About() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 relative">
        {/* Background Elements */}
        <motion.div 
          className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]"
          style={{ y, opacity }}
        />
        <GradientOrbs />
        <GridBackground />
        
        {/* Hero Section with animated text */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto mb-20"
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
                <span className="text-purple-500 font-mono">About Us</span>
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
                Our Story
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-xl text-gray-400"
              >
                Crafting digital experiences that inspire, innovate, and impact
              </motion.p>
            </motion.div>

            {/* Enhanced Stats Section */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-6 rounded-xl group hover:border-purple-500/30 transition-all duration-300"
                >
                  <motion.div 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-4"
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl font-bold text-gradient mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <GoalsSection />
        <JourneySection />
        <AchievementsSection />
        <CoreValuesSection />
        <TeamSection />
        <SatisfactionSection />

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6 text-gradient"
            >
              Ready to Work Together?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Let&apos;s create something amazing together. Get in touch with our team.
            </motion.p>
            <motion.button
              variants={scaleOnHover}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Contact Us
            </motion.button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 