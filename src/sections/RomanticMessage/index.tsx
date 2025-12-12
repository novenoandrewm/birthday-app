// src/sections/RomanticMessage/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const RomanticMessage: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const romantic = COPY.romantic

  const { title, paragraphs } = romantic
  const firstLine = paragraphs[0] ?? ''
  const restParagraphs = paragraphs.slice(1)

  return (
    <section
      id="romantic-message"
      ref={ref}
      aria-labelledby="romantic-title"
      className={`section section-romantic fade-in-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      {/* SATU BARIS: Part 1 – fill it yourself */}
      <h2
        id="romantic-title"
        className="section-title section-title-inline"
      >
        <span className="section-title-main">{title}</span>
        {firstLine && (
          <>
            <span className="section-title-separator">–</span>
            <span className="section-title-sub">{firstLine}</span>
          </>
        )}
      </h2>

      {/* Kalau nanti ada paragraf tambahan, baru muncul di bawah */}
      {restParagraphs.map((p, idx) => (
        <p key={idx} className="section-text">
          {p}
        </p>
      ))}
    </section>
  )
}

export default RomanticMessage
