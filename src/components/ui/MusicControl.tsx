// src/components/ui/MusicControl.tsx
import React, { useEffect } from 'react'
import { useAudioPlayer } from '../../hooks/useAudioPlayer'

interface MusicControlProps {
  autoPlay?: boolean
}

const MusicControl: React.FC<MusicControlProps> = ({ autoPlay = false }) => {
  const { isPlaying, togglePlay } = useAudioPlayer({
    src: '/audio/happy-birthday.mp3',
    volume: 0.75,
  })

  // Auto‑play when component mounts if autoPlay is true
  useEffect(() => {
    if (autoPlay && !isPlaying) {
      togglePlay().catch(() => {
        // Browser may block autoplay until user interaction
        console.warn('Autoplay failed; waiting for user gesture.')
      })
    }
  }, [autoPlay, isPlaying, togglePlay])

  return (
    <button type="button" className="music-control" onClick={togglePlay}>
      {isPlaying ? 'Pause music ⏸️' : 'Play birthday song ▶️'}
    </button>
  )
}

export default MusicControl
