// src/three/core/HdrBackground.tsx
import React, { useEffect } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { RGBELoader } from 'three-stdlib'

type HdrBackgroundProps = {
  url: string
  /** true = jadikan juga background, false = cuma environment map */
  asBackground?: boolean
}

export const HdrBackground: React.FC<HdrBackgroundProps> = ({
  url,
  asBackground = true,
}) => {
  const { scene } = useThree()
  const texture = useLoader(RGBELoader, url)

  useEffect(() => {
    // mapping wajib supaya HDR dipakai sebagai equirectangular env map
    texture.mapping = THREE.EquirectangularReflectionMapping
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter

    // jadikan environment untuk refleksi + depth feel
    scene.environment = texture

    if (asBackground) {
      scene.background = texture
    }

    // cleanup kalau komponen di-unmount
    return () => {
      if (scene.environment === texture) scene.environment = null
      if (scene.background === texture) scene.background = null
    }
  }, [scene, texture, asBackground])

  return null
}
