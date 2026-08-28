'use client'

import { Mail, ShieldCheck } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export interface LegalTemplateProps {
  lastUpdated?: string
  contactEmail?: string
}

export function LegalTemplate({
  lastUpdated = 'August 2026',
  contactEmail = 'vellumform@gmail.com',
}: LegalTemplateProps) {
  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#111111] selection:bg-[#8A7051]/20">
      {/* Unified Header */}
      <Header />

      {/* Main Legal Content Container */}
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Title Header */}
        <header className="border-b border-[#E8E4DC] pb-10">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#8A7051]">
            <ShieldCheck size={13} strokeWidth={1.5} />
            <span>Editorial Transparency &amp; Standards</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl leading-[1.2] tracking-[-0.02em] text-[#111111] sm:text-4xl md:text-5xl">
            Legal, Privacy &amp; Affiliate Disclosures
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
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#555555]">
              <p>
                <strong>Vellum Form</strong> participates in the Amazon Services LLC Associates
                Program, an affiliate advertising program designed to provide a means for sites to
                earn advertising fees by advertising and linking to Amazon.com and affiliated sites.
              </p>
              <p>
                As an Amazon Associate, we earn from qualifying purchases. This means that if you
                click an outbound link on our site and make a purchase, we may receive a small
                commission at absolutely no additional cost to you.
              </p>
              <p>
                Our editorial integrity is paramount. Affiliate partnerships do not influence our
                editorial curation, object evaluations, or ratings. We only feature pieces that
                align with our strict criteria of architectural form, longevity, and material
                authenticity.
              </p>
            </div>
          </section>

          {/* Section 2: General Affiliate & Commercial Links */}
          <section className="scroll-mt-24 border-b border-[#E8E4DC] pb-10">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              2. Outbound Links &amp; Commercial Relationships
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#555555]">
              <p>
                In addition to Amazon, Vellum Form may contain links to artisan design studios,
                independent retailers, and boutique homeware brands. Some of these links may be
                tracked for affiliate or referral commission purposes.
              </p>
              <p>
                We do not accept paid placements for positive product reviews. Any sponsored
                editorial content or dedicated brand partnerships will always be explicitly labeled
                as sponsored at the top of the publication.
              </p>
            </div>
          </section>

          {/* Section 3: Privacy Policy */}
          <section className="scroll-mt-24 border-b border-[#E8E4DC] pb-10">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              3. Privacy Policy &amp; Data Handling
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#555555]">
              <p>
                We value your privacy as much as we value quiet spaces. We do not sell, rent, or
                distribute your personal information to third parties.
              </p>
              <h3 className="pt-2 font-serif text-lg text-[#111111]">Information We Collect:</h3>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li>
                  <strong>Newsletter Subscriptions:</strong> If you voluntarily subscribe to{' '}
                  <em>The Private Dispatch</em>, we store your email address solely for the purpose
                  of sending our editorial dispatches. You may unsubscribe at any moment.
                </li>
                <li>
                  <strong>Analytics &amp; Cookies:</strong> We utilize privacy-conscious, anonymized
                  web analytics to understand reader traffic patterns and refine our publication.
                  These tools set standard cookies on your browser.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Terms of Use */}
          <section className="scroll-mt-24 border-b border-[#E8E4DC] pb-10">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              4. Terms of Use &amp; Intellectual Property
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#555555]">
              <p>
                All original written content, editorial structures, custom photography, and design
                assets on Vellum Form are the intellectual property of Vellum Form unless otherwise
                credited.
              </p>
              <p>
                You may quote brief excerpts or link to our guides provided that clear, explicit
                attribution and a direct hyperlink to the original Vellum Form article are
                maintained. Reproduction of entire articles without written permission is strictly
                prohibited.
              </p>
            </div>
          </section>

          {/* Section 5: Editorial Contact */}
          <section className="scroll-mt-24">
            <h2 className="font-serif text-2xl tracking-[-0.01em] text-[#111111] md:text-3xl">
              5. Contacting the Legal &amp; Editorial Desk
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#555555]">
              For inquiries regarding copyright, commercial partnerships, or privacy requests,
              please reach out directly to our desk:
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-[#E8E4DC] bg-white px-5 py-3.5">
              <Mail size={16} className="text-[#8A7051]" />
              <a
                href={`mailto:${contactEmail}`}
                className="font-sans text-xs uppercase tracking-[0.14em] text-[#111111] hover:underline"
              >
                <span>{contactEmail}</span>
              </a>
            </div>
          </section>
        </div>
      </article>

      {/* Unified Footer */}
      <Footer />
    </main>
  )
}
