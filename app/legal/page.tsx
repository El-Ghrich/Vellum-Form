import type { Metadata } from 'next'
import { LegalTemplate } from '@/components/templates/LegalTemplate'

export const metadata: Metadata = {
  title: 'Legal, Privacy & Affiliate Disclosures | Vellum Form',
  description:
    'Read the legal policies, affiliate disclosures, Amazon Associate terms, and privacy guidelines for Vellum Form.',
}

export default function LegalPage() {
  return <LegalTemplate lastUpdated="August 2026" contactEmail="vellumform@gmail.com" />
}
