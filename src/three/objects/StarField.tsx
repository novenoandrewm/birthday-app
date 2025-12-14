/**
 * Procedural starfield + nebula backdrop for the 3D scene.
 * - Generates two layered point-cloud star fields (near + far) with HSL-based color variation for depth and richness.
 * - Animates slow rotation (scaled by STAR_SPEED and reduced when reduceMotion is true) and runs two lightweight shader-based nebula planes in the background.
 */

// src/three/objects/StarField.tsx
import React, { useMemo, useRef } from 'react'
import { Color, Group, ShaderMaterial, AdditiveBlending } from 'three'
import { useFrame } from '@react-three/fiber'
import { Points } from '@react-three/drei'

// Star rotation speed factor. < 1 = slower.
const STAR_SPEED = 0.35

type StarFieldProps = {
  isMobile: boolean
  reduceMotion: boolean
}

/**
 * Space-style starfield + nebula.
 * Focus: strong visuals rather than ultra-minimal resource usage.
 */
const StarField: React.FC<StarFieldProps> = ({ isMobile, reduceMotion }) => {
  const nearGroup = useRef<Group | null>(null)
  const farGroup = useRef<Group | null>(null)
  const nebulaMat1 = useRef<ShaderMaterial | null>(null)
  const nebulaMat2 = useRef<ShaderMaterial | null>(null)

  const { nearPositions, nearColors, farPositions, farColors } = useMemo(() => {
    // Star count: high enough to feel “wow”
    const mobile = isMobile

    const nearCount = mobile ? 2200 : 3800
    const farCount = mobile ? 2600 : 5200
    const tmp = new Color()

    const makeLayer = (
      count: number,
      radiusMin: number,
      radiusMax: number,
      hueCenter: number,
      hueSpread: number,
      satBase: number,
      lightBase: number
    ) => {
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count; i++) {
        const r = radiusMin + Math.random() * (radiusMax - radiusMin)
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        // Spherical shell around the origin, slightly flattened on Y
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.65
        const z = r * Math.cos(phi) - 45 // push the field back

        const i3 = i * 3
        positions[i3] = x
        positions[i3 + 1] = y
        positions[i3 + 2] = z

        // Color mix: blue/purple with warm highlights
        const h = hueCenter + (Math.random() - 0.5) * hueSpread
        const s = satBase + Math.random() * 0.25
        const l = lightBase + Math.random() * 0.3
        tmp.setHSL(h, s, l)

        colors[i3] = tmp.r
        colors[i3 + 1] = tmp.g
        colors[i3 + 2] = tmp.b
      }

      return { positions, colors }
    }

    const near = makeLayer(nearCount, 28, 50, 0.62, 0.1, 0.5, 0.6)
    const far = makeLayer(farCount, 50, 95, 0.67, 0.14, 0.35, 0.4)

    return {
      nearPositions: near.positions,
      nearColors: near.colors,
      farPositions: far.positions,
      farColors: far.colors,
    }
  }, []) // If you want this to react to isMobile, change deps to [isMobile]

  // Rotation animation + nebula time uniforms
  useFrame((state, delta) => {
    // === 1) Star rotation slowed down by STAR_SPEED ===
    const rotSlow = (reduceMotion ? 0.02 : 0.04) * STAR_SPEED
    const rotFast = (reduceMotion ? 0.06 : 0.12) * STAR_SPEED

    if (nearGroup.current) {
      nearGroup.current.rotation.y += delta * rotFast
    }
    if (farGroup.current) {
      farGroup.current.rotation.y += delta * rotSlow
    }

    // === 2) Nebula time (kept separate from STAR_SPEED) ===
    const t = state.clock.getElapsedTime() * 0.2

    if (nebulaMat1.current) {
      nebulaMat1.current.uniforms.uTime.value = t
    }
    if (nebulaMat2.current) {
      nebulaMat2.current.uniforms.uTime.value = t + 10.0
    }
  })

  const nebulaVertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const nebulaFragment = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uOpacity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(27.16898, 38.90563))) * 43758.5453);
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.6;
      float freq = 1.5;

      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p * freq);
        freq *= 1.9;
        amplitude *= 0.55;
      }
      return value;
    }

    void main() {
      vec2 p = (vUv - 0.5) * vec2(2.4, 1.6);

      float n = fbm(p + uTime * 0.2);
      float m = fbm(p * 1.3 - uTime * 0.15);
      float density = pow(smoothstep(0.2, 1.1, n + m * 0.5), 1.8);

      vec3 col = mix(uColorA, uColorB, n * 0.7 + m * 0.3);
      col *= 0.9 + density * 0.8;

      float vignette = smoothstep(1.3, 0.2, length(p));
      float alpha = density * vignette * uOpacity;

      if (alpha < 0.01) discard;
      gl_FragColor = vec4(col, alpha);
    }
  `

  return (
    <group>
      {/* Far star layer: dense and soft */}
      <group ref={farGroup}>
        <Points
          positions={farPositions}
          colors={farColors}
          stride={3}
          frustumCulled={false}
        >
          <pointsMaterial
            vertexColors
            size={0.02}
            sizeAttenuation
            depthWrite={false}
            transparent
            opacity={0.6}
            blending={AdditiveBlending}
          />
        </Points>
      </group>

      {/* Near star layer: brighter and slightly larger */}
      <group ref={nearGroup}>
        <Points
          positions={nearPositions}
          colors={nearColors}
          stride={3}
          frustumCulled={false}
        >
          <pointsMaterial
            vertexColors
            size={0.035}
            sizeAttenuation
            depthWrite={false}
            transparent
            opacity={0.9}
            blending={AdditiveBlending}
          />
        </Points>
      </group>

      {/* Smoky nebula planes behind everything */}
      <group position={[0, 0, -25]}>
        <mesh rotation={[0, 0.2, 0]}>
          <planeGeometry args={[60, 30, 64, 64]} />
          <shaderMaterial
            ref={nebulaMat1}
            vertexShader={nebulaVertex}
            fragmentShader={nebulaFragment}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            uniforms={{
              uTime: { value: 0 },
              uOpacity: { value: 0.8 },
              uColorA: { value: new Color('#020617') },
              uColorB: { value: new Color('#1e293b') },
            }}
          />
        </mesh>

        <mesh rotation={[0, -0.35, 0]} position={[0, -2, -5]}>
          <planeGeometry args={[70, 36, 64, 64]} />
          <shaderMaterial
            ref={nebulaMat2}
            vertexShader={nebulaVertex}
            fragmentShader={nebulaFragment}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            uniforms={{
              uTime: { value: 0 },
              uOpacity: { value: 0.55 },
              uColorA: { value: new Color('#020617') },
              uColorB: { value: new Color('#111827') },
            }}
          />
        </mesh>
      </group>
    </group>
  )
}

export default StarField
