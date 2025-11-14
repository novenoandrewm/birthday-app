// src/pages/FinalePage.tsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePersonalization } from '../context/PersonalizationContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import ConfettiEffect from '../components/ui/ConfettiEffect'
import FireworksEffect from '../components/ui/FireworksEffect'
import MusicControl from '../components/ui/MusicControl'
import BirthdayCakeAnimation from '../components/ui/BirthdayCakeAnimation'

const FinalePage: React.FC = () => {
  const { nickname } = usePersonalization()
  const prefersReducedMotion = usePrefersReducedMotion()

  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [fireworksTrigger, setFireworksTrigger] = useState(0)
  const [showBlowInstruction, setShowBlowInstruction] = useState(false)
  const [isBlown, setIsBlown] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // Saat halaman terbuka
  useEffect(() => {
    if (!prefersReducedMotion) {
      setConfettiTrigger((c) => c + 1)
    }
    const t = setTimeout(() => setShowBlowInstruction(true), 1500)
    return () => clearTimeout(t)
  }, [prefersReducedMotion])

  // Setelah lilin ditiup
  useEffect(() => {
    if (!isBlown) return

    setConfettiTrigger((c) => c + 1)
    setFireworksTrigger((c) => c + 1)

    const t = setTimeout(() => setShowCelebration(true), 1500)
    return () => clearTimeout(t)
  }, [isBlown])

  const handleBlow = () => {
    if (isBlown) return
    setIsBlown(true)
    setShowBlowInstruction(false)
  }

  const finaleName = nickname ? `, ${nickname}` : ''

  return (
    <>
      <ConfettiEffect trigger={confettiTrigger} />
      <FireworksEffect trigger={fireworksTrigger} />

      <motion.section
        className="page page-finale page-finale--cake"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: 'easeOut' }}
      >
        <div className="finale-scene">
          {/* Musik tetap ada */}
          <MusicControl autoPlay />

          {/* Instruksi singkat untuk interaksi */}
          {showBlowInstruction && !isBlown && (
            <div className="blow-instruction">Tiup lilinya 💨</div>
          )}

          {/* Fokus utama: kue + dekorasi */}
          <div className="finale-cake-orbit" onClick={handleBlow}>
            <div className="finale-aura" />
            <BirthdayCakeAnimation blown={isBlown} />
          </div>

          {/* Penutup setelah lilin padam */}
          {showCelebration && (
            <div className="finale-celebration">
              <div className="celebration-text">
                Yeeeyyy 祝你生日快乐{finaleName} ✨
              </div>
            </div>
          )}
        </div>
      </motion.section>
    </>
  )
}

export default FinalePage