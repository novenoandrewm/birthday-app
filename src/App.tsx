// src/App.tsx
import React from 'react'
import HeroIntro from './sections/HeroIntro'
import RomanticMessage from './sections/RomanticMessage'
import ReflectionPledge from './sections/ReflectionPledge'
import CakeFinale from './sections/CakeFinale'

const App: React.FC = () => {
  return (
    <div className="app-root">
      <main className="app-main">
        <HeroIntro />
        <RomanticMessage />
        <ReflectionPledge />
        <CakeFinale />
      </main>
    </div>
  )
}

export default App
