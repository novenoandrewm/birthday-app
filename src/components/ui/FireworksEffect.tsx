// src/components/ui/FireworksEffect.tsx
import React, { useEffect, useState } from 'react'

interface FireworksEffectProps {
  trigger: number
}

const FireworksEffect: React.FC<FireworksEffectProps> = ({ trigger }) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (trigger <= 0) return

    setActive(true)
    const timer = setTimeout(() => setActive(false), 3200)
    return () => clearTimeout(timer)
  }, [trigger])

  if (!active) return null

  const bursts = Array.from({ length: 6 })
  const colours = ['#fb7185', '#facc15', '#38bdf8', '#34d399', '#a855f7', '#f97316']

  return (
    <div className="fireworks-wrapper">
      {bursts.map((_, i) => {
        const left = 10 + Math.random() * 80
        const top = 8 + Math.random() * 28
        const colour = colours[i % colours.length]
        const burstDelay = Math.random() * 0.5

        return (
          <div
            key={i}
            className="firework"
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${burstDelay}s` }}
          >
            {Array.from({ length: 10 }).map((__, j) => {
              const angle = (360 / 10) * j
              const sparkDelay = Math.random() * 0.25
              const style = {
                color: colour,
                '--spark-angle': `${angle}deg`,
                animationDelay: `${sparkDelay}s`,
              } as React.CSSProperties

              return <span key={j} className="firework-spark" style={style} />
            })}
          </div>
        )
      })}
    </div>
  )
}

export default FireworksEffect