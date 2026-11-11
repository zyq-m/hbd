const CONFIG = {
  birthdayMonthIndex: 10,
  birthdayDay: 12,
  age: 25,
  name: "Syazwani"
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const heartField = document.getElementById("hearts");
const heartSymbols = ["💗", "🤍", "✨", "💛", "🌸", "💖"];

function createHearts() {
  if (!heartField || prefersReducedMotion) return;
  const total = 18;
  for (let i = 0; i < total; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = heartSymbols[i % heartSymbols.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--size", `${0.8 + Math.random() * 0.9}rem`);
    heart.style.setProperty("--duration", `${13 + Math.random() * 12}s`);
    heart.style.setProperty("--delay", `${-Math.random() * 20}s`);
    heart.style.setProperty("--opacity", `${0.22 + Math.random() * 0.38}`);
    heart.style.setProperty("--spin", `${-60 + Math.random() * 120}deg`);
    heartField.appendChild(heart);
  }
}

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const confettiColors = ["#c9a227", "#e6c86a", "#d98b9a", "#b85c72", "#fff6e0", "#f2e4bd"];
let particles = [];
let animationFrame = null;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function sizeCanvas() {
  if (!canvas) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function burstConfetti(originX, originY, count) {
  if (!ctx || prefersReducedMotion) return;
  const amount = count || 90;
  for (let i = 0; i < amount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 9;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 5 + Math.random() * 7,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.35,
      shape: Math.random() > 0.4 ? "rect" : "circle",
      opacity: 1,
      gravity: 0.12 + Math.random() * 0.08
    });
  }
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(renderConfetti);
  }
}

function renderConfetti() {
  if (!ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((p) => {
    p.vy += p.gravity;
    p.vx *= 0.99;
    p.vy *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    if (p.y > window.innerHeight + 40) {
      p.opacity = 0;
    }
    if (p.opacity <= 0) return;
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
  particles = particles.filter((p) => p.opacity > 0 && p.y < window.innerHeight + 60);
  if (particles.length > 0) {
    animationFrame = requestAnimationFrame(renderConfetti);
  } else {
    animationFrame = null;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

if (canvas && ctx) {
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

document.querySelectorAll(".photo img").forEach((img) => {
  const markPlaceholder = () => {
    const figure = img.closest(".photo");
    if (figure) figure.classList.add("is-placeholder");
  };
  img.addEventListener("error", markPlaceholder);
  if (img.complete && img.naturalWidth === 0) {
    markPlaceholder();
  }
});

document.querySelectorAll(".reason-card").forEach((card) => {
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(flipped));
  });
});

const letterText = document.getElementById("letterText");
const letterCard = document.getElementById("letterCard");

function setupLetter() {
  if (!letterText) return;
  const fullText = letterText.textContent.trim();
  let typed = false;
  let intervalId = null;

  function finish() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    letterText.textContent = fullText;
    letterText.classList.add("typing-done");
    typed = true;
  }

  function startTyping() {
    if (typed) return;
    if (prefersReducedMotion) {
      finish();
      return;
    }
    letterText.textContent = "";
    let index = 0;
    intervalId = setInterval(() => {
      index += 1;
      letterText.textContent = fullText.slice(0, index);
      if (index >= fullText.length) {
        finish();
      }
    }, 18);
  }

  if (letterCard) {
    letterCard.addEventListener("click", finish);
  }

  if ("IntersectionObserver" in window) {
    const letterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTyping();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    letterObserver.observe(letterText);
  } else {
    startTyping();
  }
}

setupLetter();

const countdownCard = document.querySelector(".countdown-card");
const countdownGrid = document.getElementById("countdownGrid");
const countdownEyebrow = document.getElementById("countdownEyebrow");
const countdownTitle = document.getElementById("countdownTitle");
const countdownNote = document.getElementById("countdownNote");
const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMinutes = document.getElementById("cdMinutes");
const cdSeconds = document.getElementById("cdSeconds");

let celebrationTriggered = false;

function getBirthdayInfo() {
  const now = new Date();
  const isToday =
    now.getMonth() === CONFIG.birthdayMonthIndex && now.getDate() === CONFIG.birthdayDay;
  const year = now.getFullYear();
  let target = new Date(year, CONFIG.birthdayMonthIndex, CONFIG.birthdayDay, 0, 0, 0, 0);
  if (!isToday && target.getTime() < now.getTime()) {
    target = new Date(year + 1, CONFIG.birthdayMonthIndex, CONFIG.birthdayDay, 0, 0, 0, 0);
  }
  return { now, target, isToday };
}

function showCelebration() {
  if (!countdownCard) return;
  countdownCard.classList.add("celebrate");
  if (countdownEyebrow) countdownEyebrow.textContent = "Today is";
  if (countdownTitle) countdownTitle.textContent = `Your day, ${CONFIG.name}!`;
  if (countdownNote) countdownNote.textContent = `Happy ${CONFIG.age}th birthday, sayang. The whole day belongs to you. 🎉`;
  if (!celebrationTriggered) {
    celebrationTriggered = true;
    window.setTimeout(() => {
      burstConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 130);
    }, 350);
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  if (!countdownCard) return;
  const { now, target, isToday } = getBirthdayInfo();
  if (isToday) {
    showCelebration();
    return;
  }
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    showCelebration();
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (cdDays) cdDays.textContent = String(days);
  if (cdHours) cdHours.textContent = pad(hours);
  if (cdMinutes) cdMinutes.textContent = pad(minutes);
  if (cdSeconds) cdSeconds.textContent = pad(seconds);
}

if (countdownGrid) {
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

const cakeScene = document.getElementById("cakeScene");
const cakeSection = document.getElementById("cakeSection");
const cakeMessage = document.getElementById("cakeMessage");

function blowCandles() {
  if (!cakeScene) return;
  cakeScene.classList.add("blown");
  if (cakeSection) cakeSection.classList.add("blown");
  cakeScene.setAttribute("aria-label", "Candles blown out. Tap again to celebrate.");
  const rect = cakeScene.getBoundingClientRect();
  burstConfetti(rect.left + rect.width / 2, rect.top + rect.height * 0.25, 120);
  if (cakeMessage) {
    cakeMessage.textContent = `Happy ${CONFIG.age}th birthday, ${CONFIG.name}. Here's to 25 beautiful years. 🎂`;
  }
}

if (cakeScene) {
  cakeScene.addEventListener("click", blowCandles);
  cakeScene.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      blowCandles();
    }
  });
}

