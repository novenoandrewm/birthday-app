// src/sections/ReflectionPledge/index.tsx

/**
 * Reflection & pledge section anchor (Part 2).
 * - Defines the scroll target for the "reflection-pledge" chapter used by navigation and active section tracking.
 * - The narrative text is provided via overlays/panels, so this section is intentionally minimal.
 */

import React from 'react'

const ReflectionPledge: React.FC = () => {
  return <section id="reflection-pledge" className="chapter" aria-label="Part 2" />
}

export default ReflectionPledge
