// src/pages/GreetingPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrimaryButton from '../components/ui/PrimaryButton'
import { usePersonalization } from '../context/PersonalizationContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const GreetingPage: React.FC = () => {
  const navigate = useNavigate()
  const { nickname } = usePersonalization()
  const prefersReducedMotion = usePrefersReducedMotion()

  const displayName = (nickname || 'Dear').trim()

  return (
    <motion.section
      className="page page-greeting"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: 'easeOut' }}
    >
      <h1>
        Hi, {displayName} <span aria-hidden="true">💕</span>
      </h1>

      <p>Today is all about you.</p>

      <p>
        I didn&apos;t want your birthday to be just another notification on your phone. I wanted you
        to have a small place that is quietly, stubbornly, only yours.
      </p>

      <PrimaryButton onClick={() => navigate('/message')}>
        Open your birthday letter
      </PrimaryButton>
    </motion.section>
  )
}

export default GreetingPage
