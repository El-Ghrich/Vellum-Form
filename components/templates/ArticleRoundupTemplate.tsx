"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Link2,
  Mail,
  Minus,
  Share2,
  Star,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PortableText } from "@portabletext/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Author {
  name: string;
  role?: string;
  bio?: string;
  image?: any;
}

export interface Product {
  _id?: string;
  rank?: number;
  name: string;
  brand: string;
  priceRange?: string;
  affiliateUrl?: string;
  image: string;
  rating?: number;
  badge?: string;
  pros?: string[];
  cons?: string[];
  desc?: string;
}

export interface AtAGlanceItem {
  award: string;
  product: Product;
  summary?: string;
}

export interface FinalVerdict {
  headline?: string;
  summary?: string;
  product?: Product;
}

export interface RelatedArticle {
  category?: string;
  title: string;
  image: string;
  slug?: string;
}

export interface ArticleRoundupTemplateProps {
  breadcrumbs: { label: string; href?: string }[];
  issueLabel?: string;
  heroImage?: string;
  heroImageAlt?: string;
  title: string;
  subtitle?: string;
  updatedAt?: string;
  readTime?: string;
  excerpt?: string;
  atAGlance?: AtAGlanceItem[];
  products: Product[];
  content?: any;
  faqs?: FAQItem[];
  finalVerdict?: FinalVerdict;
  author?: Author;
  relatedArticles?: RelatedArticle[];
}

function RatingDisplay({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <div
      className="inline-flex items-center gap-1.5 font-sans text-xs text-[#8A7051]"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      <span className="font-semibold">{rating.toFixed(1)}</span>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={
              star <= Math.round(rating)
                ? "fill-[#8A7051] text-[#8A7051]"
                : "text-[#E8E4DC]"
            }
          />
        ))}
      </div>
    </div>
  );
}

