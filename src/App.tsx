/**
 * Main app orchestrator that wires together sections, UI overlays, and the 3D scene.
 * - Tracks scroll progress (for 3D animation), active section (for HUD/ChapterPanel), and finale state (hasBlown).
 * - Uses an activeOverride to update HUD/panel immediately on Next/Prev clicks, then clears it after smooth scrolling finishes.
 */

// src/App.tsx
import React, { useMemo, useState } from 'react'
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

  // Override so HUD/panel updates immediately on button navigation
  const [activeOverride, setActiveOverride] = useState<string | null>(null)

  const activeId = activeOverride ?? observedActiveId

  return (
    <div className="app-root">
      <BackgroundMusic />

      <GlobalSceneCanvas
        scrollProgress={scrollProgress}
        hasBlown={hasBlown}
        onBlow={() => setHasBlown(true)}
      />

      {/* NOTE: Later we can refine transitions via CSS (Step 4) */}
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
        onScrollEnd={(id) => {
          // After scrolling completes, release the override
          if (activeOverride === id) setActiveOverride(null)
        }}
      />
    </div>
  )
}

export default App
