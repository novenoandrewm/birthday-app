// src/hooks/useMediaQuery.ts
import { useEffect, useState } from 'react'

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

    // nilai awal
    setMatches(mql.matches)

    // listen perubahan
    mql.addEventListener('change', handleChange)

    return () => {
      mql.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
