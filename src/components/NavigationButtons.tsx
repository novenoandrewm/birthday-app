// src/components/NavigationButtons.tsx
import React, { useCallback, useMemo } from 'react'
import { SECTIONS, type SectionDef } from '../config/sections'
import { useActiveSection } from '../hooks/useActiveSection'

type Props = {
  sections?: SectionDef[]
  activeId?: string
}

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

const NavigationButtons: React.FC<Props> = ({ sections, activeId }) => {
  // fallback supaya gak pernah undefined
  const safeSections = sections && sections.length ? sections : SECTIONS

  // selalu panggil hook (aturan React hooks)
  const observedActiveId = useActiveSection(safeSections)
  const finalActiveId = activeId ?? observedActiveId

  const currentIndex = useMemo(() => {
    const i = safeSections.findIndex((s) => s.id === finalActiveId)
    return i < 0 ? 0 : i
  }, [safeSections, finalActiveId])

  const goToIndex = useCallback(
    (index: number) => {
      const target = safeSections[index]
      if (!target) return
      const el = document.getElementById(target.id)
      if (!el) return

      el.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      })
    },
    [safeSections]
  )

  const canPrev = currentIndex > 0
  const canNext = currentIndex < safeSections.length - 1

  return (
    <div className="nav-buttons" aria-label="Section navigation">
      <button
        type="button"
        onClick={() => goToIndex(currentIndex - 1)}
        disabled={!canPrev}
        aria-label="Previous section"
        title="Previous"
      >
        ↑
      </button>

      <button
        type="button"
        onClick={() => goToIndex(currentIndex + 1)}
        disabled={!canNext}
        aria-label="Next section"
        title="Next"
      >
        ↓
      </button>
    </div>
  )
}

export default NavigationButtons
