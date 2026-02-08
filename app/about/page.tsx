'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaBuilding, FaClock, FaCloud, FaEnvelope, FaGithub, FaGlobe, FaGlobeAmericas, FaInstagram, FaLaptopCode, FaLightbulb, FaLinkedinIn, FaMobileAlt, FaRobot, FaRocket, FaTools, FaUserFriends, FaUsers, FaWhatsapp, FaFileContract, FaIdCard, FaRegistered } from 'react-icons/fa'

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

const services = [
  {
    title: "Web Development",
    description: "Full-stack development with modern frameworks and technologies",
    icon: FaLaptopCode,
    tech: ["React", "Next.js", "Node.js", "Python", "Django"]
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile app development",
    icon: FaMobileAlt,
    tech: ["React Native", "Flutter", "iOS", "Android"]
  },
  {
    title: "Cloud Solutions",
    description: "Scalable cloud architecture and DevOps services",
    icon: FaCloud,
    tech: ["AWS", "Azure", "Docker", "Kubernetes"]
  },
  {
    title: "AI & Machine Learning",
    description: "Custom AI solutions and data analytics",
    icon: FaRobot,
    tech: ["TensorFlow", "PyTorch", "OpenAI", "Data Science"]
  }
]

const goals = [
  {
    title: "Technical Excellence",
    description: "Delivering cutting-edge solutions with the latest technologies",
    icon: "🎯"
  },
  {
    title: "Innovation First",
    description: "Pushing boundaries with AI-driven development and creative solutions",
    icon: "💡"
  },
  {
    title: "Client Success",
    description: "Ensuring project success through agile methodology and clear communication",
    icon: "🚀"
  }
]

// const achievements = [
//   {
//     title: "Tech Innovation Award",
//     description: "Recognized for breakthrough AI implementations",
//     icon: "🏆"
//   },
//   {
//     title: "Global Impact",
//     description: "Served clients across 20+ countries",
//     icon: "🌐"
//   },
//   {
//     title: "Perfect Reviews",
//     description: "5-star rating on major freelance platforms",
//     icon: "⭐"
//   },
//   {
//     title: "Project Excellence",
//     description: "100+ successful tech projects delivered",
//     icon: "✨"
//   }
// ]

const mainDeveloper = {
  name: "Ayush Kumar Singh",
  role: "Founder & Lead Developer",
  image: "/team/ayush.png",
  bio: "5+ years in Tech development, specialized in Multiple Technologies. Passionate about creating innovative solutions and leading teams to success.",
  expertise: [
    "Full-Stack Development",
    "Cloud Architecture",
    "System Design",
    "UI/UX Design",
    "Project Management",
    "DevOps",
    "App Development"
  ],
  technologies: [
    "React/Next.js",
    "Node.js",
    "Python",
    "AWS",
    "MongoDB",
    "TypeScript",
    "Flutter",
    "Django",
    "Docker",
    "Kubernetes",
    "Java",
    "Native Android",
    "More ..."
  ],
  achievements: [
    "Successfully delivered 10+ client based projects",
    "Built scalable solutions for enterprise clients",
    "Mentored other developers",
    "Led multiple high-impact projects"
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/its-ayushkrsingh/",
    instagram: "https://www.instagram.com/ayush.kr._singh/",
    github: "https://github.com/ayushkumarsingh2422005",
    whatsapp: "https://wa.me/+918299797516",
    email: "ayush.kumar@digicraft.one",
    website: "https://ayush-intro.vercel.app/"
  }
}

