(function () {
  const emojiAssetVersion = "apple-emoji-safe-2";
  const root = document.documentElement;
  const modeToggle = document.querySelector("[data-mode-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const discoMoon = document.querySelector("[data-disco-moon]");
  const stars = document.querySelector("[data-stars]");
  const scene = document.querySelector("[data-disco-scene]");
  const emojiSources = {
    backpack: "assets/emoji/backpack.png",
    banjo: "assets/emoji/banjo.png",
    blossom: "assets/emoji/blossom.png",
    cherryBlossom: "assets/emoji/cherry_blossom.png",
    cow: "assets/emoji/cow.png",
    crescentMoon: "assets/emoji/crescent_moon.png",
    discoBall: "assets/emoji/disco_ball.png",
    fire: "assets/emoji/fire.png",
    herb: "assets/emoji/herb.png",
    headphones: "assets/emoji/headphones.png",
    manDancing: "assets/emoji/man_dancing.png",
    moonFace: "assets/emoji/moon_face.png",
    musicalNote: "assets/emoji/musical_note.png",
    musicalNotes: "assets/emoji/musical_notes.png",
    seedling: "assets/emoji/seedling.png",
    sparkles: "assets/emoji/sparkles.png",
    sun: "assets/emoji/sun.png",
    sunSymbol: "assets/emoji/sun_symbol.png",
    sunflower: "assets/emoji/sunflower.png",
    trumpet: "assets/emoji/trumpet.png",
    womanDancing: "assets/emoji/woman_dancing.png"
  };

  function createEmojiImage(name) {
    const img = document.createElement("img");
    img.className = "emoji-img";
    img.src = `${emojiSources[name]}?v=${emojiAssetVersion}`;
    img.alt = "";
    img.decoding = "async";
    img.setAttribute("aria-hidden", "true");
    return img;
  }

  function readStoredMode() {
    try {
      return localStorage.getItem("mooncow-mode");
    } catch {
      return null;
    }
  }

  function writeStoredMode(mode) {
    try {
      localStorage.setItem("mooncow-mode", mode);
    } catch {
      // Browsing contexts with blocked storage should still be able to switch modes.
    }
  }

  function preferredMode() {
    const stored = readStoredMode();
    if (stored === "day" || stored === "night") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
  }

  function setMode(mode) {
    const isNight = mode === "night";
    root.classList.toggle("night", isNight);
    root.classList.toggle("day", !isNight);
    if (modeToggle) {
      modeToggle.setAttribute("aria-label", isNight ? "Switch to day" : "Switch to night");
      modeToggle.setAttribute("aria-pressed", String(isNight));
      const knob = modeToggle.querySelector(".mode-toggle__knob");
      if (knob) knob.replaceChildren(createEmojiImage(isNight ? "moonFace" : "sun"));
    }
    renderScene();
  }

  function buildDiscoMoon() {
    if (!discoMoon || discoMoon.dataset.ready) return;
    discoMoon.dataset.ready = "true";
    const face = document.createElement("span");
    face.className = "moon-face";
    discoMoon.appendChild(face);
    const colors = ["#fff8c7", "#ffe99a", "#f6d66e", "#fffdf0", "#d9e6ff", "#f4cfd8", "#dbc4ff", "#f0f4ff"];
    const cols = 18;
    const rows = 18;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const centerX = (c + 0.5) / cols;
        const centerY = (r + 0.5) / rows;
        const dx = (centerX - 0.5) * 2;
        const dy = (centerY - 0.5) * 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0.88) continue;

        const rowCurve = Math.abs(r - (rows - 1) / 2) / rows;
        const colCurve = Math.abs(c - (cols - 1) / 2) / cols;
        const facet = document.createElement("span");
        facet.className = "moon-facet";
        facet.style.left = `${(c / cols) * 100 + 0.45 + rowCurve * 1.5}%`;
        facet.style.top = `${(r / rows) * 100 + 0.55}%`;
        facet.style.width = `${100 / cols - 0.9 - rowCurve * 3}%`;
        facet.style.height = `${100 / rows - 1.1}%`;
        facet.style.background = colors[(r * 5 + c * 3) % colors.length];
        const edgeFade = distance > 0.78 ? Math.max(0.58, (0.88 - distance) / 0.1) : 1;
        facet.style.opacity = String((0.5 + ((c + r) % 4) * 0.07 - colCurve * 0.08) * edgeFade);
        facet.style.animationDelay = `${-((c / cols) * 4.8 + (r % 4) * 0.12)}s`;
        face.appendChild(facet);
      }
    }

    for (let i = 0; i < 26; i += 1) {
      const sparkle = document.createElement("span");
      const angle = (i / 26) * Math.PI * 2;
      const radius = 72 + (i % 3) * 13;
      const size = 10 + (i % 4) * 4;
      sparkle.className = "moon-sparkle";
      sparkle.textContent = "✦";
      sparkle.style.left = `calc(50% + ${Math.cos(angle) * radius}px - ${size / 2}px)`;
      sparkle.style.top = `calc(50% + ${Math.sin(angle) * radius}px - ${size / 2}px)`;
      sparkle.style.fontSize = `${size}px`;
      sparkle.style.animationDelay = `${(i * 0.13) % 2}s`;
      discoMoon.appendChild(sparkle);
    }
  }

  function buildStars() {
    if (!stars || stars.dataset.ready) return;
    stars.dataset.ready = "true";
    for (let i = 0; i < 40; i += 1) {
      const star = document.createElement("span");
      let top = (i * 73) % 55 + 2;
      let left = (i * 157) % 96 + 1;
      if (left < 58 && top > 32 && top < 54) {
        top -= 12;
        left += 30;
      }
      star.className = "star";
      star.textContent = "✦";
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.fontSize = `${6 + (i % 4) * 3}px`;
      star.style.animationDelay = `${(i * 0.13) % 2}s`;
      stars.appendChild(star);
    }
  }

  function renderScene() {
    if (!scene) return;
    const isNight = root.classList.contains("night");
    const dayScene = [
      ["cow", 8, 12, 1.1],
      ["trumpet", 20, 19, 1.25],
      ["banjo", 31, 23, 1.15],
      ["manDancing", 14, 52, 1.2],
      ["cow", 25, 59, 1.05],
      ["cow", 36, 56, 1.08],
      ["womanDancing", 56, 43, 1.16],
      ["sunflower", 66, 39, 1.22],
      ["sunSymbol", 79, 45, 1.42],
      ["blossom", 52, 68, 1.2],
      ["herb", 63, 70, 1.24],
      ["cherryBlossom", 74, 69, 1.24]
    ];
    const nightScene = [
      ["cow", 8, 12, 1.08],
      ["trumpet", 20, 19, 1.18],
      ["banjo", 31, 23, 1.12],
      ["discoBall", 45, 16, 1.18],
      ["headphones", 57, 22, 1.12],
      ["musicalNotes", 69, 16, 1.05],
      ["crescentMoon", 82, 25, 1.2],
      ["manDancing", 17, 56, 1.22],
      ["womanDancing", 39, 51, 1.18],
      ["fire", 56, 67, 1.25],
      ["sparkles", 70, 63, 1.08],
      ["cow", 84, 58, 1.1]
    ];
    const emojis = isNight ? nightScene : dayScene;
    scene.textContent = "";
    emojis.forEach(([emojiName, left, top, scale], i) => {
      const actor = document.createElement("span");
      actor.className = `scene-actor ${["mc-bob", "mc-shimmy", "mc-bounce", "mc-drift", "mc-flicker"][i % 5]}`;
      actor.appendChild(createEmojiImage(emojiName));
      actor.style.left = `${left}%`;
      actor.style.top = `${top}%`;
      actor.style.setProperty("--scale", String(scale));
      actor.style.animationDelay = `${(i * 0.31) % 1.7}s`;
      scene.appendChild(actor);
    });
  }

  function closeMobileNav() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  function setupMobileNav() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.addEventListener("click", () => {
      const open = !mobileNav.classList.contains("is-open");
      mobileNav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) closeMobileNav();
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileNav();
    });
  }

  function setupMediaObserver() {
    const videos = Array.from(document.querySelectorAll("video"));
    if (!videos.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!(video instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) {
          const promise = video.play();
          if (promise && promise.catch) promise.catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.35 });
    videos.forEach((video) => observer.observe(video));
  }

  buildDiscoMoon();
  buildStars();
  setupMobileNav();
  setupMediaObserver();
  setMode(preferredMode());

  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      const next = root.classList.contains("night") ? "day" : "night";
      writeStoredMode(next);
      setMode(next);
    });
  }
})();
