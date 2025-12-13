// src/sections/CakeFinale/index.tsx
import React, { useEffect, useState } from 'react'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

type Props = { hasBlown: boolean }

const CakeFinale: React.FC<Props> = ({ hasBlown }) => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (hasBlown) setShowHint(false)
  }, [hasBlown])

  return (
    <section id="cake-finale" ref={ref} className="page" aria-label="Finale">
      <h2 className="sr-only">Closing</h2>

      <div className={`page-content fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        {!hasBlown && showHint && (
          <p className="page-text">
            <strong>Hint:</strong> tiup / tap lilinnya ✨
          </p>
        )}
        {hasBlown && (
          <p className="page-text">
            <strong>Selesai.</strong> Kamu bisa ganti kalimat penutupnya di App.tsx (hudLine).
          </p>
        )}
      </div>
    </section>
  )
}

export default CakeFinale
