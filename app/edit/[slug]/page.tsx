import { notFound } from 'next/navigation'
import { ArticleRoundupTemplate, Product, RelatedArticle } from '@/components/templates/ArticleRoundupTemplate'
import { getArticleBySlug, getRecentArticles, urlFor } from '@/lib/sanity'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

const fallbackProducts: Product[] = [
  {
    rank: 1,
    badge: "Editor's Choice",
    name: 'ScreenBar Halo 2',
    brand: 'BenQ',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    priceRange: 'Under $200',
    rating: 4.7,
    affiliateUrl: 'https://www.amazon.com/dp/B0DK59YKRS',
    pros: [
      'Aluminum housing and puck give a substantial, premium feel',
      'Puck rotates smoothly for intuitive, tactile brightness control',
      'Front beam lights the desktop with minimal screen glare',
    ],
    cons: [
      'Power cord is fixed at roughly five feet, not removable',
      'Wireless controller battery is non-replaceable, limiting long-term repair',
      'Counterweight clip can loosen on thick or slick monitor bezels',
    ],
    desc: 'Traditional desk lamps consume workspace and cast glare across monitor displays. The Halo 2 mounts above the screen instead, pairing an aluminum housing with dual-zone LEDs—an asymmetric front beam and a diffused ambient backlight—to separate desktop illumination from screen reflection. Wireless dial control and a CRI above 95 support accurate color work without adding desk clutter.',
  },
  {
    rank: 2,
    badge: 'Best Value Pick',
    name: 'Felt Desk Mat',
    brand: 'DAWNTREES',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    priceRange: 'Under $30',
    rating: 4.4,
    affiliateUrl: 'https://www.amazon.com/dp/B09Q58Z9T9',
    pros: [
      'Rubber backing holds the mat and keyboard in one place',
      'Felt top wipes clean and shakes off loose dust',
      'Full-size mat fits a laptop, keyboard, and mouse together',
    ],
    cons: [
      'Felt can feel rough on bare skin during heavy use',
      'Mat ships rolled and takes time to lie flat',
      'Felt soaks up liquid, so spills need quick attention',
    ],
    desc: 'Hard desks make noise, scratch easily, and let keyboards slide out of place. This mat uses a dense felt top over a rubber base to hold gear still, covering 39.4 by 19.69 inches for a laptop, keyboard, and mouse. The felt also softens typing sound and gives the wrist a comfortable rest.',
  },
]

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params

  let articleData: any = null
  let recentArticlesData: any[] = []

  try {
    const [fetchedArticle, recent] = await Promise.all([
      getArticleBySlug(slug),
      getRecentArticles(slug),
    ])
    articleData = fetchedArticle
    recentArticlesData = recent || []
  } catch (error) {
    console.error('Error fetching article from Sanity:', error)
  }

  // Fallback demo for initial dev if Sanity doesn't have the slug yet
  if (!articleData && slug !== 'sculptural-espresso-machines') {
    notFound()
  }

  const title = articleData?.title || 'Curated Workspace Essentials for Elevated Living'
  const excerpt =
    articleData?.excerpt ||
    'An intentional review of architectural objects and ergonomic desk pieces that elevate your daily workflow.'
  const categoryTitle = articleData?.category?.title || 'Living Spaces'
  const categorySlug = articleData?.category?.slug || 'living-spaces'

  // Map Sanity products with full schema fidelity
  let products: Product[] = fallbackProducts
  if (articleData?.featuredProducts && articleData.featuredProducts.length > 0) {
    products = articleData.featuredProducts.map((p: any, idx: number) => ({
      _id: p._id,
      rank: idx + 1,
      name: p.name,
      brand: p.brand,
      priceRange: p.priceRange || 'Inquire',
      rating: typeof p.rating === 'number' ? p.rating : undefined,
      badge: p.badge || undefined,
      image: p.image
        ? urlFor(p.image).width(1200).quality(85).url()
        : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      affiliateUrl: p.affiliateUrl || '#',
      pros: Array.isArray(p.pros) ? p.pros : [],
      cons: Array.isArray(p.cons) ? p.cons : [],
      desc: p.desc || undefined,
    }))
  }

  // Map related articles
  let relatedArticles: RelatedArticle[] = [
    {
      category: 'Daily Rituals',
      title: 'The case for grinding your own beans, even on a Tuesday',
      image:
        'https://images.unsplash.com/photo-1521314358897-40742d4a23a1?auto=format&fit=crop&w=1200&q=85',
      slug: 'grinding-your-own-beans',
    },
    {
      category: 'Objects',
      title: 'Brass, patina, and the beauty of things that age in public',
      image:
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
      slug: 'brass-patina-objects',
    },
  ]

  if (recentArticlesData.length > 0) {
    relatedArticles = recentArticlesData.map((art: any) => ({
      category: art.category?.title || 'Journal',
      title: art.title,
      image: art.heroImage
        ? urlFor(art.heroImage).width(1200).quality(85).url()
        : 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
      slug: art.slug,
    }))
  }

  return (
    <ArticleRoundupTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: categoryTitle, href: `/category/${categorySlug}` },
        { label: title },
      ]}
      issueLabel="Curated Edit // Vol. 01"
      title={title}
      subtitle="2026 Edition"
      updatedAt={
        articleData?.publishedAt
          ? new Date(articleData.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Aug 17, 2026'
      }
      readTime="8 min read"
      excerpt={excerpt}
      products={products}
      content={articleData?.content}
      relatedArticles={relatedArticles}
    />
  )
}
