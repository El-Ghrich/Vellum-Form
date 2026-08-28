import Image from 'next/image'
import Link from 'next/link'
import { CategoryOption } from '@/components/SearchModal'

export interface FooterProps {
  categories?: CategoryOption[]
}

const defaultCategories: CategoryOption[] = [
  { title: 'Living Spaces', slug: 'living-spaces' },
  { title: 'Daily Rituals', slug: 'daily-rituals' },
  { title: 'Skin & Wellness', slug: 'skin-wellness' },
  { title: 'The Edit', slug: 'the-edit' },
]

export function Footer({ categories = defaultCategories }: FooterProps) {
  const navCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <footer className="border-t border-border bg-[#FBF9F5] text-foreground">
      {/* Main Footer Links */}
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:px-10 md:py-18">
        {/* Brand Summary & Logo Lockup */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80"
            aria-label="Vellum Form Home"
          >
            <Image
              src="/round-logo.png"
              alt="VF Seal"
              width={72}
              height={72}
              className="h-8 w-8 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            <Image
              src="/Logo.png"
              alt="VELLUM FORM"
              width={260}
              height={36}
              className="h-3.5 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-xs font-serif text-xl leading-snug text-foreground/90">
            A digital curation house for the considered life.
          </p>
          <p className="mt-3 max-w-xs font-sans text-xs leading-relaxed text-muted-foreground">
            Exploring timeless objects, tactile architecture, and intentional daily rituals.
          </p>
        </div>

        {/* Categories Column */}
        <div className="flex flex-col gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="mb-2 text-accent font-semibold">Categories</span>
          {navCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="transition-colors hover:text-foreground"
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {/* Journal & Curations Column */}
        <div className="flex flex-col gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="mb-2 text-accent font-semibold">Journal &amp; Edit</span>
          <Link href="/#the-edit" className="transition-colors hover:text-foreground">
            The Weekly Edit
          </Link>
          <Link href="/#objects" className="transition-colors hover:text-foreground">
            Curated Objects
          </Link>
          <Link href="/search" className="transition-colors hover:text-foreground">
            Search Archive
          </Link>
          <Link href="/category" className="transition-colors hover:text-foreground">
            All Collections
          </Link>
        </div>

        {/* Elsewhere Column */}
        <div className="flex flex-col gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="mb-2 text-accent font-semibold">Elsewhere</span>
          <a
            href="https://www.instagram.com/thevellumform/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Instagram
          </a>
          <a
            href="https://www.pinterest.com/vellumform/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Pinterest
          </a>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About Us
          </Link>
          <Link href="/legal" className="transition-colors hover:text-foreground">
            Privacy &amp; Terms
          </Link>
        </div>
      </div>

      {/* Bottom Bar Disclosures & Copyright */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 font-sans text-[9px] leading-5 tracking-[0.04em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 Vellum Form. All rights reserved.</span>
          <span className="max-w-md text-center md:text-left">
            Affiliate disclosure: We may earn a commission from select links, at no additional cost to you.
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
      </div>
    </footer>
  )
}
