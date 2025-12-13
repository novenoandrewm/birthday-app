// src/sections/RomanticMessage/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const RomanticMessage: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const romantic = COPY.romantic

  // baris pertama dipakai HUD, sisanya baru tampil di content
  const rest = (romantic.paragraphs ?? []).slice(1).filter(Boolean)

  return (
    <section id="romantic-message" ref={ref} className="page" aria-label={romantic.title}>
      <h2 className="sr-only">{romantic.title}</h2>

      <div className={`page-content fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        {rest.length ? (
          rest.map((p, i) => (
            <p key={i} className="page-text">
              {p}
            </p>
          ))
        ) : (
          <p className="page-text is-dim">Isi pesan Part 1 di config/copy.ts ✍️</p>
        )}
      </div>
    </section>
  )
}

export default RomanticMessage
