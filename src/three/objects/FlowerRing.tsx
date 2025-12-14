/**
 * Simple decorative flower ring made of pastel “petal” spheres.
 * - Procedurally places small spheres in a circular pattern around the center.
 * - Uses a repeating pastel color palette to create a soft romantic accent.
 */

// src/three/objects/FlowerRing.tsx
import React from 'react'

const pastelColors = ['#fecaca', '#bfdbfe', '#bbf7d0', '#f9a8d4']

const FlowerRing: React.FC = () => {
  const petals = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2
    const radius = 1.05
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const color = pastelColors[i % pastelColors.length]

    return (
      <mesh key={i} position={[x, 0.02, z]}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  })

  return <group>{petals}</group>
}

export default FlowerRing
