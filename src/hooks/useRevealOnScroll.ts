import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export const useRevealOnScroll = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    // Kalau user minta reduce motion, langsung tampil tanpa animasi scroll
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return { ref, isVisible }
}
