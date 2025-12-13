// src/hooks/useActiveSection.tsx
import { useEffect, useState } from 'react'

/**
 * Menentukan section aktif berdasarkan posisi scroll.
 * Section dianggap aktif jika bagian atasnya berada di atas 35% tinggi viewport.
 */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    if (!ids.length) return

    const update = () => {
      const marker = window.innerHeight * 0.35
      let current = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top
          // jika bagian atas section sudah lewat marker, jadikan aktif
          if (top - marker <= 0) {
            current = id
          }
        }
      })
      setActiveId(current)
    }

    update()
    // Dengarkan scroll dan resize supaya aktifId langsung diperbarui
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return activeId
}