const otherTeamMembers = [
  // {
  //   name: "Sonu Hansda",
  //   role: "Web/App Developer + DevOps",
  //   image: "/team/sonu.png",
  //   bio: "Full-stack developer with 6+ years of experience, specializing in frameworks like MERN, Django, Next.js, and Flutter, with expertise in DevOps.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/sonu-hansda",
  //     instagram: "https://www.instagram.com/_sonu.hansda",
  //     github: "https://www.github.com/Sonu-Hansda"
  //   }
  // },
  {
    name: "Raj Aryan",
    role: "Digital Marketing",
    image: "/team/raj.jpg",
    bio: "2+ years in digital marketing, specialized in SEO, SMM, and Content Marketing",
    social: {
      linkedin: "https://www.linkedin.com/in/mr-clicks/",
      instagram: "https://www.instagram.com/mr_c1icks",
      github: "#" // no github
    }
  },
  {
    name: "Pratik Modi",
    role: "Business consultant",
    image: "/team/prateek.jpg",
    bio: "Over 3 years of experience and expertise in managing business operations.",
    social: {
      linkedin: "https://www.linkedin.com/in/pratik-modi-63961627b",
      instagram: "https://www.instagram.com/modi_pratik_",
      github: "#" // no github
    }
  },
  // {
  //   name: "Vikash Kumar",
  //   role: "Game Developer",
  //   image: "/team/vikash.jpg",
  //   bio: "3+ Years in Unity Game Development , Blender, C#,C++ , OPENGL ,Unity framework.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/vikash-kumar-380b99292",
  //     instagram: "#",
  //     github: "https://github.com/RealityDenied" // no github
  //   }
  // },
  // {
  //   name: "Harshit",
  //   role: "Web Developer + SEO",
  //   image: "/team/harshit.jpg",
  //   bio: "I build cool stufff",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/harshit-raj-805630247",
  //     instagram: "https://www.instagram.com/horrid_harshitt",
  //     github: "https://github.com/harshit960"
  //   }
  // },
  // {
  //   name: "Adarsh Kumar Jha",
  //   role: "Web Developer + SEO",
  //   image: "/team/adarsh.jpg",
  //   bio: "JustABasicCoder trying to fix Real word Problems.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/adarsh-kumar-jha-306b81245",
  //     instagram: "https://www.instagram.com/adarsh_addi/",
  //     github: "https://github.com/adarsh-kumar-jha"
  //   }
  // },
  // {
  //   name: "Aditya Arayan",
  //   role: "AI/ML",
  //   image: "/team/aditya.jpg",
  //   bio: "2+ years of experience in AI/ML, specializing in NLP, Predictive Analytics, and Data Engineering.",
  //   social: {
  //     linkedin: "https://www.linkedin.com/in/aditya-aryan-4a5195200",
  //     instagram: "https://www.instagram.com/ad_aryan_offcl",
  //     github: "https://github.com/Ad-Tech1009" // no github
  //   }
  // },
  {
    name: "Anshu Raj",
    role: "Android Developer",
    image: "/team/anshu.jpg",
    bio: "5+ years experience in Native Development | Unity 3D developer(C#)",
    social: {
      linkedin: "https://www.linkedin.com/in/anshu-raj-142b55253",
      instagram: "https://www.instagram.com/ig_anshuraj_",
      github: "https://github.com/MrAnshuRaj" // no github
    }
  },
  {
    name: "Priya Raj",
    role: "UI/UX + Mern",
    image: "/team/priyaraj.jpg",
    bio: "2+ years experience Web Devlopemt",
    social: {
      linkedin: "https://www.linkedin.com/in/priya-raj-4b0380273/",
      instagram: "https://www.instagram.com/satyam_tiwari87/",
      github: "https://github.com/satyam969" // no github
    }
  },
  {
    name: "Mohak Raj",
    role: "UI/UX + Web + App",
    image: "/team/mohakraj.jpg",
    bio: "3+ years experience Software Devlopemt",
    social: {
      linkedin: "http://linkedin.com/in/mohak-raj-65a921309",
      instagram: "http://instagram.com/_mohak.04",
      github: "https://github.com/mohak-git" // no github
    }
  },

]

const coreValues = [
  {
    title: "Innovation",
    description: "Embracing cutting-edge technologies and creative solutions",
    icon: "💡"
  },
  {
    title: "Quality",
    description: "Delivering clean, efficient, and scalable code",
    icon: "⭐"
  },
  {
    title: "Transparency",
    description: "Clear communication and honest project timelines",
    icon: "🤝"
  },
  {
    title: "Agility",
    description: "Fast adaptation to changes and quick problem-solving",
    icon: "🚀"
  }
]

const satisfactionMetrics = [
  { label: "Code Quality Score", value: "98%", icon: "💻" },
  { label: "On-time Delivery", value: "100%", icon: "⏰" },
  { label: "Client Satisfaction", value: "99%", icon: "😊" },
  { label: "Bug-free Projects", value: "95%", icon: "🛡️" }
]

