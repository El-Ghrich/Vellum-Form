import { defineField, defineType } from 'sanity'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect (301/308)',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'The old URL path (e.g. /old-article)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination Path',
      type: 'string',
      description: 'The new URL path (e.g. /edit/sculptural-espresso-machines)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent Redirect (308/301)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
