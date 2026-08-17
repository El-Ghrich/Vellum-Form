import type { Metadata } from 'next'
import { LegalTemplate } from '@/components/templates/LegalTemplate'

export const metadata: Metadata = {
  title: 'Privacy Policy & Disclosures | Vellum Form',
  description:
    'Read the privacy guidelines, cookies policy, and affiliate disclosures for Vellum Form.',
}

export default function PrivacyPage() {
  return <LegalTemplate lastUpdated="August 2026" contactEmail="vellumform@gmail.com" />
}
