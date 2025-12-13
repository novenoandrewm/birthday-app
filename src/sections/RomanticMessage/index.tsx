// src/sections/RomanticMessage/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const RomanticMessage: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const romantic = COPY.romantic

  const paragraphs = romantic.paragraphs ?? []
  const bodyParagraphs = paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs

  return (
    <section
      id="romantic-message"
      ref={ref}
      className="page"
      aria-labelledby="romantic-title"
    >
      <div className={`page-content fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        <h2 id="romantic-title" className="sr-only">
          {romantic.title}
        </h2>

        {bodyParagraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </section>
  )
}

export default RomanticMessage
