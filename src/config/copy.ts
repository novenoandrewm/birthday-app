// src/config/copy.ts
import { PERSON } from './personalization'

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

// ✅ GANTI INI untuk paksa nama dari copy.ts (paling simpel)
const RECIPIENT_OVERRIDE = 'Nama Penerima Kamu'

const personName = (PERSON?.name ?? '').trim()
const recipient = (RECIPIENT_OVERRIDE ?? '').trim() || personName || 'Recipient Name'

export const COPY: {
  hero: HeroCopy
  romantic: SectionCopy
  reflection: SectionCopy
  finale: SectionCopy
} = {
  hero: {
    eyebrow: 'Birthday Moment',
    title: 'Happy Birthday',
    subtitle: 'Today is your special day!',
    recipient: 'Recipient Name', 
  },

  romantic: {
    title: 'Part 1',
    paragraphs: [
      'fill it yourself',
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

  // ✅ Closing sekarang layout-nya sama seperti Part 1/2:
  // line 0 = subtitle (muncul di HUD)
  // sisanya = muncul di panel kiri-bawah
  finale: {
    title: 'Closing',
    paragraphs: [
      'Kalimat penutup',
      'Tulis penutup yang paling kamu di sini.',
      'Boleh tambah paragraf terakhir yang lebih personal (opsional).',
    ],
  },
}
