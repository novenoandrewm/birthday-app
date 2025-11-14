// src/pages/MemoriesPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrimaryButton from '../components/ui/PrimaryButton'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { usePersonalization } from '../context/PersonalizationContext'

const MemoriesPage: React.FC = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { nickname } = usePersonalization()

  const displayName = (nickname || 'us').trim()

  return (
    <motion.section
      className="page page-memories"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: 'easeOut' }}
    >
      <h1>Pieces of us 📸</h1>

      <p>
        Every picture, every screenshot, every half–serious joke we decided to keep is really a
        bookmark: &quot;this moment mattered to us&quot;.
      </p>
      <p>
        One day, I hope we can look back at all of them and say, &quot;We really grew through all of
        this, didn&apos;t we, {displayName}?&quot;
      </p>
      <p>
        Later, this page can be filled with our photos, tiny notes, or inside jokes that only we
        understand. For now, just imagine them here — and know that I do remember, especially the
        ones with you.
      </p>

      <PrimaryButton onClick={() => navigate('/finale')}>
        Go to the finale
      </PrimaryButton>
    </motion.section>
  )
}

export default MemoriesPage