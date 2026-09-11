import type { Metadata } from 'next'
import { LegalTemplate } from '@/components/templates/LegalTemplate'
import { getBaseUrl, JsonLd, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Legal, Privacy & Affiliate Disclosures',
  description:
    'Read the legal policies, affiliate disclosures, Amazon Associate terms, and privacy guidelines for Vellum Form.',
  alternates: {
    canonical: '/legal',
  },
  openGraph: {
    title: 'Legal, Privacy & Affiliate Disclosures | Vellum Form',
    description:
      'Read the legal policies, affiliate disclosures, Amazon Associate terms, and privacy guidelines for Vellum Form.',
    url: `${getBaseUrl()}/legal`,
  },
}

export default function LegalPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Legal & Disclosures', item: '/legal' },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <LegalTemplate lastUpdated="August 2026" contactEmail="vellumform@gmail.com" />
    </>
  )
}
