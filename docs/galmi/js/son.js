// SON (Golden-style bonus for Galmi)

let powerupGoldenDocumentElement = null;
let powerupGoldenSpawnTimeout = null;
let powerupGoldenDespawnTimeout = null;
let originalRocksPerClick = 0;
let bonusRocksPerClick = 0;

window.isPowerupGoldenActive = false;
let powerupGoldenBonusEndTimeout = null;

// track mouse position for cursor-follow glow
let mouseX = 0;
let mouseY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const SON = {
  baseTimeUntilSpawnsMin: 300000, // 5 minutes
  baseTimeUntilSpawnsMax: 420000, // 7 minutes
  timeUntilElementDespawnsWhenFalling: 40000,

  basePowerupDuration: 7000,
  baseClickMultiplier: 10,
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scheduleNextSon() {
  clearTimeout(powerupGoldenSpawnTimeout);
  const delay = randInt(SON.baseTimeUntilSpawnsMin, SON.baseTimeUntilSpawnsMax);
  powerupGoldenSpawnTimeout = setTimeout(spawnSon, delay);
}

function spawnSon() {
  if (powerupGoldenDocumentElement) return;

  powerupGoldenDocumentElement = document.createElement("img");
  powerupGoldenDocumentElement.id = "son";
  const rockImage = document.querySelector('.rock-image');
  powerupGoldenDocumentElement.src = rockImage ? rockImage.src : SON.imgSrc;

  powerupGoldenDocumentElement.alt = "Son";
  powerupGoldenDocumentElement.draggable = false;

  const pad = 60;
  const x = randInt(pad, Math.max(pad, window.innerWidth - pad - 56));
  powerupGoldenDocumentElement.style.left = `${x}px`;

  powerupGoldenDocumentElement.addEventListener("click", (event) => {
    despawnSon();
    activateSonBonus();
  });

  document.body.appendChild(powerupGoldenDocumentElement);

  clearTimeout(powerupGoldenDespawnTimeout);
  powerupGoldenDespawnTimeout = setTimeout(() => {
    despawnSon();
    scheduleNextSon();
  }, SON.timeUntilElementDespawnsWhenFalling);
}

function despawnSon() {
  if (!powerupGoldenDocumentElement) return;
  powerupGoldenDocumentElement.remove();
  powerupGoldenDocumentElement = null;
  clearTimeout(powerupGoldenDespawnTimeout);
}

function activateSonBonus() {
  clearTimeout(powerupGoldenBonusEndTimeout);

  if (!window.isPowerupGoldenActive) {
    window.isPowerupGoldenActive = true;

    totalPowerupsGolden++;
    document.getElementById('stats-total-powerups-golden').innerHTML = totalPowerupsGolden;

    // Apply bonus
    originalRocksPerClick = rocksPerClick;
    rocksPerClick *= SON.baseClickMultiplier;
    bonusRocksPerClick = rocksPerClick - originalRocksPerClick;

    // make Galmi glow gold while bonus is active
    const rockImage = document.querySelector('.rock-image');
    if (rockImage) rockImage.classList.add('son-active');

    // Bonus message particle
    // if (document.getElementById("particle-layer")) {
    //   const msg = document.createElement("div");
    //   msg.textContent = `SON BLESSING ☀ x${SON.baseClickMultiplier} CLICKS`;
    //   msg.style.cssText = `color: var(--primary-color); position: fixed; top: 10vh; left: 50%; transform: translateX(-50%); font-size: 18px; font-family: "Pixelated"; pointer-events: none;`;
    //   document.getElementById("particle-layer").appendChild(msg);
    //   setTimeout(() => msg.remove(), SON.basePowerupDuration);
    // }
  }

  powerupGoldenBonusEndTimeout = setTimeout(() => {
    deactivateSonBonus();
  }, SON.basePowerupDuration);

  scheduleNextSon();
}

function deactivateSonBonus() {
  if (!window.isPowerupGoldenActive) return;
  window.isPowerupGoldenActive = false;

  rocksPerClick = Math.ceil(rocksPerClick - bonusRocksPerClick);

  //remove gold glow when bonus ends
  const rockImage = document.querySelector('.rock-image');
  if (rockImage) rockImage.classList.remove('son-active');
}

window.addEventListener("load", () => {
  scheduleNextSon();
});
