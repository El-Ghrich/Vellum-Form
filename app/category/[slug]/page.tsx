import { CategoryTemplate, CollectionItem } from '@/components/templates/CategoryTemplate'
import { getArticlesByCategory, getCategoryBySlug, getAllCategories, urlFor } from '@/lib/sanity'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryDynamicPage({ params }: PageProps) {
  const { slug } = await params

  let categoryTitle = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'COLLECTION ARCHIVE'
  let categoryDesc = 'An intentional collection of sculptural objects, tactile textiles, and refined interior decor.'
  let items: CollectionItem[] = []
  let categories: { title: string; slug: string }[] = []

  try {
    const [catData, articlesData, allCats] = await Promise.all([
      getCategoryBySlug(slug),
      getArticlesByCategory(slug),
      getAllCategories(),
    ])

    if (catData) {
      categoryTitle = catData.title?.toUpperCase() || categoryTitle
      if (catData.description) categoryDesc = catData.description
    }

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
  } catch (err) {
    console.error('Error fetching category data from Sanity:', err)
  }

  // Fallback items if Sanity has no articles in this category yet
  if (items.length === 0) {
    items = [
      {
        id: 'arc-lamp',
        title: 'The Arc Floor Lamp',
        brand: 'SALTER HOUSE',
        price: '$680',
        category: 'Lighting',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
        type: 'product',
        affiliateUrl: 'https://salterhouse.com',
      },
      {
        id: 'amber-pendant',
        title: 'Amber Glass Pendant',
        brand: 'NORTHLIGHT & CO',
        price: '$340',
        category: 'Lighting',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
        type: 'product',
        affiliateUrl: 'https://northlight.co',
      },
      {
        id: 'stoneware-vessel',
        title: 'Asymmetric Stoneware Vessel',
        brand: 'ATELIER NORD',
        price: '$165',
        category: 'Ceramics',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
        type: 'product',
        affiliateUrl: 'https://ateliernord.com',
      },
      {
        id: 'bowl-set',
        title: 'Matte Glazed Bowl Set',
        brand: 'QUIET METAL',
        price: '$120',
        category: 'Ceramics',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
        type: 'product',
        affiliateUrl: 'https://quietmetal.com',
      },
    ]
  }

  const tabs = ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))]

  return (
    <CategoryTemplate
      categoryBadge="The Collection Archive"
      title={categoryTitle}
      description={categoryDesc}
      entriesCountText={`Showing ${items.length} Curated Entries`}
      tabs={tabs}
      items={items}
      categories={categories}
      curatorsNote={{
        badge: "Curator's Note",
        quote: "We believe objects in the home should age with grace, celebrating form as much as function.",
      }}
    />
  )
}
