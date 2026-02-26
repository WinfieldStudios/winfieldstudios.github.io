// SON (Golden Power Up!)

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

// POWER UP OBJECT
// we call it "SON" because it's Galmi's son that is falling
const SON = {

  // spawn the power up every...
  baseTimeUntilSpawnsMin: 60000, // 60 to
  baseTimeUntilSpawnsMax: 90000, // 90 seconds.

  // Make the power up last for...
  basePowerupDuration: 5000, // 5 seconds.

  // This is the amount of time that the element exists for while falling...
  // ...it needs to just be long enough to fall past the bottom of the screen.
  timeUntilElementDespawnsWhenFalling: 40000,
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scheduleNextSon() {
  clearTimeout(powerupGoldenSpawnTimeout);
  let min = getPowerupGoldenSpawnTimeMin();
  let max = getPowerupGoldenSpawnTimeMax();
  const delay = randInt(min, max);
  document.getElementById('stats-total-powerups-golden').innerHTML = totalPowerupsGolden;
  document.getElementById('stats-powerups-golden-spawnrate').innerHTML = `~${Math.floor((Math.ceil((min + max) / 2000) + 30) / 60)}m`;
  powerupGoldenSpawnTimeout = setTimeout(spawnSon, delay);
}

function spawnSon() {
  if (powerupGoldenDocumentElement) return;

  powerupGoldenDocumentElement = document.createElement("img");
  powerupGoldenDocumentElement.id = "son";

  let sonSrc = "/galmi/img/rocks/son/1.png";

  switch (upgradeGalmi.level) {
    case 6:
    case 5:
      sonSrc = "/galmi/img/rocks/son/3.png";
      break;
    case 4:
      sonSrc = "/galmi/img/rocks/son/2.png";
      break;
    default:
      sonSrc = "/galmi/img/rocks/son/1.png";
      break;
  }
  powerupGoldenDocumentElement.src = sonSrc;

  powerupGoldenDocumentElement.alt = "Son";
  powerupGoldenDocumentElement.draggable = false;

  powerupGoldenDocumentElement.onerror = () => {
    despawnSon();
    scheduleNextSon();
  };

  const pad = 60;
  const x = randInt(pad, Math.max(pad, window.innerWidth - pad - 56));
  powerupGoldenDocumentElement.style.left = `${x}px`;

  powerupGoldenDocumentElement.addEventListener("click", (event) => {
    despawnSon();
    activateSonBonus();
    playClickGalmiSuper();
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

    // Apply bonus
    originalRocksPerClick = rocksPerClick;
    multiplier = getPowerupRocksPerClickMultiplier();
    rocksPerClick *= multiplier;
    bonusRocksPerClick = rocksPerClick - originalRocksPerClick;

    // make Galmi glow gold while bonus is active
    const rockImage = document.querySelector('.rock-image');
    if (rockImage) rockImage.classList.add('son-active');

    totalPowerupsGolden++;
    document.getElementById('stats-total-powerups-golden').innerHTML = totalPowerupsGolden;

    // Bonus message particle
    // if (document.getElementById("particle-layer")) {
    //   const msg = document.createElement("div");
    //   msg.textContent = `SON BLESSING ☀ x${SON.baseClickMultiplier} CLICKS`;
    //   msg.style.cssText = `color: var(--primary-color); position: fixed; top: 10vh; left: 50%; transform: translateX(-50%); font-size: 18px; font-family: "Pixelated"; pointer-events: none;`;
    //   document.getElementById("particle-layer").appendChild(msg);
    //   setTimeout(() => msg.remove(), SON.basePowerupDuration);
    // }
  }
  growthTalk(`x${multiplier}`, true);

  powerupGoldenBonusEndTimeout = setTimeout(() => {
    deactivateSonBonus();
  }, getPowerupGoldenDuration());

  scheduleNextSon();
}

function deactivateSonBonus() {
  if (!window.isPowerupGoldenActive) return;
  window.isPowerupGoldenActive = false;

  rocksPerClick = Math.ceil(rocksPerClick - bonusRocksPerClick);
  document.getElementById('stats-powerups-golden-multiplier').innerHTML = getPowerupRocksPerClickMultiplier();
  document.getElementById('stats-powerups-golden-duration').innerHTML = Math.floor(getPowerupGoldenDuration() / 1000);

  //remove gold glow when bonus ends
  const rockImage = document.querySelector('.rock-image');
  if (rockImage) rockImage.classList.remove('son-active');
}

window.addEventListener("load", () => {
  scheduleNextSon();
});

function getPowerupRocksPerClickMultiplier() {
  let powerupRocksPerClickMultiplier = 2;
  switch (upgradeGalmi.level) {
    case 6:
    case 5:
      powerupRocksPerClickMultiplier = Math.max(1, totalPowerupsGolden) * 100;
      break;
    case 4:
      powerupRocksPerClickMultiplier = Math.max(1, totalPowerupsGolden) * 10;
      break;
    case 3:
      powerupRocksPerClickMultiplier = Math.max(1, totalPowerupsGolden) * 2;
      break;
    case 2:
      powerupRocksPerClickMultiplier = (2 + totalPowerupsGolden);
      break;
    default:
      powerupRocksPerClickMultiplier = 2;
      break;
  }
  return powerupRocksPerClickMultiplier;
}

function getPowerupGoldenSpawnTimeMin() {
  return SON.baseTimeUntilSpawnsMin + ((upgradeGalmi.level + totalPowerupsGolden - 1) * 30000);
}

function getPowerupGoldenSpawnTimeMax() {
  return SON.baseTimeUntilSpawnsMax + ((upgradeGalmi.level + totalPowerupsGolden - 1) * 45000);
}

function getPowerupGoldenDuration() {
  return SON.basePowerupDuration + ((upgradeGalmi.level + totalPowerupsGolden - 1) * 1000);
}
