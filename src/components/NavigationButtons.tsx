// src/components/NavigationButtons.tsx
import React, { useCallback, useMemo } from 'react'
import type { Section } from '../config/sections'

type Props = {
  sections: Section[]
  activeId: string
  onNavigate?: (id: string) => void
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  // CSS scroll-margin-top di .chapter akan ngasih “offset” otomatis
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const NavigationButtons: React.FC<Props> = ({ sections, activeId, onNavigate }) => {
  const idx = useMemo(() => {
    if (!sections?.length) return 0
    const found = sections.findIndex((s) => s.id === activeId)
    return found >= 0 ? found : 0
  }, [sections, activeId])

  const canUp = idx > 0
  const canDown = idx < sections.length - 1

  const go = useCallback(
    (nextIdx: number) => {
      if (!sections?.length) return
      const safeIdx = clamp(nextIdx, 0, sections.length - 1)
      const target = sections[safeIdx]
      if (!target) return

      // penting: update UI dulu biar panel/heading langsung ganti
      onNavigate?.(target.id)
      scrollToId(target.id)
    },
    [sections, onNavigate]
  )

  return (
    <div className="nav-buttons" aria-label="Section navigation">
      <button
        type="button"
        className="nav-btn"
        aria-label="Previous section"
        disabled={!canUp}
        onClick={() => go(idx - 1)}
      >
        ↑
      </button>

      <button
        type="button"
        className="nav-btn"
        aria-label="Next section"
        disabled={!canDown}
        onClick={() => go(idx + 1)}
      >
        ↓
      </button>
    </div>
  )
}

export default NavigationButtons
