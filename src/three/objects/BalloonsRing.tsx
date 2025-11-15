import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

const BALLOON_COLORS = ['#fb7185', '#f97316', '#22c55e', '#38bdf8', '#a855f7']

type BalloonProps = {
  index: number
  angle: number
  radius: number
  reduceMotion?: boolean
}

const Balloon: React.FC<BalloonProps> = ({ index, angle, radius, reduceMotion }) => {
  const group = useRef<Group | null>(null)

  const baseX = Math.cos(angle) * radius
  const baseZ = Math.sin(angle) * radius
  const baseY = 1.25 + (index % 2) * 0.12

  const color = BALLOON_COLORS[index % BALLOON_COLORS.length]
  const phase = index * 0.8
  const amp = 0.1 + (index % 3) * 0.03
  const speed = 1 + (index % 4) * 0.25

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()

    const offsetY = reduceMotion ? 0 : Math.sin(t * speed + phase) * amp
    const wobble = reduceMotion ? 0 : Math.sin(t * 0.3 + phase) * 0.1

    group.current.position.set(baseX, baseY + offsetY, baseZ)
    group.current.rotation.y = -angle + wobble
  })

  return (
    <group ref={group}>
      {/* badan balon */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color={color} metalness={0.1} roughness={0.2} />
      </mesh>

      {/* leher balon */}
      <mesh position={[0, -0.22, 0]}>
        <coneGeometry args={[0.04, 0.07, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* tali balon */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.6, 8]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.9} />
      </mesh>
    </group>
  )
}

export type BalloonsRingProps = {
  radius?: number
  count?: number
  reduceMotion?: boolean
}

const BalloonsRing: React.FC<BalloonsRingProps> = ({
  radius = 1.6,
  count = 8,
  reduceMotion,
}) => {
  const balloons = Array.from({ length: count })

  return (
    <group position={[0, 0.5, 0]}>
      {balloons.map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        return (
          <Balloon
            key={i}
            index={i}
            angle={angle}
            radius={radius}
            reduceMotion={reduceMotion}
          />
        )
      })}
    </group>
  )
}

export default BalloonsRing
