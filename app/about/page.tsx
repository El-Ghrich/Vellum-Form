import type { Metadata } from 'next'
import { AboutTemplate } from '@/components/templates/AboutTemplate'

export const metadata: Metadata = {
  title: 'About Us | Vellum Form — Digital Curation House',
  description:
    'Vellum Form is a luxury digital curation house dedicated to the art of intentional living, functional architecture, and timeless objects.',
}

export default function AboutPage() {
  return (
    <AboutTemplate
      heroImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85"
      heroTag="Curation House // Manifesto"
      headline="About Vellum Form"
      subheadline="Curating the Art of Intentional Living."
      manifestoStatement="We believe that a space is not merely filled—it is composed. Every silhouette, texture, and light source shapes our everyday rituals."
      editorialEmail="editorial@vellumform.com"
      pinterestUrl="https://pinterest.com"
      instagramUrl="https://instagram.com"
    />
  )
}
