// src/config/sections.ts
export type Section = { id: string; label: string }

export const SECTIONS: Section[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'romantic-message', label: 'Part 1' },
  { id: 'reflection-pledge', label: 'Part 2' },
  { id: 'cake-finale', label: 'Closing' },
]
