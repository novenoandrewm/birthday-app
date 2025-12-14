// src/components/HudOverlay.tsx

/**
 * Top HUD overlay showing the global hero title and the current chapter heading.
 * - Displays a fixed hero eyebrow/title plus a dynamic line (main/sub) based on activeId (and hasBlown for finale state).
 * - Uses swap-anim + key={activeId} to replay a smooth transition whenever the active section changes.
 */

import React, { useMemo } from 'react'
import { COPY } from '../config/copy'

type Props = {
  activeId: string
  hasBlown: boolean
}

const upper = (s?: string) => (s ?? '').toUpperCase()

const HudOverlay: React.FC<Props> = ({ activeId, hasBlown }) => {
  const hero = COPY.hero

  const line = useMemo(() => {
    if (activeId === 'romantic-message') {
      return { main: COPY.romantic.title, sub: COPY.romantic.paragraphs[0] ?? '' }
    }
    if (activeId === 'reflection-pledge') {
      return { main: COPY.reflection.title, sub: COPY.reflection.paragraphs[0] ?? '' }
    }
    if (activeId === 'cake-finale') {
      const sub = COPY.finale.paragraphs[0] ?? ''
      return { main: COPY.finale.title, sub: hasBlown ? sub : sub }
    }
    return null
  }, [activeId, hasBlown])

  return (
    <>
      <header className="hud" aria-label="Birthday HUD">
        <div className="hud-top swap-anim" key={activeId}>
          {hero.eyebrow && <div className="hud-eyebrow">{upper(hero.eyebrow)}</div>}
          {hero.title && <div className="hud-title">{upper(hero.title)}</div>}
        </div>

        {line && (
          <div className="hud-line" aria-label="Active section title">
            <span className="hud-line-main">{line.main}</span>
            {line.sub ? <span className="hud-line-sep">—</span> : null}
            {line.sub ? <span className="hud-line-sub">{line.sub}</span> : null}
          </div>
        )}
      </header>

      {/* Recipient name: always visible (and can be enlarged from CSS) */}
      <div className="recipient-tag" aria-label="Recipient name">
        {upper(hero.recipient)}
      </div>
    </>
  )
}

export default HudOverlay
