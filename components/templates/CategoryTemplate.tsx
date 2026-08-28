'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Eye, Grid3x3, LayoutGrid } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryOption } from '@/components/SearchModal'

export interface CollectionItem {
  id: string
  title: string
  brand: string
  price: string
  category: string
  image: string
  type: 'product' | 'article'
  href?: string
  slug?: string
  affiliateUrl?: string
}

export interface CategoryTemplateProps {
  categoryBadge?: string
  title: string
  description?: string
  entriesCountText?: string
  tabs?: string[]
  items: CollectionItem[]
  categories?: CategoryOption[]
  curatorsNote?: {
    badge?: string
    quote: string
  }
}

const defaultCategories: CategoryOption[] = [
  { title: 'Living Spaces', slug: 'living-spaces' },
  { title: 'Daily Rituals', slug: 'daily-rituals' },
  { title: 'Skin & Wellness', slug: 'skin-wellness' },
  { title: 'The Edit', slug: 'the-edit' },
]

const sortOptions = ["Curator's Pick", 'Newest Editions', 'Price: Ascending', 'Price: Descending'] as const
type SortOption = (typeof sortOptions)[number]

function priceValue(price: string) {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

export function CategoryTemplate({
  categoryBadge = 'The Collection Archive',
  title,
  description,
  entriesCountText,
  tabs = ['All'],
  items,
  categories = defaultCategories,
  curatorsNote,
}: CategoryTemplateProps) {
  const [activeTab, setActiveTab] = useState<string>('All')
  const [sort, setSort] = useState<SortOption>("Curator's Pick")
  const [sortOpen, setSortOpen] = useState(false)
  const [view, setView] = useState<'grid' | 'editorial'>('grid')

  const filtered = useMemo(() => {
    const base = activeTab === 'All' ? items : items.filter((item) => item.category === activeTab)
    const sorted = [...base]
    if (sort === 'Price: Ascending') sorted.sort((a, b) => priceValue(a.price) - priceValue(b.price))
    if (sort === 'Price: Descending') sorted.sort((a, b) => priceValue(b.price) - priceValue(a.price))
    if (sort === 'Newest Editions') sorted.reverse()
    return sorted
  }, [items, activeTab, sort])

  const beforeNote = filtered.slice(0, Math.max(1, Math.ceil(filtered.length / 2)))
  const afterNote = filtered.slice(Math.max(1, Math.ceil(filtered.length / 2)))

  const navCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Unified Header */}
      <Header categories={navCategories} />

      {/* Hero / Header Section */}
      <section className="border-b border-border bg-[#FBF9F5]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-16 text-center md:px-10 md:py-24">
          {categoryBadge && (
            <Reveal>
              <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.24em] text-accent">{categoryBadge}</p>
            </Reveal>
          )}
          <Reveal delay={100}>
            <h1 className="font-serif text-4xl uppercase tracking-[-0.03em] md:text-6xl">{title}</h1>
          </Reveal>
          {description && (
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg font-sans text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </Reveal>
          )}
          <Reveal delay={300}>
            <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {entriesCountText || `Showing ${filtered.length} Curated Entries`}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Toolbar / Filters */}
      <section className="sticky top-[69px] z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 whitespace-nowrap border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  activeTab === tab
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 border border-border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {sort}
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-56 border border-border bg-background shadow-lg">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSort(option)
                        setSortOpen(false)
                      }}
                      className={`block w-full px-4 py-3 text-left font-sans text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-muted ${
                        option === sort ? 'text-accent font-semibold' : 'text-muted-foreground'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center border border-border">
              <button
                aria-label="Grid view, 3 columns"
                aria-pressed={view === 'grid'}
                onClick={() => setView('grid')}
                className={`flex h-9 w-9 items-center justify-center transition-colors duration-300 ${view === 'grid' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Grid3x3 size={15} strokeWidth={1.5} />
              </button>
              <button
                aria-label="Editorial view, 2 columns"
                aria-pressed={view === 'editorial'}
                onClick={() => setView('editorial')}
                className={`flex h-9 w-9 items-center justify-center border-l border-border transition-colors duration-300 ${view === 'editorial' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        {filtered.length > 0 ? (
          <>
            <div className={view === 'grid' ? 'grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-16' : 'grid gap-x-6 gap-y-16 md:grid-cols-2'}>
              {beforeNote.map((item, index) => (
                <CollectionCard key={item.id} item={item} index={index} large={view === 'editorial'} />
              ))}
            </div>

            {curatorsNote && (
              <Reveal className="mx-auto my-16 max-w-2xl border-y border-border py-12 text-center md:my-24">
                {curatorsNote.badge && (
                  <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.22em] text-accent">{curatorsNote.badge}</p>
                )}
                <blockquote className="font-serif text-2xl leading-snug tracking-[-0.02em] text-balance md:text-3xl">
                  &quot;{curatorsNote.quote}&quot;
                </blockquote>
              </Reveal>
            )}

            {afterNote.length > 0 && (
              <div className={view === 'grid' ? 'grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-16' : 'grid gap-x-6 gap-y-16 md:grid-cols-2'}>
                {afterNote.map((item, index) => (
                  <CollectionCard key={item.id} item={item} index={index + beforeNote.length} large={view === 'editorial'} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl">No stories currently in this category.</p>
            <p className="mt-3 font-sans text-sm text-muted-foreground">Explore our other collections or search across all articles.</p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              {navCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="rounded-full border border-border px-4 py-2 font-sans text-[10px] uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Unified Footer */}
      <Footer categories={navCategories} />
    </main>
  )
}

function CollectionCard({ item, index, large }: { item: CollectionItem; index: number; large: boolean }) {
  const isProduct = item.type === 'product'
  const destinationUrl = isProduct
    ? item.affiliateUrl || item.href || '#'
    : item.href || (item.slug ? `/edit/${item.slug}` : '/edit/featured-story')

  return (
    <Reveal delay={(index % 4) * 90} as="article" className="group">
      <a
        href={destinationUrl}
        target={isProduct ? '_blank' : undefined}
        rel={isProduct ? 'noopener noreferrer nofollow' : undefined}
        className="block"
      >
        <div className={`relative overflow-hidden rounded-sm bg-muted ${large ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 33vw'}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/20 group-hover:opacity-100">
            <span className="flex items-center gap-2 border border-background bg-background/90 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Eye size={13} strokeWidth={1.5} /> {isProduct ? 'Check Availability' : 'Read Story'}
            </span>
          </div>
        </div>
        <p className="mt-4 font-sans text-[9px] tracking-[0.16em] text-accent">{item.brand}</p>
        <h3 className={`mt-2 font-serif leading-tight group-hover:underline ${large ? 'text-2xl' : 'text-lg'}`}>{item.title}</h3>
        <div className="mt-3 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>{item.price}</span>
          <span className="inline-flex items-center gap-1 text-foreground transition-opacity duration-300 group-hover:opacity-70">
            {isProduct ? 'Check Availability' : 'Read'} <ArrowUpRight size={12} strokeWidth={1.5} />
          </span>
        </div>
      </a>
    </Reveal>
  )
}
