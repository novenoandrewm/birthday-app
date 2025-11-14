// src/components/layout/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="footer-divider" aria-hidden="true" />
        <p>
          Made with <span aria-hidden="true">❤️</span>
          <span className="sr-only"> love</span> & late-night coffee — built
          with React &amp; Vite.
        </p>
      </div>
    </footer>
  )
}

export default Footer
