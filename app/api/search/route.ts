import { NextRequest, NextResponse } from 'next/server'
import { searchArticles, getAllCategories, urlFor } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  try {
    const rawArticles = await searchArticles(q, category)
    
    const articles = (rawArticles || []).map((art: any) => ({
      id: art._id,
      title: art.title,
      slug: art.slug,
      excerpt: art.excerpt || '',
      category: art.category?.title || 'Editorial',
      categorySlug: art.category?.slug || '',
      publishedAt: art.publishedAt
        ? new Date(art.publishedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          })
        : '',
      image: art.heroImage
        ? urlFor(art.heroImage).width(800).quality(85).url()
        : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85',
    }))

    return NextResponse.json({
      success: true,
      query: q,
      category,
      total: articles.length,
      articles,
    })
  } catch (error: any) {
    console.error('Error executing article search:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to search articles',
        articles: [],
      },
      { status: 500 }
    )
  }
}
