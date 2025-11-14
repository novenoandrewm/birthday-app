// src/components/layout/PageShell.tsx
import React, { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

const PageShell: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-shell">
      <Header />
      <main id="main-content" className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PageShell
