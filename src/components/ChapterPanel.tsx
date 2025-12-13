// src/components/ChapterPanel.tsx
import React, { useMemo } from 'react'
import { COPY } from '../config/copy'

type Props = {
  activeId: string
  hasBlown: boolean
}

const ChapterPanel: React.FC<Props> = ({ activeId, hasBlown }) => {
  const lines = useMemo(() => {
    if (activeId === 'romantic-message') {
      const rest = COPY.romantic.paragraphs.slice(1)
      return rest.length ? rest : ['Tulis paragraf Part 1 kamu di sini.']
    }

    if (activeId === 'reflection-pledge') {
      const rest = COPY.reflection.paragraphs.slice(1)
      return rest.length ? rest : ['Tulis isi Part 2 kamu di sini.']
    }

    if (activeId === 'cake-finale') {
      if (hasBlown) {
        return [
          'Yeeeyyy, happy birthday! Semoga semua harapan yang kamu simpan dalam hati pelan-pelan jadi kenyataan.',
        ]
      }
      const rest = COPY.finale.paragraphs.slice(1)
      return rest.length ? rest : ['Tulis penutup kamu di sini.']
    }

    // hero: panel tidak tampil
    return null
  }, [activeId, hasBlown])

  if (!lines) return null

  return (
    <aside className="chapter-panel" aria-label="Chapter text">
      {lines.map((p, i) => (
        <p key={i} className="chapter-panel-text">
          {p}
        </p>
      ))}

      {activeId === 'cake-finale' && !hasBlown ? (
        <p className="chapter-panel-hint">Tiup lilinnya ✨</p>
      ) : null}
    </aside>
  )
}

export default ChapterPanel
