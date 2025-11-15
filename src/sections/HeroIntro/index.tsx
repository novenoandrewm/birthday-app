import React from 'react'
import { PERSON } from '../../config/personalization'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

const HeroIntro: React.FC = () => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()

  const handleStart = () => {
    const target = document.getElementById('romantic-message')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero-intro"
      ref={ref}
      className={`section section-hero fade-in-up ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <p className="section-eyebrow">For {PERSON.nickname}</p>
      <h1 className="section-title">Happy Birthday, {PERSON.name} 🎂</h1>
      <p className="section-text">
        This is a small 3D birthday card I built just for you. No apps to
        install, no logins to remember — just you, this page, and a little
        moment that belongs to us.
      </p>

      <div className="hero-actions">
        <button type="button" className="btn-primary" onClick={handleStart}>
          Begin the birthday wish
        </button>
        <p className="hero-note">
          Or simply scroll down slowly — everything is meant to unfold step by
          step.
        </p>
      </div>
    </section>
  )
}

export default HeroIntro
