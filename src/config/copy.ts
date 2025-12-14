// src/config/copy.ts

/**
 * Central copy/content configuration for the whole experience.
 * - Defines all on-screen text for the hero + each chapter (titles and paragraphs).
 * - Supports simple personalization by pulling the recipient name from personalization.ts (with an optional override).
 */

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

const RECIPIENT_OVERRIDE = 'Reciepient Name'

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
    recipient: recipient,
  },

  romantic: {
    title: 'Part 1',
    paragraphs: [
      'fill it yourself',
      'Write your Part 1 paragraph here.',
      'If you want to add, here is the second paragraph (optional).',
    ],
  },

  reflection: {
    title: 'Part 2',
    paragraphs: [
      'Fill it yourself',
      'Write your Part 2 content here.',
      'If you want to add, here is the second paragraph (optional).',
    ],
  },

  finale: {
    title: 'Closing',
    paragraphs: [
      'Closing sentence',
      'Write your most personal closing here.',
      'You may add a more personal final paragraph (optional).',
    ],
  },
}
