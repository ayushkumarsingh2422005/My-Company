'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaPhone } from 'react-icons/fa'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCall = () => {
    window.open('tel:+918299797516', '_self')
  }

  return (
    <>
      {/* Call Button */}
      <motion.button
        onClick={handleCall}
        className="fixed bottom-24 right-7 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg hover:shadow-green-500/25 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Call us now"
      >
        <FaPhone className="w-5 h-5 text-white transform rotate-90" />
      </motion.button>

      {/* Bot Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-purple-500/25 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaRobot className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-36 right-6 z-50 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/22/07/20241222074706-PZNA7D5L.json"
              className="w-full h-full border-0"
              title="Chat Bot"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
