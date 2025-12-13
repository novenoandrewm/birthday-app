// src/sections/ReflectionPledge/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const ReflectionPledge: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const reflection = COPY.reflection

  const rest = (reflection.paragraphs ?? []).slice(1).filter(Boolean)

  return (
    <section
      id="reflection-pledge"
      ref={ref}
      className="page"
      aria-label={reflection.title}
    >
      <h2 className="sr-only">{reflection.title}</h2>

      <div className={`page-content fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        {rest.length ? (
          rest.map((p, i) => (
            <p key={i} className="page-text">
              {p}
            </p>
          ))
        ) : (
          <p className="page-text is-dim">Isi pesan Part 2 di config/copy.ts ✍️</p>
        )}
      </div>
    </section>
  )
}

export default ReflectionPledge
