"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  PenTool,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Compass,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SearchModal } from "@/components/SearchModal";

export interface AboutTemplateProps {
  heroImage?: string;
  heroTag?: string;
  headline?: string;
  subheadline?: string;
  manifestoStatement?: string;
  philosophyParagraphs?: string[];
  processSteps?: {
    number: string;
    title: string;
    description: string;
    icon: "search" | "vetting" | "edit" | "compass";
  }[];
  editorialEmail?: string;
  pinterestUrl?: string;
  instagramUrl?: string;
}

const defaultPhilosophy = [
  "Vellum Form was born from a desire to cut through the noise of modern consumerism. We believe that the objects we interact with every day—from the kettle we pour our morning coffee with to the lamp that lights our workspace—should elevate our daily rituals.",
  "We serve as a digital curation house, meticulously filtering out fleeting trends and low-quality goods to present only the finest in modern design, functional architecture, and quiet luxury.",
  "Every piece highlighted in our journal has undergone rigorous examination for material authenticity, architectural proportion, and enduring craftsmanship—ensuring your space remains timeless.",
];

const defaultSteps: NonNullable<AboutTemplateProps["processSteps"]> = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We scour global design houses, artisan studios, and verified customer experiences to find exceptional objects.",
    icon: "search",
  },
  {
    number: "02",
    title: "Vetting",
    description:
      "We analyze materials, longevity, craftsmanship, and aesthetic value to ensure only enduring pieces make the cut.",
    icon: "vetting",
  },
  {
    number: "03",
    title: "The Edit",
    description:
      "We publish unbiased, highly curated guides to help you build a space that feels intentional, harmonious, and refined.",
    icon: "edit",
  },
];

