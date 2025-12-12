// src/sections/ReflectionPledge/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const ReflectionPledge: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const reflection = COPY.reflection

  const { title, paragraphs } = reflection
  const firstLine = paragraphs[0] ?? ''
  const restParagraphs = paragraphs.slice(1)

  return (
    <section
      id="reflection-pledge"
      ref={ref}
      aria-labelledby="reflection-title"
      className={`section section-reflection fade-in-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      {/* SATU BARIS: Part 2 – isi kalimat pertama */}
      <h2
        id="reflection-title"
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

      {/* Kalau kamu isi paragraf kedua, ketiga, dst, muncul di bawahnya */}
      {restParagraphs.map((p, idx) => (
        <p key={idx} className="section-text">
          {p}
        </p>
      ))}
    </section>
  )
}

export default ReflectionPledge
