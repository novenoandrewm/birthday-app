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

  // Hint otomatis hilang setelah beberapa detik
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Begitu lilin ditiup, paksa hint hilang
  useEffect(() => {
    if (hasBlown) {
      setShowHint(false)
    }
  }, [hasBlown])

  // Kalimat utama yang muncul di samping judul
  const lineText = hasBlown
    ? 'Yeeeyyy, Happy Birthday! Semoga semua harapan yang kamu simpan dalam hati pelan-pelan jadi kenyataan.'
    : finale.description

  return (
    <section
      id="cake-finale"
      ref={ref}
      aria-labelledby="finale-title"
      className={`section section-finale fade-in-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      {/* SATU BARIS: Closing – kalimat penutup */}
      <h2
        id="finale-title"
        className="section-title section-title-inline"
      >
        <span className="section-title-main">{finale.title}</span>
        <span className="section-title-separator">–</span>
        <span className="section-title-sub">{lineText}</span>
      </h2>

      {showHint && !hasBlown && (
        <p className="section-hint">Tiup lilinnya ✨</p>
      )}

      {/* Frame kosong supaya layout tetap seimbang */}
      <div className="scene-placeholder scene-placeholder--overlay" />
    </section>
  )
}

export default CakeFinale
