import type { Metadata } from 'next'
import { AboutTemplate } from '@/components/templates/AboutTemplate'
import { getBaseUrl, JsonLd, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Us — Manifesto & The Editorial Desk',
  description:
    'Vellum Form is a luxury digital curation house dedicated to the art of intentional living, functional architecture, and timeless objects.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us — Manifesto & The Editorial Desk | Vellum Form',
    description:
      'Vellum Form is a luxury digital curation house dedicated to the art of intentional living, functional architecture, and timeless objects.',
    url: `${getBaseUrl()}/about`,
  },
}

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'About', item: '/about' },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutTemplate
        heroImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85"
        heroTag="Curation House // Manifesto"
        headline="About Vellum Form"
        subheadline="Curating the Art of Intentional Living."
        editorialEmail="vellumform@gmail.com"
        pinterestUrl="https://www.pinterest.com/vellumform/"
        instagramUrl="https://www.instagram.com/thevellumform/"
      />
    </>
  )
}
