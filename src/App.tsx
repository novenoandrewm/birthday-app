// src/App.tsx
import React, { useEffect, useMemo, useState } from 'react'
import HeroIntro from './sections/HeroIntro'
import RomanticMessage from './sections/RomanticMessage'
import ReflectionPledge from './sections/ReflectionPledge'
import CakeFinale from './sections/CakeFinale'

import GlobalSceneCanvas from './three/core/GlobalSceneCanvas'
import { useScrollProgress } from './hooks/useScrollProgress'
import BackgroundMusic from './components/BackgroundMusic'
import NavigationButtons from './components/NavigationButtons'
import HudOverlay from './components/HudOverlay'
import ChapterPanel from './components/ChapterPanel'

import { SECTIONS } from './config/sections'
import { useActiveSection } from './hooks/useActiveSection'
import './styles/globals.css'

const App: React.FC = () => {
  const scrollProgress = useScrollProgress()
  const [hasBlown, setHasBlown] = useState(false)

  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])
  const observedActiveId = useActiveSection(sectionIds)

  // override supaya pas klik tombol NEXT/PREV, HUD+panel langsung ganti
  const [activeOverride, setActiveOverride] = useState<string | null>(null)
  const activeId = activeOverride ?? observedActiveId

  useEffect(() => {
    if (activeOverride && observedActiveId === activeOverride) {
      setActiveOverride(null)
    }
  }, [observedActiveId, activeOverride])

  return (
    <div className="app-root">
      <BackgroundMusic />

      <GlobalSceneCanvas
        scrollProgress={scrollProgress}
        hasBlown={hasBlown}
        onBlow={() => setHasBlown(true)}
      />

      <HudOverlay activeId={activeId} hasBlown={hasBlown} />
      <ChapterPanel activeId={activeId} hasBlown={hasBlown} />

      <main className="app-main">
        <HeroIntro />
        <RomanticMessage />
        <ReflectionPledge />
        <CakeFinale />
      </main>

      <NavigationButtons
        sections={SECTIONS}
        activeId={activeId}
        onNavigate={(id) => setActiveOverride(id)}
      />
    </div>
  )
}

export default App
