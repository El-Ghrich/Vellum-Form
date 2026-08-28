'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye, Grid3x3, LayoutGrid, Search, Menu, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SearchModal, CategoryOption } from '@/components/SearchModal'

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
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
      {/* Header / Navigation */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
          <Link href="/" className="font-sans text-[11px] font-semibold tracking-[0.28em]">
            VELLUM FORM
          </Link>
          <nav className="hidden items-center gap-8 font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:flex">
            <Link href="/#objects" className="transition-colors hover:text-foreground">
              Objects
            </Link>
            {navCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`transition-colors ${
                  title.toLowerCase() === cat.title.toLowerCase()
                    ? 'text-foreground font-semibold'
                    : 'hover:text-foreground'
                }`}
              >
                {cat.title}
              </Link>
            ))}
            <Link href="/#the-edit" className="transition-colors hover:text-foreground">
              The Edit
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search articles"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-sans text-[10px] uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground"
            >
              <Search size={14} strokeWidth={1.5} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden font-mono text-[9px] text-muted-foreground/70 sm:inline">⌘K</kbd>
            </button>
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5 font-sans text-xs uppercase tracking-[0.16em]">
              <Link href="/#objects" onClick={() => setMenuOpen(false)}>
                Objects
              </Link>
              {navCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.title}
                </Link>
              ))}
              <Link href="/#the-edit" onClick={() => setMenuOpen(false)}>
                The Edit
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        categories={navCategories}
      />

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

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-8 text-center font-sans text-[9px] uppercase tracking-[0.14em] text-muted-foreground md:flex-row md:px-10">
          <span>© 2026 Vellum Form. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-foreground">About</Link>
            <span>/</span>
            <Link href="/legal" className="hover:text-foreground">Privacy &amp; Terms</Link>
          </div>
        </div>
      </footer>
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
