'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

// Terms and Conditions Sections
const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `Last Updated: 12/21/2024

Welcome to DigiCraft. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing our website or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our services.

For the purpose of these Terms:
• "Client" refers to you, the user of our services
• "Company" refers to DigiCraft
• "Services" refers to all digital services we provide
• "Project" refers to the work agreed upon between Client and Company`
  },
  {
    id: 'services',
    title: 'Services',
    content: `Our services include but are not limited to:

• Web Development
• Mobile App Development
• UI/UX Design
• Cloud Solutions
• DevOps Services
• Digital Consulting

Service Delivery:
• We will provide services with reasonable skill and care
• Services will be delivered according to agreed project specifications
• Timeline estimates are provided in good faith but are not guaranteed
• We reserve the right to modify or update our services as needed

Service Limitations:
• We do not guarantee specific results or outcomes
• Success depends on various factors including client cooperation
• Third-party services or integrations may affect delivery
• Force majeure events may impact service delivery`
  },
  {
    id: 'project-terms',
    title: 'Project Terms',
    content: `Project Initiation:
• Projects commence upon written agreement and initial payment
• Project scope must be clearly defined in writing
• Changes to scope may affect timeline and costs

Client Responsibilities:
• Provide necessary information and materials timely
• Review and provide feedback within agreed timeframes
• Maintain regular communication
• Ensure accuracy of provided content

Project Timeline:
• Timelines are estimates unless specifically guaranteed
• Delays caused by client may affect delivery dates
• Rush services may incur additional charges
• Project abandonment may result in full payment obligation`
  },
  {
    id: 'payment-terms',
    title: 'Payment Terms',
    content: `Pricing and Payments:
• All prices are in Indian Rupees (INR)
• Payment schedules are defined in project proposals
• Standard payment terms: 50% upfront, 50% upon completion
• Additional work beyond scope will be charged separately

Payment Methods:
• We accept bank transfers and major payment methods
• International payments may incur additional fees
• Late payments may result in work suspension
• Interest may be charged on overdue amounts

Refund Policy:
• Deposits are non-refundable unless specified
• Refunds for incomplete work will be pro-rated
• Disputes must be raised within 7 days of delivery
• Refund processing may take up to 14 business days`
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: `Ownership Rights:
• Client retains rights to provided content and materials
• Company retains rights to pre-existing materials and tools
• Final deliverables transfer to client upon full payment
• Source code ownership as specified in project agreement

License Terms:
• Clients receive license for final deliverables
• Company may use work in portfolio (unless agreed otherwise)
• Third-party assets may have separate license terms
• Unauthorized use of our work is strictly prohibited

Confidentiality:
• Both parties must maintain confidentiality
• NDAs available upon request
• Client data protected as per Privacy Policy
• Portfolio rights subject to confidentiality agreements`
  },
  {
    id: 'warranty-liability',
    title: 'Warranty & Liability',
    content: `Warranty Terms:
• Services provided "as is" without warranty
• We do not guarantee error-free or uninterrupted service
• Third-party services are subject to their own warranties
• Bug fixes provided for 30 days after project completion

Limitation of Liability:
• Liability limited to project fees paid
• No liability for indirect or consequential damages
• Force majeure events exclude liability
• Client responsible for content accuracy

Indemnification:
• Client indemnifies against content-related claims
• Company indemnifies against service-related claims
• Mutual indemnification for breach of terms
• Prompt notification required for any claims`
  },
  {
    id: 'termination',
    title: 'Termination',
    content: `Termination Rights:
• Either party may terminate with written notice
• Immediate termination for material breach
• Company may terminate if payment is overdue
• Client may terminate if major milestones missed

Termination Process:
• Written notice required for termination
• Payment due for work completed
• Return of client materials and data
• Transition assistance available at additional cost

Post-Termination:
• Confidentiality obligations continue
• Payment obligations remain
• Intellectual property rights as per agreement
• Return or destruction of confidential information`
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    content: `Resolution Process:
• Disputes addressed through friendly negotiation
• Mediation before legal proceedings
• Arbitration as per Indian law
• Legal proceedings in Uttar Pradesh courts

Governing Law:
• Terms governed by Indian law
• Jurisdiction in Uttar Pradesh, India
• International laws where applicable
• Local laws take precedence

Communication:
• All notices in writing
• Email acceptable for regular communication
• Legal notices via registered mail
• Language of communication: English`
  },
  {
    id: 'modifications',
    title: 'Modifications to Terms',
    content: `Changes to Terms:
• We reserve right to modify terms
• Notice provided for significant changes
• Continued use implies acceptance
• Regular review recommended

Notification Process:
• Email notification for major changes
• Website announcement for updates
• 30 days notice for material changes
• Right to reject new terms by discontinuing service`
  },
  {
    id: 'contact',
    title: 'Contact Information',
    content: `For inquiries regarding these Terms:

Email: ayush.mauraya.dev@gmail.com
Phone: +91 8299797516
Address: Jamui, Chunar, Mirzapur, UP, India - 231304

Business Hours: Monday to Saturday, 9:00 AM - 6:00 PM IST
Response Time: Within 24-48 hours`
  }
];

export default function Terms() {
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-400">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl mb-12"
          >
            <h2 className="text-xl font-bold mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {section.title}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect p-8 rounded-xl"
              >
                <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                <div className="text-gray-300 whitespace-pre-line">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Agreement Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-xl mt-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Agreement</h2>
            <p className="text-gray-300">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className="px-8 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition-all"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-20"
          >
            <p className="text-gray-400">
              If you have any questions about these Terms, please{' '}
              <Link href="/contact" className="text-purple-400 hover:text-purple-300">
                contact us
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
} 