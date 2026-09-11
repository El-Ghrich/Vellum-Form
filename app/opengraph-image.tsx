import { ImageResponse } from 'next/og'

export const alt = 'Vellum Form | Considered Design & Architecture'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FBF9F5',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          border: '16px solid #E8E4DC',
          fontFamily: 'serif',
          color: '#111111',
          position: 'relative',
        }}
      >
        {/* Decorative corner accents */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            width: 16,
            height: 16,
            borderTop: '2px solid #8A7051',
            borderLeft: '2px solid #8A7051',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            right: 28,
            width: 16,
            height: 16,
            borderBottom: '2px solid #8A7051',
            borderRight: '2px solid #8A7051',
          }}
        />

        {/* Small top kicker */}
        <div
          style={{
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            color: '#8A7051',
            fontFamily: 'sans-serif',
            marginBottom: 24,
          }}
        >
          Curated Design &amp; Architectural Guides
        </div>

        {/* Brand Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 400,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 20,
          }}
        >
          Vellum Form
        </div>

        {/* Manifesto Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontFamily: 'sans-serif',
            color: '#555555',
            textAlign: 'center',
            maxWidth: 750,
            lineHeight: 1.5,
            fontWeight: 300,
          }}
        >
          A digital curation house for the considered life. Curated spaces, tactile objects, and daily rituals.
        </div>

        {/* Editorial Desk seal */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderTop: '1px solid #E8E4DC',
            paddingTop: 20,
            fontFamily: 'sans-serif',
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#8A7051',
          }}
        >
          The Editorial Desk // vellumform.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
