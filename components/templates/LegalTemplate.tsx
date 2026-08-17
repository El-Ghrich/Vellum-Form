'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Mail, ShieldCheck } from 'lucide-react'

export interface LegalTemplateProps {
  lastUpdated?: string
  contactEmail?: string
}

export function LegalTemplate({
  lastUpdated = 'August 2026',
  contactEmail = 'vellumform@gmail.com',
}: LegalTemplateProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#111111] selection:bg-[#8A7051]/20">
      {/* Editorial Header */}
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
            <Link
              href="/#search"
              aria-label="Search archive"
              className="text-[#666666] transition-colors hover:text-[#111111]"
            >
              <Search size={17} strokeWidth={1.5} />
            </Link>
            <button
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="text-[#111111] lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-[#E8E4DC] bg-[#FBF9F5] px-6 py-8 lg:hidden">
            <div className="flex flex-col gap-6 font-sans text-xs uppercase tracking-[0.18em]">
              <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#8A7051]">
                Home
              </Link>
              <Link href="/#objects" onClick={() => setMenuOpen(false)} className="hover:text-[#8A7051]">
                Objects
              </Link>
              <Link
                href="/category/living-spaces"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8A7051]"
              >
                Living Spaces
              </Link>
              <Link href="/#the-edit" onClick={() => setMenuOpen(false)} className="hover:text-[#8A7051]">
                The Edit
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#8A7051]">
                About Us
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main Legal Content Container */}
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Title Header */}
        <header className="border-b border-[#E8E4DC] pb-10">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#8A7051]">
            <ShieldCheck size={13} strokeWidth={1.5} />
            <span>Editorial Transparency & Standards</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl leading-[1.2] tracking-[-0.02em] text-[#111111] sm:text-4xl md:text-5xl">
            Legal, Privacy & Affiliate Disclosures
          </h1>
          <p className="mt-4 font-sans text-xs uppercase tracking-[0.14em] text-[#666666]">
            Last Updated: {lastUpdated}
          </p>
        </header>

        {/* Body Content */}
        <div className="mt-12 flex flex-col gap-12 font-sans text-[15px] leading-[1.8] text-[#333333]">
          {/* Section 1: Amazon Affiliate Disclosure */}
          <section className="scroll-mt-24 border-b border-[#E8E4DC] pb-10">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              1. Amazon Affiliate Disclosure
            </h2>
            <div className="mt-5 rounded border border-[#E8E4DC] bg-[#FAF8F3] p-5 italic text-[#111111]">
              <p>
                &ldquo;Vellum Form is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.&rdquo;
              </p>
            </div>
            <p className="mt-5">
              As an Amazon Associate, we earn from qualifying purchases. This means if you click on an affiliate link and make a purchase, we may receive a small commission at absolutely no additional cost to you.
            </p>
          </section>

          {/* Section 2: Editorial & General Affiliate Disclosure */}
          <section className="scroll-mt-24 border-b border-[#E8E4DC] pb-10">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              2. Editorial &amp; General Affiliate Disclosure
            </h2>
            <p className="mt-5">
              Integrity is the foundation of our curation. While we may earn commissions from links on Vellum Form, our editorial selection is never dictated by affiliate partnerships. We only recommend objects, brands, and tools that meet our strict standards for quality, aesthetic, and longevity. Earning a commission allows us to keep the site running and the editorial content free for our readers.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6 text-[#555555]">
              <li>
                <strong className="text-[#111111]">Independence:</strong> No brand can purchase guaranteed positive placement or editorial praise.
              </li>
              <li>
                <strong className="text-[#111111]">Transparency:</strong> All sponsored inclusions or commission-generating links are clearly disclosed.
              </li>
              <li>
                <strong className="text-[#111111]">Direct Curation:</strong> All evaluated products undergo rigorous material and functional scrutiny before being recommended.
              </li>
            </ul>
          </section>

          {/* Section 3: Privacy Policy & Cookies */}
          <section className="scroll-mt-24 border-b border-[#E8E4DC] pb-10">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              3. Privacy Policy &amp; Cookies
            </h2>
            <p className="mt-5">
              Vellum Form respects your privacy. When you visit our website, certain information (such as IP addresses, browser types, and access times) may be logged through standard analytics tools to help us improve the reading experience.
            </p>
            <h3 className="mt-6 font-sans text-base font-semibold text-[#111111]">
              Cookies &amp; Tracking Technologies
            </h3>
            <p className="mt-3">
              We use cookies to enhance your experience. Furthermore, our third-party affiliate partners (including Amazon) may use cookies to track clicks and assign commissions securely. You can choose to disable cookies through your individual browser options.
            </p>
          </section>

          {/* Section 4: Contact Us */}
          <section className="scroll-mt-24">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              4. Contact the Editorial Desk
            </h2>
            <p className="mt-5">
              If you have any questions regarding our policies, our curation process, or partnerships, please contact us at:
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 border border-[#E8E4DC] bg-[#FAF8F3] px-5 py-3 font-sans text-sm font-medium text-[#111111] transition-colors hover:border-[#8A7051] hover:text-[#8A7051]"
              >
                <Mail size={15} strokeWidth={1.5} className="text-[#8A7051]" />
                <span>{contactEmail}</span>
              </a>
            </div>
          </section>
        </div>
      </article>

      {/* Editorial Footer */}
      <footer className="border-t border-[#E8E4DC] bg-[#FBF9F5]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-12 md:py-20">
          <div>
            <Link
              href="/"
              className="font-sans text-[11px] font-semibold tracking-[0.28em] text-[#111111]"
            >
              VELLUM FORM
            </Link>
            <p className="mt-5 max-w-xs font-serif text-xl leading-snug text-[#111111]">
              A digital curation house for the considered life.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#666666]">
            <span className="mb-2 font-medium text-[#8A7051]">Explore</span>
            <Link href="/#objects" className="transition-colors hover:text-[#111111]">
              Objects
            </Link>
            <Link href="/category/living-spaces" className="transition-colors hover:text-[#111111]">
              Living Spaces
            </Link>
            <Link href="/#the-edit" className="transition-colors hover:text-[#111111]">
              The Edit
            </Link>
          </div>

          <div className="flex flex-col gap-3.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#666666]">
            <span className="mb-2 font-medium text-[#8A7051]">Elsewhere</span>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#111111]"
            >
              Pinterest
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#111111]"
            >
              Instagram
            </a>
            <Link href="/about" className="transition-colors hover:text-[#111111]">
              About Us
            </Link>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 border-t border-[#E8E4DC] px-6 py-8 font-sans text-[10px] leading-5 tracking-[0.04em] text-[#666666] md:flex-row md:items-center md:justify-between md:px-12">
          <span>© 2026 Vellum Form. All rights reserved.</span>
          <span>
            Affiliate disclosure: We may earn a commission from select links, at no additional cost to you.
          </span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <span>/</span>
            <Link href="/legal" className="hover:underline text-[#111111] font-medium">
              Privacy & Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
