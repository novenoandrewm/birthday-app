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
    subtitle:
      '',
    recipient: PERSON?.name ?? 'Nama Penerima',
  },

  romantic: {
    title: 'Part 1',
    paragraphs: [
      // isi dengan paragraf kamu sendiri, contoh:
      'fill it yourself',
    ],
  },

  reflection: {
    title: 'Part 2',
    paragraphs: [
      // boleh kosong atau kamu isi nanti
      'Fill it yourself'
    ],
  },

  finale: {
    title: 'Closing',
    description:
      'Di sini nanti bisa jadi kalimat penutup singkat setelah lilin padam dan konfeti keluar.',
  },
}
