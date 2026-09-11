import type { Metadata } from 'next'
import { CategoryTemplate, CollectionItem } from '@/components/templates/CategoryTemplate'
import { getAllCategories, getFeaturedArticles, urlFor } from '@/lib/sanity'
import {
  getBaseUrl,
  JsonLd,
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Collections & Disciplines',
  description:
    'Explore the complete Vellum Form archive: living spaces, daily rituals, tactile ceramics, lighting, and wellness.',
  alternates: {
    canonical: '/category',
  },
  openGraph: {
    title: 'All Collections & Disciplines | Vellum Form',
    description:
      'Explore the complete Vellum Form archive: living spaces, daily rituals, tactile ceramics, lighting, and wellness.',
    url: `${getBaseUrl()}/category`,
  },
}

export default async function CategoryIndexPage() {
  let categories: { title: string; slug: string }[] = []
  let items: CollectionItem[] = []

  try {
    const [allCats, articlesData] = await Promise.all([
      getAllCategories(),
      getFeaturedArticles(),
    ])

    if (allCats && allCats.length > 0) {
      categories = allCats.map((c: any) => ({
        title: c.title,
        slug: c.slug,
      }))
    }

    if (articlesData && articlesData.length > 0) {
      items = articlesData.map((article: any) => ({
        id: article._id,
        title: article.title,
        brand: 'THE EDITORIAL DESK',
        price: 'Story',
        category: article.category?.title || 'Editorial',
        image: article.heroImage
          ? urlFor(article.heroImage).width(1200).quality(85).url()
          : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        type: 'article' as const,
        slug: article.slug,
      }))
    }
  } catch (error) {
    console.error('Error fetching all categories index:', error)
  }

  const tabs = ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))]

  const collectionSchema = generateCollectionPageSchema({
    name: 'All Collections & Disciplines',
    description:
      'An intentional collection of sculptural objects, tactile textiles, and curated stories across all our disciplines.',
    url: '/category',
    itemCount: items.length,
  })

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Collections', item: '/category' },
  ])

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbsSchema} />
      <CategoryTemplate
        categoryBadge="The Complete Collection"
        title="ALL CATEGORIES"
        description="An intentional collection of sculptural objects, tactile textiles, and curated stories across all our disciplines."
        entriesCountText={`Showing ${items.length} Curated Stories`}
        tabs={tabs}
        items={items}
        categories={categories}
        curatorsNote={{
          badge: "Curator's Note",
          quote: "We believe objects and stories in the home should age with grace, celebrating form as much as function.",
        }}
      />
    </>
  )
}
