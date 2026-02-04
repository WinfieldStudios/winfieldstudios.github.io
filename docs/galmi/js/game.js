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
      if (purchasable.name === 'upgrade-galmi' || purchasable.name === 'upgrade-pickaxe') {
        if (resource.count < cost.amount) {
          purchasable.button.classList.remove("enabled");
        }
      } else if (resource.count < cost.amount * globalPurchaseMultiplier) {
        purchasable.button.classList.remove("enabled");
      }
    }
  }
}

function purchaseExtract() {
  if (rocks.count >= extract.costs.rocks.amount * globalPurchaseMultiplier) {
    rocks.count -= extract.costs.rocks.amount * globalPurchaseMultiplier;

    /*
    let limestoneToGain = 0;
    let coalToGain = 0;
    let ironoreToGain = 0;
    let obsidianToGain = 0;
    let chromiumoreToGain = 0;
    let aluminumToGain = 0;

    let roll = Math.floor(Math.random() * 10000) + 1;
    if (globalPurchaseMultiplier <= 10000) {
      for (let i = 0; i < globalPurchaseMultiplier; i++) {
        switch (upgradeGalmi.level) {
          case 1:
            if (roll <= 5000) limestoneToGain += 1;
            else coalToGain += 1;
            break;
          case 2:
            console.log("hello");
            if (roll <= 5000) limestoneToGain += 1;
            else if (roll <= 9000) coalToGain += 1;
            else ironoreToGain += 1;
            console.log("hello");
            break;
          case 3:
            if (roll <= 5000) limestoneToGain += 1;
            else if (roll <= 9000) coalToGain += 1;
            else if (roll <= 9900) ironoreToGain += 1;
            else obsidianToGain += 1;
            break;
          case 4:
            if (roll <= 5000) limestoneToGain += 1;
            else if (roll <= 9000) coalToGain += 1;
            else if (roll <= 9900) ironoreToGain += 1;
            else if (roll <= 9990) obsidianToGain += 1;
            else chromiumoreToGain += 1;
            break;
          default:
            if (roll <= 5000) limestoneToGain += 1;
            else if (roll <= 9000) coalToGain += 1;
            else if (roll <= 9900) ironoreToGain += 1;
            else if (roll <= 9990) obsidianToGain += 1;
            else if (roll <= 9999) chromiumoreToGain += 1;
            else aluminumToGain += 1;
            break;
        }
        roll = Math.floor(Math.random() * 10000) + 1;
      }
      limestone.count += limestoneToGain;
      coal.count += coalToGain;
      ironore.count += ironoreToGain;
      obsidian.count += obsidianToGain;
      chromiumore.count += chromiumoreToGain;
      aluminum.count += aluminumToGain;
    } else {
      limestone.count += Math.floor(parseInt(0.5 * globalPurchaseMultiplier));
      coal.count += parseInt(0.4 * globalPurchaseMultiplier);
      ironore.count += parseInt(0.09 * globalPurchaseMultiplier);
      obsidian.count += parseInt(0.009 * globalPurchaseMultiplier);
      chromiumore.count += parseInt(0.0009 * globalPurchaseMultiplier);
      aluminum.count += parseInt(0.00009 * globalPurchaseMultiplier);
      
    }
      */
    if (globalPurchaseMultiplier === 1) {

      let roll = Math.floor(Math.random() * 10000) + 1;
      switch (upgradeGalmi.level) {
        case 1:
          if (roll <= 5000) limestone.count += 1;
          else coal.count += 1;
          break;
        case 2:
          if (roll <= 5000) limestone.count += 1;
          else if (roll <= 9000) coal.count += 1;
          else ironore.count += 1;
          break;
        case 3:
          if (roll <= 5000) limestone.count += 1;
          else if (roll <= 9000) coal.count += 1;
          else if (roll <= 9900) ironore.count += 1;
          else obsidian.count += 1;
          break;
        case 4:
          if (roll <= 5000) limestone.count += 1;
          else if (roll <= 9000) coal.count += 1;
          else if (roll <= 9900) ironore.count += 1;
          else if (roll <= 9990) obsidian.count += 1;
          else chromium.count += 1;
          break;
        default:
          if (roll <= 5000) limestone.count += 1;
          else if (roll <= 9000) coal.count += 1;
          else if (roll <= 9900) ironore.count += 1;
          else if (roll <= 9990) obsidian.count += 1;
          else if (roll <= 9999) chromium.count += 1;
          else aluminum.count += 1;
          break;
      }
    } else {
      switch (upgradeGalmi.level) {
        case 1:
          limestone.count += Math.floor((globalPurchaseMultiplier * 0.5) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          coal.count += Math.floor((globalPurchaseMultiplier * 0.5) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          break;
        case 2:
          limestone.count += Math.floor((globalPurchaseMultiplier * 0.5) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          coal.count += Math.floor((globalPurchaseMultiplier * 0.4) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          ironore.count += Math.floor((globalPurchaseMultiplier * 0.1) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.05) - (globalPurchaseMultiplier * 0.05) / 2));
          break;
        case 3:
          limestone.count += Math.floor((globalPurchaseMultiplier * 0.5) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          coal.count += Math.floor((globalPurchaseMultiplier * 0.4) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          ironore.count += Math.floor((globalPurchaseMultiplier * 0.1) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.05) - (globalPurchaseMultiplier * 0.05) / 2));
          obsidian.count += Math.floor((globalPurchaseMultiplier * 0.001) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.0005) - (globalPurchaseMultiplier * 0.0005) / 2));
          break;
        case 4:
          limestone.count += Math.floor((globalPurchaseMultiplier * 0.5) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          coal.count += Math.floor((globalPurchaseMultiplier * 0.4) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          ironore.count += Math.floor((globalPurchaseMultiplier * 0.1) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.05) - (globalPurchaseMultiplier * 0.05) / 2));
          obsidian.count += Math.max(0, Math.floor((globalPurchaseMultiplier * 0.001) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.0005) - (globalPurchaseMultiplier * 0.0005) / 2)));
          chromiumore.count += Math.max(0, Math.floor((globalPurchaseMultiplier * 0.000001) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.0000005) - (globalPurchaseMultiplier * 0.0000005) / 2)));
          break;
        default:
          limestone.count += Math.floor((globalPurchaseMultiplier * 0.5) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          coal.count += Math.floor((globalPurchaseMultiplier * 0.4) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1) / 2));
          ironore.count += Math.floor((globalPurchaseMultiplier * 0.1) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.05) - (globalPurchaseMultiplier * 0.05) / 2));
          obsidian.count += Math.max(0, Math.floor((globalPurchaseMultiplier * 0.001) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.0005) - (globalPurchaseMultiplier * 0.0005) / 2)));
          chromiumore.count += Math.max(0, Math.floor((globalPurchaseMultiplier * 0.000001) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.0000005) - (globalPurchaseMultiplier * 0.0000005) / 2)));
          aluminum.count += Math.max(0, Math.floor((globalPurchaseMultiplier * 1e-9) + Math.floor(Math.random() * (globalPurchaseMultiplier * 1e-9) - (globalPurchaseMultiplier * 1e-9) / 2)));
          break;
      }
    }

    extract.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseUpgradeGalmi() {
  if (rocks.count >= upgradeGalmi.costs.rocks.amount) {
    rocks.count -= upgradeGalmi.costs.rocks.amount;

    switch (upgradeGalmi.level) {
      case 1:
        ironore.count += 1;
        upgradeGalmi.costs.rocks.amount = 4444;
        upgradeGalmi.level += 1;
        break;
      case 2:
        obsidian.count += 1;
        upgradeGalmi.costs.rocks.amount = 1234567;
        upgradeGalmi.level += 1;
        break;
      case 3:
        chromiumore.count += 1;
        upgradeGalmi.costs.rocks.amount = 2147483647;
        upgradeGalmi.level += 1;
        break;
      case 4:
        aluminum.count += 1;
        upgradeGalmi.costs.rocks.amount = 0; // MAX LEVEL
        upgradeGalmi.level += 1;
        break;
      default:
        upgradeGalmi.button.classList.add("hidden");
        upgradeGalmi.costs.rocks.amount = 0; // MAX LEVEL;
    }

    checkPurchasables();

    let rockImage = document.querySelector('.rock-image');
    if (upgradeGalmi.level <= TOTAL_ROCK_IMAGES) rockImage.src = `/galmi/img/rocks/${upgradeGalmi.level}.png`;
    else rockImage.src = `/galmi/img/rocks/${TOTAL_ROCK_IMAGES}.png`;
  }
}

