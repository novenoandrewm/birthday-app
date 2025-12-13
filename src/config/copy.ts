// src/config/copy.ts

export type SectionCopy = {
  title: string
  paragraphs: string[]
}

export type HeroCopy = {
  eyebrow?: string
  title?: string
  subtitle?: string
  recipient?: string
}

export const COPY: {
  hero: HeroCopy
  romantic: SectionCopy
  reflection: SectionCopy
  finale: SectionCopy
} = {
  hero: {
    eyebrow: 'Birthday Moment',
    title: 'Happy Birthday',
    subtitle: 'Hari ini tentang kamu',
    recipient: 'Recipient Name',
  },

  romantic: {
    title: 'Part 1',
    paragraphs: [
      // HUD line (Part 1 — ...)
      'fill it yourself',
      // Card content (tampil di page)
      'Tulis paragraf Part 1 kamu di sini.',
      'Kalau mau tambah, ini paragraf kedua (opsional).',
    ],
  },

  reflection: {
    title: 'Part 2',
    paragraphs: [
      'Fill it yourself',
      'Tulis isi Part 2 kamu di sini.',
      'Kalau mau tambah, ini paragraf kedua (opsional).',
    ],
  },

  finale: {
    title: 'Closing',
    paragraphs: [
      // HUD line (Closing — ...)
      'Kalimat penutup singkat setelah lilin padam dan konfeti keluar.',
      // Card content (tampil di page)
      'Tulis penutup yang paling kamu di sini.',
      'Boleh tambah paragraf terakhir yang lebih personal (opsional).',
    ],
  },
}
