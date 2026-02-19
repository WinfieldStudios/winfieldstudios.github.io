// SON (Golden-style bonus for Galmi)

let sonEl = null;
let sonSpawnTimeout = null;
let sonDespawnTimeout = null;

window.sonBonusActive = false;
let sonBonusEndTimeout = null;

// track mouse position for cursor-follow glow
let mouseX = 0;
let mouseY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const SON = {
  minSpawnMs: 300000, // 5 minutes
  maxSpawnMs: 900000, // 15 minutes
  lifetimeMs: 12000,

  bonusDurationMs: 7000,
  clickMultiplier: 1000,
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scheduleNextSon() {
  clearTimeout(sonSpawnTimeout);
  const delay = randInt(SON.minSpawnMs, SON.maxSpawnMs);
  sonSpawnTimeout = setTimeout(spawnSon, delay);
}

function spawnSon() {
  if (sonEl) return;

  sonEl = document.createElement("img");
  sonEl.id = "son";
  const rockImage = document.querySelector('.rock-image');
  sonEl.src = rockImage ? rockImage.src : SON.imgSrc;

  sonEl.alt = "Son";
  sonEl.draggable = false;

  const pad = 60;
  const x = randInt(pad, Math.max(pad, window.innerWidth - pad - 56));
  sonEl.style.left = `${x}px`;

  sonEl.addEventListener("click", (event) => {
    // 1) Pulse explosion at click point
    const pulse = document.createElement("div");
    pulse.className = "cursor-glow";
    pulse.style.left = `${event.clientX - 40}px`;
    pulse.style.top = `${event.clientY - 40}px`;
    document.body.appendChild(pulse);
    setTimeout(() => pulse.remove(), 600);

    // 2) Cursor-follow glow (short duration)
    const followGlow = document.createElement("div");
    followGlow.className = "cursor-follow-glow";
    document.body.appendChild(followGlow);

    const followInterval = setInterval(() => {
      followGlow.style.left = `${mouseX}px`;
      followGlow.style.top = `${mouseY}px`;
    }, 10);

    setTimeout(() => {
      clearInterval(followInterval);
      followGlow.remove();
    }, SON.bonusDurationMs);

    despawnSon();
    activateSonBonus();
  });

  document.body.appendChild(sonEl);

  clearTimeout(sonDespawnTimeout);
  sonDespawnTimeout = setTimeout(() => {
    despawnSon();
    scheduleNextSon();
  }, SON.lifetimeMs);
}

function despawnSon() {
  if (!sonEl) return;
  sonEl.remove();
  sonEl = null;
  clearTimeout(sonDespawnTimeout);
}

function activateSonBonus() {
  clearTimeout(sonBonusEndTimeout);

  if (!window.sonBonusActive) {
    window.sonBonusActive = true;

    // Apply bonus
    rocksPerClick *= SON.clickMultiplier;

    // Bonus message particle
    if (document.getElementById("particle-layer")) {
      const msg = document.createElement("div");
      msg.textContent = `OVERTIME! x${SON.clickMultiplier} CLICKS`;
      msg.style.cssText = `color: var(--primary-color); position: fixed; top: 10vh; left: 50%; transform: translateX(-50%); font-size: 18px; font-family: "Pixelated"; pointer-events: none;`;
      document.getElementById("particle-layer").appendChild(msg);
      setTimeout(() => msg.remove(), SON.bonusDurationMs);
    }
  }

  sonBonusEndTimeout = setTimeout(() => {
    deactivateSonBonus();
  }, SON.bonusDurationMs);

  scheduleNextSon();
}

function deactivateSonBonus() {
  if (!window.sonBonusActive) return;
  window.sonBonusActive = false;

  rocksPerClick = Math.max(1, Math.floor(rocksPerClick / SON.clickMultiplier));
}

window.addEventListener("load", () => {
  scheduleNextSon();
});
