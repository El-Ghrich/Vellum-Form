'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Tag } from 'lucide-react'

interface CategoryOption {
  title: string
  slug: string
}

interface SearchClientViewProps {
  initialQuery: string
  initialCategory: string
  categories: CategoryOption[]
}

export function SearchClientView({ initialQuery, initialCategory, categories }: SearchClientViewProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (category) params.set('category', category)
    router.push(`/search?${params.toString()}`)
  }

  const handleCategoryChange = (slug: string) => {
    const nextCategory = category === slug ? '' : slug
    setCategory(nextCategory)
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (nextCategory) params.set('category', nextCategory)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search size={18} strokeWidth={1.5} className="absolute left-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keyword, title, or material..."
          className="w-full rounded-md border border-border bg-card px-11 py-3.5 font-sans text-sm tracking-wide text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-[#8A7051] focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              const params = new URLSearchParams()
              if (category) params.set('category', category)
              router.push(`/search?${params.toString()}`)
            }}
            className="absolute right-24 p-1 text-muted-foreground hover:text-foreground"
            aria-label="Clear query"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 rounded bg-foreground px-4 py-2 font-sans text-[10px] uppercase tracking-wider text-background hover:bg-foreground/90 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Category Pills Filter */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
        <span className="flex items-center gap-1 font-sans text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          <Tag size={11} /> Filter:
        </span>
        <button
          type="button"
          onClick={() => handleCategoryChange('')}
          className={`shrink-0 rounded-full px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-wider transition-colors ${
            !category
              ? 'bg-foreground text-background font-medium'
              : 'border border-border bg-background text-muted-foreground hover:border-[#8A7051] hover:text-[#8A7051]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat.slug}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-wider transition-colors ${
              category === cat.slug
                ? 'bg-foreground text-background font-medium'
                : 'border border-border bg-background text-muted-foreground hover:border-[#8A7051] hover:text-[#8A7051]'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  )
}
