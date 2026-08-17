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
    description
  }`
  return client.fetch(query, { slug }, { next: { revalidate: 60 } })
}

// 3. Fetch single article by slug with category and resolved featuredProducts
export async function getArticleBySlug(slug: string) {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    heroImage,
    publishedAt,
    content,
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
