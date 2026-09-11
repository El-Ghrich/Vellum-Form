import { MetadataRoute } from 'next'
import { getAllArticleSlugs, getAllCategorySlugs } from '@/lib/sanity'
import { getBaseUrl } from '@/lib/seo'

export const revalidate = 3600 // Regenerate sitemap at most once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const now = new Date()

  // 1. Static Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // 2. Fetch dynamic categories
  let categoryEntries: MetadataRoute.Sitemap = []
  try {
    const categories = await getAllCategorySlugs()
    const slugs = new Set<string>(['living-spaces', 'daily-rituals', 'skin-wellness', 'lighting', 'ceramics'])
    categories.forEach((c) => {
      if (c.slug) slugs.add(c.slug)
    })

    categoryEntries = Array.from(slugs).map((slug) => ({
      url: `${baseUrl}/category/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Error fetching categories for sitemap:', e)
  }

  // 3. Fetch dynamic articles
  let articleEntries: MetadataRoute.Sitemap = []
  try {
    const articles = await getAllArticleSlugs()
    const seenSlugs = new Set<string>()

    // Add fallback article if not in Sanity yet
    if (!articles.some((a) => a.slug === 'sculptural-espresso-machines')) {
      articleEntries.push({
        url: `${baseUrl}/edit/sculptural-espresso-machines`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      })
      seenSlugs.add('sculptural-espresso-machines')
    }

    articles.forEach((art) => {
      if (art.slug && !seenSlugs.has(art.slug)) {
        seenSlugs.add(art.slug)
        articleEntries.push({
          url: `${baseUrl}/edit/${art.slug}`,
          lastModified: art.publishedAt ? new Date(art.publishedAt) : now,
          changeFrequency: 'weekly',
          priority: 0.9,
        })
      }
    })
  } catch (e) {
    console.error('Error fetching articles for sitemap:', e)
  }

  return [...staticPages, ...categoryEntries, ...articleEntries]
}
