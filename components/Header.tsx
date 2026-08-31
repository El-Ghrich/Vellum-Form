'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SearchModal, CategoryOption } from '@/components/SearchModal'

export interface HeaderProps {
  categories?: CategoryOption[]
}

const defaultCategories: CategoryOption[] = [
  { title: 'Living Spaces', slug: 'living-spaces' },
  { title: 'Daily Rituals', slug: 'daily-rituals' },
  { title: 'Skin & Wellness', slug: 'skin-wellness' },
]

export function Header({ categories = defaultCategories }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

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

  const navCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          {/* Brand Logo & Monogram Lockup */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-80 py-1"
            aria-label="Vellum Form Home"
          >
            <Image
              src="/round-logo.png"
              alt="VF Monogram"
              width={64}
              height={64}
              priority
              className="h-6 w-6 sm:h-7 sm:w-7 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            <Image
              src="/Logo.png"
              alt="VELLUM FORM"
              width={260}
              height={36}
              priority
              className="h-3 sm:h-3.5 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 font-sans text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:flex">
            <Link
              href="/#objects"
              className="transition-colors hover:text-foreground"
            >
              Objects
            </Link>
            {navCategories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`transition-colors ${
                    isActive
                      ? 'text-foreground font-semibold border-b border-accent pb-0.5'
                      : 'hover:text-foreground'
                  }`}
                >
                  {cat.title}
                </Link>
              )
            })}
            <Link
              href="/about"
              className={`transition-colors ${
                pathname === '/about'
                  ? 'text-foreground font-semibold border-b border-accent pb-0.5'
                  : 'hover:text-foreground'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search articles (⌘K)"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground shadow-xs"
            >
              <Search size={13} strokeWidth={1.5} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden font-mono text-[9px] text-muted-foreground/70 sm:inline">⌘K</kbd>
            </button>

            <button
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-1 text-foreground lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-6 lg:hidden animate-in fade-in duration-200">
            <div className="flex flex-col gap-5 font-sans text-xs uppercase tracking-[0.16em]">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={pathname === '/' ? 'text-accent font-semibold' : 'text-foreground hover:text-accent'}
              >
                Home
              </Link>
              <Link
                href="/#objects"
                onClick={() => setMenuOpen(false)}
                className="text-foreground hover:text-accent"
              >
                Objects
              </Link>
              {navCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className={
                    pathname === `/category/${cat.slug}`
                      ? 'text-accent font-semibold'
                      : 'text-foreground hover:text-accent'
                  }
                >
                  {cat.title}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className={pathname === '/about' ? 'text-accent font-semibold' : 'text-foreground hover:text-accent'}
              >
                About
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  setSearchOpen(true)
                }}
                className="flex items-center gap-2 pt-2 border-t border-border text-left font-sans text-xs uppercase tracking-[0.16em] text-accent"
              >
                <Search size={14} /> Search Archive
              </button>
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
    </>
  )
}
