// src/sections/ScrollChapters/index.tsx
import React, { useEffect, useRef, useState } from 'react'
import { COPY } from '../../config/copy'

type ChapterId = 'romantic' | 'reflection' | 'finale'
const CHAPTERS: ChapterId[] = ['romantic', 'reflection', 'finale']

// Posisi vertikal teks per chapter
const CHAPTER_ALIGN: Record<ChapterId, 'top' | 'bottom'> = {
  romantic: 'top',
  reflection: 'bottom',
  finale: 'top',
}

const ScrollChapters: React.FC = () => {
  const [active, setActive] = useState<ChapterId>('romantic')
  const [pinned, setPinned] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Observer kanan: tentukan chapter mana yang aktif
  useEffect(() => {
    const elements = CHAPTERS
      .map((id) =>
        document.querySelector<HTMLElement>(`[data-chapter-step="${id}"]`)
      )
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.getAttribute('data-chapter-step') as
            | ChapterId
            | null
          if (id) {
            setActive(id)
          }
        })
      },
      {
        threshold: 0.6,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Observer section: kapan overlay harus muncul / menghilang
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setPinned(entry.isIntersecting)
        })
      },
      {
        threshold: 0.15,
      }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const align = CHAPTER_ALIGN[active]
  const overlayAlignClass =
    align === 'top'
      ? 'scroll-chapters-overlay-inner--top'
      : 'scroll-chapters-overlay-inner--bottom'

  const chapterCopy = COPY[active]

  return (
    <section ref={sectionRef} className="section scroll-chapters">
      <div className="scroll-chapters-layout">
        {/* Kiri: overlay teks pinned */}
        <div className="scroll-chapters-overlay">
          {pinned && (
            <div
              className={`scroll-chapters-overlay-inner ${overlayAlignClass}`}
            >
              <article className="scroll-chapters-card">
                <h2 className="section-title">{chapterCopy.title}</h2>

                {'paragraphs' in chapterCopy &&
                  chapterCopy.paragraphs.map((p, idx) => (
                    <p key={idx} className="section-text">
                      {p}
                    </p>
                  ))}

                {'description' in chapterCopy && (
                  <p className="section-text">{chapterCopy.description}</p>
                )}
              </article>
            </div>
          )}
        </div>

        {/* Kanan: rel scroll tak terlihat */}
        <div className="scroll-chapters-track">
          <div className="scroll-step" data-chapter-step="romantic" />
          <div className="scroll-step" data-chapter-step="reflection" />
          <div className="scroll-step" data-chapter-step="finale" />
        </div>
      </div>
    </section>
  )
}

export default ScrollChapters