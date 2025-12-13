// src/hooks/useActiveSection.ts
import { useEffect, useState } from 'react'
import type { SectionDef } from '../config/sections'

export const useActiveSection = (sections: SectionDef[]) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? 'hero')

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        // pilih yang paling “dominan” di viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (visible?.target?.id) setActiveId(visible.target.id)
      },
      {
        threshold: [0.55, 0.65, 0.75],
      }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sections])

  return activeId
}
