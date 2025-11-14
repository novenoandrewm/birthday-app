// src/components/ui/BirthdayCakeAnimation.tsx
import React from 'react'
import Decorations from './Decorations'
import '../../assets/styles/cake.css'

interface BirthdayCakeAnimationProps {
  blown?: boolean
}

const BirthdayCakeAnimation: React.FC<BirthdayCakeAnimationProps> = ({ blown = false }) => {
  return (
    <div className="cake-wrapper">
      {/* Balon dan karangan bunga */}
      <Decorations />
      <div className="cake">
        <div className="layer layer-top" />
        <div className="layer layer-middle" />
        <div className="layer layer-bottom" />
        <div className="icing" />
        <div className="candles">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="candle">
              <div className={blown ? 'flame blown' : 'flame'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BirthdayCakeAnimation
