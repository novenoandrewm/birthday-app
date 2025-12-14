// src/config/personalization.ts

/**
 * Personalization data used across the app (names, birthday, pronouns, and traits).
 * - Keep this as the single place to update recipient details.
 * - Values here are referenced by copy.ts and UI components.
 */

export type Pronouns = 'she/her' | 'he/him' | 'they/them'
export type ISODateString = `${number}-${number}-${number}` // expects "YYYY-MM-DD" shape

export interface PersonConfig {
  name: string
  nickname?: string
  birthday: ISODateString
  pronouns: Pronouns
  relationship: string
  specialTraits: readonly string[]
}

export const PERSON: PersonConfig = {
  name: 'Recipient Name',
  nickname: 'Your special nickname', // optional; you can remove this line if not needed
  birthday: '2025-12-31',
  pronouns: 'she/her',
  relationship: 'my favourite person in this universe',
  specialTraits: [
    'your patience when I overthink everything',
    'the way you listen seriously even to my silly stories',
    'how you keep trying, even when days are heavy',
  ],
}
