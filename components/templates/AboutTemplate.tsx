'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2,
  PenTool,
  ArrowUpRight,
  Mail,
  Compass,
  Search,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export interface AboutTemplateProps {
  heroImage?: string
  heroTag?: string
  headline?: string
  subheadline?: string
  manifestoStatement?: string
  philosophyParagraphs?: string[]
  processSteps?: {
    number: string
    title: string
    description: string
    icon: 'search' | 'vetting' | 'edit' | 'compass'
  }[]
  editorialEmail?: string
  pinterestUrl?: string
  instagramUrl?: string
}

const defaultPhilosophy = [
  'Vellum Form was born from a desire to cut through the noise of modern consumerism. We believe that the objects we interact with every day—from the kettle we pour our morning coffee with to the lamp that lights our workspace—should elevate our daily rituals.',
  'We serve as a digital curation house, meticulously filtering out fleeting trends and low-quality goods to present only the finest in modern design, functional architecture, and quiet luxury.',
  'Every piece highlighted in our journal has undergone rigorous examination for material authenticity, architectural proportion, and enduring craftsmanship—ensuring your space remains timeless.',
]

const defaultSteps: NonNullable<AboutTemplateProps['processSteps']> = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We scour global design houses, artisan studios, and verified customer experiences to find exceptional objects.',
    icon: 'search',
  },
  {
    number: '02',
    title: 'Vetting',
    description:
      'We analyze materials, longevity, craftsmanship, and aesthetic value to ensure only enduring pieces make the cut.',
    icon: 'vetting',
  },
  
]

