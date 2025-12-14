// src/components/BackgroundMusic.tsx

/**
 * Background music controller for the experience.
 * - Attempts to autoplay the theme on mount (handles browser autoplay restrictions).
 * - Provides a fixed toggle button (MUSIC ON/OFF) so users can start/stop audio manually.
 */

import React, { useEffect, useRef, useState } from 'react'

const MUSIC_SRC = '/audio/birthday-theme.mp3'

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio
      .play()
      .then(() => {
        setIsPlaying(true)
        setAutoplayBlocked(false)
      })
      .catch(err => {
        console.warn('Autoplay blocked or failed:', err)
        setIsPlaying(false)
        setAutoplayBlocked(true)
      })
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
      setAutoplayBlocked(false)
    } catch (err) {
      console.error('Cannot play background music:', err)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        preload="auto"
        loop
        style={{ display: 'none' }}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        style={{
          position: 'fixed',
          top: 20,         
          right: 20,      
          zIndex: 50,
          padding: '8px 12px',
          borderRadius: 9999,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: 0.6,
          cursor: 'pointer',
          background: 'rgba(15,23,42,0.80)',
          color: 'white',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
        }}
      >
        <span style={{ fontSize: 14 }}>♪</span>
        <span>
          {isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
          {autoplayBlocked && !isPlaying ? ' – TAP' : ''}
        </span>
      </button>
    </>
  )
}

export default BackgroundMusic
