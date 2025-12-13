// src/sections/ReflectionPledge/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const ReflectionPledge: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const reflection = COPY.reflection

  const paragraphs = reflection.paragraphs ?? []
  const bodyParagraphs = paragraphs.length > 1 ? paragraphs.slice(1) : paragraphs

  return (
    <section
      id="reflection-pledge"
      ref={ref}
      className="page"
      aria-labelledby="reflection-title"
    >
      <div className={`page-content fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        <h2 id="reflection-title" className="sr-only">
          {reflection.title}
        </h2>

        {bodyParagraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </section>
  )
}

export default ReflectionPledge
