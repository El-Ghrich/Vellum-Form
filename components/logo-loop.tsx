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
  const track = [...names, ...names]

  return (
    <section
      aria-hidden="true"
      className="select-none border-b border-border bg-background py-8"
      style={{
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage:
          'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div className="flex w-max select-none items-center gap-16 whitespace-nowrap px-8 animate-loop-scroll">
        {track.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="animate-fade-color font-sans text-xs uppercase tracking-[0.32em]"
            style={{ animationDelay: `${(index % names.length) * 0.6}s` }}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
