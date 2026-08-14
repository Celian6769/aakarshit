const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

window.addEventListener("pointermove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});

function cursorLoop(){
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll("a,button,.interest-item").forEach(el => {
  el.addEventListener("mouseenter", () => {
    ring.style.width = "62px";
    ring.style.height = "62px";
    ring.style.borderColor = "#fff";
  });
  el.addEventListener("mouseleave", () => {
    ring.style.width = "42px";
    ring.style.height = "42px";
    ring.style.borderColor = "#888";
  });
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "Ⅲ  MUSIC / ON";
      musicToggle.classList.add("is-on");
      musicToggle.setAttribute("aria-pressed", "true");
    } catch {
      musicToggle.textContent = "Ⅲ  ADD AFTER-DARK.MP3";
    }
  } else {
    music.pause();
    musicToggle.textContent = "Ⅲ  MUSIC / OFF";
    musicToggle.classList.remove("is-on");
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

const sections = [...document.querySelectorAll(".section")];
const navLinks = [...document.querySelectorAll(".index a")];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.dataset.section === entry.target.id));
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => observer.observe(section));

document.querySelectorAll(".interest-item").forEach(item => {
  item.addEventListener("mousemove", e => {
    const r = item.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    item.style.transform = `translate(${x * 22}px, ${y * 5}px)`;
  });
  item.addEventListener("mouseleave", () => item.style.transform = "");
});

window.addEventListener("pointermove", e => {
  const x = e.clientX / window.innerWidth - .5;
  const y = e.clientY / window.innerHeight - .5;
  document.querySelector(".hero-orbit.orbit-one").style.transform = `rotate(-24deg) translate(${x * 10}px, ${y * 8}px)`;
  document.querySelector(".hero-orbit.orbit-two").style.transform = `rotate(-24deg) translate(${x * -15}px, ${y * -10}px)`;
  document.querySelector(".ribbon").style.transform = `rotate(${23 + x * 4}deg) skewY(-7deg) translate(${x * 12}px, ${y * 8}px)`;
});
