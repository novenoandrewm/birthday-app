// src/components/layout/Header.tsx
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="/" className="site-brand">
          <span className="site-brand-badge" aria-hidden="true">
            💌
          </span>
          <span className="site-brand-text">
            Birthday <span>Surprise</span>
          </span>
        </a>
      </div>
    </header>
  )
}

export default Header
