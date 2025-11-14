// src/components/ui/Decoration
import React from 'react'

const Decorations: React.FC = () => {
  return (
    <div className="decorations" aria-hidden="true">
      {/* Left balloon */}
      <div className="balloon balloon-left">
        <div className="balloon-string" />
      </div>
      {/* Right balloon */}
      <div className="balloon balloon-right">
        <div className="balloon-string" />
      </div>
      {/* Top balloon for symmetry */}
      <div className="balloon balloon-top">
        <div className="balloon-string" />
      </div>
      {/* Wreaths */}
      <div className="garland">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="flower">
            <div className="petal petal1" />
            <div className="petal petal2" />
            <div className="petal petal3" />
            <div className="petal petal4" />
            <div className="flower-center" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Decorations
