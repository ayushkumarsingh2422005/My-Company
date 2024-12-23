import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ChatBot from '@/components/ChatBot'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.digicraft.one'),
  title: {
    default: 'DigiCraft - Digital Creative Studio | Web, Mobile & Cloud Solutions',
    template: '%s | DigiCraft - Digital Creative Studio'
  },
  description: 'DigiCraft is a leading digital creative studio specializing in custom web development, mobile apps, cloud solutions, and UI/UX design. Transform your digital presence with our innovative solutions. Get a free consultation today!',
  keywords: [
    'digital studio',
    'web development',
    'mobile apps',
    'cloud solutions',
    'UI/UX design',
    'digital transformation',
    'creative agency',
    'tech solutions',
    'software development',
    'digital marketing',
    'web design',
    'app development',
    'digital agency',
    'IT services',
    'custom software',
    'DigiCraft',
    'DigiCraft Studio'
  ],
  authors: [{ name: 'DigiCraft Team', url: 'https://www.digicraft.one/about' }],
  creator: 'DigiCraft',
  publisher: 'DigiCraft Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.svg',
        color: '#A855F7'
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.digicraft.one',
    siteName: 'DigiCraft - Digital Creative Studio',
    title: 'DigiCraft - Transform Your Digital Presence',
    description: 'Leading digital studio offering custom web development, mobile apps, cloud solutions, and UI/UX design. Get innovative digital solutions for your business.',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'DigiCraft - Digital Creative Studio',
        type: 'image/svg+xml',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigiCraft - Transform Your Digital Presence',
    description: 'Leading digital studio offering custom web development, mobile apps, cloud solutions, and UI/UX design. Get innovative digital solutions for your business.',
    images: ['/logo.svg'],
    creator: '@digicraft',
    site: '@digicraft',
    creatorId: '1467726470533754880',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://www.digicraft.one',
    languages: {
      'en-US': 'https://www.digicraft.one',
    },
  },
  category: 'technology',
  classification: 'Digital Services',
  referrer: 'origin-when-cross-origin',
  other: {
    'msapplication-TileColor': '#0f0f0f',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'DigiCraft',
    'apple-mobile-web-app-status-bar-style': 'black',
    'theme-color': '#0f0f0f'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} bg-[#0f0f0f] text-white`}>
        <Providers>{children}</Providers>
        <ChatBot />
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DigiCraft',
              alternateName: 'DigiCraft Studio',
              url: 'https://www.digicraft.one',
              logo: 'https://www.digicraft.one/logo.svg',
              sameAs: [
                'https://twitter.com/digicraft',
                'https://facebook.com/digicraft',
                'https://linkedin.com/company/digicraft',
                'https://instagram.com/digicraft'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-234-567-8900',
                contactType: 'customer service',
                areaServed: 'Worldwide',
                availableLanguage: ['English']
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Your Street Address',
                addressLocality: 'Your City',
                addressRegion: 'Your Region',
                postalCode: 'Your Postal Code',
                addressCountry: 'Your Country'
              }
            })
          }}
        />
        
        {/* Local Business Structured Data */}
        <Script
          id="local-business-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'DigiCraft - Digital Creative Studio',
              image: 'https://www.digicraft.one/logo.svg',
              '@id': 'https://www.digicraft.one',
              url: 'https://www.digicraft.one',
              telephone: '+1-234-567-8900',
              priceRange: '₹₹₹',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Your Street Address',
                addressLocality: 'Your City',
                addressRegion: 'Your Region',
                postalCode: 'Your Postal Code',
                addressCountry: 'Your Country'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 0,
                longitude: 0
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday'
                ],
                opens: '09:00',
                closes: '18:00'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '89'
              }
            })
          }}
        />
      </body>
    </html>
  )
} 