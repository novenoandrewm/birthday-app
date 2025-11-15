// src/sections/CakeFinale/index.tsx
import React, { useEffect, useState } from 'react'
import { COPY } from '../../config/copy'
import SceneCanvas from '../../three/core/SceneCanvas'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const CakeFinale: React.FC = () => {
  const finale = COPY.finale
  const [hasBlown, setHasBlown] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="cake-finale"
      ref={ref}
      aria-labelledby="finale-title"
      className={`section section-finale fade-in-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <h2 id="finale-title" className="section-title">
        {finale.title}
      </h2>

      <p className="section-text">
        {hasBlown
          ? 'Yeeeyyy, Happy Birthday! The candle is out — I really hope your wish comes true.'
          : finale.description}
      </p>

      {showHint && !hasBlown && (
        <p className="section-hint">
          Tiup lilinnya dengan mengetuk kuenya (tap/click di area 3D) ✨
        </p>
      )}

      <SceneCanvas
        blown={hasBlown}
        onBlow={() => {
          setHasBlown(true)
          setShowHint(false)
        }}
      />
    </section>
  )
}

export default CakeFinale
