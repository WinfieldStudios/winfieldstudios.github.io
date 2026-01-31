// PURCHASABLES LOGIC
function checkPurchasables() {
  for (const purchasable of Object.values(purchasables)) {
    purchasable.button.classList.add("enabled");

    for (const cost of Object.values(purchasable.costs)) {
      const resource = resources[cost.name];
      if (!resource) {
        console.log("Unknown resource: ", cost.name);
        continue;
      }
      if (resource.count < cost.amount * globalPurchaseMultiplier) {
        purchasable.button.classList.remove("enabled");
      }
    }
  }
}

function purchaseExtract() {
  if (rocks.count >= extract.costs.rocks.amount * globalPurchaseMultiplier) {
    rocks.count -= extract.costs.rocks.amount * globalPurchaseMultiplier;

    let limestoneToGain = 0;
    let coalToGain = 0;
    let ironoreToGain = 0;

    let roll = Math.floor(Math.random() * 10) + 1;
    if (globalPurchaseMultiplier <= 10000) {
      for (let i = 0; i < globalPurchaseMultiplier; i++) {
        switch (upgradeGalmi.level) {
          case 1:
            if (roll <= 5) limestoneToGain += 1;
            else coalToGain += 1;
            break;
          default:
            if (roll <= 5) limestoneToGain += 1;
            else if (roll <= 8) coalToGain += 1;
            else ironoreToGain += 1;
            break;
        }
        roll = Math.floor(Math.random() * 10) + 1;
      }
      limestone.count += limestoneToGain;
      coal.count += coalToGain;
      ironore.count += ironoreToGain;
    } else {
      limestone.count += parseInt(0.6 * globalPurchaseMultiplier);
      coal.count += parseInt(0.3 * globalPurchaseMultiplier);
      ironore.count += parseInt(0.1 * globalPurchaseMultiplier);
    }

    extract.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseUpgradeGalmi() {
  for (let i = 0; i < globalPurchaseMultiplier; i++) {
    if (rocks.count >= upgradeGalmi.costs.rocks.amount) {
      rocks.count -= upgradeGalmi.costs.rocks.amount;

      switch (upgradeGalmi.level) {
        case 1:
          ironore.count += 1;
          upgradeGalmi.costs.rocks.amount = 2000;
          break;
        case 2:
          upgradeGalmi.costs.rocks.amount = 700000;
          break;
        case 3:
          upgradeGalmi.costs.rocks.amount = 2147483647;
          break;
        default:
          upgradeGalmi.costs.rocks.amount *= 400;
      }

      upgradeGalmi.level += 1;
      checkPurchasables();

      let rockImage = document.querySelector('.rock-image');
      if (upgradeGalmi.level <= TOTAL_ROCK_IMAGES) rockImage.src = `/galmi/img/rocks/${upgradeGalmi.level}.png`;
      else rockImage.src = `/galmi/img/rocks/${TOTAL_ROCK_IMAGES}.png`;
    }
  }
}

function updateUpgradeGalmi() {
  switch (upgradeGalmi.level) {
    case 1: upgradeGalmi.costs.rocks.amount = 67; break;
    case 2: upgradeGalmi.costs.rocks.amount = 2000; break;
    case 3: upgradeGalmi.costs.rocks.amount = 700000; break;
    case 4: upgradeGalmi.costs.rocks.amount = 2147483647; break;
    default: console.log("GALMI MAX LEVEL");
  }

  let rockImage = document.querySelector('.rock-image');
  if (upgradeGalmi.level <= TOTAL_ROCK_IMAGES) rockImage.src = `/galmi/img/rocks/${upgradeGalmi.level}.png`;
  else rockImage.src = `/galmi/img/rocks/${TOTAL_ROCK_IMAGES}.png`;
}

function purchaseUpgradePickaxe() {
  for (let i = 0; i < globalPurchaseMultiplier; i++) {
    if (limestone.count >= upgradePickaxe.costs.limestone.amount && steel.count >= upgradePickaxe.costs.steel.amount) {
      limestone.count -= upgradePickaxe.costs.limestone.amount;
      if (upgradePickaxe.costs.steel.amount > 0) steel.count -= upgradePickaxe.costs.steel.amount;

      blast.button.classList.remove("hidden");

      upgradePickaxe.level += 1;
      if (upgradePickaxe.level >= 4) {
        upgradePickaxe.costs.limestone.amount += 10;
        upgradePickaxe.costs.steel.amount += 1;
        rocksPerClick += 2;
      } else {
        rocksPerClick += 1;
      }
      checkPurchasables();
    }
  }
}

function updateUpgradePickaxe() {
  upgradePickaxe.costs.limestone.amount = 20;
  // NOTE: your original code had a bug (it checked updateUpgradePickaxe >= 4)
  if (upgradePickaxe.level >= 4) {
    upgradePickaxe.costs.limestone.amount += (upgradePickaxe.level - 3) * 10;
  }
}

function purchaseBlast() {
  if (
    coal.count >= blast.costs.coal.amount * globalPurchaseMultiplier &&
    pigiron.count >= blast.costs.pigiron.amount * globalPurchaseMultiplier
  ) {
    coal.count -= blast.costs.coal.amount * globalPurchaseMultiplier;
    pigiron.count -= blast.costs.pigiron.amount * globalPurchaseMultiplier;

    steel.count += globalPurchaseMultiplier;

    blast.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseSmelt() {
  if (
    ironore.count >= smelt.costs.ironore.amount * globalPurchaseMultiplier &&
    coal.count >= smelt.costs.coal.amount * globalPurchaseMultiplier &&
    limestone.count >= smelt.costs.limestone.amount * globalPurchaseMultiplier
  ) {
    ironore.count -= smelt.costs.ironore.amount * globalPurchaseMultiplier;
    coal.count -= smelt.costs.coal.amount * globalPurchaseMultiplier;
    limestone.count -= smelt.costs.limestone.amount * globalPurchaseMultiplier;

    pigiron.count += 2 * globalPurchaseMultiplier;

    smelt.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseHire() {
  if (
    limestone.count >= hire.costs.limestone.amount * globalPurchaseMultiplier &&
    pigiron.count >= hire.costs.pigiron.amount * globalPurchaseMultiplier
  ) {
    limestone.count -= hire.costs.limestone.amount * globalPurchaseMultiplier;
    pigiron.count -= hire.costs.pigiron.amount * globalPurchaseMultiplier;

    workers += globalPurchaseMultiplier;

    hire.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

// MULTIPLIER
function setGlobalPurchaseMultiplier(value) {
  globalPurchaseMultiplier = value;

  const display = document.querySelectorAll('.multiplier');
  for (const element of display) {
    element.innerHTML = globalPurchaseMultiplier;
  }

  document.getElementById(`option${globalPurchaseMultiplier}`).checked = true;
  checkPurchasables();
}

// DARK MODE
function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const targetTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", targetTheme);
  document.getElementById("dark-mode-toggle").innerText = targetTheme === "dark" ? "Light" : "Dark";

  darkMode = targetTheme === "dark";
}
