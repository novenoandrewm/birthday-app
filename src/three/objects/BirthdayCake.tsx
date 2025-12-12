// src/three/objects/BirthdayCake.tsx
import React, { useRef, useMemo, useState, useLayoutEffect } from 'react'
import type { FC } from 'react'
import { Group, MeshStandardMaterial, Color } from 'three'
import type { Mesh, BufferGeometry } from 'three'
import { useFrame } from '@react-three/fiber'

type BirthdayCakeProps = {
  onBlow: () => void
  reduceMotion: boolean
}

const RIM_SEGMENTS = 64

type FlowerConfig = {
  position: [number, number, number]
  color: string
  scale: number
}

const BirthdayCake: FC<BirthdayCakeProps> = ({ onBlow, reduceMotion }) => {
  const root = useRef<Group | null>(null)
  const flameMat = useRef<MeshStandardMaterial | null>(null)
  const [isLit, setIsLit] = useState(true)

  const lowerTierRef = useRef<Mesh | null>(null)
  const upperTierRef = useRef<Mesh | null>(null)

  // Sedikit jitter di geometry supaya highlight lebih hidup
  useLayoutEffect(() => {
    const jitter = (mesh: Mesh | null, magnitude: number) => {
      if (!mesh) return
      const geo = mesh.geometry as BufferGeometry
      const pos = geo.attributes.position
      const arr = pos.array as Float32Array
      for (let i = 0; i < arr.length; i += 3) {
        arr[i] += (Math.random() - 0.5) * magnitude
        arr[i + 1] += (Math.random() - 0.5) * magnitude * 1.3
        arr[i + 2] += (Math.random() - 0.5) * magnitude * 0.6
      }
      pos.needsUpdate = true
      geo.computeVertexNormals()
    }

    jitter(lowerTierRef.current, 0.018)
    jitter(upperTierRef.current, 0.014)
  }, [])

  // Cream blobs di tepi atas
  const creamBlobs = useMemo(() => {
    const blobs: { position: [number, number, number]; scale: number }[] = []
    const ringRadius = 1.05
    const count = 16
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      blobs.push({
        position: [
          Math.cos(angle) * ringRadius,
          0.55,
          Math.sin(angle) * ringRadius,
        ],
        scale: 0.15 + Math.random() * 0.04,
      })
    }
    return blobs
  }, [])

  // Bunga HANYA di depan kue
  const frontFlowers = useMemo<FlowerConfig[]>(() => {
    const z = 1.75
    const y = 0.05
    return [
      { position: [-0.55, y, z], color: '#fb7185', scale: 0.22 },
      { position: [0, y + 0.05, z + 0.02], color: '#f97316', scale: 0.26 },
      { position: [0.55, y, z], color: '#a855f7', scale: 0.22 },
    ]
  }, [])

  const figurineHeight = 0.9

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Floating halus untuk seluruh kue
    if (root.current && !reduceMotion) {
      root.current.rotation.y = Math.sin(t * 0.25) * 0.12
      root.current.position.y = 0.02 + Math.sin(t * 0.9) * 0.03
    }

    // Api lilin berdenyut
    if (flameMat.current && isLit) {
      const pulse = 0.6 + Math.sin(t * 12.0) * 0.25
      flameMat.current.emissiveIntensity = 1.4 * pulse
      flameMat.current.color.lerp(new Color('#fde68a'), 0.15)
    }
  })

  const handleBlow = () => {
    if (!isLit) return
    setIsLit(false)
    if (flameMat.current) {
      flameMat.current.emissiveIntensity = 0
    }
    onBlow()
  }

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* Piring kue – gelap untuk kontras */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.4, 2.6, 0.18, RIM_SEGMENTS]} />
        <meshStandardMaterial
          color="#020617"
          roughness={0.35}
          metalness={0.85}
        />
      </mesh>

      {/* Tier bawah – buttercream kuning emas */}
      <mesh
        ref={lowerTierRef}
        position={[0, -0.1, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1.7, 1.7, 0.9, RIM_SEGMENTS, 2, false]} />
        <meshStandardMaterial
          color="#fde68a"
          roughness={0.55}
          metalness={0.08}
        />
      </mesh>

      {/* Rim frosting bawah – oranye lembut */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <torusGeometry args={[1.72, 0.09, 18, 80]} />
        <meshStandardMaterial
          color="#fb923c"
          roughness={0.4}
          metalness={0.12}
          emissive="#f97316"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Tier atas – pink pastel */}
      <mesh
        ref={upperTierRef}
        position={[0, 0.6, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1.1, 1.1, 0.7, RIM_SEGMENTS, 2, false]} />
        <meshStandardMaterial
          color="#fecdd3"
          roughness={0.55}
          metalness={0.08}
        />
      </mesh>

      {/* Rim frosting atas – biru pastel */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <torusGeometry args={[1.12, 0.075, 16, 70]} />
        <meshStandardMaterial
          color="#7dd3fc"
          roughness={0.35}
          metalness={0.15}
          emissive="#38bdf8"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cream blobs di tepi atas */}
      {creamBlobs.map((blob, idx) => (
        <mesh
          key={idx}
          position={blob.position}
          scale={[blob.scale, blob.scale * 1.2, blob.scale]}
          castShadow
        >
          <sphereGeometry args={[1, 18, 18]} />
          <meshStandardMaterial
            color="#fefce8"
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Bouquet bunga hanya di depan kue */}
      {frontFlowers.map((f, i) => (
        <group key={i} position={f.position}>
          <mesh castShadow>
            <sphereGeometry args={[f.scale, 20, 20]} />
            <meshStandardMaterial
              color={f.color}
              roughness={0.5}
              metalness={0.05}
              emissive={new Color(f.color).multiplyScalar(0.4)}
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* batang */}
          <mesh position={[0, -f.scale * 0.9, 0]}>
            <cylinderGeometry
              args={[f.scale * 0.2, f.scale * 0.16, f.scale * 1.8, 10]}
            />
            <meshStandardMaterial color="#16a34a" roughness={0.7} />
          </mesh>

          {/* dua daun kecil */}
          <mesh position={[f.scale * 0.3, -f.scale * 0.9, 0]}>
            <sphereGeometry args={[f.scale * 0.18, 10, 10]} />
            <meshStandardMaterial color="#16a34a" roughness={0.7} />
          </mesh>
          <mesh position={[-f.scale * 0.3, -f.scale * 0.9, 0]}>
            <sphereGeometry args={[f.scale * 0.18, 10, 10]} />
            <meshStandardMaterial color="#16a34a" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Figurine di atas kue */}
      <group position={[0, 1.0, 0]}>
        <mesh position={[0, figurineHeight * 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.18, figurineHeight * 0.6, 24]} />
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.5}
            metalness={0.15}
          />
        </mesh>
        <mesh position={[0, figurineHeight, 0]} castShadow>
          <sphereGeometry args={[0.18, 26, 26]} />
          <meshStandardMaterial color="#fee2e2" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.9, 0.12]} rotation={[Math.PI / 2.8, 0, 0]}>
          <torusGeometry args={[0.26, 0.03, 10, 30]} />
          <meshStandardMaterial
            color="#fb7185"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Lilin */}
      <group position={[0, 1.1, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.35, 18]} />
          <meshStandardMaterial
            color="#e5e7eb"
            roughness={0.6}
            metalness={0.05}
          />
        </mesh>

        {isLit && (
          <mesh
            position={[0, 0.3, 0]}
            onClick={handleBlow}
            castShadow
            userData={{ isFlame: true }}
          >
            <sphereGeometry args={[0.09, 18, 18]} />
            <meshStandardMaterial
              ref={flameMat}
              color="#fde68a"
              emissive="#fbbf24"
              emissiveIntensity={2.4}
              roughness={0.2}
              metalness={0}
            />
          </mesh>
        )}
      </group>
    </group>
  )
}

export default BirthdayCake
