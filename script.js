// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// Contribution heatmap — deterministic pattern, no real user data
const heatmap = document.getElementById("heatmap");
if (heatmap) {
  const weeks = 14;
  const days = 7;
  const total = weeks * days;
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < total; i++) {
    const distanceFromEnd = total - i;
    const recentBoost = distanceFromEnd <= 9 ? 0.5 : 0;
    const r = rand() + recentBoost;
    let level = 0;
    if (r > 1.15) level = 4;
    else if (r > 0.9) level = 3;
    else if (r > 0.65) level = 2;
    else if (r > 0.4) level = 1;
    const cell = document.createElement("span");
    cell.className = `lvl lvl${level}`;
    heatmap.appendChild(cell);
  }
}

// Nav border on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();
