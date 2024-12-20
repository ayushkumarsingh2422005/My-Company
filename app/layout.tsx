import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Digital Creative Studio',
  description: 'Crafting Digital Experiences',
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
      </body>
    </html>
  )
} 