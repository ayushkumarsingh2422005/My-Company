'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCopy, FiDownload, FiMail, FiCalendar, FiUser, FiMapPin, FiPhone } from 'react-icons/fi'
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

// Info Card Component
interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  copyable?: boolean;
}

const InfoCard = ({ icon: Icon, label, value, copyable = false }: InfoCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="p-4 bg-black/20 rounded-lg border border-purple-500/20">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="text-purple-500" size={18} />
        <span className="text-sm text-gray-400">{label}</span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="ml-auto text-gray-400 hover:text-purple-500 transition-colors"
          >
            <FiCopy size={14} />
          </button>
        )}
      </div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  )
}

export default function PaymentDetails({ params }: { params: { id: string } }) {
  const [transaction, setTransaction] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/transactions/${params.id}`)
        const data = await response.json()
        if (data.success) {
          setTransaction(data.transaction)
        } else {
          setError('Transaction not found')
        }
      } catch (error) {
        setError('Failed to load transaction details')
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [params.id])

  const downloadReceipt = () => {
    // This is a placeholder - implement actual receipt download functionality
    alert('Receipt download functionality will be implemented')
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 relative">
          <GradientOrbs />
          <GridBackground />
          <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="glass-effect p-8 rounded-xl">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-purple-500/20 rounded w-1/3" />
                <div className="h-4 bg-purple-500/20 rounded w-1/2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-purple-500/20 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !transaction) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 relative">
          <GradientOrbs />
          <GridBackground />
          <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="glass-effect p-8 rounded-xl text-center">
              <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
              <p className="text-gray-400">{error || 'Transaction not found'}</p>
              <a
                href="/"
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Return Home
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(transaction.amount)

  const formattedDate = new Date(transaction.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 relative">
        <motion.div 
          className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]"
        />
        <GradientOrbs />
        <GridBackground />
        
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-8 rounded-xl border border-purple-500/20"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                Payment Details
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FiCalendar size={14} />
                  {formattedDate}
                </span>
                <span>•</span>
                <span className="font-mono">{transaction._id}</span>
              </div>
            </div>

            {/* Amount and Status */}
            <div className="text-center mb-8 p-6 bg-black/20 rounded-lg border border-purple-500/20">
              <div className="text-4xl font-bold mb-2 text-gradient">
                {formattedAmount}
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-500">
                {transaction.status}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={downloadReceipt}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                <FiDownload size={18} />
                Download Receipt
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(transaction._id)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                <FiCopy size={18} />
                Copy ID
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={FiUser}
                label="Customer Name"
                value={transaction.name}
              />
              <InfoCard
                icon={FiMail}
                label="Email"
                value={transaction.email}
                copyable
              />
              <InfoCard
                icon={FiPhone}
                label="Phone"
                value={transaction.phone}
                copyable
              />
              <InfoCard
                icon={FiMapPin}
                label="Address"
                value={`${transaction.address.street}, ${transaction.address.city}, ${transaction.address.state} - ${transaction.address.pincode}`}
              />
            </div>

            {/* Payment Info */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gradient">Payment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={FiCopy}
                  label="Payment ID"
                  value={transaction.paymentId}
                  copyable
                />
                <InfoCard
                  icon={FiCopy}
                  label="Order ID"
                  value={transaction.orderId}
                  copyable
                />
              </div>
            </div>

            {/* Reason and Project Details */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-black/20 rounded-lg border border-purple-500/20">
                <h3 className="text-sm text-gray-400 mb-2">Reason for Payment</h3>
                <p>{transaction.reason}</p>
              </div>
              {transaction.projectDetails && (
                <div className="p-4 bg-black/20 rounded-lg border border-purple-500/20">
                  <h3 className="text-sm text-gray-400 mb-2">Project Details</h3>
                  <p>{transaction.projectDetails}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
