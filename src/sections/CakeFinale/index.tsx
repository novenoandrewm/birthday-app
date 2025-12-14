// src/sections/CakeFinale/index.tsx

/**
 * Finale / closing section anchor.
 * - Defines the scroll target for the "cake-finale" chapter (used by navigation and active section tracking).
 * - The visual content is mainly rendered by the global 3D scene and overlays, so this section stays minimal.
 */

import React from 'react'

const CakeFinale: React.FC = () => {
  return <section id="cake-finale" className="chapter" aria-label="Closing" />
}

export default CakeFinale
