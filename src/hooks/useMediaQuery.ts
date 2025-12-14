// src/hooks/useMediaQuery.ts
import { useEffect, useState } from 'react'

/**
 * React hook that returns whether a given CSS media query currently matches.
 * - Uses window.matchMedia() and updates state on query changes.
 * - Safe for SSR by early-returning when window is undefined.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mql = window.matchMedia(query)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Initial value
    setMatches(mql.matches)

    // Listen for changes
    mql.addEventListener('change', handleChange)

    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