export function ArticleRoundupTemplate({
  breadcrumbs,
  issueLabel = "Curated Edit // Vol. 01",
  heroImage,
  heroImageAlt,
  title,
  subtitle,
  updatedAt = "Recently",
  readTime = "8 min read",
  excerpt,
  atAGlance,
  products = [],
  content,
  faqs = [],
  finalVerdict,
  author,
  relatedArticles = [],
}: ArticleRoundupTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  function handleCopyLink() {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Derive "At A Glance" spotlight items if not explicitly provided
  let glanceItems: AtAGlanceItem[] = atAGlance || [];
  if (glanceItems.length === 0 && products.length > 0) {
    const editorsChoiceProduct =
      products.find(
        (p) =>
          p.badge?.toLowerCase().includes("editor") ||
          p.badge?.toLowerCase().includes("overall") ||
          p.badge?.toLowerCase().includes("speed")
      ) || products[0];

    const bestValueProduct =
      products.find(
        (p) =>
          (p._id !== editorsChoiceProduct?._id &&
            p.badge?.toLowerCase().includes("value")) ||
          p.badge?.toLowerCase().includes("budget")
      ) ||
      products.find((p) => p._id !== editorsChoiceProduct?._id) ||
      products[1] ||
      products[0];

    const bestDesignProduct =
      products.find(
        (p) =>
          p._id !== editorsChoiceProduct?._id &&
          p._id !== bestValueProduct?._id &&
          (p.badge?.toLowerCase().includes("design") ||
            p.badge?.toLowerCase().includes("object") ||
            p.badge?.toLowerCase().includes("craft"))
      ) ||
      products.find(
        (p) =>
          p._id !== editorsChoiceProduct?._id &&
          p._id !== bestValueProduct?._id
      ) ||
      products[2] ||
      products[0];

    if (editorsChoiceProduct) {
      glanceItems.push({
        award: "Editor’s Choice",
        product: editorsChoiceProduct,
        summary: editorsChoiceProduct.desc || undefined,
      });
    }
    if (bestValueProduct && bestValueProduct._id !== editorsChoiceProduct?._id) {
      glanceItems.push({
        award: "Best Value",
        product: bestValueProduct,
        summary: bestValueProduct.desc || undefined,
      });
    }
    if (
      bestDesignProduct &&
      bestDesignProduct._id !== editorsChoiceProduct?._id &&
      bestDesignProduct._id !== bestValueProduct?._id
    ) {
      glanceItems.push({
        award: "Best Design Object",
        product: bestDesignProduct,
        summary: bestDesignProduct.desc || undefined,
      });
    }
  }

  // Fallback verdict if not explicitly passed
  const verdict: FinalVerdict | null =
    finalVerdict ||
    (products.length > 0
      ? {
          headline: "The Final Verdict",
          summary:
            "A considered workspace is built incrementally through pieces that respect both your routine and your aesthetic environment. While each object on this list satisfies distinct ergonomic and visual needs, investing in high-quality materials ensures enduring daily satisfaction.",
          product: products[0],
        }
      : null);

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#111111] selection:bg-[#8A7051]/20">
      {/* Unified Header */}
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b border-[#E8E4DC]">
        <div className="mx-auto flex max-w-[1000px] items-center gap-2 px-6 py-4 font-sans text-[11px] uppercase tracking-[0.14em] text-[#666666] md:px-0">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors duration-300 hover:text-[#111111]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#111111]">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight
                  size={11}
                  strokeWidth={1.5}
                  className="text-[#8A7051]"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 1. Hero Cover Image Section */}
      {heroImage && (
        <section className="border-b border-[#E8E4DC] bg-[#E8E4DC]/20">
          <div className="mx-auto max-w-[1000px] px-6 py-6 md:px-0 md:py-10">
            <Reveal>
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-[#E8E4DC]/40 shadow-xs">
                <Image
                  src={heroImage}
                  alt={heroImageAlt || title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1000px) 100vw, 1000px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
                {issueLabel && (
                  <span className="absolute bottom-4 left-4 border border-white/20 bg-black/40 backdrop-blur-md px-3.5 py-1.5 font-sans text-[9px] uppercase tracking-[0.2em] text-[#FBF9F5]">
                    {issueLabel}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 2. Editorial Title, Intro & Metadata */}
      <header className="border-b border-[#E8E4DC]">
        <div className="mx-auto max-w-[1000px] px-6 py-14 text-center md:px-0 md:py-20">
          {!heroImage && (
            <Reveal>
              <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                {issueLabel}
              </p>
            </Reveal>
          )}
          <Reveal delay={100}>
            <h1 className="mt-2 font-serif text-4xl leading-[1.08] tracking-[-0.03em] sm:text-6xl md:text-7xl">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={150}>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-[#666666]">
                {subtitle}
              </p>
            </Reveal>
          )}
          {excerpt && (
            <Reveal delay={200}>
              <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-[#555555] md:text-lg">
                {excerpt}
              </p>
            </Reveal>
          )}
          <Reveal delay={250}>
            <div className="mt-10 flex items-center justify-center gap-6 font-sans text-[10px] uppercase tracking-[0.16em] text-[#666666]">
              <span>Updated {updatedAt}</span>
              <span className="h-1 w-1 rounded-full bg-[#8A7051]" />
              <span>{readTime}</span>
              <span className="h-1 w-1 rounded-full bg-[#8A7051]" />
              <span>By {author?.name || "The Editorial Desk"}</span>
            </div>
          </Reveal>

          {/* 3. Affiliate Disclosure */}
          <Reveal delay={300}>
            <div className="mx-auto mt-8 max-w-lg border-t border-[#E8E4DC]/80 pt-4">
              <p className="font-sans text-xs italic leading-relaxed text-[#777777]">
                We independently curate tactile, architectural objects. If you
                purchase through our links, we may earn a commission.{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-[#111111] transition-colors not-italic font-normal text-[11px]"
                >
                  Learn more
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 4. “At a Glance” Recommendation Block (Editor’s Choice + Best Value + Best Design Object) */}
      {glanceItems.length > 0 && (
        <section className="border-b border-[#E8E4DC] bg-[#F4F1EA]/60 py-14 md:py-20">
          <div className="mx-auto max-w-[1000px] px-6 md:px-0">
            <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between border-b border-[#E8E4DC] pb-4">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                  At A Glance
                </span>
                <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em] text-[#111111] sm:text-3xl">
                  The Top Recommendations
                </h2>
              </div>
              <p className="mt-2 md:mt-0 font-sans text-[11px] uppercase tracking-[0.14em] text-[#666666]">
                Curated highlights for immediate acquisition
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {glanceItems.map((item, idx) => {
                const affiliateLink =
                  item.product.affiliateUrl && item.product.affiliateUrl !== "#"
                    ? item.product.affiliateUrl
                    : `https://www.amazon.com/s?k=${encodeURIComponent(
                        item.product.brand + " " + item.product.name
                      )}`;
                return (
                  <Reveal
                    key={item.award + idx}
                    delay={idx * 100}
                    className="flex flex-col justify-between border border-[#E8E4DC] bg-[#FBF9F5] p-6 transition-all duration-300 hover:border-[#8A7051]/60 group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8A7051]">
                          {item.award}
                        </span>
                        {item.product.rating && (
                          <RatingDisplay rating={item.product.rating} />
                        )}
                      </div>

                      <div className="relative mt-4 aspect-square w-full overflow-hidden bg-[#E8E4DC]/30">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7051]">
                          {item.product.brand}
                        </p>
                        <h3 className="mt-1 font-serif text-lg leading-snug tracking-[-0.01em] text-[#111111] line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="mt-2 font-serif text-sm text-[#111111]">
                          {item.product.priceRange || "Inquire"}
                        </p>
                        {item.summary && (
                          <p className="mt-2 font-sans text-xs leading-relaxed text-[#666666] line-clamp-3">
                            {item.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex flex-col gap-2">
                      <a
                        href={affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex w-full items-center justify-center gap-1.5 border border-[#111111] bg-[#111111] px-4 py-2.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#FBF9F5] transition-colors duration-300 hover:bg-transparent hover:text-[#111111]"
                      >
                        Check Availability <ArrowUpRight size={12} strokeWidth={1.5} />
                      </a>
                      {item.product.rank && (
                        <a
                          href={`#product-${item.product.rank}`}
                          className="text-center font-sans text-[10px] uppercase tracking-[0.14em] text-[#777777] hover:text-[#111111] transition-colors py-1"
                        >
                          Read full review ↓
                        </a>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Individual Product Sections (Product 1 to Product 5) */}
      <section className="mx-auto max-w-[1000px] px-6 py-16 md:px-0 md:py-24">
        <div className="mb-12 flex items-baseline justify-between border-b border-[#E8E4DC] pb-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7051]">
            Curated Selections
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#666666]">
            {products.length} {products.length === 1 ? "Object" : "Objects"}{" "}
            Reviewed
          </span>
        </div>

        <div className="space-y-24">
          {products.map((product, index) => (
            <Reveal
              key={product._id || product.name}
              as="article"
              delay={index * 80}
            >
              <div
                id={`product-${product.rank || index + 1}`}
                className="scroll-mt-28 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12"
              >
                {/* Product Imagery */}
                <div className="group relative aspect-square overflow-hidden bg-[#E8E4DC]/40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {product.badge && (
                    <span className="absolute left-4 top-4 border border-[#111111] bg-[#FBF9F5] px-3 py-1 font-sans text-[9px] uppercase tracking-[0.16em] text-[#111111]">
                      {product.badge}
                    </span>
                  )}
                  {product.rank && (
                    <span className="absolute right-4 top-4 font-serif text-2xl font-light text-[#8A7051]">
                      #{product.rank}
                    </span>
                  )}
                </div>

                {/* Product Editorial Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7051]">
                        {product.brand}
                      </p>
                      <RatingDisplay rating={product.rating} />
                    </div>

                    <h2 className="mt-3 font-serif text-2xl leading-tight tracking-[-0.01em] text-[#111111] md:text-3xl">
                      {product.name}
                    </h2>

                    {product.desc && (
                      <p className="mt-5 font-sans text-sm leading-relaxed text-[#555555]">
                        {product.desc}
                      </p>
                    )}

                    {/* Pros and Cons Breakdown */}
                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      {product.pros && product.pros.length > 0 && (
                        <div className="space-y-3">
                          <p className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#111111]">
                            The Strengths
                          </p>
                          <ul className="space-y-2">
                            {product.pros.map((pro, pIdx) => (
                              <li
                                key={pIdx}
                                className="flex items-start gap-2 text-xs text-[#555555]"
                              >
                                <Check
                                  size={13}
                                  className="mt-0.5 shrink-0 text-[#8A7051]"
                                />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {product.cons && product.cons.length > 0 && (
                        <div className="space-y-3">
                          <p className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#666666]">
                            Considerations
                          </p>
                          <ul className="space-y-2">
                            {product.cons.map((con, cIdx) => (
                              <li
                                key={cIdx}
                                className="flex items-start gap-2 text-xs text-[#666666]"
                              >
                                <Minus
                                  size={13}
                                  className="mt-0.5 shrink-0 text-[#666666]"
                                />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buy / Affiliate Action */}
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[#E8E4DC] pt-6">
                    <div>
                      <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[#666666]">
                        Price Range
                      </span>
                      <p className="font-serif text-lg text-[#111111]">
                        {product.priceRange || "Inquire"}
                      </p>
                    </div>
                    {(() => {
                      const affiliateLink =
                        product.affiliateUrl && product.affiliateUrl !== "#"
                          ? product.affiliateUrl
                          : `https://www.amazon.com/s?k=${encodeURIComponent(
                              product.brand + " " + product.name
                            )}`;
                      return (
                        <a
                          href={affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-flex w-full items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#FBF9F5] transition-colors duration-300 hover:bg-transparent hover:text-[#111111] sm:w-auto shadow-xs active:scale-[0.99]"
                        >
                          Check Availability{" "}
                          <ArrowUpRight size={13} strokeWidth={1.5} />
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. Long-form Editorial Essay (Simple Portable Text Section) */}
      {content && content.length > 0 && (
        <section className="border-t border-[#E8E4DC] bg-[#FBF9F5] py-14 md:py-20">
          <div className="mx-auto max-w-[780px] px-6 md:px-0">
            <div className="mb-8 border-b border-[#E8E4DC] pb-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7051]">
                Editorial Perspective
              </span>
              <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em] text-[#111111] sm:text-3xl">
                The Curation Essay
              </h2>
            </div>
            <div className="prose prose-neutral max-w-none text-[#444444] font-serif leading-relaxed">
              <PortableText value={content} />
            </div>
          </div>
        </section>
      )}

      {/* 7. Frequently Asked Questions (Structured FAQ) */}
      {faqs && faqs.length > 0 && (
        <section className="border-t border-[#E8E4DC] bg-[#FBF9F5] py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 md:px-0">
            <div className="mb-10 text-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                Editorial Inquiry
              </span>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-[#111111] md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-[#666666]">
                Selection Criteria &amp; Considered Details
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndices.includes(index);
                return (
                  <div
                    key={index}
                    className="border border-[#E8E4DC] bg-[#FBF9F5] transition-colors duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <span className="font-serif text-lg text-[#111111] pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-[#8A7051] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-[#E8E4DC] px-6 pb-6 pt-4">
                        <p className="font-sans text-sm leading-relaxed text-[#555555]">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. Final Verdict / Final Recommendation Section */}
      {verdict && (
        <section className="border-t border-[#E8E4DC] bg-[#F4F1EA]/60 py-16 md:py-24">
          <div className="mx-auto max-w-[1000px] px-6 md:px-0">
            <div className="mb-10 text-center md:text-left border-b border-[#E8E4DC] pb-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                The Verdict // Final Recommendation
              </span>
              <h2 className="mt-2 font-serif text-3xl tracking-[-0.02em] text-[#111111] sm:text-4xl">
                {verdict.headline || "The Final Recommendation"}
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-serif text-xl italic leading-relaxed text-[#333333] md:text-2xl">
                    &ldquo;A considered space is not bought at once, but composed one intentional piece at a time.&rdquo;
                  </p>
                  {verdict.summary && (
                    <p className="mt-6 font-sans text-sm leading-relaxed text-[#555555] md:text-base">
                      {verdict.summary}
                    </p>
                  )}
                </div>
              </div>

              {verdict.product && (
                <Reveal className="border border-[#111111] bg-[#FBF9F5] p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8A7051]">
                      Overall Standout Pick
                    </span>
                    {verdict.product.rating && (
                      <RatingDisplay rating={verdict.product.rating} />
                    )}
                  </div>

                  <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden bg-[#E8E4DC]/40">
                    <Image
                      src={verdict.product.image}
                      alt={verdict.product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <span className="absolute left-3 top-3 border border-[#111111] bg-[#FBF9F5] px-2.5 py-0.5 font-sans text-[8px] uppercase tracking-[0.16em] text-[#111111]">
                      {verdict.product.badge || "Editor’s Choice"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7051]">
                      {verdict.product.brand}
                    </p>
                    <h3 className="mt-1 font-serif text-xl leading-tight text-[#111111]">
                      {verdict.product.name}
                    </h3>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="font-serif text-base text-[#111111]">
                        {verdict.product.priceRange || "Inquire"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8E4DC]">
                    {(() => {
                      const affiliateLink =
                        verdict.product.affiliateUrl && verdict.product.affiliateUrl !== "#"
                          ? verdict.product.affiliateUrl
                          : `https://www.amazon.com/s?k=${encodeURIComponent(
                              verdict.product.brand + " " + verdict.product.name
                            )}`;
                      return (
                        <a
                          href={affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-flex w-full items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#FBF9F5] transition-colors duration-300 hover:bg-transparent hover:text-[#111111] shadow-xs active:scale-[0.99]"
                        >
                          Acquire Top Pick <ArrowUpRight size={13} strokeWidth={1.5} />
                        </a>
                      );
                    })()}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 9. Related Stories / Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-[#E8E4DC] bg-[#E8E4DC]/15 py-16 md:py-24">
          <div className="mx-auto max-w-[1000px] px-6 md:px-0">
            <div className="mb-10 flex items-baseline justify-between border-b border-[#E8E4DC] pb-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7051]">
                Related Journal Editions
              </span>
              <Link
                href="/#the-edit"
                className="inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[#666666] hover:text-[#111111]"
              >
                View Archive <ArrowUpRight size={12} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {relatedArticles.map((article, idx) => (
                <Reveal key={article.slug || idx} delay={idx * 100}>
                  <Link href={`/edit/${article.slug}`} className="group block">
                    <div className="relative aspect-[3/2] overflow-hidden bg-[#E8E4DC]">
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

      {/* Curator Bio & Share Tray */}
      <section className="mx-auto max-w-[1000px] px-6 py-12 md:px-0 md:py-16">
        <Reveal className="flex flex-col gap-6 border border-[#E8E4DC] bg-[#FBF9F5] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex items-center gap-3.5">
            <Image
              src="/round-logo.png"
              alt="VF Seal"
              width={64}
              height={64}
              className="h-10 w-10 object-contain rounded-full border border-[#E8E4DC] p-0.5 shrink-0"
            />
            <div>
              <p className="font-serif text-xl text-[#111111]">
                {author?.name || "The Editorial Desk"}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8A7051] mt-0.5">
                {author?.role || "Curated for the considered life"}
              </p>
              {author?.bio && (
                <p className="mt-1 font-sans text-xs text-[#666666] max-w-sm">
                  {author.bio}
                </p>
              )}
            </div>
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
      </section>

      {/* Unified Footer */}
      <Footer />
    </main>
  );
}
