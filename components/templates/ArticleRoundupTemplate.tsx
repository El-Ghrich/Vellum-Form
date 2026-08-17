'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Link2,
  Mail,
  Minus,
  Share2,
  Star,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { PortableText } from '@portabletext/react'

export interface Product {
  _id?: string
  rank?: number
  name: string
  brand: string
  priceRange?: string
  affiliateUrl?: string
  image: string
  rating?: number
  badge?: string
  pros?: string[]
  cons?: string[]
  desc?: string
}

export interface RelatedArticle {
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
  updatedAt?: string
  readTime?: string
  excerpt?: string
  products: Product[]
  content?: any
  relatedArticles?: RelatedArticle[]
}

function RatingDisplay({ rating }: { rating?: number }) {
  if (!rating) return null
  return (
    <div className="inline-flex items-center gap-1.5 font-sans text-xs text-[#8A7051]" aria-label={`Rating: ${rating} out of 5 stars`}>
      <span className="font-semibold">{rating.toFixed(1)}</span>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={star <= Math.round(rating) ? 'fill-[#8A7051] text-[#8A7051]' : 'text-[#E8E4DC]'}
          />
        ))}
      </div>
    </div>
  )
}

export function ArticleRoundupTemplate({
  breadcrumbs,
  issueLabel = 'Curated Edit',
  title,
  subtitle,
  updatedAt = 'Recently',
  readTime = '8 min read',
  excerpt,
  products = [],
  content,
  relatedArticles = [],
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
    <main className="min-h-screen bg-[#FBF9F5] text-[#111111] selection:bg-[#8A7051]/20">
      {/* Top Editorial Header */}
      <header className="sticky top-0 z-40 border-b border-[#E8E4DC] bg-[#FBF9F5]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#111111] transition-opacity hover:opacity-75"
          >
            VELLUM FORM
          </Link>
          <nav className="hidden items-center gap-9 font-sans text-[11px] uppercase tracking-[0.16em] text-[#666666] lg:flex">
            <Link href="/#objects" className="transition-colors hover:text-[#111111]">
              Objects
            </Link>
            <Link href="/category/living-spaces" className="transition-colors hover:text-[#111111]">
              Living Spaces
            </Link>
            <Link href="/#the-edit" className="transition-colors hover:text-[#111111]">
              The Edit
            </Link>
            <Link href="/about" className="transition-colors hover:text-[#111111]">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/about" className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8A7051] hover:underline">
              Curation House
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-[#E8E4DC]">
        <div className="mx-auto flex max-w-[1000px] items-center gap-2 px-6 py-4 font-sans text-[11px] uppercase tracking-[0.14em] text-[#666666] md:px-0">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors duration-300 hover:text-[#111111]">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#111111]">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <ChevronRight size={11} strokeWidth={1.5} className="text-[#8A7051]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Article Header */}
      <header className="mx-auto max-w-[1000px] px-6 py-14 md:px-0 md:py-20">
        <Reveal>
          {issueLabel && (
            <span className="inline-block border border-[#8A7051]/30 bg-[#8A7051]/10 px-3.5 py-1 font-sans text-[10px] uppercase tracking-[0.22em] text-[#8A7051]">
              {issueLabel}
            </span>
          )}
          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-[#111111] md:text-6xl">
            {title}
            {subtitle && <span className="block text-[#666666] font-normal text-3xl md:text-4xl mt-2">({subtitle})</span>}
          </h1>
          {excerpt && (
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[#555555]">
              {excerpt}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-[11px] uppercase tracking-[0.14em] text-[#666666]">
            <span>Editorial Review</span>
            <span className="h-1 w-1 rounded-full bg-[#8A7051]" />
            <span>Updated {updatedAt}</span>
            <span className="h-1 w-1 rounded-full bg-[#8A7051]" />
            <span>{readTime}</span>
          </div>
          <div className="mt-8 flex items-start gap-3.5 border border-[#E8E4DC] bg-[#FAF8F3] p-4 text-xs leading-relaxed text-[#555555]">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8A7051]" />
            <p>
              We independently test and review products. When you buy through our links, we may earn an affiliate
              commission, at no additional cost to you.
            </p>
          </div>
        </Reveal>
      </header>

      {/* At a Glance Table (Shortlist) */}
      {products.length > 0 && (
        <section className="border-y border-[#E8E4DC] bg-[#FAF8F3]">
          <div className="mx-auto max-w-[1000px] px-6 py-14 md:px-0 md:py-20">
            <Reveal>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">The Shortlist</span>
              <h2 className="mt-2 font-serif text-3xl tracking-[-0.02em] text-[#111111] md:text-4xl">At a Glance</h2>
            </Reveal>

            {/* Desktop table */}
            <Reveal delay={100} className="mt-10 hidden overflow-hidden border border-[#E8E4DC] md:block">
              <table className="w-full border-collapse bg-[#FBF9F5] text-left">
                <thead>
                  <tr className="border-b border-[#E8E4DC] font-sans text-[10px] uppercase tracking-[0.16em] text-[#666666]">
                    <th className="px-5 py-4 font-normal">Award / Rank</th>
                    <th className="px-5 py-4 font-normal">Object &amp; Maker</th>
                    <th className="px-5 py-4 font-normal">Price Range</th>
                    <th className="px-5 py-4 font-normal">Rating</th>
                    <th className="px-5 py-4 font-normal text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => {
                    const rankNum = product.rank || idx + 1
                    return (
                      <tr key={product._id || product.name} className="border-b border-[#E8E4DC] last:border-b-0 hover:bg-[#FAF8F3]/60 transition-colors">
                        <td className="px-5 py-5 align-middle">
                          {product.badge ? (
                            <span className="inline-block border border-[#8A7051]/30 bg-[#8A7051]/10 px-2.5 py-0.5 font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-[#8A7051]">
                              {product.badge}
                            </span>
                          ) : (
                            <span className="font-serif text-sm italic text-[#8A7051]">#{rankNum}</span>
                          )}
                        </td>
                        <td className="px-5 py-5 align-middle">
                          <a href={`#rank-${rankNum}`} className="group flex items-center gap-4">
                            <span className="relative h-14 w-14 shrink-0 overflow-hidden border border-[#E8E4DC] bg-[#E8E4DC]">
                              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                            </span>
                            <div>
                              <span className="block font-sans text-[10px] uppercase tracking-[0.16em] text-[#8A7051]">{product.brand}</span>
                              <span className="block font-serif text-base leading-tight text-[#111111] group-hover:underline">{product.name}</span>
                            </div>
                          </a>
                        </td>
                        <td className="px-5 py-5 align-middle font-sans text-xs text-[#555555]">{product.priceRange || 'Inquire'}</td>
                        <td className="px-5 py-5 align-middle">
                          <RatingDisplay rating={product.rating} />
                        </td>
                        <td className="px-5 py-5 align-middle text-right">
                          <a
                            href={product.affiliateUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center gap-1.5 border border-[#111111] px-3.5 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[#111111] transition-all duration-300 hover:bg-[#111111] hover:text-[#FBF9F5]"
                          >
                            <span>Check Availability</span>
                            <ArrowUpRight size={11} strokeWidth={1.5} />
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Reveal>

            {/* Mobile cards */}
            <div className="mt-10 flex flex-col gap-4 md:hidden">
              {products.map((product, index) => {
                const rankNum = product.rank || index + 1
                return (
                  <Reveal key={product._id || product.name} delay={index * 80} className="border border-[#E8E4DC] bg-[#FBF9F5] p-4">
                    <div className="flex w-full items-center gap-4">
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden border border-[#E8E4DC] bg-[#E8E4DC]">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                      </span>
                      <div className="min-w-0 flex-1">
                        {product.badge && (
                          <span className="block font-sans text-[9px] uppercase tracking-[0.14em] text-[#8A7051]">{product.badge}</span>
                        )}
                        <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#8A7051]">{product.brand}</p>
                        <a href={`#rank-${rankNum}`} className="mt-0.5 block font-serif text-lg leading-tight text-[#111111] hover:underline">
                          {product.name}
                        </a>
                        <div className="mt-1.5 flex items-center justify-between font-sans text-[11px] text-[#666666]">
                          <span>{product.priceRange}</span>
                          {product.rating && <span className="text-[#8A7051] font-medium">{product.rating} ★</span>}
                        </div>
                        <a
                          href={product.affiliateUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="mt-3 inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[#111111] underline hover:text-[#8A7051]"
                        >
                          Check Availability <ArrowUpRight size={11} strokeWidth={1.5} />
                        </a>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Ranked Product Blocks — Quiet Luxury Editorial Layout */}
      {products.length > 0 && (
        <section className="mx-auto max-w-[1000px] px-6 py-16 md:px-0 md:py-28">
          <div className="flex flex-col gap-24 md:gap-36">
            {products.map((product, idx) => {
              const rankNum = product.rank || idx + 1
              return (
                <article key={product._id || product.name} id={`rank-${rankNum}`} className="scroll-mt-24 border-b border-[#E8E4DC] pb-20 md:pb-28 last:border-b-0 last:pb-0">
                  {/* Top of the card: Badge & Rank */}
                  <Reveal>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DC] pb-6">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-3xl font-normal italic text-[#8A7051]">
                          0{rankNum}
                        </span>
                        {product.badge && (
                          <span className="inline-block border border-[#8A7051]/30 bg-[#8A7051]/10 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#8A7051]">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Rating & Price Range side-by-side */}
                      <div className="flex items-center gap-5 font-sans text-xs text-[#666666]">
                        {product.rating && <RatingDisplay rating={product.rating} />}
                        {product.priceRange && (
                          <>
                            <span className="h-3 w-[1px] bg-[#E8E4DC]" />
                            <span className="uppercase tracking-[0.14em] font-medium text-[#111111]">
                              {product.priceRange}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Reveal>

                  {/* Header: Brand above Name */}
                  <Reveal delay={80} className="mt-8">
                    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-[#8A7051]">
                      {product.brand}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.02em] text-[#111111] sm:text-4xl md:text-5xl">
                      {product.name}
                    </h2>
                  </Reveal>

                  {/* Image Presentation */}
                  <Reveal delay={160} className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-[#E8E4DC] bg-[#E8E4DC] md:aspect-[3/2]">
                    <a
                      href={product.affiliateUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="group block h-full w-full"
                    >
                      <Image
                        src={product.image}
                        alt={`${product.name} by ${product.brand}`}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 1000px"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                    </a>
                  </Reveal>

                  {/* Description Paragraph */}
                  {product.desc && (
                    <Reveal delay={220} className="mt-10">
                      <div className="max-w-3xl">
                        <p className="font-sans text-[15px] leading-[1.85] text-[#555555] md:text-base">
                          {product.desc}
                        </p>
                      </div>
                    </Reveal>
                  )}

                  {/* Pros & Cons Minimalist Grid */}
                  {((product.pros && product.pros.length > 0) || (product.cons && product.cons.length > 0)) && (
                    <Reveal delay={280} className="mt-10 grid gap-8 border border-[#E8E4DC] bg-[#FAF8F3] p-6 md:p-10 sm:grid-cols-2">
                      {product.pros && product.pros.length > 0 && (
                        <div>
                          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[#8A7051] font-semibold">
                            Reasons to Appreciate
                          </p>
                          <ul className="flex flex-col gap-3.5">
                            {product.pros.map((pro, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-[#333333]">
                                <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-[#8A7051]" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {product.cons && product.cons.length > 0 && (
                        <div className="sm:border-l sm:border-[#E8E4DC] sm:pl-8">
                          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[#666666] font-semibold">
                            Considerations &amp; Trade-offs
                          </p>
                          <ul className="flex flex-col gap-3.5">
                            {product.cons.map((con, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-[#666666]">
                                <Minus size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-[#666666]" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Reveal>
                  )}

                  {/* CTA Action Bar */}
                  <Reveal delay={340} className="mt-10 flex flex-col items-start justify-between gap-5 pt-4 sm:flex-row sm:items-center">
                    <div className="font-sans text-xs text-[#666666]">
                      {product.priceRange && (
                        <p className="font-serif text-2xl text-[#111111]">{product.priceRange}</p>
                      )}
                      <p className="text-[10px] uppercase tracking-[0.14em] text-[#666666] mt-0.5">
                        Verified Curated Availability
                      </p>
                    </div>

                    <a
                      href={product.affiliateUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-3 bg-[#111111] px-8 py-4 font-sans text-[11px] uppercase tracking-[0.18em] text-[#FBF9F5] transition-all duration-300 hover:bg-[#8A7051] hover:shadow-md"
                    >
                      <span>Check Availability</span>
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </a>
                  </Reveal>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* Rich Text Editorial Content (Sanity PortableText) */}
      {content && (
        <section className="mx-auto max-w-[1000px] px-6 py-12 md:px-0 md:py-16">
          <div className="border-t border-[#E8E4DC] pt-12">
            <h2 className="mb-8 font-serif text-3xl tracking-[-0.02em] text-[#111111]">
              Editorial Notes &amp; Observations
            </h2>
            <div className="prose prose-neutral max-w-none font-sans text-base leading-relaxed text-[#555555] [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-[#111111] [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-[#111111] [&_p]:mb-6 [&_a]:text-[#111111] [&_a]:underline hover:[&_a]:text-[#8A7051]">
              <PortableText value={content} />
            </div>
          </div>
        </section>
      )}

      {/* Related / Alternative Grid */}
      {relatedArticles.length > 0 && (
        <section className="border-y border-[#E8E4DC] bg-[#FAF8F3]">
          <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-0 md:py-24">
            <Reveal>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                Keep Reading
              </span>
              <h2 className="mt-2 font-serif text-3xl tracking-[-0.02em] text-[#111111] md:text-4xl">
                You Might Also Appreciate
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-6">
              {relatedArticles.map((article, index) => (
                <Reveal key={article.title} delay={index * 110} className="group">
                  <Link href={`/edit/${article.slug || ''}`} className="block">
                    <div className="relative aspect-[3/2] overflow-hidden border border-[#E8E4DC] bg-[#E8E4DC]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    {article.category && (
                      <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.18em] text-[#8A7051]">
                        {article.category}
                      </p>
                    )}
                    <h3 className="mt-2 font-serif text-lg leading-tight tracking-[-0.01em] text-[#111111] group-hover:underline">
                      {article.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share Tray & Legal Footer (Author Completely Removed) */}
      <section className="mx-auto max-w-[1000px] px-6 py-16 md:px-0 md:py-20">
        <Reveal className="flex flex-col gap-6 border border-[#E8E4DC] bg-[#FBF9F5] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="font-serif text-xl text-[#111111]">The Editorial Desk</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8A7051] mt-1">
              Curated for the considered life
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#666666]">
              Share Story
            </span>
            <a
              href="https://www.pinterest.com/vellumform/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Pinterest"
              className="flex h-9 w-9 items-center justify-center border border-[#E8E4DC] text-[#666666] transition-colors duration-300 hover:border-[#8A7051] hover:text-[#8A7051]"
            >
              <Share2 size={15} strokeWidth={1.5} />
            </a>
            <a
              href="mailto:vellumform@gmail.com"
              aria-label="Share via email"
              className="flex h-9 w-9 items-center justify-center border border-[#E8E4DC] text-[#666666] transition-colors duration-300 hover:border-[#8A7051] hover:text-[#8A7051]"
            >
              <Mail size={15} strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy link"
              className="flex h-9 w-9 items-center justify-center border border-[#E8E4DC] text-[#666666] transition-colors duration-300 hover:border-[#8A7051] hover:text-[#8A7051]"
            >
              <Link2 size={15} strokeWidth={1.5} />
            </button>
            {copied && (
              <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#8A7051]">
                Copied
              </span>
            )}
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-10 flex flex-col gap-3 border-t border-[#E8E4DC] pt-6 font-sans text-[9px] leading-5 tracking-[0.04em] text-[#666666] sm:flex-row sm:items-center sm:justify-between"
        >
          <span>© 2026 Vellum Form. All rights reserved.</span>
          <span>
            Affiliate disclosure: This post contains affiliate links. We may earn a commission from
            qualifying purchases, at no additional cost to you.
          </span>
          <div className="flex items-center gap-3">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <span>/</span>
            <Link href="/legal" className="hover:underline text-[#111111]">
              Privacy &amp; Terms
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
