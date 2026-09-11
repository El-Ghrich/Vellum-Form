import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { getBaseUrl, JsonLd, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Vellum Form | Considered Design & Architecture',
    template: '%s | Vellum Form',
  },
  description:
    'A digital curation house for the considered life. Curated design, architectural guides, and daily rituals.',
  applicationName: 'Vellum Form',
  authors: [{ name: 'The Editorial Desk', url: `${baseUrl}/about` }],
  creator: 'Vellum Form',
  publisher: 'Vellum Form',
  keywords: [
    'luxury interior design',
    'architectural objects',
    'curated homeware',
    'sculptural decor',
    'intentional living',
    'design edits',
    'minimalist home',
    'considered lifestyle',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Vellum Form',
    title: 'Vellum Form | Considered Design & Architecture',
    description:
      'A digital curation house for the considered life. Curated design, architectural guides, and daily rituals.',
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Vellum Form | Considered Design & Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vellum Form | Considered Design & Architecture',
    description:
      'A digital curation house for the considered life. Curated design, architectural guides, and daily rituals.',
    images: [`${baseUrl}/opengraph-image`],
  },
  icons: {
    icon: '/round-logo.png',
    apple: '/round-logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: {
    'p:domain_verify': '08484838815ca62ff92f1353ea96ae48',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = generateOrganizationSchema()
  const webSiteSchema = generateWebSiteSchema()

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
