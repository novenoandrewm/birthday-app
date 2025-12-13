// src/hooks/useActiveSection.ts
import { useEffect, useRef, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? 'hero')
  const activeRef = useRef(activeId)
  activeRef.current = activeId

  useEffect(() => {
    if (!ids.length) return

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (!best?.target) return
        const id = (best.target as HTMLElement).id
        if (id && id !== activeRef.current) setActiveId(id)
      },
      {
        // “aktif” saat chapter mendekati tengah viewport (feel-nya mirip orbyte)
        root: null,
        threshold: [0.25, 0.35, 0.5, 0.65],
        rootMargin: '-40% 0px -40% 0px',
      }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids.join('|')])

  return activeId
}
