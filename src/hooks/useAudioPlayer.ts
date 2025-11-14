// src/hooks/useAudioPlayer.ts
import { useCallback, useEffect, useRef, useState } from 'react'

interface UseAudioPlayerOptions {
  src: string
  volume?: number
}

export const useAudioPlayer = ({ src, volume = 0.75 }: UseAudioPlayerOptions) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audio.volume = volume
    audio.preload = 'auto'

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('ended', handleEnded)
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('ended', handleEnded)
      audioRef.current = null
    }
  }, [src, volume])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.error('Unable to start audio playback:', err)
      }
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [])

  return { isPlaying, togglePlay }
}
