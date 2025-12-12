// src/hooks/useRevealOnScroll.ts
import { useEffect, useRef, useState } from 'react'

export const useRevealOnScroll = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // true kalau cukup masuk viewport, false kalau keluar lagi
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3,            // ~30% elemen masuk viewport baru dianggap "kelihatan"
        rootMargin: '-10% 0px -10% 0px', // bikin trigger sedikit lebih lembut
      }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, isVisible }
}
