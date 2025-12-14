// src/hooks/usePrefersReducedMotion.ts
import { useEffect, useState } from 'react'

/**
 * React hook that detects the user's "prefers-reduced-motion" setting.
 * - Returns true when the OS/browser requests reduced motion for accessibility.
 * - Supports modern and legacy MediaQueryList change listeners.
 */
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

    // Initial value
    setPrefers(mql.matches)

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleChange)
      return () => mql.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mql.addListener(handleChange)
      return () => mql.removeListener(handleChange)
    }
  }, [])

  return prefers
}
