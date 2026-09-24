import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ArticleRoundupTemplate,
  Product,
  RelatedArticle,
  FAQItem,
  AtAGlanceItem,
  FinalVerdict,
} from '@/components/templates/ArticleRoundupTemplate'
import { getArticleBySlug, getRecentArticles, getAllArticleSlugs, urlFor } from '@/lib/sanity'
import {
  getBaseUrl,
  JsonLd,
  generateArticleSchema,
  generateProductItemListSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '@/lib/seo'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

const fallbackProducts: Product[] = [
  {
    rank: 1,
    badge: "Editor's Choice",
    name: 'UltraCharge Pro 3-in-1 Wireless Charging Dock',
    brand: 'Belkin',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
    priceRange: 'Under $140',
    rating: 4.5,
    affiliateUrl: 'https://www.amazon.com/dp/B0FMB4ZY6F',
    pros: [
      '25W Qi2 charging brings an iPhone to 50% in about 25 minutes',
      'Charges phone, watch, and earbuds together with magnetic alignment',
      'ChillBoost cooling keeps the dock cooler during fast charging',
    ],
    cons: [
      'Smart fan produces a faint hum in quiet rooms',
      'Soft-touch silicone finish shows dust and dirt easily',
      'Full 25W speed requires the latest iOS software version',
    ],
    desc: 'Charging three devices usually means three separate cables and a cluttered nightstand. This dock consolidates a phone, watch, and earbuds onto one weighted base, delivering 25W Qi2 charging with magnetic alignment for the phone.',
  },
  {
    rank: 2,
    badge: 'Best Value',
    name: 'Bamboo Monitor Stand with Drawer',
    brand: 'ROCDEER',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    priceRange: 'Under $55',
    rating: 4.7,
    affiliateUrl: 'https://www.amazon.com/dp/B0F8VN5T7K',
    pros: [
      'Raises the screen to eye level, easing neck and shoulder strain',
      'Built-in drawer keeps pens and small items out of sight',
      'FSC-certified bamboo brings a warm, natural material to the desk',
    ],
    cons: [
      'Heavy or multi-monitor setups may exceed its weight tolerance',
      'Bamboo finish can be damaged by spills or high humidity',
    ],
    desc: 'A monitor set too low forces the neck into a constant downward tilt. This stand raises the screen by 4.4 inches using FSC-certified bamboo, while a lower shelf and drawer organize small accessories.',
  },
  {
    rank: 3,
    badge: 'Best Design Object',
    name: '2000 Matte Black Fountain Pen',
    brand: 'LAMY',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=85',
    priceRange: 'Under $280',
    rating: 4.4,
    affiliateUrl: 'https://www.amazon.com/dp/B000UUIZNY',
    pros: [
      'Bauhaus-era design has held a place in permanent museum collections',
      '14k gold nib, platinum-coated, writes smoothly across paper',
      'Piston-fill mechanism holds a large ink reserve from the bottle',
    ],
    cons: [
      'Fine nib writes closer to a medium width than expected',
      'Hooded nib demands a consistent angle or it may skip',
    ],
    desc: 'The 2000 uses a fiberglass-reinforced barrel and a platinum-coated gold nib, filled by piston from a bottle rather than a cartridge. Its form, unchanged since the 1960s, remains on permanent display at MoMA.',
  },
  {
    rank: 4,
    badge: 'Best for Concealment',
    name: 'Cable Management Box',
    brand: 'D-Line',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
    priceRange: 'Under $25',
    rating: 4.5,
    affiliateUrl: 'https://www.amazon.com/dp/B00846E7JW',
    pros: [
      'ABS plastic construction is electrically safe and heat-resistant',
      'Rear entry slots route cables neatly without exposed wiring',
      'Compact 12.75-inch footprint fits behind desks or units',
    ],
    cons: [
      'Fits power strips no longer than 10.5 inches',
      'Click-lock lid can be stiff to open on first use',
    ],
    desc: 'A power strip left exposed undermines an otherwise clean desk. This box encloses it behind curved, neutral-toned ABS plastic, with three rear slots routing cables without spilling them into view.',
  },
  {
    rank: 5,
    badge: 'Best Everyday Layer',
    name: 'Felt Desk Mat',
    brand: 'DAWNTREES',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    priceRange: 'Under $20',
    rating: 4.4,
    affiliateUrl: 'https://www.amazon.com/dp/B09MVT9Y98',
    pros: [
      'Dense felt shields the desk from scratches, spills, and wear',
      'Rubberized base keeps the mat fixed during daily use',
      'Felt layer dampens keyboard and mouse click noise',
    ],
    cons: [
      'Raw felt can feel slightly textured during rapid wrist movement',
      'Spills should be blotted immediately',
    ],
    desc: 'A bare desk surface picks up scratches and the hard clatter of typing over time. This mat layers dense felt over a rubberized, non-slip base, quietening the workspace with architectural warmth.',
  },
]

const defaultEditorialFaqs: FAQItem[] = [
  {
    question: 'How are the objects in this edit curated and tested?',
    answer:
      'Every piece featured is evaluated by our editorial desk against four criteria: tactile material integrity, ergonomic functionality, aesthetic harmony, and longevity under daily use.',
  },
  {
    question: 'Are affiliate links included in this edition?',
    answer:
      'Yes. Vellum Form participates in curated affiliate partnerships. If you make an acquisition through our links, we may receive a commission at no additional cost to you.',
  },
]

function formatProduct(p: any, idx: number = 0): Product {
  return {
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
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticleSlugs()
  const slugs = new Set<string>(['sculptural-espresso-machines'])
  articles.forEach((a) => {
    if (a.slug) slugs.add(a.slug)
  })
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const baseUrl = getBaseUrl()
  let article: any = null

  try {
    article = await getArticleBySlug(slug)
  } catch (e) {
    console.error('Error fetching article metadata:', e)
  }

  if (!article && slug !== 'sculptural-espresso-machines') {
    return {
      title: 'Article Not Found',
    }
  }

  const title = article?.seo?.metaTitle || article?.title || 'Curated Workspace Essentials for Elevated Living'
  const description =
    article?.seo?.metaDescription ||
    article?.excerpt ||
    'An intentional review of architectural objects and ergonomic desk pieces that elevate your daily workflow.'
  const canonical = article?.seo?.canonicalUrl || `${baseUrl}/edit/${slug}`

  let imageUrl = `${baseUrl}/opengraph-image`
  if (article?.seo?.shareImage) {
    imageUrl = urlFor(article.seo.shareImage).width(1200).height(630).quality(85).url()
  } else if (article?.heroImage) {
    imageUrl = urlFor(article.heroImage).width(1200).height(630).quality(85).url()
  }

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: article?.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      publishedTime: article?.publishedAt || undefined,
      authors: [article?.author?.name || 'The Editorial Desk'],
      section: article?.category?.title || 'Living Spaces',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

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

  // Hero Cover Image
  const heroImage = articleData?.heroImage
    ? urlFor(articleData.heroImage).width(1600).quality(90).url()
    : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85'
  const heroImageAlt = articleData?.heroImage?.alt || title

  // Map Sanity products with full schema fidelity
  let products: Product[] = fallbackProducts
  if (articleData?.featuredProducts && articleData.featuredProducts.length > 0) {
    products = articleData.featuredProducts.map((p: any, idx: number) => formatProduct(p, idx))
  }

  // At a glance recommendations
  let atAGlance: AtAGlanceItem[] | undefined = undefined
  if (articleData?.atAGlance) {
    const items: AtAGlanceItem[] = []
    if (articleData.atAGlance.editorsChoice) {
      items.push({
        award: "Editor's Choice",
        product: formatProduct(articleData.atAGlance.editorsChoice, 0),
        summary: articleData.atAGlance.editorsChoice.desc,
      })
    }
    if (articleData.atAGlance.bestValue) {
      items.push({
        award: 'Best Value',
        product: formatProduct(articleData.atAGlance.bestValue, 1),
        summary: articleData.atAGlance.bestValue.desc,
      })
    }
    if (articleData.atAGlance.bestDesign) {
      items.push({
        award: 'Best Design Object',
        product: formatProduct(articleData.atAGlance.bestDesign, 2),
        summary: articleData.atAGlance.bestDesign.desc,
      })
    }
    if (items.length > 0) {
      atAGlance = items
    }
  }

  // Final Verdict
  let finalVerdict: FinalVerdict | undefined = undefined
  if (articleData?.finalVerdict) {
    finalVerdict = {
      headline: articleData.finalVerdict.headline || 'The Final Verdict',
      summary: articleData.finalVerdict.summary,
      product: articleData.finalVerdict.recommendedProduct
        ? formatProduct(articleData.finalVerdict.recommendedProduct)
        : products[0],
    }
  } else {
    finalVerdict = {
      headline: 'The Final Verdict',
      summary:
        'A workspace is judged by its smallest details — a charging dock, a pen, a mat. If you make only one acquisition to immediately improve your daily ritual, the UltraCharge Pro removes cables and clutter with architectural elegance. For permanent craftsmanship, the LAMY 2000 remains unmatched in history and hand-feel.',
      product: products[0],
    }
  }

  // FAQs
  const faqs: FAQItem[] =
    articleData?.faqs && articleData.faqs.length > 0 ? articleData.faqs : defaultEditorialFaqs

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

  // Schema.org Structured Data
  const articleSchema = generateArticleSchema({
    title,
    description: excerpt,
    url: `/edit/${slug}`,
    imageUrl: heroImage,
    datePublished: articleData?.publishedAt,
    authorName: articleData?.author?.name || 'The Editorial Desk',
    authorRole: articleData?.author?.role || 'Editor & Curator',
    categoryName: categoryTitle,
  })

  const productListSchema = generateProductItemListSchema(
    products,
    `${title} — Curated Selections`,
    `/edit/${slug}`
  )

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: categoryTitle, item: `/category/${categorySlug}` },
    { name: title, item: `/edit/${slug}` },
  ])

  const faqSchema = generateFAQPageSchema(faqs)

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={productListSchema} />
      <JsonLd data={breadcrumbsSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <ArticleRoundupTemplate
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: categoryTitle, href: `/category/${categorySlug}` },
          { label: title },
        ]}
        issueLabel="Curated Edit // Vol. 01"
        heroImage={heroImage}
        heroImageAlt={heroImageAlt}
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
        atAGlance={atAGlance}
        products={products}
        content={articleData?.content}
        faqs={faqs}
        finalVerdict={finalVerdict}
        author={articleData?.author}
        relatedArticles={relatedArticles}
      />
    </>
  )
}
