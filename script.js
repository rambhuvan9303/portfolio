/* ============================================================
   Portfolio interactions — v2

   1.  JS flag for CSS
   2.  Theme toggle (saved in localStorage)
   3.  Mobile menu
   4.  Reading progress bar + navbar shadow + back-to-top
   5.  Scroll-spy (highlights the current section in the navbar)
   6.  Rotating role text (typewriter effect)
   7.  Project category filtering
   8.  Scroll reveal (IntersectionObserver)
   9.  Animated skill bars
   10. Animated hero counters
   11. Profile photo fallback
   ============================================================ */

/* ---------- 1. JS FLAG ---------- */
// CSS uses html.js so that content is never hidden if JS fails to load.
const root = document.documentElement;
root.classList.add("js");

/* ---------- 2. THEME TOGGLE ---------- */
const themeBtn = document.getElementById("themeBtn");

// Use the saved choice if there is one, otherwise follow the OS setting.
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.setAttribute("data-theme", savedTheme || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ---------- 3. MOBILE MENU ---------- */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuBtn.classList.toggle("is-open", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close the menu after tapping a link on mobile.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* ---------- 4 + 5. SCROLL HANDLER ---------- */
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
const sections = [...document.querySelectorAll("main section[id]")];

function onScroll() {
  const y = window.scrollY;

  // Navbar border/shadow appears once the page is scrolled.
  nav.classList.toggle("is-scrolled", y > 8);

  // Progress bar width = how far down the page we are, as a percentage.
  const max = document.body.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

  // Back-to-top button appears after one screen of scrolling.
  toTop.classList.toggle("is-shown", y > window.innerHeight * 0.6);

  // Scroll-spy: the last section whose top has passed the navbar is active.
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 140) current = section;
  }
  navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("is-active"));
  const activeLink = navLinks.querySelector(`a[href="#${current.id}"]`);
  if (activeLink) activeLink.classList.add("is-active");
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- 6. ROTATING ROLE TEXT ---------- */
// Types a word out, pauses, deletes it, then moves to the next word.
const roles = [
  "AI & Data Science student",
  "Python learner",
  "problem solver",
  "future data analyst",
];
const typer = document.getElementById("typer");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  charIndex = deleting ? charIndex - 1 : charIndex + 1;
  typer.textContent = word.slice(0, charIndex);

  let delay = deleting ? 40 : 75;

  if (!deleting && charIndex === word.length) {
    delay = 1600; // pause on the full word
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 320;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ---------- 7. PROJECT FILTER ---------- */
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".proj");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const wanted = btn.dataset.filter;
    projects.forEach((card) => {
      const show = wanted === "all" || card.dataset.cat === wanted;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

/* ---------- 8 + 9. SCROLL REVEAL AND SKILL BARS ---------- */
// IntersectionObserver tells us when an element scrolls into view.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");

      // Fill any skill bars inside this element.
      entry.target.querySelectorAll(".bar b").forEach((fill) => {
        fill.style.width = `${fill.dataset.w}%`;
      });

      revealObserver.unobserve(entry.target); // animate once only
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Safety net: if the observer never fires (old browser, print, screenshot),
// reveal everything so no content can stay hidden.
setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  document.querySelectorAll(".bar b").forEach((fill) => {
    fill.style.width = `${fill.dataset.w}%`;
  });
}, 1200);

/* ---------- 10. HERO COUNTERS ---------- */
// Counts from 0 up to the data-target value using requestAnimationFrame.
function countUp(el, target, duration = 1100) {
  const startTime = performance.now();
  function frame(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out for a natural finish
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = target;
  }
  requestAnimationFrame(frame);
}
document.querySelectorAll(".count").forEach((el) => {
  countUp(el, Number(el.dataset.target));
});

/* ---------- 11. PROFILE PHOTO FALLBACK ---------- */
// If assets/profile.jpg is missing, show the initials circle instead.
const photo = document.getElementById("photo");
const photoFallback = document.getElementById("photoFallback");

function showFallback() {
  photo.classList.add("is-missing");
  photoFallback.classList.add("is-shown");
}
photo.addEventListener("error", showFallback);
if (photo.complete && photo.naturalWidth === 0) showFallback();

/* ---------- FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
