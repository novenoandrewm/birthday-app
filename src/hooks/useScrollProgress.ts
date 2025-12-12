// src/hooks/useScrollProgress.ts
import { useEffect, useState } from 'react'

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop
      const maxScroll = doc.scrollHeight - doc.clientHeight

      if (maxScroll <= 0) {
        setProgress(0)
      } else {
        setProgress(scrollTop / maxScroll)
      }
    }

    handleScroll() // initial
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return progress
}
