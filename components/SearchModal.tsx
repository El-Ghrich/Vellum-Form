"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Loader2,
  Search,
  X,
  CornerDownLeft,
  Sparkles,
  Tag,
} from "lucide-react";

export interface SearchArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  image: string;
}

export interface CategoryOption {
  title: string;
  slug: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: CategoryOption[];
}

const defaultCategories: CategoryOption[] = [
  { title: "Living Spaces", slug: "living-spaces" },
  { title: "Daily Rituals", slug: "daily-rituals" },
  { title: "Skin & Wellness", slug: "skin-wellness" },
  { title: "The Edit", slug: "the-edit" },
];

export function SearchModal({
  isOpen,
  onClose,
  categories = defaultCategories,
}: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [results, setResults] = useState<SearchArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
      // Perform initial query to show recent articles
      fetchResults("", "all");
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setSelectedCategory("all");
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Global ESC and Cmd+K handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const fetchResults = useCallback(
    async (searchQuery: string, catSlug: string) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("q", searchQuery.trim());
        if (catSlug && catSlug !== "all") params.set("category", catSlug);

        const res = await fetch(`/api/search?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.articles || []);
        }
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Debounce search query
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      fetchResults(query, selectedCategory);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, selectedCategory, isOpen, fetchResults]);

  // Keyboard navigation through search results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelectArticle(results[selectedIndex].slug);
      } else if (query.trim()) {
        onClose();
        router.push(
          `/search?q=${encodeURIComponent(query.trim())}${selectedCategory !== "all" ? `&category=${selectedCategory}` : ""}`,
        );
      }
    }
  };

  const handleSelectArticle = (slug: string) => {
    onClose();
    router.push(`/edit/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
      className="fixed inset-0 z-90 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-12 backdrop-blur-sm transition-opacity duration-300 md:pt-20"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-[#FBF9F5] shadow-2xl text-foreground"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Bar Input */}
        <div className="flex items-center border-b border-border px-5 py-4">
          <Search
            size={18}
            strokeWidth={1.5}
            className="mr-3 shrink-0 text-muted-foreground"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            placeholder="Search articles, design stories, materials..."
            className="w-full bg-transparent font-sans text-sm tracking-wide text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          {isLoading && (
            <Loader2
              size={16}
              className="animate-spin text-accent mr-2 shrink-0"
            />
          )}
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search input"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded border border-border px-2 py-1 font-sans text-[10px] uppercase tracking-widest text-muted-foreground hover:bg-muted"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-border bg-card/40 px-5 py-2.5">
          <span className="flex items-center gap-1 font-sans text-[9px] uppercase tracking-[0.18em] text-muted-foreground mr-1">
            <Tag size={11} /> Filter:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`shrink-0 rounded-full px-3 py-1 font-sans text-[10px] uppercase tracking-wider transition-colors ${
              selectedCategory === "all"
                ? "bg-foreground text-background font-medium"
                : "border border-border bg-background text-muted-foreground hover:border-accent hover:text-accent"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setSelectedCategory(
                  cat.slug === selectedCategory ? "all" : cat.slug,
                )
              }
              className={`shrink-0 rounded-full px-3 py-1 font-sans text-[10px] uppercase tracking-wider transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-foreground text-background font-medium"
                  : "border border-border bg-background text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto px-4 py-3 divide-y divide-border/60"
        >
          {results.length > 0 ? (
            <div>
              <div className="px-2 py-1.5 font-sans text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {query.trim()
                  ? `Found ${results.length} Stories`
                  : "Latest Articles"}
              </div>
              <div className="space-y-1.5 mt-1">
                {results.map((article, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={article.id || article.slug}
                      onClick={() => handleSelectArticle(article.slug)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex items-center gap-4 rounded-md p-2.5 transition-colors cursor-pointer ${
                        isSelected ? "bg-[#F2EFE9]" : "hover:bg-[#F6F3ED]"
                      }`}
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded bg-muted">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#8A7051]">
                            {article.category}
                          </span>
                          {article.publishedAt && (
                            <span className="font-sans text-[9px] text-muted-foreground">
                              • {article.publishedAt}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-sm font-medium leading-tight text-foreground line-clamp-1 group-hover:underline">
                          {article.title}
                        </h4>
                        {article.excerpt && (
                          <p className="mt-0.5 font-sans text-[11px] text-muted-foreground line-clamp-1 leading-normal">
                            {article.excerpt}
                          </p>
                        )}
                      </div>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : !isLoading ? (
            <div className="py-12 text-center">
              <Image
                src="/round-logo.png"
                alt="VF Seal"
                width={48}
                height={48}
                className="mx-auto h-8 w-8 object-contain rounded-full opacity-50 mb-3"
              />
              <p className="font-serif text-base text-foreground">
                No articles found matching &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Try searching for broader keywords or selecting a different
                category.
              </p>
            </div>
          ) : null}
        </div>

        {/* Footer / Shortcuts */}
        <div className="flex items-center justify-between border-t border-border bg-card/60 px-5 py-3 font-sans text-[10px] text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[9px]">
                ↑
              </span>
              <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[9px]">
                ↓
              </span>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[9px]">
                ↵
              </span>
              to select
            </span>
          </div>
          {query.trim() && (
            <button
              onClick={() => {
                onClose();
                router.push(
                  `/search?q=${encodeURIComponent(query.trim())}${selectedCategory !== "all" ? `&category=${selectedCategory}` : ""}`,
                );
              }}
              className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-wider text-foreground hover:text-accent font-medium"
            >
              Full Search Page <ArrowUpRight size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
