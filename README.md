# Romantic Birthday Surprise Web App

This project is a **personalized birthday website** built with **React**, **Vite** and **TypeScript**. It delivers a heartfelt experience: greeting the recipient, sharing a personal letter, reminiscing about shared moments and culminating in an interactive finale. The site is designed to be easily personalised via query parameters and to respect accessibility guidelines around motion and contrast.

## 🎂 Features

- **Personalised flow:** The recipient's nickname (and optionally their name) can be passed in the query string. The site uses a PersonalizationContext and a custom useBirthdayParams hook to read ?nickname= or ?name= from the URL so the greeting, letter and closing messages address the person by name.

- **Four‑page narrative:**
- **Greeting page** introduces the experience with a short message and a friendly call‑to‑action button.
- **Birthday letter page** contains a heartfelt message. The copy can be edited in src/pages/RomanticMessagePage.tsx and supports multiline paragraphs.

- **Memories page** hints at shared memories or photos; it's a placeholder that can be filled with images or stories.

- **Finale page** presents a large, animated birthday cake. The user is prompted to "blow" the candles, which triggers confetti and fireworks. Music can auto‑play on this page and can be paused if needed.

- **Smooth transitions:** Pages are animated with [Framer Motion](https://www.framer.com/motion/). Routing is handled by React Router and wrapped in &lt;AnimatePresence&gt; so that old pages fade out while new pages fade in. A custom hook usePrefersReducedMotion checks the user's operating system preferences; if they prefer reduced motion, we shorten or remove animations.

- **Interactive finale:** The three‑tier cake, balloons and flower garland are drawn with CSS and animated. When the user clicks the cake, candle flames animate off and a celebratory message appears. Confetti and fireworks effects are triggered with separate components (ConfettiEffect and FireworksEffect).

- **Music control:** The MusicControl component loads a birthday song from public/audio/happy-birthday.mp3 and can auto‑play on the finale page. Autoplay is attempted only after the component mounts; if the browser blocks it, the user can manually play the song.

- **Accessibility focus:** We implement a skip‑to‑content link, semantic headings and reasonable focus management. We also pay attention to contrast and motion guidelines (see "Accessibility & design guidelines" below).


## 🧭 Usage & personalisation

- **Clone the repository** (or download the ZIP) and install dependencies:

npm install

2\. **Start the dev server**:

npm run dev

Vite will serve the project at <http://localhost:5173>. You can open it in a browser and see live reloads whenever you edit source files.

- **Add personalisation** by appending query parameters. The app reads the following parameters:

| Parameter | Purpose |
| --- | --- |
| nickname | The recipient's nickname (e.g. Feli) |
| name | Alternative parameter for name |
| from | The sender's name (optional) |

Examples:

- <http://localhost:5173/?nickname=Feli> → the greeting becomes _Hi, Sarah 💕_.
- <http://localhost:5173/?name=Sarah&from=John> → fallback to name if nickname is not provided; the closing message can mention the sender.
- **Build for production** with npm run build. This outputs a dist/ folder containing static files. When deploying to Netlify (or any static host), include a \_redirects file in public/ with /\* /index.html 200 to ensure client‑side routing works. You can drag‑and‑drop the dist directory onto Netlify's deploy UI.

## 🗂 Directory overview

src/  
├─ assets/ # Global styles, audio and image files  
│ ├─ styles/ # globals.css, theme variables, cake.css  
│ └─ audio/ # Music file(s) for the finale  
├─ components/  
│ ├─ layout/ # PageShell, Header, Footer, skip link  
│ ├─ ui/ # ConfettiEffect, FireworksEffect, BirthdayCakeAnimation, MusicControl, PrimaryButton  
│ └─ a11y/ # SkipToContentLink component  
├─ context/ # PersonalizationContext for sharing name and fromName  
├─ hooks/ # Custom hooks (useBirthdayParams, usePrefersReducedMotion, useAudioPlayer)  
├─ pages/ # GreetingPage, RomanticMessagePage, MemoriesPage, FinalePage  
├─ router/ # AppRouter with AnimatePresence for page transitions  
├─ main.tsx # Entry point mounting React app  
└─ App.tsx # App component wiring provider, skip link and router

## ♿ Accessibility & design guidelines

We aim to deliver a beautiful yet accessible experience. The design draws from [WCAG 2.1](https://www.w3.org/TR/WCAG21/) guidelines:

- **Contrast ratio:** The WCAG recommends a minimum contrast ratio of **4.5:1 for normal text** and **3:1 for large text**. These requirements help people with low vision or colour vision deficiency read the content [\[1\]](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#:~:text=The%20visual%20presentation%20of%20text,5%3A1%2C%20except%20for%20the%20following). Our theme uses dark backgrounds with bright accent colours to meet these ratios. Large titles use gradient text, but there is always sufficient contrast between text and backgrounds.

- **Reduced motion:** Some users experience nausea or dizziness from motion. According to WCAG Success Criterion 2.3.3, animations triggered by user interaction should be avoidable unless they are essential to the function; unnecessary animations should be disabled or have a user preference to reduce motion[\[2\]](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html#:~:text=Motion%20animation%20%20triggered%20by,or%20the%20information%20being%20conveyed). We address this by:

- Using a usePrefersReducedMotion hook that checks the prefers-reduced-motion media query. If a user prefers reduced motion, page transitions move less or are shortened, and confetti/fireworks are not triggered automatically.

- Providing a play/pause control for the birthday song, rather than auto‑playing audio without user input. If autoplay fails due to browser policies, the component gracefully falls back to manual play.

- Designing micro‑interactions to be gentle; confetti and fireworks have modest durations and can be triggered by the user. The interactive cake uses subtle bounce animations that respect motion preferences.

- **Keyboard & focus:** Each page uses semantic elements (&lt;header&gt;, &lt;main&gt;, &lt;section&gt;, &lt;footer&gt;) and includes a skip‑to‑content link so keyboard users can bypass navigation. Buttons and links have visible focus styles. On the finale page, the cake element is focusable and clickable, and the instruction text appears only after a brief delay.

By following these guidelines, the app provides a romantic and delightful experience without excluding users who need high contrast or reduced motion. The combination of bright accent colours, elegant typography and handcrafted animations ensures the site feels both handcrafted and accessible.

## 🚧 Future improvements

- **Add real memories:** Replace the placeholder text on the memories page with photos, quotes or videos. Use local images or upload to a CDN; update the layout to create a scrollable gallery.

- **Enhanced message customization:** Expose more query parameters (e.g. letter=) so non‑technical senders can customise the letter content without editing code.

- **Multilingual support:** Add translation strings so senders can write messages in languages other than English.

- **Automated tests:** Use React Testing Library to create unit tests for each page and Cypress for end‑to‑end tests that click through the entire flow.

## 💌 Licence
This project is for educational and personal use. Feel free to fork it, personalise the content and share it privately. If you plan to publish your own derivative version, credit the original author.