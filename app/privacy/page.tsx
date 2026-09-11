import type { Metadata } from 'next'
import { LegalTemplate } from '@/components/templates/LegalTemplate'
import { getBaseUrl, JsonLd, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Guidelines',
  description:
    'Read the privacy guidelines, cookies policy, and affiliate disclosures for Vellum Form.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & Data Guidelines | Vellum Form',
    description:
      'Read the privacy guidelines, cookies policy, and affiliate disclosures for Vellum Form.',
    url: `${getBaseUrl()}/privacy`,
  },
}

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Privacy Policy', item: '/privacy' },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <LegalTemplate lastUpdated="August 2026" contactEmail="vellumform@gmail.com" />
    </>
  )
}
