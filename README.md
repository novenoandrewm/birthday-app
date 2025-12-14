# 3D Birthday Card – Interactive Greeting Web App 🎂✨

This project is a personalised, interactive **3D birthday greeting** built with **React**, **Vite**, **TypeScript**, and **Three.js**. It renders a whimsical space‑themed scene featuring a rotating cake, balloons, glowing rings and a nebula backdrop. Users can scroll or click navigation buttons to move through the story.

## ✨ Features

### Interactive 3D experience
- **Dynamic camera transitions** – the camera smoothly moves between predefined positions for each chapter. As you scroll, it transitions from a wide shot to closer angles, with rotation and lighting tied to the scroll progress. Users who prefer reduced motion can opt out via their OS settings.
- **Rich scene contents** – the scene includes a star field, torus‑knot “galaxy”, halo rings, bokeh spheres and glowing effects. The centrepiece is a multi‑tier birthday cake with frosting, cream blobs, flowers and a figurine. A colourful balloons ring floats gently around the cake.
- **Post‑processing effects** – bloom, vignette and subtle noise are applied via a post‑processing pipeline to enhance the atmosphere. These effects respect the `prefers-reduced-motion` setting.

### Narrative structure and personalisation
- **Four chapters** – the story is divided into *Hero*, *Part 1*, *Part 2* and *Closing* sections. A HUD overlay displays the current chapter title and subtitle as you scroll.
- **Navigation buttons** – up/down buttons appear at the bottom right to jump between chapters. They lock while smooth scrolling to prevent rapid clicks and keep the scroll and UI in sync.
- **Personalisation** – the recipient’s name, nickname, pronouns, birthday and special traits can be customised. These values are used in the copy to render a tailored greeting.
- **Customisable copy** – default English text is provided for each chapter, but you can replace or translate it to suit your needs.

### Development and tooling
- **Modern tooling** – uses Vite for fast development and build times. ESLint and Prettier are configured (with a Tailwind plugin) to ensure consistent code style. Unit tests are set up with Vitest.
- **Accessibility considerations** – supports `prefers-reduced-motion` to disable heavy animations. Scroll navigation uses a marker aligned with the HUD offset to determine the active section, improving synchronisation between scroll and UI. Buttons include `aria-label`s for screen readers.
- **Netlify deployment ready** – a `netlify.toml` is provided with build commands, publish directory and a redirect rule to `index.html` for single‑page routing.

---

## 🛠 Tech stack

- React + TypeScript
- Vite
- Three.js via `@react-three/fiber`
- Helpers via `@react-three/drei`
- Post-processing via `@react-three/postprocessing` + `postprocessing`
- Netlify (static hosting)

---

## 🛠 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/novenoandrewm/birthday-app.git
   cd birthday-app
