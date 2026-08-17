// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk' // or 'sanity/structure' depending on version
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'Vellum Form',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    // This tells Sanity where the Studio lives on your site
    basePath: '/studio',

    plugins: [deskTool()],

    schema: {
        types: schemaTypes,
    },
})