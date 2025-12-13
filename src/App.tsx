// src/App.tsx
import React, { useMemo, useState } from 'react'
import './styles/globals.css'

import BackgroundMusic from './components/BackgroundMusic'
import NavigationButtons from './components/NavigationButtons'

import GlobalSceneCanvas from './three/core/GlobalSceneCanvas'
import { useScrollProgress } from './hooks/useScrollProgress'

import HeroIntro from './sections/HeroIntro'
import RomanticMessage from './sections/RomanticMessage'
import ReflectionPledge from './sections/ReflectionPledge'
import CakeFinale from './sections/CakeFinale'

import { COPY } from './config/copy'
import { SECTIONS } from './config/sections'
import { useActiveSection } from './hooks/useActiveSection'

const App: React.FC = () => {
  const scrollProgress = useScrollProgress()
  const [hasBlown, setHasBlown] = useState(false)

  // Track which section is currently in view (controlled by IntersectionObserver)
  const activeId = useActiveSection(SECTIONS)

  // Bottom‑right label: use section label if available, otherwise default to the recipient’s name
  const recipientName = useMemo(
    () => (COPY.hero.recipient ?? 'NAMA PENERIMA').toUpperCase(),
    []
  )
  const sectionLabel = (SECTIONS.find(s => s.id === activeId)?.label ?? '').toUpperCase()
  const activeLabel = sectionLabel || recipientName

  // Dynamic header in the top‑left overlay
  const header = useMemo(() => {
    const eyebrow = (COPY.hero.eyebrow ?? 'BIRTHDAY MOMENT').toUpperCase()
    if (activeId === 'romantic-message') {
      return { eyebrow, title: 'HAPPY BIRTHDAY', line: 'Part 1 – fill it yourself' }
    }
    if (activeId === 'reflection-pledge') {
      return { eyebrow, title: 'HAPPY BIRTHDAY', line: 'Part 2 – Fill it yourself' }
    }
    if (activeId === 'cake-finale') {
      return { eyebrow, title: 'HAPPY BIRTHDAY', line: 'Closing – make a wish' }
    }
    return {
      eyebrow,
      title: (COPY.hero.title ?? 'HAPPY BIRTHDAY').toUpperCase(),
      line: '',
    }
  }, [activeId])

  return (
    <div className="app-root">
      <BackgroundMusic />

      <GlobalSceneCanvas
        scrollProgress={scrollProgress}
        hasBlown={hasBlown}
        onBlow={() => setHasBlown(true)}
      />

      {/* Dynamic overlay at top‑left */}
      <div className="hero-overlay">
        <div className="hero-overlay-inner">
          <div className="hero-chapter">
            <p className="section-eyebrow hero-eyebrow">{header.eyebrow}</p>
            <h1 className="section-title hero-title">{header.title}</h1>
            {header.line && <p className="hero-inline-line">{header.line}</p>}
          </div>
        </div>
      </div>

      <main className="app-main">
        <HeroIntro />
        <RomanticMessage />
        <ReflectionPledge />
        <CakeFinale hasBlown={hasBlown} />
      </main>

      {/* Bottom‑right label that follows the active section */}
      <div className="hero-recipient-tag">{activeLabel}</div>

      <NavigationButtons />
    </div>
  )
}

export default App
