import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pui3ifss'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// 1. Fetch featured articles for Homepage
export async function getFeaturedArticles() {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    heroImage,
    publishedAt,
    category->{
      title,
      "slug": slug.current
    }
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

// 2. Fetch articles by Category slug
export async function getArticlesByCategory(slug: string) {
  const query = `*[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    heroImage,
    publishedAt,
    category->{
      title,
      "slug": slug.current,
      description
    }
  }`
  return client.fetch(query, { slug }, { next: { revalidate: 60 } })
}

export async function getCategoryBySlug(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      metaTitle,
      metaDescription,
      shareImage,
      noIndex,
      canonicalUrl
    }
  }`
  return client.fetch(query, { slug }, { next: { revalidate: 60 } })
}

// 3. Fetch single article by slug with category, resolved author, faqs, seo, and resolved featuredProducts
export async function getArticleBySlug(slug: string) {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    heroImage,
    publishedAt,
    content,
    seo {
      metaTitle,
      metaDescription,
      shareImage,
      noIndex,
      canonicalUrl
    },
    author->{
      name,
      role,
      bio,
      image
    },
    atAGlance {
      editorsChoice->{
        _id,
        name,
        brand,
        priceRange,
        affiliateUrl,
        image,
        rating,
        badge,
        pros,
        cons,
        desc
      },
      bestValue->{
        _id,
        name,
        brand,
        priceRange,
        affiliateUrl,
        image,
        rating,
        badge,
        pros,
        cons,
        desc
      },
      bestDesign->{
        _id,
        name,
        brand,
        priceRange,
        affiliateUrl,
        image,
        rating,
        badge,
        pros,
        cons,
        desc
      }
    },
    finalVerdict {
      headline,
      summary,
      recommendedProduct->{
        _id,
        name,
        brand,
        priceRange,
        affiliateUrl,
        image,
        rating,
        badge,
        pros,
        cons,
        desc
      }
    },
    faqs[] {
      question,
      answer
    },
    category->{
      title,
      "slug": slug.current
    },
    featuredProducts[]->{
      _id,
      name,
      brand,
      priceRange,
      affiliateUrl,
      image,
      rating,
      badge,
      pros,
      cons,
      desc
    }
  }`
  return client.fetch(query, { slug }, { next: { revalidate: 60 } })
}

export async function getRecentArticles(currentSlug?: string) {
  const query = `*[_type == "article" && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    heroImage,
    category->{
      title,
      "slug": slug.current
    }
  }`
  return client.fetch(query, { currentSlug: currentSlug || '' }, { next: { revalidate: 60 } })
}

export async function getAllCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}

// Slugs for SSG / generateStaticParams / Sitemap
export async function getAllArticleSlugs(): Promise<{ slug: string; publishedAt?: string }[]> {
  try {
    const query = `*[_type == "article" && defined(slug.current)] {
      "slug": slug.current,
      publishedAt
    }`
    return await client.fetch(query, {}, { next: { revalidate: 60 } })
  } catch (err) {
    console.error('Error fetching article slugs from Sanity:', err)
    return []
  }
}

export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  try {
    const query = `*[_type == "category" && defined(slug.current)] {
      "slug": slug.current
    }`
    return await client.fetch(query, {}, { next: { revalidate: 60 } })
  } catch (err) {
    console.error('Error fetching category slugs from Sanity:', err)
    return []
  }
}

export async function searchArticles(searchTerm: string, categorySlug?: string) {
  const cleanedTerm = (searchTerm || '').trim()
  const groqTerm = cleanedTerm ? `*${cleanedTerm}*` : '*'
  
  let query = `*[_type == "article"`
  const params: Record<string, any> = { term: groqTerm }

  if (categorySlug && categorySlug !== 'all') {
    query += ` && category->slug.current == $categorySlug`
    params.categorySlug = categorySlug
  }

  if (cleanedTerm) {
    query += ` && (title match $term || excerpt match $term || category->title match $term)`
  }

  query += `] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    heroImage,
    publishedAt,
    category->{
      title,
      "slug": slug.current
    }
  }`

  return client.fetch(query, params, { next: { revalidate: 30 } })
}

export async function getCuratedProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc)[0...4] {
    _id,
    name,
    brand,
    priceRange,
    affiliateUrl,
    image,
    rating,
    badge
  }`
  return client.fetch(query, {}, { next: { revalidate: 60 } })
}
