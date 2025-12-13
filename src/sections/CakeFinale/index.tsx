// src/sections/CakeFinale/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

type Props = { hasBlown: boolean }

const CakeFinale: React.FC<Props> = ({ hasBlown }) => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()
  const finale = COPY.finale

  // Konsisten seperti Part 1 & 2:
  // paragraphs[0] dipakai HUD, jadi di page kita tampilkan mulai index 1
  const rest = (finale.paragraphs ?? []).slice(1).filter(Boolean)

  // Optional: setelah lilin ditiup, tambahkan 1 paragraf lagi (tetap di card, layout sama)
  const extraAfterBlow = hasBlown
    ? 'Yeeeyyy! Semoga semua harapan kamu pelan-pelan jadi kenyataan.'
    : ''

  const content = extraAfterBlow ? [...rest, extraAfterBlow] : rest

  return (
    <section id="cake-finale" ref={ref} className="page" aria-label={finale.title}>
      <h2 className="sr-only">{finale.title}</h2>

      <div className={`page-content fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        {content.length ? (
          content.map((p, i) => (
            <p key={i} className="page-text">
              {p}
            </p>
          ))
        ) : (
          <p className="page-text is-dim">Isi closing kamu di config/copy.ts ✍️</p>
        )}
      </div>
    </section>
  )
}

export default CakeFinale
