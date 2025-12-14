// src/sections/RomanticMessage/index.tsx

/**
 * Romantic message section anchor (Part 1).
 * - Defines the scroll target for the "romantic-message" chapter used by navigation and active section tracking.
 * - The main narrative text is rendered via overlays/panels, so this section stays minimal.
 */

import React from 'react'

const RomanticMessage: React.FC = () => {
  return <section id="romantic-message" className="chapter" aria-label="Part 1" />
}

export default RomanticMessage
