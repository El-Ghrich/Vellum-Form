'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Link2,
  Mail,
  Minus,
  Share2,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { PortableText } from '@portabletext/react'

export type Product = {
  rank: number
  badge?: string
  title: string
  brand: string
  image: string
  price?: string
  keyFeature?: string
  why?: string[]
  specs?: { label: string; value: string }[]
  pros?: string[]
  cons?: string[]
  affiliateUrl?: string
  ctaLabel?: string
  rating?: number
}

export type RelatedArticle = {
  category?: string
  title: string
  image: string
  slug?: string
}

export interface ArticleRoundupTemplateProps {
  breadcrumbs: { label: string; href?: string }[]
  issueLabel?: string
  title: string
  subtitle?: string
  curator?: string
  updatedAt?: string
  readTime?: string
  excerpt?: string
  products: Product[]
  content?: any
  relatedArticles?: RelatedArticle[]
  authorImage?: string
  authorName?: string
  authorBio?: string
}

function StarRow({ rating = 5 }: { rating?: number }) {
  const count = Math.min(Math.max(Math.round(rating), 1), 5)
  return (
    <div className="flex items-center gap-1 text-accent" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className="text-xs">★</span>
      ))}
    </div>
  )
}

export function ArticleRoundupTemplate({
  breadcrumbs,
  issueLabel = 'Curated Edit',
  title,
  subtitle,
  curator = 'The Editorial Desk',
  updatedAt = 'Recently',
  readTime = '8 min read',
  excerpt,
  products = [],
  content,
  relatedArticles = [],
  authorImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=85',
  authorName = 'The Editorial Desk',
  authorBio = 'Curators of the considered life, since 2019',
}: ArticleRoundupTemplateProps) {
  const [copied, setCopied] = useState(false)

  function handleCopyLink() {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1000px] items-center gap-1.5 px-5 py-4 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground md:px-0">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1.5">
              {crumb.href ? (
                <a href={crumb.href} className="transition-colors duration-300 hover:text-foreground">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <ChevronRight size={12} strokeWidth={1.5} />}
            </div>
          ))}
        </div>
      </div>

      {/* Article Header */}
      <header className="mx-auto max-w-[1000px] px-5 py-14 md:px-0 md:py-20">
        <Reveal>
          {issueLabel && (
            <span className="inline-block border border-accent/40 bg-accent/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.22em] text-accent">
              {issueLabel}
            </span>
          )}
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-pretty md:text-6xl">
            {title}
            {subtitle && <span className="block text-muted-foreground">({subtitle})</span>}
          </h1>
          {excerpt && (
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <span>Curated by {curator}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>Updated {updatedAt}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{readTime}</span>
          </div>
          <div className="mt-8 flex items-start gap-3 border border-border bg-card px-5 py-4 text-sm leading-6 text-muted-foreground">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <p>
              We independently test and review products. When you buy through our links, we may earn an affiliate
              commission, at no additional cost to you.
            </p>
          </div>
        </Reveal>
      </header>

      {/* At a Glance Table (if products exist) */}
      {products.length > 0 && (
        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-[1000px] px-5 py-14 md:px-0 md:py-20">
            <Reveal>
              <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">The shortlist</p>
              <h2 className="font-serif text-3xl tracking-[-0.02em] md:text-4xl">At a Glance</h2>
            </Reveal>

            {/* Desktop table */}
            <Reveal delay={100} className="mt-10 hidden overflow-hidden border border-border md:block">
              <table className="w-full border-collapse bg-background text-left">
                <thead>
                  <tr className="border-b border-border font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="px-5 py-4 font-normal">Award</th>
                    <th className="px-5 py-4 font-normal">Product</th>
                    <th className="px-5 py-4 font-normal">Key Feature</th>
                    <th className="px-5 py-4 font-normal">Price</th>
                    <th className="px-5 py-4 font-normal">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.title} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-5 align-middle font-sans text-[10px] uppercase tracking-[0.1em] text-accent">
                        {product.badge || `Choice #${product.rank}`}
                      </td>
                      <td className="px-5 py-5 align-middle">
                        <a href={`#rank-${product.rank}`} className="group flex items-center gap-4">
                          <span className="relative h-14 w-14 shrink-0 overflow-hidden bg-muted">
                            <Image src={product.image} alt={product.title} fill className="object-cover" sizes="56px" />
                          </span>
                          <span>
                            <span className="block font-serif text-base leading-tight group-hover:underline">{product.title}</span>
                            <span className="block font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{product.brand}</span>
                          </span>
                        </a>
                      </td>
                      <td className="px-5 py-5 align-middle font-sans text-sm text-muted-foreground">{product.keyFeature || 'Editorial Curation'}</td>
                      <td className="px-5 py-5 align-middle font-sans text-sm">{product.price}</td>
                      <td className="px-5 py-5 align-middle">
                        <a
                          href={product.affiliateUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-flex items-center gap-1.5 whitespace-nowrap border border-foreground px-3.5 py-2 font-sans text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-foreground hover:text-background"
                        >
                          Check Availability <ArrowUpRight size={12} strokeWidth={1.5} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            {/* Mobile cards */}
            <div className="mt-10 flex flex-col gap-4 md:hidden">
              {products.map((product, index) => (
                <Reveal key={product.title} delay={index * 90} className="border border-border bg-background p-4">
                  <div className="flex w-full items-center gap-4">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden bg-muted">
                      <Image src={product.image} alt={product.title} fill className="object-cover" sizes="64px" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block font-sans text-[9px] uppercase tracking-[0.1em] text-accent">{product.badge || `#${product.rank}`}</span>
                      <a href={`#rank-${product.rank}`} className="mt-1 block font-serif text-lg leading-tight hover:underline">
                        {product.title}
                      </a>
                      <div className="mt-1 flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        <span>{product.brand}</span>
                        <span className="shrink-0 text-foreground">{product.price}</span>
                      </div>
                      <a
                        href={product.affiliateUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="mt-3 inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.12em] text-accent hover:underline"
                      >
                        Check Availability <ArrowUpRight size={11} strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ranked Product Blocks */}
      {products.length > 0 && (
        <section className="mx-auto max-w-[1000px] px-5 py-16 md:px-0 md:py-24">
          <div className="flex flex-col gap-20 md:gap-28">
            {products.map((product) => (
              <article key={product.title} id={`rank-${product.rank}`} className="scroll-mt-20">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-5xl leading-none text-accent">#{product.rank}</span>
                    <div>
                      {product.badge && (
                        <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-accent">{product.badge}</p>
                      )}
                      <h3 className="mt-1 font-serif text-3xl leading-tight tracking-[-0.02em] md:text-4xl">{product.title}</h3>
                      <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground">by {product.brand}</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={100} className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-muted md:aspect-[3/2]">
                  <a href={product.affiliateUrl || '#'} target="_blank" rel="noopener noreferrer nofollow" className="block h-full w-full">
                    <Image
                      src={product.image}
                      alt={`${product.title} by ${product.brand}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 1000px"
                    />
                  </a>
                </Reveal>

                {(product.why || product.specs) && (
                  <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
                    <Reveal delay={150}>
                      <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">Why we selected it</p>
                      {Array.isArray(product.why) ? (
                        product.why.map((paragraph, i) => (
                          <p key={i} className={`text-sm leading-6 text-muted-foreground ${i > 0 ? 'mt-4' : ''}`}>
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm leading-6 text-muted-foreground">{product.why}</p>
                      )}
                    </Reveal>

                    {product.specs && product.specs.length > 0 && (
                      <Reveal delay={220} className="border border-border bg-card p-6">
                        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">Key specs</p>
                        <dl className="flex flex-col gap-3">
                          {product.specs.map((spec) => (
                            <div key={spec.label} className="flex justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
                              <dt className="font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{spec.label}</dt>
                              <dd className="text-right font-sans text-xs text-foreground">{spec.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </Reveal>
                    )}
                  </div>
                )}

                {((product.pros && product.pros.length > 0) || (product.cons && product.cons.length > 0)) && (
                  <Reveal delay={280} className="mt-10 grid gap-6 border border-border p-6 sm:grid-cols-2 md:p-8">
                    {product.pros && product.pros.length > 0 && (
                      <div>
                        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">The verdict — pros</p>
                        <ul className="flex flex-col gap-3">
                          {product.pros.map((pro) => (
                            <li key={pro} className="flex items-start gap-2.5 text-sm leading-6">
                              <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.cons && product.cons.length > 0 && (
                      <div>
                        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">The verdict — cons</p>
                        <ul className="flex flex-col gap-3">
                          {product.cons.map((con) => (
                            <li key={con} className="flex items-start gap-2.5 text-sm leading-6 text-muted-foreground">
                              <Minus size={15} strokeWidth={2} className="mt-0.5 shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Reveal>
                )}

                <Reveal delay={340} className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
                  <div>
                    {product.price && <p className="font-serif text-2xl">{product.price}</p>}
                    <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Price at time of publishing</p>
                  </div>
                  <a
                    href={product.affiliateUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2.5 bg-foreground px-6 py-3.5 font-sans text-[11px] uppercase tracking-[0.14em] text-background transition-opacity duration-300 hover:opacity-85"
                  >
                    {product.ctaLabel || 'Check Availability on Official Site'} <ArrowUpRight size={14} strokeWidth={1.5} />
                  </a>
                </Reveal>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Rich Text Editorial Content (Sanity PortableText) */}
      {content && (
        <section className="mx-auto max-w-[1000px] px-5 py-12 md:px-0 md:py-16">
          <div className="border-t border-border pt-12">
            <h2 className="mb-8 font-serif text-3xl tracking-[-0.02em]">Editorial Notes &amp; Observations</h2>
            <div className="prose prose-neutral max-w-none font-sans text-base leading-relaxed text-muted-foreground [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-foreground [&_p]:mb-6 [&_a]:text-foreground [&_a]:underline hover:[&_a]:text-accent">
              <PortableText value={content} />
            </div>
          </div>
        </section>
      )}

      {/* Related / Alternative Grid */}
      {relatedArticles.length > 0 && (
        <section className="border-y border-border bg-card">
          <div className="mx-auto max-w-[1000px] px-5 py-16 md:px-0 md:py-24">
            <Reveal>
              <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-accent">Keep reading</p>
              <h2 className="font-serif text-3xl tracking-[-0.02em] md:text-4xl">You Might Also Appreciate</h2>
            </Reveal>
            <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-6">
              {relatedArticles.map((article, index) => (
                <Reveal key={article.title} delay={index * 110} className="group">
                  <a href={`/edit/${article.slug || ''}`} className="block">
                    <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                      <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    {article.category && (
                      <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.16em] text-accent">{article.category}</p>
                    )}
                    <h3 className="mt-2 font-serif text-lg leading-tight tracking-[-0.01em] group-hover:underline">{article.title}</h3>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Author Bio + Share Tray */}
      <section id="footer" className="mx-auto max-w-[1000px] px-5 py-16 md:px-0 md:py-24">
        <Reveal className="flex flex-col gap-8 border border-border bg-background p-6 sm:flex-row sm:items-center sm:justify-between md:p-10">
          <div className="flex items-center gap-5">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image src={authorImage} alt={`Portrait of ${authorName}`} fill className="object-cover" sizes="64px" />
            </span>
            <div>
              <p className="font-serif text-lg">{authorName}</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{authorBio}</p>
              <div className="mt-2">
                <StarRow />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Share</p>
            <a href="#" aria-label="Share this article" className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent">
              <Share2 size={15} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Share via email" className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent">
              <Mail size={15} strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy link"
              className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Link2 size={15} strokeWidth={1.5} />
            </button>
            {copied && <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-accent">Copied</span>}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-col gap-3 border-t border-border pt-6 font-sans text-[9px] leading-5 tracking-[0.04em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Vellum Form. All rights reserved.</span>
          <span>
            Affiliate disclosure: This post contains affiliate links. We may earn a commission from qualifying
            purchases, at no additional cost to you.
          </span>
          <div className="flex items-center gap-3">
            <a href="/about" className="hover:underline">About</a>
            <span>/</span>
            <a href="/legal" className="hover:underline text-foreground">Privacy &amp; Terms</a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
