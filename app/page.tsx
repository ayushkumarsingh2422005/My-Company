import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Testimonials from '@/components/Testimonials'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Testimonials />
    </main>
  )
} 