// src/components/NavigationButtons.tsx
import React from 'react'
import { SECTIONS } from '../config/sections'
import { useActiveSection } from '../hooks/useActiveSection'

const NavigationButtons: React.FC = () => {
  const activeId = useActiveSection(SECTIONS)
  const currentIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === activeId))

  const scrollToIndex = (index: number) => {
    const item = SECTIONS[index]
    if (!item) return
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="nav-buttons" aria-label="Navigation">
      <button
        type="button"
        onClick={() => scrollToIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
        aria-label="Previous section"
      >
        ↑
      </button>

      <button
        type="button"
        onClick={() => scrollToIndex(currentIndex + 1)}
        disabled={currentIndex === SECTIONS.length - 1}
        aria-label="Next section"
      >
        ↓
      </button>
    </div>
  )
}

export default NavigationButtons
