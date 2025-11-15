// src/sections/ReflectionPledge/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const ReflectionPledge: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const reflection = COPY.reflection

  return (
    <section
      id="reflection-pledge"
      ref={ref}
      aria-labelledby="reflection-title"
      className={`section section-reflection fade-in-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <h2 id="reflection-title" className="section-title">
        {reflection.title}
      </h2>
      {reflection.paragraphs.map((p, idx) => (
        <p key={idx} className="section-text">
          {p}
        </p>
      ))}
    </section>
  )
}

export default ReflectionPledge
