// app/studio/[[...index]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config' // Adjust the path to where your sanity.config.ts is

export default function StudioPage() {
  return <NextStudio config={config} />
}