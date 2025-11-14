// src/App.tsx
import React from 'react'
import AppRouter from './router'
import SkipToContentLink from './components/a11y/SkipToContentLink'
import PageShell from './components/layout/PageShell'
import { PersonalizationProvider } from './context/PersonalizationContext'

const App: React.FC = () => {
  return (
    <PersonalizationProvider>
      <SkipToContentLink />
      <PageShell>
        <AppRouter />
      </PageShell>
    </PersonalizationProvider>
  )
}

export default App
