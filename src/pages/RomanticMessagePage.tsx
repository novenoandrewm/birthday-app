// src/pages/RomanticMessagePage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrimaryButton from '../components/ui/PrimaryButton'
import { usePersonalization } from '../context/PersonalizationContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const RomanticMessagePage: React.FC = () => {
  const navigate = useNavigate()
  const { nickname } = usePersonalization()
  const prefersReducedMotion = usePrefersReducedMotion()

  const displayName = (nickname || 'you').trim()

  return (
    <motion.section
      className="page page-message"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: 'easeOut' }}
    >
      <h1>Your birthday letter, {displayName} 💌</h1>

      <p>
        I could have said a simple &quot;happy birthday&quot; and left it there. But you&apos;ve
        never been just &quot;simple&quot; to me.
      </p>
      <p>
        You turn tiring days into something I can still laugh about. You make small, ordinary
        moments — a random chat, a silly meme, a late-night voice note — feel like they matter more
        than they should. That&apos;s what I&apos;m grateful for the most.
      </p>
      <p>
        My wish for you this year is quiet but serious: that you always have enough courage to chase
        what you want, enough rest to breathe, and enough warmth to remember you are not doing life
        alone. When things go well, I hope you remember to celebrate. When they don&apos;t, I hope
        you remember you&apos;re still deeply, stubbornly loved.
      </p>
      <p>
        Thank you for being {displayName}. Exactly as you are, right now — that is already more than
        enough.
      </p>

      {/* TODO: You can replace this with a personal story:
        -  funny moments between you,
        -  difficult moment you've been through,
        -  very specific hope for them. */}

      <PrimaryButton onClick={() => navigate('/memories')}>
        Continue to our memories
      </PrimaryButton>
    </motion.section>
  )
}

export default RomanticMessagePage
