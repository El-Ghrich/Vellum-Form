import React from 'react'

export function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://vellumform.com'
  return url.replace(/\/+$/, '')
}

export function JsonLd({ data }: { data: Record<string, any> | Array<Record<string, any>> | null }) {
  if (!data) return null
  // Escape '<' to prevent XSS / script closing injection in initial HTML
  const jsonString = JSON.stringify(data).replace(/</g, '\\u003c')
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: jsonString },
  })
}

export interface BreadcrumbItem {
  name: string
  item?: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = getBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item
        ? crumb.item.startsWith('http')
          ? crumb.item
          : `${baseUrl}${crumb.item.startsWith('/') ? crumb.item : `/${crumb.item}`}`
        : undefined,
    })),
  }
}

export function generateOrganizationSchema() {
  const baseUrl = getBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Vellum Form',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/round-logo.png`,
      caption: 'Vellum Form Seal',
    },
    description:
      'A digital curation house for the considered life. Curated design, architectural guides, and daily rituals.',
    sameAs: [
      'https://www.pinterest.com/vellumform/',
      'https://www.instagram.com/thevellumform/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'vellumform@gmail.com',
      contactType: 'editorial desk',
    },
  }
}

export function generateWebSiteSchema() {
  const baseUrl = getBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Vellum Form',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  authorRole?: string
  categoryName?: string
}

export function generateArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName = 'The Editorial Desk',
  authorRole = 'Editor & Curator',
  categoryName,
}: ArticleSchemaProps) {
  const baseUrl = getBaseUrl()
  const canonicalUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`
  const image = imageUrl || `${baseUrl}/round-logo.png`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: title,
    description: description,
    image: [image],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || datePublished || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vellum Form',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/round-logo.png`,
      },
    },
    ...(categoryName ? { articleSection: categoryName } : {}),
  }
}

export interface ProductItemForSchema {
  name: string
  brand: string
  image?: string
  rating?: number
  priceRange?: string
  affiliateUrl?: string
  desc?: string
}

export function generateProductItemListSchema(
  products: ProductItemForSchema[],
  listTitle: string,
  listUrl: string
) {
  const baseUrl = getBaseUrl()
  const canonicalUrl = listUrl.startsWith('http') ? listUrl : `${baseUrl}${listUrl.startsWith('/') ? listUrl : `/${listUrl}`}`

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listTitle,
    url: canonicalUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const productSchema: Record<string, any> = {
        '@type': 'Product',
        name: product.name,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        image: product.image,
        description: product.desc || `${product.name} by ${product.brand}`,
      }

      if (product.rating) {
        productSchema.review = {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: product.rating,
            bestRating: 5,
            worstRating: 1,
          },
          author: {
            '@type': 'Organization',
            name: 'The Editorial Desk',
          },
        }
      }

      if (product.affiliateUrl && product.affiliateUrl !== '#') {
        productSchema.offers = {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          price: product.priceRange?.replace(/[^0-9.]/g, '') || undefined,
          availability: 'https://schema.org/InStock',
          url: product.affiliateUrl,
        }
      }

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: productSchema,
      }
    }),
  }
}

export interface FAQItem {
  question: string
  answer: string
}

export function generateFAQPageSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateCollectionPageSchema({
  name,
  description,
  url,
  itemCount,
}: {
  name: string
  description: string
  url: string
  itemCount?: number
}) {
  const baseUrl = getBaseUrl()
  const canonicalUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Vellum Form',
      url: baseUrl,
    },
    ...(itemCount !== undefined ? { mainEntity: { '@type': 'ItemList', numberOfItems: itemCount } } : {}),
  }
}
