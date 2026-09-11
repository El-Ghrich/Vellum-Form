import type { Metadata } from 'next'
import { VellumFormTemplate, Article, ProductObject, CategoryItem } from '@/components/templates/VellumFormTemplate'
import { getFeaturedArticles, getAllCategories, getCuratedProducts, urlFor } from '@/lib/sanity'
import { getBaseUrl, JsonLd } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Vellum Form | Considered Design & Architecture',
  description:
    'A digital curation house for the considered life. Curated design, architectural guides, and daily rituals.',
  alternates: {
    canonical: '/',
  },
}

const fallbackCategories: CategoryItem[] = [
  { title: 'Living Spaces', slug: 'living-spaces' },
  { title: 'Daily Rituals', slug: 'daily-rituals' },
  { title: 'Skin & Wellness', slug: 'skin-wellness' },
]

const fallbackArticles: Article[] = [
  {
    category: 'Living Spaces',
    title: 'The case for rooms that ask nothing of you',
    excerpt: 'An exploration of quiet minimalism, natural light, and spaces composed for presence rather than performance.',
    date: '14.08.26',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    slug: 'sculptural-espresso-machines',
    issue: 'Issue No. 04 / 2026',
    readTime: '08 min read',
  },
  {
    category: 'Daily Rituals',
    title: 'A quieter kind of brilliance: the new bronze age',
    excerpt: 'Examining the tactile beauty of living metals, hand-cast patinas, and architectural objects engineered to age with grace.',
    date: '07.08.26',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    slug: 'sculptural-espresso-machines',
    issue: 'Issue No. 03 / 2026',
    readTime: '06 min read',
  },
  
]

const realCuratedObjects: ProductObject[] = [
  {
    brand: 'BELKIN',
    title: 'UltraCharge Pro 3-in-1 Charging Dock',
    price: '$140',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://www.amazon.com/dp/B0FMB4ZY6F',
  },
  {
    brand: 'ROCDEER',
    title: 'Bamboo Monitor Stand with Drawer',
    price: '$55',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://www.amazon.com/dp/B0F8VN5T7K',
  },
  {
    brand: 'LAMY',
    title: '2000 Matte Black Fountain Pen',
    price: '$280',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://www.amazon.com/dp/B000UUIZNY',
  },
  {
    brand: 'DAWNTREES',
    title: 'Dense Felt Desk Mat',
    price: '$20',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://www.amazon.com/dp/B09MVT9Y98',
  },
]

export default async function Home() {
  let articles: Article[] = fallbackArticles
  let categories: CategoryItem[] = fallbackCategories
  let objects: ProductObject[] = realCuratedObjects

  try {
    const [sanityArticles, sanityCategories, sanityProducts] = await Promise.all([
      getFeaturedArticles(),
      getAllCategories(),
      getCuratedProducts(),
    ])

    if (sanityCategories && sanityCategories.length > 0) {
      categories = sanityCategories.map((cat: any) => ({
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
      }))
    }

    if (sanityArticles && sanityArticles.length > 0) {
      articles = sanityArticles.map((item: any, idx: number) => ({
        category: item.category?.title || 'The Edit',
        title: item.title,
        excerpt: item.excerpt || 'An exploration of considered spaces, the objects that inhabit them, and the rituals that make them ours.',
        date: item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })
          : '14.08.26',
        image: item.heroImage
          ? urlFor(item.heroImage).width(1600).quality(90).url()
          : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        slug: item.slug,
        issue: `Issue No. 0${idx + 1} / 2026`,
        readTime: '08 min read',
      }))
    }

    if (sanityProducts && sanityProducts.length > 0) {
      objects = sanityProducts.map((p: any) => ({
        brand: p.brand || 'CURATED',
        title: p.name,
        price: p.priceRange || 'Inquire',
        image: p.image
          ? urlFor(p.image).width(1200).quality(85).url()
          : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
        affiliateUrl: p.affiliateUrl || 'https://www.amazon.com',
      }))
    }
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)
  }

  const heroImage = articles[0]?.image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
  const baseUrl = getBaseUrl()

  const featuredArticlesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Editorial Edits',
    numberOfItems: articles.length,
    itemListElement: articles.map((art, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${baseUrl}/edit/${art.slug}`,
      name: art.title,
      description: art.excerpt,
    })),
  }

  return (
    <>
      <JsonLd data={featuredArticlesSchema} />
      <VellumFormTemplate
        heroImage={heroImage}
        heroIssue="Issue No. 04 / 2026"
        heroTitle="A room is a feeling before it is a place."
        heroDescription="An exploration of considered spaces, the objects that inhabit them, and the rituals that make them ours."
        articles={articles}
        objects={objects}
        categories={categories}
      />
    </>
  )
}
