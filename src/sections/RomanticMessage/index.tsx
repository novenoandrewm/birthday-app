import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const RomanticMessage: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const romantic = COPY.romantic

  return (
    <section
      id="romantic-message"
      ref={ref}
      aria-labelledby="romantic-title"
      className={`section section-romantic fade-in-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <h2 id="romantic-title" className="section-title">
        {romantic.title}
      </h2>
      {romantic.paragraphs.map((p, idx) => (
        <p key={idx} className="section-text">
          {p}
        </p>
      ))}
    </section>
  )
}

export default RomanticMessage