'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { LogoLoop } from '@/components/logo-loop'
import { SearchModal } from '@/components/SearchModal'

export interface Article {
  category: string
  title: string
  date: string
  image: string
  slug?: string
  href?: string
}

export interface ProductObject {
  brand: string
  title: string
  price: string
  image: string
  affiliateUrl?: string
}

export interface CategoryItem {
  title: string
  slug: string
  description?: string
}

export interface VellumFormTemplateProps {
  heroImage: string
  heroIssue: string
  heroTitle: string
  heroDescription: string
  articles: Article[]
  objects: ProductObject[]
  categories?: CategoryItem[]
}

const defaultCategories: CategoryItem[] = [
  { title: 'Living Spaces', slug: 'living-spaces' },
  { title: 'Daily Rituals', slug: 'daily-rituals' },
  { title: 'Skin & Wellness', slug: 'skin-wellness' },
  { title: 'The Edit', slug: 'the-edit' },
]

export function VellumFormTemplate({
  heroImage,
  heroIssue,
  heroTitle,
  heroDescription,
  articles,
  objects,
  categories = defaultCategories,
}: VellumFormTemplateProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

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

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  const navCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
          <Link href="/" className="font-sans text-[11px] font-semibold tracking-[0.28em]">
            VELLUM FORM
          </Link>
          <nav className="hidden items-center gap-8 font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:flex">
            <a href="#objects" className="transition-colors hover:text-foreground">
              Objects
            </a>
            {navCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="transition-colors hover:text-foreground"
              >
                {cat.title}
              </Link>
            ))}
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
              <a href="#objects" onClick={() => setMenuOpen(false)}>
                Objects
              </a>
              {navCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.title}
                </Link>
              ))}
              <a href="#the-edit" onClick={() => setMenuOpen(false)}>
                The Edit
              </a>
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

      <section
        id="top"
        className="mx-auto grid max-w-[1440px] border-b border-border md:grid-cols-[1.15fr_0.85fr]"
      >
        <div
          className="relative min-h-[500px] overflow-hidden border-b border-border transition-[opacity,transform] duration-[1400ms] ease-out md:min-h-[690px] md:border-b-0 md:border-r"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1)' : 'scale(1.05)',
          }}
        >
          <Image
            src={heroImage}
            alt="Sculptural objects arranged in a sunlit interior"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-foreground/10" />
          <span className="absolute left-5 top-5 font-sans text-[10px] uppercase tracking-[0.22em] text-background md:left-10 md:top-8">
            {heroIssue}
          </span>
        </div>
        <div className="flex flex-col justify-between px-5 py-10 md:px-12 md:py-14">
          <div
            className="flex justify-between font-sans text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-[opacity,transform] duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
            }}
          >
            <span>Featured Edition</span>
            <span>08 min read</span>
          </div>
          <div className="pt-20 md:pt-0">
            <p
              className="mb-5 font-sans text-[10px] uppercase tracking-[0.2em] text-accent transition-[opacity,transform] duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: '120ms',
              }}
            >
              The quiet life
            </p>
            <h1
              className="max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] transition-[opacity,transform] duration-[900ms] ease-out md:text-7xl"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(26px)',
                transitionDelay: '220ms',
              }}
            >
              {heroTitle}
            </h1>
            <p
              className="mt-7 max-w-md font-sans text-sm leading-6 text-muted-foreground transition-[opacity,transform] duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(18px)',
                transitionDelay: '380ms',
              }}
            >
              {heroDescription}
            </p>
            <a
              href="#the-edit"
              className="mt-9 inline-flex items-center gap-3 border border-foreground px-5 py-3 font-sans text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-foreground hover:text-background"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(18px)',
                transitionDelay: '480ms',
                transitionDuration: '700ms',
                transitionProperty:
                  'opacity, transform, background-color, color',
              }}
            >
              Explore the edit <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
          <div
            className="mt-16 flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-opacity duration-700 ease-out"
            style={{ opacity: mounted ? 1 : 0, transitionDelay: '600ms' }}
          >
            <span className="h-px w-12 bg-accent" /> Words by Eleanor Hart
          </div>
        </div>
      </section>

      <LogoLoop />

      {/* Dynamic Curated Category Strip */}
      <section
        className="border-b border-border bg-[#FBF9F5]"
        aria-label="Curated collections"
      >
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 overflow-x-auto px-5 py-5 md:px-10">
          <span className="shrink-0 font-sans text-[9px] uppercase tracking-[0.2em] text-accent mr-2">
            Categories:
          </span>
          {navCategories.map((item) => (
            <Link
              href={`/category/${item.slug}`}
              key={item.slug}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 font-sans text-[10px] uppercase tracking-[0.13em] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent shadow-sm"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Article Cards Grid -> Routes internally to /edit/[slug] */}
      <section
        id="the-edit"
        className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24"
      >
        <Reveal className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">
              From the journal
            </p>
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              The Weekly Edit
            </h2>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 hover:text-foreground sm:flex"
          >
            View all stories <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {articles.map((article, index) => {
            const articleLink =
              article.href ||
              (article.slug ? `/edit/${article.slug}` : '/edit/featured-story')
            return (
              <Reveal
                key={article.title}
                as="article"
                delay={index * 120}
                className="group"
              >
                <Link href={articleLink} className="block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.18em] text-accent">
                    {article.category}
                  </p>
                  <h3 className="mt-3 max-w-sm font-serif text-2xl leading-tight tracking-[-0.02em] group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {article.date}
                  </p>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Raw Products Grid -> Links directly to affiliateUrl with target="_blank" */}
      <section id="objects" className="border-y border-border bg-card">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <Reveal className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">
                Objects with a point of view
              </p>
              <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">
                Curated Objects
              </h2>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Selected / 04
            </span>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-6">
            {objects.map((object, index) => {
              const affiliateLink = object.affiliateUrl || '#'
              return (
                <Reveal
                  key={object.title}
                  as="article"
                  delay={index * 100}
                  className="group"
                >
                  <a
                    href={affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={object.image}
                        alt={object.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </a>
                  <p className="mt-4 font-sans text-[9px] tracking-[0.16em] text-accent">
                    {object.brand}
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-tight">
                    {object.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span>{object.price}</span>
                    <a
                      href={affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-1 text-foreground transition-opacity duration-300 hover:opacity-70"
                    >
                      Check Availability{' '}
                      <ArrowUpRight size={12} strokeWidth={1.5} />
                    </a>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <Reveal className="border border-border bg-background px-6 py-10 md:flex md:items-center md:justify-between md:px-12 md:py-14">
          <div>
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">
              A considered correspondence
            </p>
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              The Private Dispatch
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm leading-6 text-muted-foreground">
              A brief, beautiful note on what we are reading, seeing, and living
              with.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="mt-8 flex w-full max-w-md border-b border-foreground transition-colors duration-300 focus-within:border-accent md:mt-0"
          >
            {subscribed ? (
              <p className="w-full py-3 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                You are on the list. Thank you.
              </p>
            ) : (
              <>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent py-3 font-sans text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="bg-foreground px-5 py-3 font-sans text-[10px] uppercase tracking-[0.16em] text-background transition-opacity duration-300 hover:opacity-80"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </Reveal>
      </section>

      <footer id="footer" className="border-t border-border">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-10 md:py-16">
          <div>
            <Link
              href="/"
              className="font-sans text-[11px] font-semibold tracking-[0.28em]"
            >
              VELLUM FORM
            </Link>
            <p className="mt-5 max-w-xs font-serif text-xl leading-snug">
              A digital curation house for the considered life.
            </p>
          </div>
          <div className="flex flex-col gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="mb-2 text-accent">Categories</span>
            {navCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="mb-2 text-accent">Elsewhere</span>
            <a
              href="https://www.instagram.com/thevellumform/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="https://www.pinterest.com/vellumform/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Pinterest
            </a>
            <Link href="/about" className="hover:text-foreground">
              About us
            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-border px-5 py-6 font-sans text-[9px] leading-5 tracking-[0.04em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 Vellum Form. All rights reserved.</span>
          <span>
            Affiliate disclosure: We may earn a commission from select links, at
            no additional cost to you.
          </span>
          <div className="flex items-center gap-3">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <span>/</span>
            <Link href="/legal" className="hover:underline text-foreground">
              Privacy &amp; Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
