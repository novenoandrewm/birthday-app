// src/three/fx/SpaceFX.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

// Efek "wah" di level kamera: bloom, vignette tipis, dan noise halus
import React from 'react'
import type { FC } from 'react'
import * as PostFX from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

// Kita cast manual semua efek postprocessing ke React component.
// Ini workaround supaya TypeScript tidak protes tipe `undefined`.
const EffectComposer = PostFX.EffectComposer as React.ComponentType<any>
const Bloom = PostFX.Bloom as React.ComponentType<any>
const Vignette = PostFX.Vignette as React.ComponentType<any>
const Noise = PostFX.Noise as React.ComponentType<any>

type SpaceFXProps = {
  reduceMotion: boolean
}

const SpaceFX: FC<SpaceFXProps> = ({ reduceMotion }) => {
  // Kalau user pilih "reduce motion" (OS setting), efek berat kita matikan
  if (reduceMotion) return null

  return (
    <EffectComposer disableNormalPass>
      {/* Glow lembut di area terang (lilin, highlight kue, bokeh) */}
      <Bloom
        intensity={0.75}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        kernelSize={KernelSize.LARGE}
      />

      {/* Vignette tipis supaya fokus ke tengah */}
      <Vignette eskil={false} offset={0.18} darkness={0.7} />

      {/* Noise halus biar background terasa lebih "film-like", bukan flat */}
      <Noise premultiply opacity={0.12} />
    </EffectComposer>
  )
}

export default SpaceFX
