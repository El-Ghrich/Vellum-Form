import { defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article / Edit',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / Curator',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'The curator credited with this edition (for E-E-A-T credentials)',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text (Crucial for SEO & Accessibility)',
          type: 'string',
          description: 'Describe the image for search engines and screen readers.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Curated Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'content',
      title: 'Editorial Content',
      type: 'array',
      of: [{ type: 'block' }], // Enables Rich Text editing
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions (Structured for AI / Schema.org)',
      type: 'array',
      of: [{ type: 'faq' }],
      description: 'Add structured questions and answers to win Google FAQ rich snippets and direct AI answers.',
    }),
    defineField({
      name: 'seo',
      title: 'Search Engine Optimization (SEO)',
      type: 'seo',
      description: 'Override meta tags, canonical URL, and social preview settings for this article.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
