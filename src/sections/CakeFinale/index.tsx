// src/sections/CakeFinale/index.tsx
import React, { useEffect, useState } from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

type CakeFinaleProps = {
  hasBlown: boolean
}

const CakeFinale: React.FC<CakeFinaleProps> = ({ hasBlown }) => {
  const finale = COPY.finale
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (hasBlown) setShowHint(false)
  }, [hasBlown])

  return (
    <section id="cake-finale" ref={ref} className="page" aria-label="Finale">
      <div className={`page-content fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        {!hasBlown && showHint && (
          <p>
            <strong>{finale.title ?? 'Closing'}:</strong> {finale.description ?? 'Tiup / tap lilinnya ✨'}
          </p>
        )}

        {hasBlown && (
          <p>
            <strong>{finale.title ?? 'Closing'}:</strong>{' '}
            Yeeeyyy, Happy Birthday! Semoga semua harapan kamu pelan-pelan jadi kenyataan.
          </p>
        )}
      </div>
    </section>
  )
}

export default CakeFinale
