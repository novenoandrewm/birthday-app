/**
 * Confetti burst effect triggered by the finale interaction.
 * - Spawns multiple deterministic “random” confetti pieces so positions/velocities are stable per index.
 * - When active is true, each piece follows a simple ballistic arc with spin and auto-hides after ~3 seconds to save CPU.
 */

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

type ConfettiPieceProps = {
  index: number
  active: boolean
}

const PALETTE = ['#fb7185', '#f97316', '#22c55e', '#38bdf8', '#a855f7']

// Deterministic pseudo-random generator based on index (keeps each piece consistent)
const randFromIndex = (index: number, min: number, max: number) => {
  const x = Math.sin(index * 127.1) * 43758.5453123
  const n = x - Math.floor(x)
  return min + (max - min) * n
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ index, active }) => {
  const ref = useRef<Mesh | null>(null)
  const startTimeRef = useRef<number | null>(null)

  // “Random” parameters, but deterministic per index
  const baseX = randFromIndex(index * 3.1, -0.6, 0.6)
  const baseZ = randFromIndex(index * 5.7, -0.6, 0.6)
  const baseY = randFromIndex(index * 7.9, 1.3, 1.8)

  const velX = randFromIndex(index * 11.3, -0.8, 0.8)
  const velZ = randFromIndex(index * 13.7, -0.8, 0.8)
  const velY = randFromIndex(index * 17.2, 2.2, 3.4)

  const rotSpeedX = randFromIndex(index * 19.9, 2, 5)
  const rotSpeedY = randFromIndex(index * 23.3, 2, 5)

  const color = PALETTE[index % PALETTE.length]

  useFrame(({ clock }, delta) => {
    if (!ref.current) return

    if (!active) {
      // Before activation: hide confetti and reset the timer
      ref.current.visible = false
      startTimeRef.current = null
      return
    }

    ref.current.visible = true

    if (startTimeRef.current === null) {
      startTimeRef.current = clock.getElapsedTime()
    }

    const t = clock.getElapsedTime() - startTimeRef.current
    const g = 2 // “fake” gravity for a nicer arc

    const x = baseX + velX * t
    const z = baseZ + velZ * t
    const y = baseY + velY * t - 0.5 * g * t * t

    ref.current.position.set(x, y, z)
    ref.current.rotation.x += rotSpeedX * delta
    ref.current.rotation.y += rotSpeedY * delta

    // After ~3 seconds, stop rendering to avoid wasting CPU/GPU
    if (t > 3.0) {
      ref.current.visible = false
    }
  })

  return (
    <mesh ref={ref} position={[baseX, baseY, baseZ]}>
      <boxGeometry args={[0.08, 0.14, 0.01]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export type ConfettiBurstProps = {
  active: boolean
}

const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ active }) => {
  return (
    <group>
      {Array.from({ length: 60 }).map((_, index) => (
        <ConfettiPiece key={index} index={index} active={active} />
      ))}
    </group>
  )
}

export default ConfettiBurst
