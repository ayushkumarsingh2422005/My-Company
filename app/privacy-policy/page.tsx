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

// Privacy Policy Sections
const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `Last Updated: 12/21/2024

This Privacy Policy describes how DigiCraft ("we," "our," or "us") collects, uses, and protects your personal information when you use our website and services. We are committed to protecting your privacy and ensuring the security of your personal information.

By accessing our website or using our services, you agree to the terms of this Privacy Policy. Please read this policy carefully to understand our practices regarding your personal data.`
  },
  {
    id: 'information-collection',
    title: 'Information We Collect',
    subsections: [
      {
        title: 'Personal Information',
        content: `We may collect the following types of personal information:
• Name, email address, phone number, and business details
• Billing and payment information
• Communication preferences
• Project requirements and specifications
• Professional or employment-related information
• IP address and device information
• Website usage data and analytics`
      },
      {
        title: 'Automatically Collected Information',
        content: `We automatically collect certain information when you visit our website:
• Browser type and version
• Operating system
• Access times and dates
• Pages viewed and navigation patterns
• Referral sources
• Device identifiers
• Location information`
      }
    ]
  },
  {
    id: 'information-use',
    title: 'How We Use Your Information',
    content: `We use your personal information for the following purposes:

• Providing and improving our services
• Processing payments and transactions
• Communicating about projects and services
• Sending important updates and notifications
• Analyzing website usage and performance
• Customizing your experience
• Marketing and promotional communications (with consent)
• Legal compliance and contract fulfillment
• Protecting our rights and preventing fraud

We process your information based on:
• Contract performance
• Legal obligations
• Legitimate business interests
• Your explicit consent`
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing and Disclosure',
    content: `We may share your information with:

• Service providers and contractors
• Payment processors and financial institutions
• Cloud storage providers
• Analytics and marketing services
• Legal and regulatory authorities
• Business partners (with your consent)

We do not sell your personal information to third parties. Any sharing is conducted under strict confidentiality agreements and data protection requirements.`
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information:

• Encryption of sensitive data
• Secure SSL/TLS protocols
• Regular security assessments
• Access controls and authentication
• Firewall and intrusion detection
• Regular backups and updates
• Employee training and confidentiality agreements

While we take reasonable steps to protect your information, no method of transmission over the internet is 100% secure.`
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: `We retain your personal information for as long as necessary to:

• Provide our services
• Comply with legal obligations
• Resolve disputes
• Enforce agreements
• Maintain business records

After the retention period expires, we securely delete or anonymize your information.`
  },
  {
    id: 'user-rights',
    title: 'Your Rights and Choices',
    content: `You have the following rights regarding your personal information:

• Access your personal data
• Correct inaccurate information
• Request deletion of your data
• Object to processing
• Restrict processing
• Data portability
• Withdraw consent
• Opt-out of marketing communications

To exercise these rights, please contact us at ayush.mauraya.dev@gmail.com.`
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    content: `We use cookies and similar technologies to:

• Maintain session information
• Remember your preferences
• Analyze website usage
• Improve user experience
• Provide targeted content
• Monitor performance

You can control cookies through your browser settings. Blocking certain cookies may impact website functionality.`
  },
  {
    id: 'children',
    title: 'Children\'s Privacy',
    content: `Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.`
  },
  {
    id: 'international',
    title: 'International Data Transfers',
    content: `We may transfer your information to countries outside your residence location. We ensure appropriate safeguards through:

• Standard contractual clauses
• Data protection agreements
• Compliance with local laws
• Security measures

By using our services, you consent to these transfers.`
  },
  {
    id: 'changes',
    title: 'Changes to Privacy Policy',
    content: `We may update this Privacy Policy periodically. We will notify you of significant changes through:

• Email notifications
• Website announcements
• Service notifications

Continued use of our services after changes constitutes acceptance of the updated policy.`
  },
  {
    id: 'contact',
    title: 'Contact Information',
    content: `For privacy-related inquiries or to exercise your rights, contact us at:

Email: ayush.mauraya.dev@gmail.com
Phone: +91 8299797516
Address: Jamui, Chunar, Mirzapur, UP, India - 231304

Response Time: Within 24-48 hours`
  }
];

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
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

          {/* Policy Sections */}
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
                {section.subsections ? (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-semibold mb-4 text-purple-400">
                          {subsection.title}
                        </h3>
                        <div className="text-gray-300 whitespace-pre-line">
                          {subsection.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-300 whitespace-pre-line">
                    {section.content}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Agreement Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-xl mt-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Privacy Agreement</h2>
            <p className="text-gray-300">
              By using our services, you acknowledge that you have read, understood, and agree to our Privacy Policy and how we handle your personal information.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="/terms"
                className="px-8 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition-all"
              >
                Terms & Conditions
              </Link>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-xl mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Data Protection</h3>
                <p className="text-gray-400">
                  Your data is protected with industry-standard security measures and encryption.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold mb-2">Your Rights</h3>
                <p className="text-gray-400">
                  You have full control over your personal data and can exercise your rights at any time.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2">Support</h3>
                <p className="text-gray-400">
                  Our team is here to help with any privacy-related questions or concerns.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-20"
          >
            <p className="text-gray-400">
              If you have any questions about our Privacy Policy, please{' '}
              <Link href="/contact" className="text-purple-400 hover:text-purple-300">
                contact us
              </Link>
              . For more information about our services, view our{' '}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                Terms & Conditions
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