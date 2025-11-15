import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

export type BirthdayCakeProps = {
  onBlow?: () => void
  reduceMotion?: boolean
}

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ onBlow, reduceMotion }) => {
  const group = useRef<Group | null>(null)
  const [isLit, setIsLit] = useState(true)

  // Rotasi pelan hanya kalau user TIDAK minta reduce motion
  useFrame((_, delta) => {
    if (!group.current) return
    if (reduceMotion) return
    group.current.rotation.y += delta * 0.3
  })

  const handleBlow = () => {
    if (!isLit) return
    setIsLit(false)
    if (onBlow) onBlow()
  }

  return (
    <group ref={group} position={[0, 0.18, 0]} onClick={handleBlow}>
      {/* Piring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[1.1, 48]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Badan kue */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.6, 48]} />
        <meshStandardMaterial color="#fb7185" />
      </mesh>

      {/* Cream di atas */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.1, 48]} />
        <meshStandardMaterial color="#fde68a" />
      </mesh>

      {/* Lilin */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.35, 24]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>

      {/* Api lilin */}
      {isLit && (
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color="#fed7aa"
            emissive="#fb923c"
            emissiveIntensity={1.5}
          />
        </mesh>
      )}

      {/* Asap setelah ditiup */}
      {!isLit && (
        <group>
          <mesh position={[0, 1.32, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial
              color="#e5e7eb"
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh position={[0.02, 1.38, 0.02]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial
              color="#e5e7eb"
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      )}

      {/* Meja */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

export default BirthdayCake
