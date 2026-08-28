'use client'

const names = [
  'SALTER HOUSE',
  'ATELIER NORD',
  'FORME / 01',
  'MORNING OBJECTS',
  'MAISON VELUM',
  'STUDIO ARCHIVE',
  'NORTHLIGHT & CO',
  'QUIET METAL',
]

export function LogoLoop() {
  return (
    <section
      aria-hidden="true"
      className="group relative flex overflow-hidden select-none border-b border-border bg-background py-8"
      style={{
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage:
          'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div className="flex shrink-0 items-center justify-around gap-16 whitespace-nowrap px-8 animate-loop-scroll">
        {names.map((name, index) => (
          <span
            key={`track1-${name}-${index}`}
            className="font-sans text-xs uppercase tracking-[0.32em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            {name}
          </span>
        ))}
      </div>
      <div
        className="flex shrink-0 items-center justify-around gap-16 whitespace-nowrap px-8 animate-loop-scroll"
        aria-hidden="true"
      >
        {names.map((name, index) => (
          <span
            key={`track2-${name}-${index}`}
            className="font-sans text-xs uppercase tracking-[0.32em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
