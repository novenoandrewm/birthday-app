// src/App.tsx
import React, { useState } from 'react'
import HeroIntro from './sections/HeroIntro'
import GlobalSceneCanvas from './three/core/GlobalSceneCanvas'
import { useScrollProgress } from './hooks/useScrollProgress'
import './styles/globals.css'
import BackgroundMusic from './components/BackgroundMusic'

const App: React.FC = () => {
  const scrollProgress = useScrollProgress()
  const [hasBlown, setHasBlown] = useState(false)

  return (
    <div className="app-root">
      <BackgroundMusic />
      <GlobalSceneCanvas
        scrollProgress={scrollProgress}
        hasBlown={hasBlown}
        onBlow={() => setHasBlown(true)}
      />

      <main className="app-main">
        <HeroIntro scrollProgress={scrollProgress} />
        {/* Untuk sekarang, jangan render section lain yang berisi teks lama
            yang ikut scroll. Kalau masih ada <ScrollChapters />, comment dulu. */}
      </main>
    </div>
  )
}

export default App