export function AboutTemplate({
  heroImage = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85",
  heroTag = "Curation House / Manifesto",
  headline = "About Vellum Form",
  subheadline = "Curating the Art of Intentional Living.",
  manifestoStatement = "We believe that a space is not merely filled—it is composed. Every silhouette, texture, and light source shapes how we feel and live.",
  philosophyParagraphs = defaultPhilosophy,
  processSteps = defaultSteps,
  editorialEmail = "vellumform@gmail.com",
  pinterestUrl = "https://www.pinterest.com/vellumform/",
  instagramUrl = "https://www.instagram.com/thevellumform/",
}: AboutTemplateProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editorialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "search":
        return (
          <Search size={22} strokeWidth={1.25} className="text-[#8A7051]" />
        );
      case "vetting":
        return (
          <CheckCircle2
            size={22}
            strokeWidth={1.25}
            className="text-[#8A7051]"
          />
        );
      case "edit":
        return (
          <PenTool size={22} strokeWidth={1.25} className="text-[#8A7051]" />
        );
      default:
        return (
          <Compass size={22} strokeWidth={1.25} className="text-[#8A7051]" />
        );
    }
  };

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
            <Link
              href="/#objects"
              className="transition-colors hover:text-[#111111]"
            >
              Objects
            </Link>
            <Link
              href="/category/living-spaces"
              className="transition-colors hover:text-[#111111]"
            >
              Living Spaces
            </Link>
            <Link
              href="/category/daily-rituals"
              className="transition-colors hover:text-[#111111]"
            >
              Daily Rituals
            </Link>
            <Link
              href="/#the-edit"
              className="transition-colors hover:text-[#111111]"
            >
              The Edit
            </Link>
            <Link
              href="/about"
              className="text-[#111111] font-medium border-b border-[#8A7051] pb-0.5"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search articles"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#E8E4DC] px-3 py-1.5 font-sans text-[10px] uppercase tracking-wider text-[#666666] transition-all duration-300 hover:border-[#111111] hover:text-[#111111]"
            >
              <Search size={13} strokeWidth={1.5} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden font-mono text-[9px] text-[#888888] sm:inline">
                ⌘K
              </kbd>
            </button>
            <button
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="text-[#111111] lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Global Search Modal */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="border-t border-[#E8E4DC] bg-[#FBF9F5] px-6 py-8 lg:hidden">
            <div className="flex flex-col gap-6 font-sans text-xs uppercase tracking-[0.18em]">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8A7051]"
              >
                Home
              </Link>
              <Link
                href="/#objects"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8A7051]"
              >
                Objects
              </Link>
              <Link
                href="/category/living-spaces"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8A7051]"
              >
                Living Spaces
              </Link>
              <Link
                href="/#the-edit"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#8A7051]"
              >
                The Edit
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-[#8A7051] font-semibold"
              >
                About Us
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Section 1: Editorial Hero */}
      <section className="mx-auto max-w-[1440px] px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-[#E8E4DC] bg-[#FBF9F5] px-3.5 py-1 text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
              <Sparkles size={11} strokeWidth={1.5} />
              <span>{heroTag}</span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="mt-6 font-serif text-4xl leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-5xl md:text-6xl lg:text-7xl">
              {headline}
            </h1>
          </Reveal>

          <Reveal delay={250}>
            <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic text-[#8A7051] md:text-2xl">
              {subheadline}
            </p>
          </Reveal>
        </div>

        {/* 16:9 Cinematic Lifestyle Hero Image */}
        <Reveal delay={350} className="mt-12 md:mt-16">
          <div
            className="relative aspect-video w-full overflow-hidden border border-[#E8E4DC] bg-[#E8E4DC] transition-[opacity,transform] duration-1000 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(1.02)",
            }}
          >
            <Image
              src={heroImage}
              alt="Minimalist architecture and serene living space curation"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-sans text-[9px] uppercase tracking-[0.2em] text-[#FBF9F5] md:bottom-8 md:left-8 md:right-8 md:text-[10px]">
              <span>Vellum Form Archives</span>
              <span>Plate 01 // Living Architecture</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Section 2: The Manifesto / Our Philosophy */}
      <section className="border-t border-[#E8E4DC] bg-[#FBF9F5]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Column: Bold Serif Statement */}
            <div className="lg:col-span-5">
              <Reveal>
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                  Our Philosophy
                </span>
                <h2 className="mt-4 font-serif text-2xl leading-[1.3] tracking-[-0.02em] text-[#111111] sm:text-3xl md:text-4xl">
                  {manifestoStatement}
                </h2>
                <div className="mt-8 h-[1px] w-20 bg-[#8A7051]" />
              </Reveal>
            </div>

            {/* Right Column: Mission Text */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {philosophyParagraphs.map((para, idx) => (
                <Reveal key={idx} delay={idx * 120}>
                  <p className="font-sans text-[15px] leading-[1.8] text-[#555555] md:text-base">
                    {para}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={360}>
                <div className="mt-4 flex items-center gap-4 pt-6 border-t border-[#E8E4DC]">
                  <div>
                    <p className="font-serif text-lg text-[#111111]">
                      The Editorial Desk
                    </p>
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8A7051]">
                      Vellum Form House // London & Paris
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Curation Process (3-Step Grid) */}
      <section className="border-t border-[#E8E4DC] bg-[#FAF8F3]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-32">
          <div className="mx-auto max-w-2xl text-center mb-16 md:mb-24">
            <Reveal>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                Methodology
              </span>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-[#111111] md:text-4xl">
                The Curation Process
              </h2>
              <p className="mt-4 font-sans text-sm text-[#555555]">
                How we navigate thousands of global objects to curate only what
                is worthy of your home.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-8 lg:gap-12">
            {processSteps.map((step, idx) => (
              <Reveal
                key={step.title}
                delay={idx * 150}
                className="group relative border border-[#E8E4DC] bg-[#FBF9F5] p-8 md:p-10 transition-all duration-300 hover:border-[#8A7051]/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-6">
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
                <p className="mt-4 font-sans text-sm leading-[1.75] text-[#555555]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Contact / Connect Block */}
      <section className="border-t border-[#E8E4DC] bg-[#FBF9F5]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-32">
          <Reveal className="border border-[#E8E4DC] bg-[#F7F4EE] p-8 md:p-16 lg:p-20">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8A7051]">
                  Connect & Correspondence
                </span>
                <h2 className="mt-4 font-serif text-3xl leading-snug tracking-[-0.02em] text-[#111111] sm:text-4xl md:text-5xl">
                  Connect with the Editorial Desk
                </h2>
                <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-[#555555] md:text-base">
                  Whether you are an artisan studio seeking curation review, an
                  architect proposing a feature, or a reader exploring
                  intentional living, we welcome thoughtful conversation.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2.5 bg-[#111111] px-6 py-3.5 font-sans text-[11px] uppercase tracking-[0.16em] text-[#FBF9F5] transition-all hover:bg-[#8A7051]"
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    <span>
                      {copiedEmail
                        ? "Copied to Clipboard!"
                        : "Copy Editorial Email"}
                    </span>
                  </button>

                  <a
                    href={`mailto:${editorialEmail}`}
                    className="inline-flex items-center gap-2 border border-[#111111] bg-transparent px-6 py-3.5 font-sans text-[11px] uppercase tracking-[0.16em] text-[#111111] transition-colors hover:border-[#8A7051] hover:text-[#8A7051]"
                  >
                    <span>Send Direct Inquiry</span>
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-5 border-t border-[#E8E4DC] pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8A7051]">
                  Social & Visual Moodboards
                </p>

                <a
                  href={pinterestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[#E8E4DC] bg-[#FBF9F5] p-5 transition-all hover:border-[#8A7051]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E4DC]/50 text-[#111111] group-hover:bg-[#8A7051] group-hover:text-white transition-colors">
                      <svg
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
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
                    className="text-[#666666] group-hover:text-[#8A7051] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-[#E8E4DC] bg-[#FBF9F5] p-5 transition-all hover:border-[#8A7051]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E4DC]/50 text-[#111111] group-hover:bg-[#8A7051] group-hover:text-white transition-colors">
                      <svg
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                    className="text-[#666666] group-hover:text-[#8A7051] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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
            <Link
              href="/#objects"
              className="transition-colors hover:text-[#111111]"
            >
              Objects
            </Link>
            <Link
              href="/category/living-spaces"
              className="transition-colors hover:text-[#111111]"
            >
              Living Spaces
            </Link>
            <Link
              href="/#the-edit"
              className="transition-colors hover:text-[#111111]"
            >
              The Edit
            </Link>
          </div>

          <div className="flex flex-col gap-3.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#666666]">
            <span className="mb-2 font-medium text-[#8A7051]">Elsewhere</span>
            <a
              href={pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#111111]"
            >
              Pinterest
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#111111]"
            >
              Instagram
            </a>
            <Link href="/about" className="text-[#111111] font-semibold">
              About Us
            </Link>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 border-t border-[#E8E4DC] px-6 py-8 font-sans text-[10px] leading-5 tracking-[0.04em] text-[#666666] md:flex-row md:items-center md:justify-between md:px-12">
          <span>© 2026 Vellum Form. All rights reserved.</span>
          <span>
            Affiliate disclosure: We may earn a commission from select links, at
            no additional cost to you.
          </span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <span>/</span>
            <span className="hover:underline cursor-pointer">
              Privacy & Terms
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
