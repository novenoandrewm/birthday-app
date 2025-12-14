// src/hooks/useRevealOnScroll.ts
import { useEffect, useRef, useState } from 'react'

type Options = {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

/**
 * Reveals an element once it enters the viewport (IntersectionObserver-based).
 * - Uses a forgiving threshold/rootMargin so content appears immediately after programmatic scrollTo navigation.
 * - Supports "once" mode (default) to reveal only the first time the element becomes visible.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  options: Options = {}
) {
  const {
    once = true,
    threshold = 0.01,
    rootMargin = '0px 0px -15% 0px',
  } = options

  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const checkImmediate = () => {
      const r = el.getBoundingClientRect()
      const inView = r.top < window.innerHeight * 0.9 && r.bottom > 0
      if (inView) setIsVisible(true)
    }

    checkImmediate()

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setIsVisible(true)
            if (once) io.disconnect()
          }
        }
      },
      { threshold, rootMargin }
    )

    io.observe(el)
    window.addEventListener('resize', checkImmediate)

    return () => {
      io.disconnect()
      window.removeEventListener('resize', checkImmediate)
    }
  }, [once, threshold, rootMargin])

  return { ref, isVisible }
}
