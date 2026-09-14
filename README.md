# Rambhuvan Kushwaha — Portfolio Website

Personal portfolio website built for the **Online Portfolio Website Competition**, Department of Computer Science & Engineering, AKS University.

**Live site:** https://rambhuvan9303.github.io/portfolio/

## Built with

- **HTML5** — semantic structure, accessible landmarks
- **CSS3** — custom properties (design tokens), CSS Grid, Flexbox, keyframe animations
- **JavaScript (vanilla)** — no frameworks, no libraries

## Features

| Feature | How it works |
|---|---|
| Dark / light mode | `data-theme` on `<html>`, saved in `localStorage`, defaults to OS preference |
| Reading progress bar | Scroll position ÷ scrollable height, set as a width percentage |
| Scroll-spy navigation | Finds the last section whose top has passed the navbar |
| Typewriter role text | `setTimeout` loop that types and deletes characters |
| Scroll reveal animations | `IntersectionObserver` adds `.is-visible`, with a 1.2 s fallback |
| Animated skill bars | Bar widths fill from `data-w` when the card enters view |
| Animated counters | `requestAnimationFrame` with an ease-out curve |
| Project filtering | Compares button `data-filter` with card `data-cat` |
| Responsive layout | Breakpoints at 1000 px and 768 px, mobile-first nav drawer |
| Reduced motion | All animation disabled under `prefers-reduced-motion` |

## Structure

```
portfolio/
├── index.html      # all page content
├── style.css       # design tokens, layout, animations
├── script.js       # all interactions (commented)
└── assets/
    └── profile.jpg  # your photo (square, ~600x600)
```

## Sections

About Me · Education · Technical Skills · Projects · Certifications & Achievements · Internship / Training · GitHub & LinkedIn · Contact

## Run locally

Open `index.html` in any browser, or use the **Live Server** extension in VS Code.

---

© 2026 Rambhuvan Kushwaha
