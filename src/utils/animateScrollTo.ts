/**
 * Smoothly scrolls the window to a target Y position with an ease-in-out animation.
 * - Respects prefers-reduced-motion and falls back to instant scroll when motion is reduced or duration is invalid.
 * - Returns a Promise that resolves when the animation completes (useful for syncing navigation state).
 */

// src/utils/animateScrollTo.ts
type Options = {
  duration?: number
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function animateScrollTo(targetY: number, opts: Options = {}) {
  const { duration = 1100 } = opts

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const startY = window.scrollY
  const delta = targetY - startY

  if (reduceMotion || duration <= 0 || Math.abs(delta) < 1) {
    window.scrollTo(0, targetY)
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(1, elapsed / duration)
      const eased = easeInOutCubic(p)

      window.scrollTo(0, startY + delta * eased)

      if (p < 1) requestAnimationFrame(tick)
      else resolve()
    }

    requestAnimationFrame(tick)
  })
}
