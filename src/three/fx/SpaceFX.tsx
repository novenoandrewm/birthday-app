/**
 * Post-processing FX layer for extra polish (bloom, vignette, subtle noise).
 * - Uses @react-three/postprocessing to add a soft glow, gentle vignette, and film-like grain.
 * - Fully disabled when reduceMotion is enabled to respect accessibility/performance preferences.
 */

// src/three/fx/SpaceFX.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import type { FC } from 'react'
import * as PostFX from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

// Manually cast postprocessing effects to React components (TypeScript workaround)
const EffectComposer = PostFX.EffectComposer as React.ComponentType<any>
const Bloom = PostFX.Bloom as React.ComponentType<any>
const Vignette = PostFX.Vignette as React.ComponentType<any>
const Noise = PostFX.Noise as React.ComponentType<any>

type SpaceFXProps = {
  reduceMotion: boolean
}

const SpaceFX: FC<SpaceFXProps> = ({ reduceMotion }) => {
  // Disable heavier effects when the user prefers reduced motion
  if (reduceMotion) return null

  return (
    <EffectComposer disableNormalPass>
      {/* Soft glow on bright areas (candles, cake highlights, bokeh) */}
      <Bloom
        intensity={0.75}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        kernelSize={KernelSize.LARGE}
      />

      {/* Subtle vignette to keep focus toward the center */}
      <Vignette eskil={false} offset={0.18} darkness={0.7} />

      {/* Light noise so the background feels more film-like (less flat) */}
      <Noise premultiply opacity={0.12} />
    </EffectComposer>
  )
}

export default SpaceFX
