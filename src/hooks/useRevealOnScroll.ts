// src/hooks/useRevealOnScroll.ts
import { useEffect, useRef, useState } from 'react'

type Options = {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

/**
 * Reveal ketika elemen sudah "cukup" masuk viewport.
 * Dibuat lebih forgiving supaya saat scrollTo (NavigationButtons)
 * konten langsung muncul tanpa harus scroll lagi.
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