function updateUpgradeGalmi() {
  switch (upgradeGalmi.level) {
    case 1: upgradeGalmi.costs.rocks.amount = 64; break;
    case 2: upgradeGalmi.costs.rocks.amount = 4444; break;
    case 3: upgradeGalmi.costs.rocks.amount = 1234567; break;
    case 4: upgradeGalmi.costs.rocks.amount = 2147483647; break;
    default: 
      upgradeGalmi.button.classList.add("hidden");
      upgradeGalmi.costs.rocks.amount = 0; // MAX LEVEL
  }

  let rockImage = document.querySelector('.rock-image');
  if (upgradeGalmi.level <= TOTAL_ROCK_IMAGES) rockImage.src = `/galmi/img/rocks/${upgradeGalmi.level}.png`;
  else rockImage.src = `/galmi/img/rocks/${TOTAL_ROCK_IMAGES}.png`;
}

function purchaseUpgradePickaxe() {
  if (
    limestone.count >= upgradePickaxe.costs.limestone.amount && 
    steel.count >= upgradePickaxe.costs.steel.amount &&
    stainlesssteel.count >= upgradePickaxe.costs.stainlesssteel.amount &&
    chromium.count >= upgradePickaxe.costs.chromium.amount
  ) {
    if (upgradePickaxe.costs.limestone.amount > 0) limestone.count -= upgradePickaxe.costs.limestone.amount;
    if (upgradePickaxe.costs.steel.amount > 0) steel.count -= upgradePickaxe.costs.steel.amount;
    if (upgradePickaxe.costs.stainlesssteel.amount > 0) stainlesssteel.count -= upgradePickaxe.costs.stainlesssteel.amount;
    if (upgradePickaxe.costs.chromium.amount > 0) chromium.count -= upgradePickaxe.costs.chromium.amount;

    upgradePickaxe.level += 1;

    if (upgradePickaxe.level <= 5) {
      rocksPerClick = upgradePickaxe.level;
    } else if (upgradePickaxe.level <= 17) {
      rocksPerClick += Math.max(2, Math.floor(Math.log2(rocks.gross)));
    } else if (upgradePickaxe.level <= 65) {
      rocksPerClick += Math.max(4, Math.floor(Math.log2(rocks.gross))) * Math.max(8, Math.floor(Math.log2(rocks.gross)));
    } else {
      rocksPerClick += Math.floor(rocks.gross * 0.0001);
    }
    updateUpgradePickaxe();

    /*
    if (upgradePickaxe.level >= 5) {
      rocksPerClick += Math.floor(upgradePickaxe.level * 2 - 3) + (Math.floor(hire.level * 0.01));
      upgradePickaxe.costs.limestone.amount = Math.floor(rocksPerClick * (rocksPerClick * 0.5)) + 1;
      upgradePickaxe.costs.steel.amount = Math.floor(rocksPerClick / 4 * 2 - 3);
      document.querySelector('.upgrade-pickaxe-cost-steel-display').classList.remove("removed");
    } else {
      rocksPerClick += upgradePickaxe.level * 2 - 3;
    }
      */
    checkPurchasables();
  }
}

