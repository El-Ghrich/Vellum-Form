import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author / Curator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'role',
      title: 'Editorial Role / Title',
      type: 'string',
      description: 'e.g. Senior Architecture Editor, Design Curator',
      initialValue: 'Editor & Curator',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture / Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
