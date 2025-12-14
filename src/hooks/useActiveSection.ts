// src/hooks/useActiveSection.tsx
import { useEffect, useState } from 'react'

/**
 * Detects the currently active section based on scroll position.
 * A section becomes "active" once its top edge passes a viewport marker (20% of screen height).
 */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    if (!ids.length) return

    const update = () => {
      const marker = window.innerHeight * 0.20
      let current = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top
          // If the section top has crossed the marker, treat it as the active section
          if (top - marker <= 0) {
            current = id
          }
        }
      })
      setActiveId(current)
    }

    update()
    // Listen to scroll and resize so activeId stays in sync with the viewport
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return activeId
}
