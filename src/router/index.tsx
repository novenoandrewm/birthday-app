// src/router/index.tsx
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import GreetingPage from '../pages/GreetingPage'
import RomanticMessagePage from '../pages/RomanticMessagePage'
import MemoriesPage from '../pages/MemoriesPage'
import FinalePage from '../pages/FinalePage'

const AppRouter: React.FC = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<GreetingPage />} />
        <Route path="/message" element={<RomanticMessagePage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/finale" element={<FinalePage />} />
        <Route path="*" element={<GreetingPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRouter
