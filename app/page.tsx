import { VellumFormTemplate, Article, ProductObject, CategoryItem } from '@/components/templates/VellumFormTemplate'
import { getFeaturedArticles, getAllCategories, urlFor } from '@/lib/sanity'

export const revalidate = 60

const fallbackCategories: CategoryItem[] = [
  { title: 'Living Spaces', slug: 'living-spaces' },
  { title: 'Daily Rituals', slug: 'daily-rituals' },
  { title: 'Skin & Wellness', slug: 'skin-wellness' },
  { title: 'The Edit', slug: 'the-edit' },
]

const fallbackArticles: Article[] = [
  {
    category: 'Living Spaces',
    title: 'The case for rooms that ask nothing of you',
    date: '14.08.26',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    slug: 'sculptural-espresso-machines',
  },
  {
    category: 'Objects',
    title: 'A quieter kind of brilliance: the new bronze age',
    date: '07.08.26',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    slug: 'sculptural-espresso-machines',
  },
  {
    category: 'Daily Rituals',
    title: 'On the pleasure of making one perfect cup',
    date: '31.07.26',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    slug: 'sculptural-espresso-machines',
  },
]

const curatedObjects: ProductObject[] = [
  {
    brand: 'SALTER HOUSE',
    title: 'The No. 2 Table Lamp',
    price: '$420',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://salterhouse.com',
  },
  {
    brand: 'ATELIER NORD',
    title: 'Hand-thrown Stoneware',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://ateliernord.com',
  },
  {
    brand: 'FORME / 01',
    title: 'Linen Throw, Natural',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://forme.studio',
  },
  {
    brand: 'MORNING OBJECTS',
    title: 'Brass Pour-over Set',
    price: '$240',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    affiliateUrl: 'https://morningobjects.com',
  },
]

export default async function Home() {
  let articles: Article[] = fallbackArticles
  let categories: CategoryItem[] = fallbackCategories

  try {
    const [sanityArticles, sanityCategories] = await Promise.all([
      getFeaturedArticles(),
      getAllCategories(),
    ])

    if (sanityCategories && sanityCategories.length > 0) {
      categories = sanityCategories.map((cat: any) => ({
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
      }))
    }

    if (sanityArticles && sanityArticles.length > 0) {
      articles = sanityArticles.map((item: any) => ({
        category: item.category?.title || 'The Edit',
        title: item.title,
        date: item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })
          : '14.08.26',
        image: item.heroImage
          ? urlFor(item.heroImage).width(1200).quality(85).url()
          : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        slug: item.slug,
      }))
    }
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)
  }

  const heroImage = articles[0]?.image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'

  return (
    <VellumFormTemplate
      heroImage={heroImage}
      heroIssue="Issue No. 04 / 2026"
      heroTitle="A room is a feeling before it is a place."
      heroDescription="An exploration of considered spaces, the objects that inhabit them, and the rituals that make them ours."
      articles={articles}
      objects={curatedObjects}
      categories={categories}
    />
  )
}