function updateUpgradePickaxe() {

  limestoneDisplay = document.querySelector('.upgrade-pickaxe-cost-limestone-display');
  steelDisplay = document.querySelector('.upgrade-pickaxe-cost-steel-display');
  stainlesssteelDisplay = document.querySelector('.upgrade-pickaxe-cost-stainlesssteel-display');
  chromiumDisplay = document.querySelector('.upgrade-pickaxe-cost-chromium-display');

  upgradePickaxe.costs.limestone.amount = 0; limestoneDisplay.classList.add("removed");
  upgradePickaxe.costs.steel.amount = 0; steelDisplay.classList.add("removed");
  upgradePickaxe.costs.stainlesssteel.amount = 0; stainlesssteelDisplay.classList.add("removed");
  upgradePickaxe.costs.chromium.amount = 0; chromiumDisplay.classList.add("removed");

  if (upgradePickaxe.level <= 4) {
    upgradePickaxe.costs.limestone.amount = 16;
    limestoneDisplay.classList.remove("removed");
  } else if (upgradePickaxe.level <= 16) {
    upgradePickaxe.costs.limestone.amount = 64;
    upgradePickaxe.costs.steel.amount = (upgradePickaxe.level - 3) * 2;
    limestoneDisplay.classList.remove("removed");
    steelDisplay.classList.remove("removed");
  } else if (upgradePickaxe.level <= 64) {
    upgradePickaxe.costs.steel.amount = 256;
    upgradePickaxe.costs.stainlesssteel.amount = (upgradePickaxe.level - 15) * 2;
    steelDisplay.classList.remove("removed");
    stainlesssteelDisplay.classList.remove("removed");
  } else {
    upgradePickaxe.costs.stainlesssteel.amount = 512;
    upgradePickaxe.costs.chromium.amount = (upgradePickaxe.level - 25) * 2;
    stainlesssteelDisplay.classList.remove("removed");
    chromiumDisplay.classList.remove("removed");
  }
  /*
  if (upgradePickaxe.level > 1) {
    blast.button.classList.remove("hidden");
  }
  if (upgradePickaxe.level >= 5) {
    upgradePickaxe.costs.limestone.amount = Math.floor(rocksPerClick * (rocksPerClick * 0.5)) + 1;
    upgradePickaxe.costs.steel.amount = Math.floor(rocksPerClick / 4 * 2 - 3);
  }
  */
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

    hire.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseReduce() {
  if (
    chromiumore.count >= reduce.costs.chromiumore.amount * globalPurchaseMultiplier &&
    coal.count >= reduce.costs.coal.amount * globalPurchaseMultiplier &&
    limestone.count >= reduce.costs.limestone.amount * globalPurchaseMultiplier
  ) {
    chromiumore.count -= reduce.costs.chromiumore.amount * globalPurchaseMultiplier;
    coal.count -= reduce.costs.coal.amount * globalPurchaseMultiplier;
    limestone.count -= reduce.costs.limestone.amount * globalPurchaseMultiplier;

    ferrochrome.count += globalPurchaseMultiplier;

    reduce.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseRefine() {
  if (
    ferrochrome.count >= refine.costs.ferrochrome.amount * globalPurchaseMultiplier &&
    steel.count >= refine.costs.steel.amount * globalPurchaseMultiplier
  ) {
    ferrochrome.count -= refine.costs.ferrochrome.amount * globalPurchaseMultiplier;
    steel.count -= refine.costs.steel.amount * globalPurchaseMultiplier;

    stainlesssteel.count += globalPurchaseMultiplier;

    refine.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseAerate() {
  if (
    limestone.count >= aerate.costs.limestone.amount * globalPurchaseMultiplier &&
    aluminum.count >= aerate.costs.aluminum.amount * globalPurchaseMultiplier
  ) {
    limestone.count -= aerate.costs.limestone.amount * globalPurchaseMultiplier;
    aluminum.count -= aerate.costs.aluminum.amount * globalPurchaseMultiplier;

    concrete.count += globalPurchaseMultiplier;

    aerate.level += globalPurchaseMultiplier;
    checkPurchasables(); 
  }
}

function purchaseProduce() {
  if (
    chromiumore.count >= produce.costs.chromiumore.amount * globalPurchaseMultiplier &&
    aluminum.count >= produce.costs.aluminum.amount * globalPurchaseMultiplier
  ) {
    chromiumore.count -= produce.costs.chromiumore.amount * globalPurchaseMultiplier;
    aluminum.count -= produce.costs.aluminum.amount * globalPurchaseMultiplier;

    chromium.count += globalPurchaseMultiplier;

    produce.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseUpgradeWorker() {
  if (
    obsidian.count >= upgradeWorker.costs.obsidian.amount * globalPurchaseMultiplier &&
    steel.count >= upgradeWorker.costs.steel.amount * globalPurchaseMultiplier
  ) {
    obsidian.count -= upgradeWorker.costs.obsidian.amount * globalPurchaseMultiplier;
    steel.count -= upgradeWorker.costs.steel.amount * globalPurchaseMultiplier;
    
    upgradeWorker.level += globalPurchaseMultiplier;
    checkPurchasables();
  }
}

function purchaseHousing() {
  console.log("Housing purchased");
  if (
    concrete.count >= housing.costs.concrete.amount * globalPurchaseMultiplier &&
    chromium.count >= housing.costs.chromium.amount * globalPurchaseMultiplier
  ) {
    concrete.count -= housing.costs.concrete.amount * globalPurchaseMultiplier;
    chromium.count -= housing.costs.chromium.amount * globalPurchaseMultiplier;

    // *= ((Math.log10(globalPurchaseMultiplier) / 3) + 1) * 1.001; // 1, 2, 3, 4, 5, 6 * 1.001

    housing.level += globalPurchaseMultiplier;

    checkPurchasables();
  }
}

// MULTIPLIER
function setGlobalPurchaseMultiplier(value) {
  globalPurchaseMultiplier = value;

  const display = document.querySelectorAll('.multiplier');
  for (const element of display) {
    switch (globalPurchaseMultiplier) {
      case 1: element.innerHTML = '1'; break;
      case 1000: element.innerHTML = '1k'; break;
      case 1000000: element.innerHTML = '1m'; break;
      case 1000000000: element.innerHTML = '1b'; break;
      case 1000000000000: element.innerHTML = '1t'; break;
      case 1000000000000000: element.innerHTML = '1q'; break;
      default: element.innerHTML = `x${globalPurchaseMultiplier}`; break;
    }
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
