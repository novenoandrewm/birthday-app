// src/config/sections.ts

/**
 * Section registry (single source of truth) for the app’s chapters.
 * - Defines the ordered section IDs used for scroll navigation and active section tracking.
 * - Each id must match the corresponding <section id="..."> in the page components.
 */

export type Section = { id: string; label: string }

export const SECTIONS: Section[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'romantic-message', label: 'Part 1' },
  { id: 'reflection-pledge', label: 'Part 2' },
  { id: 'cake-finale', label: 'Closing' },
]
