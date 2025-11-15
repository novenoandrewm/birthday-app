// src/hooks/usePrefersReducedMotion.ts
import { useEffect, useState } from 'react'

export const usePrefersReducedMotion = (): boolean => {
  const [prefers, setPrefers] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefers(event.matches)
    }

    // nilai awal
    setPrefers(mql.matches)

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleChange)
      return () => mql.removeEventListener('change', handleChange)
    } else {
      // fallback browser lama
      mql.addListener(handleChange)
      return () => mql.removeListener(handleChange)
    }
  }, [])

  return prefers
}
