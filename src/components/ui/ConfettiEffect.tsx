// src/components/ui/CofettiEffect.tsx
import React, { useEffect, useState } from 'react'

interface ConfettiEffectProps {
  trigger: number
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger }) => {
  const [pieces, setPieces] = useState<number[]>([])

  useEffect(() => {
    if (trigger <= 0) return

    const count = 60
    const indices = Array.from({ length: count }, (_, i) => i)
    setPieces(indices)

    const timer = setTimeout(() => setPieces([]), 3000)
    return () => clearTimeout(timer)
  }, [trigger])

  if (pieces.length === 0) return null

  return (
    <div className="confetti-wrapper">
      {pieces.map((i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.5
        const style = {
          left: `${left}%`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties

        return <div key={i} className="confetti-piece" style={style} />
      })}
    </div>
  )
}

export default ConfettiEffect