const audio = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

function setMusicState(playing) {
  if (!musicToggle) return;
  musicToggle.classList.toggle("playing", playing);
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicToggle.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
  musicToggle.title = playing ? "Pause music" : "Play music";
  if (musicIcon) musicIcon.textContent = playing ? "❚❚" : "▶";
}

function markMusicUnavailable() {
  if (!musicToggle) return;
  musicToggle.classList.add("unavailable");
  musicToggle.title = "Add the song file to play the music";
  musicToggle.setAttribute("aria-label", "Background music file is missing");
}

if (audio && musicToggle) {
  audio.addEventListener("play", () => setMusicState(true));
  audio.addEventListener("pause", () => setMusicState(false));
  audio.addEventListener("error", markMusicUnavailable);
  const source = audio.querySelector("source");
  if (source) source.addEventListener("error", markMusicUnavailable);

  function startMusic() {
    if (!audio.paused) return;
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  }

  function clearGestureListeners() {
    window.removeEventListener("pointerdown", onFirstGesture);
    window.removeEventListener("touchstart", onFirstGesture);
    window.removeEventListener("keydown", onFirstGesture);
    window.removeEventListener("scroll", onFirstGesture);
  }

  function onFirstGesture(event) {
    const target = event.target;
    if (target && target.nodeType && musicToggle.contains(target)) {
      clearGestureListeners();
      return;
    }
    clearGestureListeners();
    startMusic();
  }

  function enableGestureFallback() {
    window.addEventListener("pointerdown", onFirstGesture, { passive: true });
    window.addEventListener("touchstart", onFirstGesture, { passive: true });
    window.addEventListener("keydown", onFirstGesture);
    window.addEventListener("scroll", onFirstGesture, { passive: true });
  }

  musicToggle.addEventListener("click", () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(markMusicUnavailable);
    }
  });

  const autoplayAttempt = audio.play();
  if (autoplayAttempt && typeof autoplayAttempt.catch === "function") {
    autoplayAttempt.catch(enableGestureFallback);
  }
}

createHearts();

if (!prefersReducedMotion) {
  window.setTimeout(() => {
    burstConfetti(window.innerWidth / 2, window.innerHeight * 0.28, 70);
  }, 700);
}
