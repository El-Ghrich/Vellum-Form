import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand / Maker',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Display (e.g. $195 or $$$)',
      type: 'string',
    }),
    defineField({
      name: 'affiliateUrl',
      title: 'Affiliate URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Editorial Rating (out of 5)',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'badge',
      title: 'Award Badge (e.g. Best Overall, Editor’s Choice)',
      type: 'string',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons / Trade-offs',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});