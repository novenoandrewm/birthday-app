/**
 * Global R3F canvas that renders the entire 3D birthday scene.
 * - Drives camera movement, world rotation, and mood lighting based on scrollProgress (with reduced-motion support).
 * - Renders the main objects (cake, balloons, stars, confetti) plus an HDR environment and extra FX layers.
 */

// src/three/core/GlobalSceneCanvas.tsx
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Color, Group, MathUtils, Vector3 } from 'three'
import type { MeshStandardMaterial } from 'three'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

import BirthdayCake from '../objects/BirthdayCake'
import BalloonsRing from '../objects/BalloonsRing'
import ConfettiBurst from '../objects/ConfettiBurst'
import StarField from '../objects/StarField'
import { HdrBackground } from './HdrBackground'
// ⬇️ Update this import path to match your SpaceFX file location
import SpaceFX from '../fx/SpaceFX'

type GlobalSceneCanvasProps = {
  scrollProgress: number
  hasBlown: boolean
  onBlow: () => void
}

// Tuned camera targets per chapter
const CAM_A = new Vector3(0, 2.4, 11)
const CAM_B = new Vector3(-3.0, 2.2, 8.5)
const CAM_C = new Vector3(2.4, 2.0, 6.5)
const CAM_D = new Vector3(0, 2.0, 6.5)

// Mood colors per chapter
const HERO_COLOR = new Color('#38bdf8')
const ROMANTIC_COLOR = new Color('#fb7185')
const FINALE_COLOR = new Color('#facc15')

const lerpVec = (out: Vector3, a: Vector3, b: Vector3, t: number) => {
  out.copy(a).lerp(b, t)
}

type ScrollWorldProps = {
  scrollProgress: number
  reduceMotion: boolean
  hasBlown: boolean
  onBlow: () => void
  isMobile: boolean
}

