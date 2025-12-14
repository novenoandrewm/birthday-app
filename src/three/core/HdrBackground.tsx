/**
 * Loads an HDR (RGBE) environment texture and applies it to the Three.js scene.
 * - Sets the texture as the scene environment for realistic reflections/lighting.
 * - Optionally also sets it as the scene background, and cleans up on unmount.
 */

// src/three/core/HdrBackground.tsx
import React, { useEffect } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { RGBELoader } from 'three-stdlib'

type HdrBackgroundProps = {
  url: string
  /** true = also use as the background, false = environment map only */
  asBackground?: boolean
}

export const HdrBackground: React.FC<HdrBackgroundProps> = ({
  url,
  asBackground = true,
}) => {
  const { scene } = useThree()
  const texture = useLoader(RGBELoader, url)

  useEffect(() => {
    // Required so the HDR is treated as an equirectangular environment map
    texture.mapping = THREE.EquirectangularReflectionMapping
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    // Apply as environment for reflections and overall lighting
    scene.environment = texture

    if (asBackground) {
      scene.background = texture
    }

    // Cleanup when the component unmounts
    return () => {
      if (scene.environment === texture) scene.environment = null
      if (scene.background === texture) scene.background = null
    }
  }, [scene, texture, asBackground])

  return null
}
