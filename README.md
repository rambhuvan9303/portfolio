# Rambhuvan Kushwaha — Portfolio Website

Personal portfolio website built for the Online Portfolio Website Competition,
Department of Computer Science & Engineering, AKS University.

## Tech Stack
- HTML5 (semantic sections)
- CSS3 (custom properties, Flexbox, CSS Grid, media queries)
- Vanilla JavaScript (no frameworks, no libraries)

## Features
- Fully responsive — desktop, tablet and mobile
- Dark / light theme toggle, saved in `localStorage`, defaults to the OS setting
- Scroll-spy navigation that highlights the current section
- Project filtering by category (Python / Web / Data)
- Scroll reveal animations using `IntersectionObserver`
- Animated counters in the hero section
- Hamburger menu on mobile
- Accessible: keyboard focus styles, ARIA labels, `prefers-reduced-motion` support

## File Structure
```
portfolio/
├── index.html   → structure and content
├── style.css    → design tokens, layout, components, responsive rules
├── script.js    → theme toggle, nav, filtering, reveal, counters
└── README.md
```

## Run Locally
Open `index.html` in any browser. No build step or installation required.

## BEFORE PRESENTING — edit these
Search the word `EDIT` in `index.html` and replace:
- `YOUR-USERNAME` → your real GitHub and LinkedIn usernames (4 places)
- Class 10 and Class 12 school names, boards, years, percentages
- Phone number
- Project `Live` and `Code` links
- LeetCode solved count
- Certificate name, or delete that card if you have none
