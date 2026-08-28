import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Search, Tag, Sparkles } from 'lucide-react'
import { getAllCategories, searchArticles, urlFor } from '@/lib/sanity'
import { Reveal } from '@/components/reveal'
import { SearchClientView } from './SearchClientView'

export const revalidate = 30

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', category = '' } = await searchParams
  
  let categories: { title: string; slug: string }[] = []
  let articles: any[] = []

  try {
    const [cats, rawArticles] = await Promise.all([
      getAllCategories(),
      searchArticles(q, category),
    ])
    
    categories = (cats || []).map((c: any) => ({
      title: c.title,
      slug: c.slug,
    }))

    articles = (rawArticles || []).map((art: any) => ({
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
        ? urlFor(art.heroImage).width(1200).quality(85).url()
        : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    }))
  } catch (error) {
    console.error('Error in SearchPage data fetching:', error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
          <Link href="/" className="font-sans text-[11px] font-semibold tracking-[0.28em]">
            VELLUM FORM
          </Link>
          <nav className="hidden items-center gap-8 font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:flex">
            <Link href="/#objects" className="transition-colors hover:text-foreground">Objects</Link>
            <Link href="/category/living-spaces" className="transition-colors hover:text-foreground">Living Spaces</Link>
            <Link href="/category/daily-rituals" className="transition-colors hover:text-foreground">Daily Rituals</Link>
            <Link href="/#the-edit" className="transition-colors hover:text-foreground">The Edit</Link>
            <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
          </nav>
        </div>
      </header>

      {/* Hero & Interactive Search Header */}
      <section className="border-b border-border bg-[#FBF9F5]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20 text-center flex flex-col items-center">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051] mb-3">
              Journal Archive & Curation
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-serif text-4xl tracking-[-0.03em] md:text-6xl">
              Search the Edit
            </h1>
          </Reveal>
          <Reveal delay={200} className="w-full max-w-xl mt-8">
            <Suspense fallback={<div>Loading search...</div>}>
              <SearchClientView initialQuery={q} initialCategory={category} categories={categories} />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* Results Section */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-4 font-sans text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>
            {q.trim() ? `Search results for "${q}"` : 'All Journal Stories'}
            {category && ` in ${categories.find(c => c.slug === category)?.title || category}`}
          </span>
          <span>{articles.length} {articles.length === 1 ? 'Article' : 'Articles'}</span>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {articles.map((article, index) => (
              <Reveal key={article.id || article.slug} as="article" delay={index * 80} className="group">
                <Link href={`/edit/${article.slug}`} className="block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8A7051]">
                      {article.category}
                    </p>
                    {article.publishedAt && (
                      <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {article.publishedAt}
                      </p>
                    )}
                  </div>
                  <h3 className="mt-2.5 font-serif text-2xl leading-tight tracking-[-0.02em] group-hover:underline">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-[#8A7051]">
                    Read story <ArrowUpRight size={12} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Sparkles size={32} strokeWidth={1.25} className="mx-auto text-muted-foreground/60 mb-4" />
            <h2 className="font-serif text-2xl text-foreground">No articles found</h2>
            <p className="mt-2 font-sans text-sm text-muted-foreground max-w-md mx-auto">
              We couldn&apos;t find any articles matching your search. Explore our curated collections or try searching for keywords like &ldquo;living&rdquo;, &ldquo;espresso&rdquo;, or &ldquo;lighting&rdquo;.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="rounded-full border border-border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:border-[#8A7051] hover:text-[#8A7051] transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-[#FBF9F5] py-12">
        <div className="mx-auto max-w-[1440px] px-5 text-center md:px-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            © {new Date().getFullYear()} Vellum Form. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
