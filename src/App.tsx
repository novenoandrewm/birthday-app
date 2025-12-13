// src/App.tsx
import React, { useMemo, useState } from 'react'
import './styles/globals.css'

import BackgroundMusic from './components/BackgroundMusic'
import GlobalSceneCanvas from './three/core/GlobalSceneCanvas'

import HeroIntro from './sections/HeroIntro'
import RomanticMessage from './sections/RomanticMessage'
import ReflectionPledge from './sections/ReflectionPledge'
import CakeFinale from './sections/CakeFinale'

import NavigationButtons from './components/NavigationButtons'

import { COPY } from './config/copy'
import { SECTIONS } from './config/sections'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useActiveSection } from './hooks/useActiveSection'

const App: React.FC = () => {
  const scrollProgress = useScrollProgress()
  const [hasBlown, setHasBlown] = useState(false)

  // active section dari scroll (untuk tombol next/prev + HUD line)
  const activeId = useActiveSection(SECTIONS)

  const hero = COPY.hero
  const romantic = COPY.romantic
  const reflection = COPY.reflection
  const finale = COPY.finale

  // LINE bawah ala Orbyte: berubah sesuai section aktif
  const hudLine = useMemo(() => {
    const safe = (s?: string) => (s ?? '').trim()

    if (activeId === 'romantic-message') {
      const first = romantic.paragraphs?.[0]
      return safe(`${romantic.title}${first ? ` — ${first}` : ''}`)
    }

    if (activeId === 'reflection-pledge') {
      const first = reflection.paragraphs?.[0]
      return safe(`${reflection.title}${first ? ` — ${first}` : ''}`)
    }

    if (activeId === 'cake-finale') {
      const lineText = hasBlown
        ? 'Yeeeyyy! Semoga semua harapan kamu pelan-pelan jadi kenyataan.'
        : safe(finale.description)

      return safe(`${finale.title}${lineText ? ` — ${lineText}` : ''}`)
    }

    // hero
    return safe(hero.subtitle)
  }, [activeId, hasBlown, romantic, reflection, finale, hero.subtitle])

  return (
    <div className="app-root">
      <BackgroundMusic />

      <GlobalSceneCanvas
        scrollProgress={scrollProgress}
        hasBlown={hasBlown}
        onBlow={() => setHasBlown(true)}
      />

      {/* HUD FIXED (ini yang bikin BIRTHDAY MOMENT / HAPPY BIRTHDAY / NAMA PENERIMA
          selalu tampil di Part 1 - 4) */}
      <div className="hud" aria-hidden="true">
        <div className="hud-left">
          <div className="hud-eyebrow">
            {(hero.eyebrow ?? 'Birthday Moment').toUpperCase()}
          </div>

          <div className="hud-heading">
            {(hero.title ?? 'Happy Birthday').toUpperCase()}
          </div>

          {/* key biar transisinya halus saat ganti page */}
          <div key={`${activeId}-${hasBlown ? 'blown' : 'unblown'}`} className="hud-line">
            {hudLine}
          </div>
        </div>

        <div className="hud-recipient">
          {(hero.recipient ?? 'Nama Penerima').toUpperCase()}
        </div>
      </div>

      <main className="app-main">
        <HeroIntro />
        <RomanticMessage />
        <ReflectionPledge />
        <CakeFinale hasBlown={hasBlown} />
      </main>

      <NavigationButtons sections={SECTIONS} activeId={activeId} />
    </div>
  )
}

export default App
