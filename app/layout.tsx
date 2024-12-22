import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ChatBot from '@/components/ChatBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DigiCraft - Digital Creative Studio',
  description: 'Crafting Digital Experiences',
  icons: {
    icon: [
      { url: '/logo.svg' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0f0f0f] text-white`}>
        <Providers>{children}</Providers>
        <ChatBot />
      </body>
    </html>
  )
} 