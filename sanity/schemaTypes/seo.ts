import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Search Engine Optimization (SEO)',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (Overrides Headline)',
      type: 'string',
      description: 'Optimal length: 50-60 characters. Appears in search results and social links.',
      validation: (rule) => rule.max(70).warning('Titles longer than 60-70 characters may get truncated in Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Optimal length: 140-160 characters. Concise summary for search result snippets and AI summaries.',
      validation: (rule) => rule.max(170).warning('Descriptions longer than 160 characters may be truncated.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social Share Image (Open Graph / Twitter)',
      type: 'image',
      description: 'Recommended: 1200x630px. Fallback is the article cover image or dynamic branded card.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (Optional override)',
      type: 'url',
      description: 'Leave blank to use the default URL.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      description: 'Check this to instruct search engines NOT to index this page.',
      initialValue: false,
    }),
  ],
})
