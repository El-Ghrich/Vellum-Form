'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { LogoLoop } from '@/components/logo-loop'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CategoryOption } from '@/components/SearchModal'

export interface Article {
  category: string
  title: string
  date: string
  image: string
  slug?: string
  href?: string
  excerpt?: string
  issue?: string
  readTime?: string
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
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Dynamic Hero Carousel State
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const heroArticles: Article[] =
    articles && articles.length > 0
      ? articles
      : [
          {
            category: 'Living Spaces',
            title: heroTitle || 'The case for rooms that ask nothing of you',
            excerpt:
              heroDescription ||
              'An exploration of considered spaces, the objects that inhabit them, and the rituals that make them ours.',
            date: '14.08.26',
            image: heroImage,
            slug: 'sculptural-espresso-machines',
            issue: heroIssue || 'Issue No. 04 / 2026',
            readTime: '08 min read',
          },
        ]

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  // Auto-advance hero carousel every 4 seconds (4000ms)
  useEffect(() => {
    if (heroArticles.length <= 1 || isPaused) return

    timerRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveHeroIndex((prev) => (prev + 1) % heroArticles.length)
        setIsTransitioning(false)
      }, 350)
    }, 4000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [heroArticles.length, isPaused, activeHeroIndex])

  const handleSelectSlide = (idx: number) => {
    if (idx === activeHeroIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveHeroIndex(idx)
      setIsTransitioning(false)
    }, 250)
  }

  const handlePrevSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveHeroIndex((prev) => (prev > 0 ? prev - 1 : heroArticles.length - 1))
      setIsTransitioning(false)
    }, 250)
  }

  const handleNextSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroArticles.length)
      setIsTransitioning(false)
    }, 250)
  }

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  const navCategories = categories.length > 0 ? categories : defaultCategories
  const currentHero = heroArticles[activeHeroIndex] || heroArticles[0]
  const currentLink =
    currentHero.href ||
    (currentHero.slug ? `/edit/${currentHero.slug}` : '/edit/featured-story')

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Unified Header */}
      <Header categories={navCategories} />

      {/* Dynamic Hero Section Carousel (4s transition) */}
      <section
        id="top"
        className="mx-auto grid max-w-[1440px] border-b border-border md:grid-cols-[1.15fr_0.85fr] relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left: Stacked Smooth Transition Hero Images */}
        <div className="relative min-h-[500px] overflow-hidden border-b border-border md:min-h-[690px] md:border-b-0 md:border-r bg-muted">
          {heroArticles.map((art, idx) => {
            const isActive = idx === activeHeroIndex
            return (
              <div
                key={art.slug || idx}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30" />
                <span className="absolute left-5 top-5 font-sans text-[10px] uppercase tracking-[0.22em] text-white md:left-10 md:top-8 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                  {art.issue || `Issue No. 0${idx + 1} / 2026`}
                </span>
              </div>
            )
          })}
        </div>

        {/* Right: Dynamic Narrative Content with Staged Fade Transitions */}
        <div className="flex flex-col justify-between px-5 py-10 md:px-12 md:py-14 bg-background">
          {/* Top Row: Meta info & Navigation Controls */}
          <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>Featured Edition</span>
              <span>•</span>
              <span>{currentHero.readTime || '08 min read'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-foreground font-semibold">
                {String(activeHeroIndex + 1).padStart(2, '0')} / {String(heroArticles.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1 border border-border rounded-full p-0.5">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous article"
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                >
                  <ChevronLeft size={15} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next article"
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                >
                  <ChevronRight size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Article Headline and Excerpt */}
          <div
            key={activeHeroIndex}
            className={`pt-12 md:pt-0 transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.24em] text-accent">
              {currentHero.category}
            </p>
            <h1 className="max-w-xl font-serif text-4xl leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-7xl">
              <Link href={currentLink} className="transition-opacity hover:opacity-85">
                {currentHero.title}
              </Link>
            </h1>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
              {currentHero.excerpt || heroDescription}
            </p>
            <div className="mt-9 flex items-center gap-4 flex-wrap">
              <Link
                href={currentLink}
                className="inline-flex items-center gap-3 border border-foreground bg-foreground px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.16em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground shadow-sm"
              >
                Explore the edit <ArrowUpRight size={14} strokeWidth={1.5} />
              </Link>
              <Link
                href={`/category/${currentHero.category?.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') || 'living-spaces'}`}
                className="inline-flex items-center gap-1.5 px-3 py-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                In {currentHero.category} <ArrowUpRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Bottom Progress Controls for 4-sec Cycle */}
          <div className="mt-14 space-y-4">
            <div className="flex gap-2.5">
              {heroArticles.map((art, idx) => {
                const isActive = idx === activeHeroIndex
                return (
                  <button
                    key={art.slug || idx}
                    type="button"
                    onClick={() => handleSelectSlide(idx)}
                    className="group flex-1 py-1.5 text-left transition-all"
                    aria-label={`Switch to story: ${art.title}`}
                  >
                    <div className="h-[2.5px] w-full bg-border overflow-hidden rounded-full relative">
                      {isActive && (
                        <div
                          key={`progress-${activeHeroIndex}-${isPaused ? 'paused' : 'running'}`}
                          className={`h-full bg-foreground ${
                            isPaused ? 'animate-hero-progress-paused w-full' : 'animate-hero-progress'
                          }`}
                        />
                      )}
                      {!isActive && (
                        <div className="h-full w-0 bg-muted-foreground/40 group-hover:w-full transition-all duration-200" />
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[9px] font-sans uppercase tracking-[0.14em] text-muted-foreground">
                      <span className={isActive ? 'text-foreground font-semibold' : 'group-hover:text-foreground'}>
                        {art.category}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground pt-1">
              <span className="flex items-center gap-2">
                <span className="h-px w-8 bg-accent" /> Words by Eleanor Hart • {currentHero.date}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Seamless Infinite Scrolling Marquee */}
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

      {/* Article Cards Grid */}
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

      {/* Raw Products Grid */}
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

      {/* Unified Footer */}
      <Footer categories={navCategories} />
    </main>
  )
}
