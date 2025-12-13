// src/hooks/useActiveSection.ts
import { useEffect, useState } from 'react'
import type { SectionItem } from '../config/sections'

export const useActiveSection = (sections: SectionItem[]) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // cari entry yang paling “kuat” terlihat
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      {
        threshold: [0.25, 0.4, 0.6, 0.75],
        rootMargin: '-10% 0px -30% 0px',
      }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return activeId
}