export function AboutTemplate({
  heroImage = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
  heroTag = 'Curation House / Manifesto',
  headline = 'About Vellum Form',
  subheadline = 'Curating the Art of Intentional Living.',
  manifestoStatement = 'We believe that a space is not merely filled—it is composed. Every silhouette, texture, and light source shapes how we feel and live.',
  philosophyParagraphs = defaultPhilosophy,
  processSteps = defaultSteps,
  editorialEmail = 'vellumform@gmail.com',
  pinterestUrl = 'https://www.pinterest.com/vellumform/',
  instagramUrl = 'https://www.instagram.com/thevellumform/',
}: AboutTemplateProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editorialEmail)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'search':
        return <Search size={22} strokeWidth={1.25} className="text-[#8A7051]" />
      case 'vetting':
        return <CheckCircle2 size={22} strokeWidth={1.25} className="text-[#8A7051]" />
      case 'edit':
        return <PenTool size={22} strokeWidth={1.25} className="text-[#8A7051]" />
      default:
        return <Compass size={22} strokeWidth={1.25} className="text-[#8A7051]" />
    }
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#111111] selection:bg-[#8A7051]/20">
      {/* Unified Header */}
      <Header />

      {/* Hero / Header Section */}
      <section className="border-b border-[#E8E4DC]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-20 text-center md:px-12 md:py-28">
          <Reveal>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#8A7051]">
              {heroTag}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.03em] sm:text-6xl md:text-7xl">
              {headline}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-[#555555] md:text-lg">
              {subheadline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Manifesto Hero Image Full Width */}
      <section className="border-b border-[#E8E4DC] bg-[#E8E4DC]/20">
        <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
          <div
            className="relative aspect-video w-full overflow-hidden border border-[#E8E4DC] bg-[#E8E4DC] transition-[opacity,transform] duration-1000 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(1.02)',
            }}
          >
            <Image
              src={heroImage}
              alt="Architectural space curated by Vellum Form"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#FBF9F5] md:bottom-10 md:left-10 md:right-10">
              <span className="font-sans text-[10px] uppercase tracking-[0.24em]">
                Sanctuary / Archival Study
              </span>
              <span className="hidden font-sans text-[10px] uppercase tracking-[0.16em] sm:inline">
                Curated Selection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto & Philosophy Split Grid */}
      <section className="border-b border-[#E8E4DC]">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-[1.1fr_1fr]">
          {/* Left Column: Big Manifesto Statement */}
          <div className="border-b border-[#E8E4DC] p-8 md:border-b-0 md:border-r md:p-16 lg:p-24">
            <Reveal>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                Our Principle
              </span>
              <blockquote className="mt-8 font-serif text-3xl leading-[1.25] tracking-[-0.02em] text-[#111111] sm:text-4xl md:text-5xl">
                &ldquo;{manifestoStatement}&rdquo;
              </blockquote>
              <div className="mt-12 flex items-center gap-4 pt-6 border-t border-[#E8E4DC]">
                <Image
                  src="/round-logo.png"
                  alt="Vellum Form Seal"
                  width={64}
                  height={64}
                  className="h-11 w-11 object-contain rounded-full border border-border/80 p-0.5 shrink-0"
                />
                <div>
                  <p className="font-serif text-lg text-[#111111]">
                    The Editorial Desk
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8A7051]">
                    Vellum Form House // London &amp; Paris
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: In-depth Paragraphs */}
          <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-[#FBF9F5]">
            <div className="space-y-8 font-sans text-base leading-relaxed text-[#444444]">
              {philosophyParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 120}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curation Process / Step by Step */}
      <section className="border-b border-[#E8E4DC] bg-[#F4F0E8]/40">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <div className="mb-16 max-w-xl">
            <Reveal>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                Standards &amp; Method
              </span>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-[#111111] sm:text-4xl md:text-5xl">
                The Curation Process
              </h2>
              <p className="mt-4 font-sans text-sm text-[#555555]">
                How we navigate thousands of global objects to curate only what is worthy of your home.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 140}
                className="group border border-[#E8E4DC] bg-[#FBF9F5] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#8A7051] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center border border-[#E8E4DC] bg-[#FBF9F5] transition-colors group-hover:border-[#8A7051]">
                    {renderIcon(step.icon)}
                  </div>
                  <span className="font-serif text-xl italic text-[#8A7051]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-2xl tracking-[-0.01em] text-[#111111]">
                  {step.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[#555555]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Contact & Correspondence */}
      <section className="border-b border-[#E8E4DC]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <Reveal className="border border-[#E8E4DC] bg-[#FBF9F5] p-8 md:p-16 lg:p-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                  Inquiries &amp; Submissions
                </span>
                <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-[#111111] sm:text-4xl md:text-5xl">
                  Connect with the Editorial Desk
                </h2>
                <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-[#555555] md:text-base">
                  Whether you are an artisan studio seeking curation review, an architect proposing a feature, or a reader exploring intentional living, we welcome thoughtful conversation.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2.5 bg-[#111111] px-6 py-3.5 font-sans text-[11px] uppercase tracking-[0.16em] text-[#FBF9F5] transition-all hover:bg-[#8A7051]"
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    <span>
                      {copiedEmail ? 'Copied to Clipboard!' : 'Copy Editorial Email'}
                    </span>
                  </button>

                  <a
                    href={`mailto:${editorialEmail}`}
                    className="inline-flex items-center gap-2 border border-[#111111] px-6 py-3.5 font-sans text-[11px] uppercase tracking-[0.16em] text-[#111111] transition-all hover:bg-[#111111] hover:text-[#FBF9F5]"
                  >
                    Open Mail Client
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              {/* Social Channels Preview Cards */}
              <div className="flex flex-col gap-4 border-t border-[#E8E4DC] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <a
                  href={pinterestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[#E8E4DC] bg-[#FBF9F5] p-5 transition-all hover:border-[#8A7051] hover:shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E4DC] bg-white group-hover:border-[#8A7051]">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.057.24-.19.291-.439.175-1.644-.766-2.671-3.171-2.671-5.105 0-4.16 3.022-7.982 8.718-7.982 4.577 0 8.134 3.262 8.134 7.621 0 4.548-2.868 8.209-6.848 8.209-1.337 0-2.594-.695-3.024-1.514l-.824 3.143c-.298 1.146-1.104 2.583-1.645 3.456A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-serif text-base text-[#111111]">
                        Follow on Pinterest
                      </p>
                      <p className="font-sans text-[10px] text-[#666666]">
                        @vellumform / Daily inspiration
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#666666] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#111111]"
                  />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[#E8E4DC] bg-[#FBF9F5] p-5 transition-all hover:border-[#8A7051] hover:shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E4DC] bg-white group-hover:border-[#8A7051]">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-serif text-base text-[#111111]">
                        Instagram Journal
                      </p>
                      <p className="font-sans text-[10px] text-[#666666]">
                        @vellumform / Spatial diary
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="text-[#666666] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#111111]"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Unified Footer */}
      <Footer />
    </main>
  )
}
