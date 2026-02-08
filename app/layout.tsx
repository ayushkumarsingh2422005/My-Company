import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ChatBot from '@/components/ChatBot'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

const siteUrl = 'https://www.digicraft.one';
const previewImage = `${siteUrl}/preview.png`; // Make sure to add this image to public folder

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DigiCraft Innovation - Digital Creative Studio | Web, Mobile & Cloud Solutions',
    template: '%s | DigiCraft Innovation Private Limited'
  },
  description: 'DigiCraft Innovation Private Limited is a leading digital creative studio specializing in custom web development, mobile apps, cloud solutions, and UI/UX design. Transform your digital presence with our innovative solutions. Get a free consultation today!',
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
    'DigiCraft Studio',
    'DigiCraft Innovation Private Limited',
    'DigiCraft Innovation'
  ],
  authors: [{ name: 'DigiCraft Team', url: siteUrl + '/about' }],
  creator: 'DigiCraft',
  publisher: 'DigiCraft Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/logo.svg',
      },
      {
        rel: 'mask-icon',
        url: '/logo.svg',
        color: '#A855F7'
      },
      {
        rel: 'apple-touch-icon',
        url: '/logo.svg',
      }
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'DigiCraft Innovation Private Limited',
    title: 'DigiCraft Innovation - Transform Your Digital Presence',
    description: 'Leading digital studio offering custom web development, mobile apps, cloud solutions, and UI/UX design. Get innovative digital solutions for your business.',
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: 'DigiCraft - Digital Creative Studio',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigiCraft - Transform Your Digital Presence',
    description: 'Leading digital studio offering custom web development, mobile apps, cloud solutions, and UI/UX design. Get innovative digital solutions for your business.',
    images: [previewImage],
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
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
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
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5986104671426760"
              crossOrigin="anonymous"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        <meta name="theme-color" content="#0f0f0f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="manifest" href="/manifest.json" />

        {/* Explicit favicon declarations */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="alternate icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="mask-icon" href="/logo.svg" color="#A855F7" />

        {/* WhatsApp and Open Graph specific meta tags */}
        <meta property="og:image" content={previewImage} />
        <meta property="og:image:secure_url" content={previewImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DigiCraft - Digital Creative Studio" />

        {/* WhatsApp specific */}
        <meta property="og:site_name" content="DigiCraft" />
        <meta property="og:title" content="DigiCraft - Digital Creative Studio" />
        <meta property="og:description" content="Transform your digital presence with our innovative solutions." />

        {/* Meta business */}
        <meta name="facebook-domain-verification" content="qcxltqxjocup0be2pmbw7fg8rjr57n" />

        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href={previewImage} as="image" />
      </head>
      <body className={`${inter.className} bg-[#0f0f0f] text-white`}>
        <Providers>{children}</Providers>
        <ChatBot />

        {/* <div className="relative z-10 mb-[40vh] bg-black">
          <Providers>{children}</Providers>
        </div>
        <div
          aria-hidden
          className="pointer-events-none h-[40vh] fixed inset-x-0 bottom-0 sm:h-72 md:h-80 bg-[url('/bottom.png')] bg-no-repeat bg-co bg-bottom z-0"
        />
        <div className="relative z-20">
          <ChatBot />
        </div> */}

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DigiCraft Innovation Private Limited',
              alternateName: 'DigiCraft',
              url: siteUrl,
              logo: `${siteUrl}/logo.svg`,
              image: previewImage,
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
                streetAddress: 'Jamui',
                addressLocality: 'Chunar',
                addressRegion: 'Mirzapur',
                postalCode: '231304',
                addressCountry: 'India'
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
              name: 'DigiCraft Innovation Private Limited',
              image: previewImage,
              '@id': siteUrl,
              url: siteUrl,
              telephone: '+918299797516',
              priceRange: '₹₹₹',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jamui',
                addressLocality: 'Chunar',
                addressRegion: 'Mirzapur',
                postalCode: '231304',
                addressCountry: 'India'
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

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '956614123206448');
fbq('track', 'PageView');`}
        </Script>

        {/* noscript fallback for users with JS disabled */}
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=956614123206448&ev=PageView&noscript=1" />` }} />
      </body>
    </html>
  )
} 