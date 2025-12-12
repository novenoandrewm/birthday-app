// src/three/objects/BalloonsRing.tsx
import React, { useMemo, useRef } from 'react'
import type { FC } from 'react'
import { Group, Color } from 'three'
import { useFrame } from '@react-three/fiber'

type BalloonsRingProps = {
  radius: number
  count: number
  reduceMotion: boolean
}

type BalloonConfig = {
  basePosition: [number, number, number]
  color: string
  phase: number
  amp: number
}

const PALETTE = ['#fb7185', '#f97316', '#22c55e', '#38bdf8', '#a855f7', '#facc15']

const BalloonsRing: FC<BalloonsRingProps> = ({ radius, count, reduceMotion }) => {
  const group = useRef<Group | null>(null)

  const balloons = useMemo<BalloonConfig[]>(() => {
    const perSide = Math.max(1, Math.floor(count / 2))
    const arr: BalloonConfig[] = []

    const yBase = 1.6
    const depthSpread = 0.8

    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < perSide; i++) {
        const t = perSide === 1 ? 0 : i / (perSide - 1) - 0.5 // -0.5..0.5
        const x = side * radius * 0.85
        const z = t * depthSpread
        const y = yBase + Math.random() * 0.35

        const paletteIndex =
          (side === -1 ? i : i + perSide) % PALETTE.length

        arr.push({
          basePosition: [x, y, z],
          color: PALETTE[paletteIndex],
          phase: Math.random() * Math.PI * 2,
          amp: 0.06 + Math.random() * 0.06,
        })
      }
    }

    return arr
  }, [radius, count])

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()

    group.current.children.forEach((child, index) => {
      const config = balloons[index]
      if (!config) return
      const [x, y, z] = config.basePosition
      const bob =
        reduceMotion ? 0 : Math.sin(t * 1.1 + config.phase) * config.amp
      child.position.set(x, y + bob, z)
    })
  })

  return (
    <group ref={group}>
      {balloons.map((b, i) => (
        <group key={i} position={b.basePosition}>
          {/* tali */}
          <mesh position={[0, -0.65, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1.3, 8]} />
            <meshStandardMaterial color="#020617" roughness={0.9} />
          </mesh>

          {/* badan balon */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <sphereGeometry args={[0.19, 24, 24]} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.25}
              metalness={0.4}
              emissive={new Color(b.color).multiplyScalar(0.2)}
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default BalloonsRing
