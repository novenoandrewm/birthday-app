// src/components/ChapterPanel.tsx

/**
 * Chapter text panel that renders the current chapter’s narrative.
 * - Selects the correct paragraphs from COPY based on activeId (and hasBlown for the finale).
 * - Uses a key + swap-anim class to remount and replay the transition animation when the chapter changes.
 */

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
      return rest.length ? rest : ['Write your Part 1 paragraph here.']
    }

    if (activeId === 'reflection-pledge') {
      const rest = COPY.reflection.paragraphs.slice(1)
      return rest.length ? rest : ['Write your Part 2 content here.']
    }

    if (activeId === 'cake-finale') {
      if (hasBlown) {
        return ['Yeeeyyy, happy birthday! 🎉🎂']
      }
      const rest = COPY.finale.paragraphs.slice(1)
      return rest.length ? rest : ['Write your closing here.']
    }

    // hero: panel not showing
    return null
  }, [activeId, hasBlown])

  if (!lines) return null
  const panelKey = `${activeId}:${hasBlown ? 'blown' : 'unblown'}`

  return (
    <aside
      key={panelKey}
      className="chapter-panel swap-anim"
      aria-label="Chapter text"
    >
      {lines.map((p, i) => (
        <p key={`${panelKey}:${i}`} className="chapter-panel-text">
          {p}
        </p>
      ))}
    </aside>
  )
}

export default ChapterPanel