const ScrollWorld: React.FC<ScrollWorldProps> = ({
  scrollProgress,
  reduceMotion,
  hasBlown,
  onBlow,
  isMobile,
}) => {
  const group = useRef<Group | null>(null)
  const torusMat = useRef<MeshStandardMaterial | null>(null)
  const camPos = useRef(new Vector3()).current

  useFrame((state, delta) => {
    const rawT = MathUtils.clamp(scrollProgress, 0, 1)

    // --- Camera position & world rotation ---
    let chapterRot = 0

    if (reduceMotion) {
      // Park between B–C and keep rotation subtle
      lerpVec(camPos, CAM_B, CAM_C, 0.5)
      chapterRot = 0.2
    } else {
      if (rawT <= 0.3) {
        // Chapter 1: 0–0.3 (A -> B)
        const t = MathUtils.smoothstep(rawT / 0.3, 0, 1)
        lerpVec(camPos, CAM_A, CAM_B, t)
        chapterRot = t * 0.2
      } else if (rawT <= 0.7) {
        // Chapter 2: 0.3–0.7 (B -> C)
        const localT = (rawT - 0.3) / 0.4
        const t = MathUtils.smoothstep(localT, 0, 1)
        lerpVec(camPos, CAM_B, CAM_C, t)
        chapterRot = 0.2 + t * 0.35
      } else {
        // Chapter 3: 0.7–1 (C -> D)
        const localT = (rawT - 0.7) / 0.3
        const t = MathUtils.smoothstep(localT, 0, 1)
        lerpVec(camPos, CAM_C, CAM_D, t)
        chapterRot = 0.45 + t * 0.12
      }
    }

    // --- Mood color based on scroll chapter ---
    let targetColor: Color
    if (rawT <= 0.3) {
      targetColor = HERO_COLOR
    } else if (rawT <= 0.7) {
      targetColor = ROMANTIC_COLOR
    } else {
      targetColor = FINALE_COLOR
    }

    if (torusMat.current) {
      // Slowly blend emissive color for smoother mood transitions
      torusMat.current.emissive.lerp(targetColor, 0.01)
    }

    // Update camera
    state.camera.position.lerp(camPos, reduceMotion ? 0.15 : 0.08)
    state.camera.lookAt(0, reduceMotion ? 1.2 : 1.4, 0)

    if (group.current) {
      group.current.rotation.y += delta * chapterRot
    }
  })

  return (
    <group ref={group} position={[0, 0.9, 0]}>
      {/* --- LIGHTING: keep the cake and balloons readable --- */}
      <ambientLight intensity={0.35} />

      {/* Key light from upper-right */}
      <directionalLight
        intensity={1.2}
        position={[4, 6, 6]}
        color="#ffffff"
      />

      {/* Cool rim light from back-left */}
      <directionalLight
        intensity={0.7}
        position={[-3, 3, -2]}
        color="#38bdf8"
      />

      {/* Warm accent light from the front (romantic tone) */}
      <pointLight
        intensity={0.9}
        distance={12}
        position={[0, 2.0, 3.0]}
        color="#fb7185"
      />

      {/* Stars / nebula background behind everything */}
      <StarField
        key={isMobile ? 'star-mobile' : 'star-desktop'}
        isMobile={isMobile}
        reduceMotion={reduceMotion}
      />

      {/* Torus-knot “galaxy” element behind the cake */}
      <mesh position={[0, 0.1, -1.2]}>
        <torusKnotGeometry
          args={[1.6, 0.3, isMobile ? 120 : 200, isMobile ? 24 : 32]}
        />
        <meshStandardMaterial
          ref={torusMat}
          color="#0f172a"
          emissive="#fb7185"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>

      {/* Soft horizontal glow under the cake */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[2.7, 48]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.18} />
      </mesh>

      {/* Thin vertical halo behind the cake */}
      <mesh position={[0, 1.6, -0.2]}>
        <ringGeometry args={[1.6, 2.0, 64]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.24} />
      </mesh>

      {/* Thin orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
        <torusGeometry args={[3.4, 0.015, 8, 160]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
      </mesh>

      <mesh rotation={[Math.PI / 2.1, 0.4, 0]} position={[0.4, 0.5, 0]}>
        <torusGeometry args={[2.8, 0.012, 8, 140]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
      </mesh>

      <mesh rotation={[Math.PI / 1.8, -0.35, 0]} position={[-0.3, 0.4, 0.2]}>
        <torusGeometry args={[2.0, 0.01, 8, 120]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.32} />
      </mesh>

      {/* Bokeh spheres for depth and ambience */}
      <mesh position={[2.0, 0.6, -1.5]}>
        <sphereGeometry args={[0.45, isMobile ? 20 : 32, isMobile ? 20 : 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0ea5e9"
          emissiveIntensity={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[-1.9, 0.0, -1]}>
        <sphereGeometry args={[0.35, isMobile ? 20 : 32, isMobile ? 20 : 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.7}
          roughness={0.35}
        />
      </mesh>

      <mesh position={[0.3, -0.7, -1.8]}>
        <sphereGeometry args={[0.55, isMobile ? 20 : 32, isMobile ? 20 : 32]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#ea580c"
          emissiveIntensity={0.65}
          roughness={0.4}
        />
      </mesh>

      {/* Main center group: balloons + cake + confetti */}
      <group position={[0, 0, 0]}>
        <BalloonsRing
          radius={1.6}
          count={isMobile ? 5 : 8}
          reduceMotion={reduceMotion}
        />
        <BirthdayCake onBlow={onBlow} reduceMotion={reduceMotion} />
        {!reduceMotion && !isMobile && hasBlown && (
          <ConfettiBurst active={hasBlown} />
        )}
      </group>
    </group>
  )
}

const GlobalSceneCanvas: React.FC<GlobalSceneCanvasProps> = ({
  scrollProgress,
  hasBlown,
  onBlow,
}) => {
  const reduceMotion = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="global-scene">
      <Canvas
        camera={{ position: [0, 2.4, 11], fov: isMobile ? 60 : 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          {/* HDR background + environment map */}
          <HdrBackground url="/textures/space_nebula_4k.hdr" asBackground />

          {/* Main world that reacts to scroll progress */}
          <ScrollWorld
            scrollProgress={scrollProgress}
            reduceMotion={reduceMotion}
            hasBlown={hasBlown}
            onBlow={onBlow}
            isMobile={isMobile}
          />

          {/* Additional post/atmosphere effects layer (bloom, streaks, etc.) */}
          <SpaceFX reduceMotion={reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default GlobalSceneCanvas
