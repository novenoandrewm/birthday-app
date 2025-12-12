import React, { useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BirthdayCake from '../objects/BirthdayCake'
import ConfettiBurst from '../objects/ConfettiBurst'
import BalloonsRing from '../objects/BalloonsRing'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export type SceneCanvasProps = {
  onBlow?: () => void
  blown?: boolean
}

const SceneCanvas: React.FC<SceneCanvasProps> = ({ onBlow, blown }) => {
  const reduceMotion = usePrefersReducedMotion()

  // Selalu fungsi: di dalamnya baru cek onBlow optional
  const handleBlow = useCallback(() => {
    if (onBlow) {
      onBlow()
    }
  }, [onBlow])

  return (
    <div className="scene-placeholder">
      <Canvas
        camera={{ position: [0, 1.8, 3.4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#020617']} />

        <ambientLight intensity={0.55} />
        <directionalLight intensity={1} position={[3, 5, 4]} />
        <directionalLight
          intensity={0.6}
          position={[-4, 3, -3]}
          color="#fb7185"
        />

        <BalloonsRing radius={1.6} count={8} reduceMotion={reduceMotion} />
        {/* di sini sudah pasti tipe () => void */}
        <BirthdayCake onBlow={handleBlow} reduceMotion={reduceMotion} />

        {!reduceMotion && !!blown && <ConfettiBurst active={!!blown} />}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          target={[0, 0.8, 0]}
        />
      </Canvas>
    </div>
  )
}

export default SceneCanvas