const stats = [
  { label: "Business Projects", value: "30+", icon: FaLaptopCode },
  { label: "Expert Developers", value: "10+", icon: FaUsers },
  { label: "Years Experience", value: "5+", icon: FaClock },
  { label: "Tech Stack", value: "10+", icon: FaTools }
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
// const AchievementsSection = () => (
//   <section className="py-20 relative">
//     <div className="max-w-7xl mx-auto px-4">
//       <motion.h2 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className="text-3xl font-bold mb-16 text-center text-gradient"
//       >
//         Our Achievements
//       </motion.h2>
//       <motion.div 
//         variants={staggerContainer}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//       >
//         {achievements.map((achievement) => (
//           <motion.div
//             key={achievement.title}
//             variants={fadeInUp}
//             whileHover={{ scale: 1.05 }}
//             className="glass-effect p-6 rounded-xl text-center group"
//           >
//             <motion.div 
//               initial={{ scale: 1 }}
//               whileHover={{ scale: 1.2, rotate: 360 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl mb-4"
//             >
//               {achievement.icon}
//             </motion.div>
//             <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
//             <p className="text-gray-400">{achievement.description}</p>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   </section>
// )

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
              // whileHover={{ scale: 1.2, rotate: 360 }}
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
    icon: FaRocket
  },
  {
    year: "2020",
    title: "First Major Project",
    description: "Successfully delivered enterprise-level solutions",
    icon: FaBuilding
  },
  {
    year: "2021",
    title: "Team Expansion",
    description: "Grew our talented team across multiple domains",
    icon: FaUserFriends
  },
  {
    year: "2022",
    title: "Global Reach",
    description: "Extended our services to international clients",
    icon: FaGlobeAmericas
  },
  {
    year: "2023",
    title: "Innovation Hub",
    description: "Launched our R&D division for cutting-edge solutions",
    icon: FaLightbulb
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
        {/* Timeline line - Hidden on mobile, shown on md and up */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />

        {/* Mobile Timeline */}
        <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500" />

        {journeyMilestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-12 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
          >
            {/* Mobile Timeline Dot */}
            <div className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transform -translate-x-1/2 mt-2" />

            {/* Content for mobile */}
            <div className="md:hidden pl-12 w-full">
              <div className="text-purple-500 text-xl font-bold mb-2">{milestone.year}</div>
              <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
              <p className="text-gray-400">{milestone.description}</p>
            </div>

            {/* Content for desktop */}
            <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <div className="text-purple-500 text-xl font-bold mb-2">{milestone.year}</div>
              <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
              <p className="text-gray-400">{milestone.description}</p>
            </div>

            {/* Desktop Timeline Dot */}
            <div className="hidden md:flex relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl hover:scale-110 transition-transform text-white">
                <milestone.icon />
              </div>
            </div>

            <div className="hidden md:block flex-1" />
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
            <div className="text-4xl mb-4 group-hover:scale-105 transition-transform">
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

      {/* Main Developer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <motion.div className="glass-effect p-12 rounded-xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-64 h-64 shrink-0">
              <Image
                src={mainDeveloper.image}
                alt={mainDeveloper.name}
                fill
                className="object-cover rounded-full border-4 border-purple-500/30"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-4xl font-bold mb-2 text-gradient">{mainDeveloper.name}</h3>
              <p className="text-purple-500 text-2xl mb-6">{mainDeveloper.role}</p>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">{mainDeveloper.bio}</p>

              {/* Expertise Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-gradient">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-3">
                  {mainDeveloper.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-gradient">Core Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  {mainDeveloper.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-gradient">Key Achievements</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mainDeveloper.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-400">
                      <span className="text-purple-500">✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-6">
                <Link
                  href={mainDeveloper.social.linkedin}
                  className="hover:text-purple-500 transform hover:scale-110 transition-all text-3xl"
                >
                  <FaLinkedinIn />
                </Link>
                <Link
                  href={mainDeveloper.social.instagram}
                  className="hover:text-purple-500 transform hover:scale-110 transition-all text-3xl"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href={mainDeveloper.social.github}
                  className="hover:text-purple-500 transform hover:scale-110 transition-all text-3xl"
                >
                  <FaGithub />
                </Link>
                <Link
                  href={mainDeveloper.social.whatsapp}
                  className="hover:text-purple-500 transform hover:scale-110 transition-all text-3xl"
                >
                  <FaWhatsapp />
                </Link>
                <Link
                  href={`mailto:${mainDeveloper.social.email}`}
                  className="hover:text-purple-500 transform hover:scale-110 transition-all text-3xl"
                >
                  <FaEnvelope />
                </Link>
                <Link
                  href={mainDeveloper.social.website}
                  className="hover:text-purple-500 transform hover:scale-110 transition-all text-3xl"
                >
                  <FaGlobe />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Other Team Members Section */}
      {otherTeamMembers.length > 0 && (
        <>
          <motion.h3
            className="text-2xl font-bold mb-8 text-center text-gradient"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Other Team Members
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherTeamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-4 rounded-xl text-center group hover:scale-105 transition-transform"
              >
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-purple-500 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <Link href={member.social.linkedin} className="hover:text-purple-500 text-sm">
                    <FaLinkedinIn />
                  </Link>
                  <Link href={member.social.instagram} className="hover:text-purple-500 text-sm">
                    <FaInstagram />
                  </Link>
                  <Link href={member.social.github} className="hover:text-purple-500 text-sm">
                    <FaGithub />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  </section>
)

// Add Services Section
const ServicesSection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-16 text-center text-gradient"
      >
        Our Services
      </motion.h2>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="glass-effect p-8 rounded-xl hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="text-4xl mb-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-xl text-purple-500"
              >
                <service.icon />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

// Component for Company Details Section
const CompanyDetailsSection = () => (
  <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2
        className="text-3xl font-bold mb-16 text-center text-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Company Details
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-effect p-8 rounded-xl text-center group hover:scale-105 transition-transform"
        >
          <div className="text-4xl mb-4 text-purple-500 transition-transform">
            <FaRegistered />
          </div>
          <h3 className="text-xl font-bold mb-2">Legal Name</h3>
          <p className="text-gray-300 font-semibold">DigiCraft Innovation Private Limited</p>
          <p className="text-gray-400 text-sm mt-2">Registered Entity</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect p-8 rounded-xl text-center group hover:scale-105 transition-transform"
        >
          <div className="text-4xl mb-4 text-purple-500 transition-transform">
            <FaFileContract />
          </div>
          <h3 className="text-xl font-bold mb-2">CIN & GST</h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="text-purple-400 text-sm block">CIN</span>
              <span className="font-mono">U62010UP2026PTC241890</span>
            </p>
            <p className="text-gray-300">
              <span className="text-purple-400 text-sm block">GST NO</span>
              <span className="font-mono">09AAMCD3672L1Z2</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-8 rounded-xl text-center group hover:scale-105 transition-transform"
        >
          <div className="text-4xl mb-4 text-purple-500 transition-transform">
            <FaIdCard />
          </div>
          <h3 className="text-xl font-bold mb-2">PAN Details</h3>
          <p className="text-gray-300 font-mono">AAMCD3672L</p>
          <p className="text-gray-400 text-sm mt-2">Permanent Account Number</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12"
      >
        <p className="text-gray-400 italic">
          * Official certificates and documents are available upon request for verification purposes.
        </p>
      </motion.div>
    </div>
  </section>
)

export default function About() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]"
          style={{ y, opacity }}
        />
        <GradientOrbs />
        <GridBackground />

        {/* Content Sections */}
        <div className="relative w-full">
          {/* Hero Section */}
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
                  Elite Tech Solutions
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xl text-gray-400"
                >
                  Your trusted partner for premium freelance tech services. We transform ideas into powerful digital solutions.
                </motion.p>
              </motion.div>

              {/* Enhanced Stats Section */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="glass-effect p-6 rounded-xl group hover:border-purple-500/30 transition-all duration-300 flex flex-row items-center gap-6 md:gap-6"
                  >
                    {/* Logo/Icon on the left with theme gradient background */}
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-3xl md:text-4xl text-white flex-shrink-0 shadow-lg"
                    >
                      <stat.icon />
                    </motion.div>
                    {/* Content on the right */}
                    <div className="flex flex-col flex-1">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl md:text-4xl font-bold text-gradient mb-1"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-400 text-base md:text-lg">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <ServicesSection />
          <GoalsSection />
          <JourneySection />
          <CompanyDetailsSection />
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
                Ready to Build Something Amazing?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-400 mb-8 max-w-2xl mx-auto"
              >
                Let&apos;s transform your ideas into reality with cutting-edge technology and expert development.
              </motion.p>
              <motion.button
                onClick={() => router.push('/contact')}
                variants={scaleOnHover}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Start Your Project
              </motion.button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
} 