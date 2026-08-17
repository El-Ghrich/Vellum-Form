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
    badge: "Best Overall — Editor's Choice",
    title: 'The Monolith',
    brand: 'Atelier Nord',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=1200&q=85',
    price: '$3,200',
    keyFeature: 'Matte ceramic-coated steel body',
    why: [
      'The Monolith earned its place at the top of this list not through excess but through restraint. Every surface is unbroken matte black, every control is recessed flush into the body.',
      'What separates it from imitators is the dual-boiler thermal system, borrowed from commercial platforms and re-engineered into a residential counter footprint.',
    ],
    specs: [
      { label: 'Material', value: 'Ceramic-coated stainless steel' },
      { label: 'Dimensions', value: '14.2" W x 16.8" D x 15.4" H' },
      { label: 'Origin', value: 'Assembled in Northern Italy' },
      { label: 'Warranty', value: '5-year limited manufacturer warranty' },
    ],
    pros: ['Commercial-grade dual boiler in a compact form', 'PID temperature stability within 0.5°F', 'Unbroken, gallery-worthy matte finish'],
    cons: ['Premium price point', 'Requires a dedicated water line for full function'],
    affiliateUrl: 'https://ateliernord.com',
    ctaLabel: 'Check Availability on Official Site',
  },
  {
    rank: 2,
    badge: 'Best Design',
    title: 'Ceramic Form No. 3',
    brand: 'Studio Archive',
    image: 'https://images.unsplash.com/photo-1521314358897-40742d4a23a1?auto=format&fit=crop&w=1200&q=85',
    price: '$1,890',
    keyFeature: 'Hand-glazed stoneware housing',
    why: [
      'Studio Archive built its reputation on tableware, and Ceramic Form No. 3 is what happens when that sensibility is applied to an espresso machine.',
      'Internals are entirely conventional and well-proven — a single boiler with a rotary pump tuned for lighter-roast pours.',
    ],
    specs: [
      { label: 'Material', value: 'Glazed stoneware over steel frame' },
      { label: 'Dimensions', value: '11.8" W x 15.0" D x 14.2" H' },
      { label: 'Origin', value: 'Hand-finished in Kyoto, Japan' },
      { label: 'Warranty', value: '3-year limited manufacturer warranty' },
    ],
    pros: ['Genuinely one-of-a-kind hand-glazed finish', 'Quiet rotary pump operation'],
    cons: ['Longer heat-up time than steel competitors', 'Ceramic housing requires careful handling'],
    affiliateUrl: 'https://studioarchive.com',
    ctaLabel: 'Check Availability on Amazon',
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

  const title = articleData?.title || 'The 7 Best Sculptural Espresso Machines for Elevated Living'
  const excerpt = articleData?.excerpt || 'An intentional review of architectural kitchen objects that elevate your morning pour.'
  const categoryTitle = articleData?.category?.title || 'Living Spaces'
  const categorySlug = articleData?.category?.slug || 'living-spaces'

  // Map Sanity products
  let products: Product[] = fallbackProducts
  if (articleData?.featuredProducts && articleData.featuredProducts.length > 0) {
    products = articleData.featuredProducts.map((p: any, idx: number) => ({
      rank: idx + 1,
      badge: p.badge || (idx === 0 ? "Best Overall — Editor's Choice" : `Curator's Selection #${idx + 1}`),
      title: p.name,
      brand: p.brand,
      image: p.image
        ? urlFor(p.image).width(1000).quality(85).url()
        : 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=1200&q=85',
      price: p.priceRange || '$--',
      keyFeature: p.brand ? `Crafted by ${p.brand}` : 'Curated Specification',
      why: [
        `${p.name} was selected for its sculptural silhouette, material honesty, and refined tactile feedback during daily rituals.`,
        'Every detail from the finish to the mechanical action has been vetted for longevity and aesthetic balance.',
      ],
      specs: [
        { label: 'Maker', value: p.brand || 'Artisan Workshop' },
        { label: 'Rating', value: `${p.rating || 5} / 5 Editorial Stars` },
      ],
      pros: p.pros && p.pros.length > 0 ? p.pros : ['Sculptural gallery-worthy presence', 'Tactile material craftsmanship'],
      cons: p.cons && p.cons.length > 0 ? p.cons : ['Limited edition craft production'],
      affiliateUrl: p.affiliateUrl || '#',
      ctaLabel: 'Check Availability on Official Site',
      rating: p.rating || 5,
    }))
  }

  // Map related articles
  let relatedArticles: RelatedArticle[] = [
    {
      category: 'Daily Rituals',
      title: 'The case for grinding your own beans, even on a Tuesday',
      image: 'https://images.unsplash.com/photo-1521314358897-40742d4a23a1?auto=format&fit=crop&w=1200&q=85',
      slug: 'grinding-your-own-beans',
    },
    {
      category: 'Objects',
      title: 'Brass, patina, and the beauty of things that age in public',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
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
      issueLabel="Curated List // The Edit"
      title={title}
      subtitle="2026 Edition"
      curator="The Editorial Desk"
      updatedAt={
        articleData?.publishedAt
          ? new Date(articleData.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Aug 16, 2026'
      }
      readTime="10 min read"
      excerpt={excerpt}
      products={products}
      content={articleData?.content}
      relatedArticles={relatedArticles}
      authorImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85"
      authorName="The Editorial Desk"
      authorBio="Curators of the considered life, since 2019"
    />
  )
}
