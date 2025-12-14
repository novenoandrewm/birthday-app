// src/sections/HeroIntro/index.tsx

/**
 * Hero intro section anchor.
 * - Defines the scroll target for the "hero" chapter (used by navigation and active section tracking).
 * - The main visuals are handled by the global 3D scene and HUD overlays, so this section remains minimal.
 */

import React from 'react'

const HeroIntro: React.FC = () => {
  return <section id="hero" className="chapter" aria-label="Hero" />
}

export default HeroIntro
