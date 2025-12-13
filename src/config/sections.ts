// src/config/sections.ts
export type SectionDef = {
  id: string
  label: string
}

export const SECTIONS: SectionDef[] = [
  { id: 'hero', label: 'Intro' },
  { id: 'romantic-message', label: 'Part 1' },
  { id: 'reflection-pledge', label: 'Part 2' },
  { id: 'cake-finale', label: 'Closing' },
]
