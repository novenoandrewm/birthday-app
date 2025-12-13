// src/config/copy.ts
import { PERSON } from './personalization'

export type SectionCopy = {
  title: string
  paragraphs: string[]
}

export type FinaleCopy = {
  title: string
  description: string
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
  finale: FinaleCopy
} = {
  hero: {
    eyebrow: 'Birthday Moment',
    title: 'Happy Birthday',

    // Ini yang tampil di HUD line saat page pertama (hero)
    subtitle: 'Hari ini tentang kamu',

    // Nama penerima (pojok kanan bawah)
    recipient: PERSON?.name ?? 'Recipient Name',
  },

  romantic: {
    title: 'Part 1',

    // paragraphs[0] = subline untuk HUD (Part 1 — ...)
    // paragraphs[1..] = isi teks yang tampil di card (page-content)
    paragraphs: [
      'fill it yourself',
      'Tulis paragraf pertama pesan romantis kamu di sini.',
      'Kalau mau tambah, ini paragraf kedua (opsional).',
    ],
  },

  reflection: {
    title: 'Part 2',
    paragraphs: [
      'Fill it yourself',
      'Tulis bagian refleksi / janji / harapan kamu di sini.',
      'Boleh tambah paragraf lagi kalau perlu.',
    ],
  },

  finale: {
    title: 'Closing',

    // Ini dipakai HUD line saat closing sebelum lilin ditiup
    description:
      'Kalimat penutup singkat setelah lilin padam dan konfeti keluar.',
  },
}
