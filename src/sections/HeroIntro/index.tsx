// src/sections/HeroIntro/index.tsx
import React from 'react'
import { COPY } from '../../config/copy'

type HeroIntroProps = {
  /** 0–1 dari useScrollProgress */
  scrollProgress: number
}

// Helper kecil
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

type Chapter = {
  id: string
  eyebrow?: string
  title: string
  paragraphs?: string[]
}

const HeroIntro: React.FC<HeroIntroProps> = ({ scrollProgress }) => {
  const hero = COPY.hero

  const chapters: Chapter[] = [
    {
      id: 'hero',
      eyebrow: (hero.eyebrow ?? 'Birthday Moment'),
      title: (hero.title ?? 'Happy Birthday').toUpperCase(),
      paragraphs: [], // bagian pertama hanya judul
    },
    {
      id: 'romantic',
      title: COPY.romantic.title,
      paragraphs: COPY.romantic.paragraphs,
    },
    {
      id: 'reflection',
      title: COPY.reflection.title,
      paragraphs: COPY.reflection.paragraphs,
    },
    {
      id: 'finale',
      title: COPY.finale.title,
      paragraphs: COPY.finale.description ? [COPY.finale.description] : [],
    },
  ]

  const n = chapters.length
  const transitions = n - 1

  // Hindari p = 1 persis supaya tidak wrap ke awal step terakhir
  const safeP = clamp(scrollProgress, 0, 0.999)

  const stepLen = 1 / transitions
  const rawStep = safeP / stepLen // 0..transitions
  const stepIndex = clamp(Math.floor(rawStep), 0, transitions - 1)
  const localT = rawStep - stepIndex // 0..1 di dalam step aktif

  const opacities = new Array(n).fill(0) as number[]

  // Pola: 0–0.4 = chapter lama fade out
  //       0.4–0.6 = gap (dua-duanya 0)
  //       0.6–1 = chapter baru fade in
  const GAP_START = 0.4
  const GAP_END = 0.6

  if (transitions === 0) {
    opacities[0] = 1
  } else {
    if (localT < GAP_START) {
      const t = localT / GAP_START
      opacities[stepIndex] = 1 - smoothstep(t)
    } else if (localT > GAP_END) {
      const t = (localT - GAP_END) / (1 - GAP_END)
      opacities[stepIndex + 1] = smoothstep(t)
    } else {
      // di gap tidak ada teks, keduanya 0
    }

    // Di awal sekali (p = 0) pastikan chapter 0 full visible
    if (safeP === 0) {
      opacities.fill(0)
      opacities[0] = 1
    }
  }

  const recipientLabel = (hero.recipient ?? 'Nama Penerima').toUpperCase()
  // Nama penerima ikut opacity chapter pertama, sehingga hanya muncul di bagian awal
  const recipientOpacity = opacities[0]

  return (
    <>
      {/* Spacer 1 layar supaya ada tinggi scroll awal */}
      <section id="hero" className="hero-shell" aria-hidden="true" />

      {/* Overlay teks fixed kiri atas */}
      <div className="hero-overlay">
        <div className="hero-overlay-inner">
          {chapters.map((chapter, index) => {
            const opacity = opacities[index]
            if (opacity <= 0.001) return null

            const isHero = chapter.id === 'hero'

            return (
              <div
                key={chapter.id}
                className={`hero-chapter ${isHero ? 'hero-chapter--hero' : ''}`}
                style={{ opacity }}
              >
                {chapter.eyebrow && (
                  <p className="section-eyebrow hero-eyebrow">
                    {chapter.eyebrow.toUpperCase()}
                  </p>
                )}

                <h1 className="section-title hero-title">
                  {chapter.title}
                </h1>

                {chapter.paragraphs && chapter.paragraphs.length > 0 && (
                  <div className="hero-body">
                    {chapter.paragraphs.map((p, i) => (
                      <p key={i} className="section-text">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Nama penerima – hanya di chapter pertama (opacity ikut chapter 0) */}
      <div
        className="hero-recipient-tag"
        style={{ opacity: recipientOpacity }}
      >
        {recipientLabel}
      </div>
    </>
  )
}

export default HeroIntro
