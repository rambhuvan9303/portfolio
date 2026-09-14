/* ============================================================
   Portfolio interactions
   1. Dark / light theme toggle (saved in localStorage)
   2. Mobile navigation menu
   3. Scroll-spy: highlights the current section in the navbar
   4. Project category filtering
   5. Scroll reveal animation using IntersectionObserver
   6. Animated counters in the hero
   ============================================================ */

// Marks the page as JS-enabled so CSS can apply the reveal start state.
document.documentElement.classList.add("js");

/* ---------- 1. THEME TOGGLE ---------- */
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

// On load: use the saved choice, otherwise follow the OS setting.
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.setAttribute("data-theme", savedTheme || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* ---------- 2. MOBILE MENU ---------- */
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

/* ---------- 3. SCROLL-SPY + NAV SHADOW ---------- */
const nav = document.getElementById("nav");
const sections = [...document.querySelectorAll("main section[id]")];
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);

window.addEventListener("scroll", () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);

  // The section whose top has passed the navbar is the active one.
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 120) current = section;
  }
  navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("is-active"));
  const active = linkFor(current.id);
  if (active) active.classList.add("is-active");
});

/* ---------- 4. PROJECT FILTER ---------- */
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

/* ---------- 5. SCROLL REVEAL ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Safety net: if the observer never fires (old browser, print, screenshot),
// reveal everything so no content can stay hidden.
setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
}, 1000);

/* ---------- 6. HERO COUNTERS ---------- */
function countUp(el, target, duration = 900) {
  const startTime = performance.now();
  function frame(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    el.textContent = Math.round(target * progress);
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = target;
  }
  requestAnimationFrame(frame);
}
countUp(document.getElementById("statA"), 4);
countUp(document.getElementById("statB"), 6);

/* ---------- FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
