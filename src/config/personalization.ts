// src/config/personalization.ts
export type Pronouns = 'she/her' | 'he/him' | 'they/them'

export interface PersonConfig {
  name: string
  nickname: string
  birthday: string // "2025-12-31"
  pronouns: Pronouns
  relationship: string // misal: "my partner", "my best friend"
  specialTraits: string[] // hal-hal yang kamu suka dari dia
}

export const PERSON: PersonConfig = {
  name: 'Nama Lengkap Penerima',
  nickname: 'Panggilan khusus jika ada',
  birthday: '2025-12-31',
  pronouns: 'she/her',
  relationship: 'my favourite person in this universe',
  specialTraits: [
    'your patience when I overthink everything',
    'the way you listen seriously even to my silly stories',
    'how you keep trying, even when days are heavy',
  ],
}
