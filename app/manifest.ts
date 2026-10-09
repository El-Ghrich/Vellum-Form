import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vellum Form | Considered Design & Architecture',
    short_name: 'Vellum Form',
    description:
      'A digital curation house for the considered life. Curated design, architectural guides, and daily rituals.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF9F5',
    theme_color: '#111111',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
