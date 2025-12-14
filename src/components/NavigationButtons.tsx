// src/components/NavigationButtons.tsx

/**
 * Next/Prev navigation controls for chapter-to-chapter movement.
 * - Computes the current chapter index from activeId and enables/disables arrows accordingly.
 * - On click, locks input, triggers onNavigate() to update UI immediately, then smooth-scrolls to the target section
 *   using scroll-margin-top as an offset, and finally calls onScrollEnd() once the scroll animation finishes.
 */

import React, { useCallback, useMemo, useState } from 'react'
import type { Section } from '../config/sections'
import { animateScrollTo } from '../utils/animateScrollTo'

type Props = {
  sections: Section[]
  activeId: string
  onNavigate?: (id: string) => void   
  onScrollEnd?: (id: string) => void  
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

const getScrollMarginTopPx = (el: HTMLElement) => {
  const style = window.getComputedStyle(el)
  const raw = style.getPropertyValue('scroll-margin-top') || style.scrollMarginTop || '0'
  const v = raw.trim()

  if (v.endsWith('vh')) return (parseFloat(v) / 100) * window.innerHeight

  const num = parseFloat(v)
  return Number.isNaN(num) ? 0 : num
}

const scrollToId = async (id: string) => {
  const el = document.getElementById(id) as HTMLElement | null
  if (!el) return

  const offset = getScrollMarginTopPx(el)
  const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)

  await animateScrollTo(targetTop, { duration: 1100 })
}

const NavigationButtons: React.FC<Props> = ({ sections, activeId, onNavigate, onScrollEnd }) => {
  const [locked, setLocked] = useState(false)

  const idx = useMemo(() => {
    if (!sections?.length) return 0
    const found = sections.findIndex((s) => s.id === activeId)
    return found >= 0 ? found : 0
  }, [sections, activeId])

  const canUp = idx > 0
  const canDown = idx < sections.length - 1

  const go = useCallback(
    async (nextIdx: number) => {
      if (!sections?.length) return
      if (locked) return

      const safeIdx = clamp(nextIdx, 0, sections.length - 1)
      const target = sections[safeIdx]
      if (!target) return

      setLocked(true)
      onNavigate?.(target.id)
      await scrollToId(target.id)

      onScrollEnd?.(target.id)
      setLocked(false)
    },
    [sections, onNavigate, onScrollEnd, locked]
  )

  return (
    <div className="nav-buttons" aria-label="Section navigation">
      <button
        type="button"
        className="nav-btn"
        aria-label="Previous section"
        disabled={!canUp || locked}
        onClick={() => go(idx - 1)}
      >
        ↑
      </button>

      <button
        type="button"
        className="nav-btn"
        aria-label="Next section"
        disabled={!canDown || locked}
        onClick={() => go(idx + 1)}
      >
        ↓
      </button>
    </div>
  )
}

export default NavigationButtons
