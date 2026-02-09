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
        // Change displayed cost to reflect multiplier
        cost.source.innerHTML = formatNumber(cost.amount * globalPurchaseMultiplier);
      } else {
        // Change displayed cost to reflect multiplier
        cost.source.innerHTML = formatNumber(cost.amount * globalPurchaseMultiplier);
      }
    }
  }
}

function purchaseExtract() {
  if (rocks.count >= extract.costs.rocks.amount * globalPurchaseMultiplier) {
    rocks.count -= extract.costs.rocks.amount * globalPurchaseMultiplier;

    limestoneToAdd = 0;
    coalToAdd = 0;
    ironoreToAdd = 0;
    obsidianToAdd = 0;
    chromiumoreToAdd = 0;
    aluminumToAdd = 0;

    if (globalPurchaseMultiplier === 1) {

      let roll = Math.floor(Math.random() * 10000) + 1;
      switch (upgradeGalmi.level) {
        case 1:
          if (roll <= 5000) limestoneToAdd += 1;
          else coalToAdd += 1;
          break;
        case 2:
          if (roll <= 5000) limestoneToAdd += 1;
          else if (roll <= 9000) coalToAdd += 1;
          else ironoreToAdd += 1;
          break;
        case 3:
          if (roll <= 5000) limestoneToAdd += 1;
          else if (roll <= 9000) coalToAdd += 1;
          else if (roll <= 9900) ironoreToAdd += 1;
          else obsidianToAdd += 1;
          break;
        case 4:
          if (roll <= 5000) limestoneToAdd += 1;
          else if (roll <= 9000) coalToAdd += 1;
          else if (roll <= 9900) ironoreToAdd += 1;
          else if (roll <= 9990) obsidianToAdd += 1;
          else chromiumToAdd += 1;
          break;
        default:
          if (roll <= 5000) limestoneToAdd += 1;
          else if (roll <= 9000) coalToAdd += 1;
          else if (roll <= 9900) ironoreToAdd += 1;
          else if (roll <= 9990) obsidianToAdd += 1;
          else if (roll <= 9999) chromiumToAdd += 1;
          else aluminumToAdd += 1;
          break;
      }
    } else {
      switch (upgradeGalmi.level) {
        case 5:
          aluminumToAdd += Math.max(0, Math.floor((globalPurchaseMultiplier * 1e-9) + Math.floor(Math.random() * (globalPurchaseMultiplier * 1e-9) - (globalPurchaseMultiplier * 1e-9 / 2))));
          aluminumToAdd += (Math.random() * globalPurchaseMultiplier) < (globalPurchaseMultiplier * 1e-8) ? 1 : 0;
        case 4:
          chromiumoreToAdd += Math.max(0, Math.floor((globalPurchaseMultiplier * 0.000001) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.0000005) - (globalPurchaseMultiplier * 0.0000005 / 2))));
          chromiumoreToAdd += (Math.random() * globalPurchaseMultiplier) < (globalPurchaseMultiplier * 0.00001) ? 1 : 0;
        case 3:
          obsidianToAdd += Math.max(0, Math.floor((globalPurchaseMultiplier * 0.001) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.0005) - (globalPurchaseMultiplier * 0.0005 / 2))));
          obsidianToAdd += (Math.random() * globalPurchaseMultiplier) < (globalPurchaseMultiplier * 0.01) ? 1 : 0;
        case 2:
          ironoreToAdd += Math.floor((globalPurchaseMultiplier * 0.1) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.05) - (globalPurchaseMultiplier * 0.05 / 2)));
        default:
          limestoneToAdd += Math.floor((globalPurchaseMultiplier * 0.5) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1 / 2)));
          coalToAdd += Math.floor((globalPurchaseMultiplier * 0.4) + Math.floor(Math.random() * (globalPurchaseMultiplier * 0.1) - (globalPurchaseMultiplier * 0.1 / 2)));
      }
    }

    limestone.count += limestoneToAdd;
    coal.count += coalToAdd;
    ironore.count += ironoreToAdd;
    obsidian.count += obsidianToAdd;
    chromiumore.count += chromiumoreToAdd;
    aluminum.count += aluminumToAdd;

    if (limestoneToAdd > 0) gainResourceParticle(limestone, limestoneToAdd);
    if (coalToAdd > 0) gainResourceParticle(coal, coalToAdd);
    if (ironoreToAdd > 0) gainResourceParticle(ironore, ironoreToAdd);
    if (obsidianToAdd > 0) gainResourceParticle(obsidian, obsidianToAdd);
    if (chromiumoreToAdd > 0) gainResourceParticle(chromiumore, chromiumoreToAdd);
    if (aluminumToAdd > 0) gainResourceParticle(aluminum, aluminumToAdd);


    extract.level += globalPurchaseMultiplier;
    checkPurchasables();

    document.querySelector('.purchased-total-extract').innerHTML = extract.level;
  }
}

function purchaseUpgradeGalmi() {

  nextBaseResourceIcon = document.querySelector('.next-base-resource');

  if (rocks.count >= upgradeGalmi.costs.rocks.amount) {
    rocks.count -= upgradeGalmi.costs.rocks.amount;

    switch (upgradeGalmi.level) {
      case 1:
        ironore.count += 1;
        gainResourceParticle(ironore, 1);
        nextBaseResourceIcon.src = "/galmi/img/icons/obsidian.png";
        upgradeGalmi.costs.rocks.amount = 4444;
        upgradeGalmi.level += 1;
        break;
      case 2:
        obsidian.count += 1;
        gainResourceParticle(obsidian, 1);
        nextBaseResourceIcon.src = "/galmi/img/icons/chromiumore.png";
        upgradeGalmi.costs.rocks.amount = 1000011;
        upgradeGalmi.level += 1;
        break;
      case 3:
        chromiumore.count += 1;
        gainResourceParticle(chromiumore, 1);
        nextBaseResourceIcon.src = "/galmi/img/icons/aluminum.png";
        upgradeGalmi.costs.rocks.amount = 2147483647;
        upgradeGalmi.level += 1;
        break;
      case 4:
        aluminum.count += 1;
        gainResourceParticle(aluminum, 1);
        upgradeGalmi.costs.rocks.amount = 0; // MAX LEVEL
        upgradeGalmi.level += 1;
        break;
      default:
        upgradeGalmi.button.classList.add("removed");
        upgradeGalmi.costs.rocks.amount = 0; // MAX LEVEL;
    }

    checkPurchasables();

    let rockImage = document.querySelector('.rock-image');
    if (upgradeGalmi.level < TOTAL_ROCK_IMAGES) {
      rockImage.src = `/galmi/img/rocks/${upgradeGalmi.level}.png`;
    } else {
      rockImage.src = `/galmi/img/rocks/${TOTAL_ROCK_IMAGES}.png`;
      upgradeGalmi.button.classList.add("removed");
    }
    updateExtractTooltip();
  }
}

function updateUpgradeGalmi() {

  nextBaseResourceIcon = document.querySelector('.next-base-resource');

  upgradeGalmi.button.classList.remove("removed");
  switch (upgradeGalmi.level) {
    case 1: upgradeGalmi.costs.rocks.amount = 64; nextBaseResourceIcon.src = "/galmi/img/icons/iron_ore.png"; break;
    case 2: upgradeGalmi.costs.rocks.amount = 4444; nextBaseResourceIcon.src = "/galmi/img/icons/obsidian.png"; break;
    case 3: upgradeGalmi.costs.rocks.amount = 1000011; nextBaseResourceIcon.src = "/galmi/img/icons/chromiumore.png"; break;
    case 4: upgradeGalmi.costs.rocks.amount = 2147483647; nextBaseResourceIcon.src = "/galmi/img/icons/aluminum.png"; break;
    default: 
      upgradeGalmi.button.classList.add("removed");
      upgradeGalmi.costs.rocks.amount = 0; // MAX LEVEL
  }

  let rockImage = document.querySelector('.rock-image');
  if (upgradeGalmi.level < TOTAL_ROCK_IMAGES) {
    rockImage.src = `/galmi/img/rocks/${upgradeGalmi.level}.png`;
  } else {
    rockImage.src = `/galmi/img/rocks/${TOTAL_ROCK_IMAGES}.png`;
    upgradeGalmi.button.classList.add("removed");
    console.log("MAX ROCK LEVEL REACHED");
  }

  // change extract display tooltip
  updateExtractTooltip();
}

function updateExtractTooltip() {

  coalExtractTooltipChanceDisplay = document.querySelector('.extract-tooltip-chance-coal');
  ironoreExtractTooltipChanceDisplay = document.querySelector('.extract-tooltip-chance-ironore');
  obsidianExtractTooltipChanceDisplay = document.querySelector('.extract-tooltip-chance-obsidian');
  chromiumoreExtractTooltipChanceDisplay = document.querySelector('.extract-tooltip-chance-chromiumore');
  aluminumExtractTooltipChanceDisplay = document.querySelector('.extract-tooltip-chance-aluminum');

  coalExtractTooltipIcon = document.querySelector('.extract-tooltip-coal-icon');
  ironoreExtractTooltipIcon = document.querySelector('.extract-tooltip-ironore-icon');
  obsidianExtractTooltipIcon = document.querySelector('.extract-tooltip-obsidian-icon');
  chromiumoreExtractTooltipIcon = document.querySelector('.extract-tooltip-chromiumore-icon');
  aluminumExtractTooltipIcon = document.querySelector('.extract-tooltip-aluminum-icon');

  coalExtractTooltipChance = "50%"; coalExtractTooltipChanceDisplay.classList.add("removed"); coalExtractTooltipIcon.classList.add("removed");
  ironoreExtractTooltipChance = "0%"; ironoreExtractTooltipChanceDisplay.classList.add("removed"); ironoreExtractTooltipIcon.classList.add("removed");
  obsidianExtractTooltipChance = "0%"; obsidianExtractTooltipChanceDisplay.classList.add("removed"); obsidianExtractTooltipIcon.classList.add("removed");
  chromiumoreExtractTooltipChance = "0%"; chromiumoreExtractTooltipChanceDisplay.classList.add("removed"); chromiumoreExtractTooltipIcon.classList.add("removed");
  aluminumExtractTooltipChance = "0%"; aluminumExtractTooltipChanceDisplay.classList.add("removed"); aluminumExtractTooltipIcon.classList.add("removed");

  switch (upgradeGalmi.level) {
    case 1:
      coalExtractTooltipChance = "50%"; coalExtractTooltipChanceDisplay.classList.remove("removed"); coalExtractTooltipIcon.classList.remove("removed");
      break;
    case 2:
      coalExtractTooltipChance = "40%"; coalExtractTooltipChanceDisplay.classList.remove("removed"); coalExtractTooltipIcon.classList.remove("removed");
      ironoreExtractTooltipChance = "10%"; ironoreExtractTooltipChanceDisplay.classList.remove("removed"); ironoreExtractTooltipIcon.classList.remove("removed");
      break;
    case 3:
      coalExtractTooltipChance = "40%"; coalExtractTooltipChanceDisplay.classList.remove("removed"); coalExtractTooltipIcon.classList.remove("removed");
      ironoreExtractTooltipChance = "9.99%"; ironoreExtractTooltipChanceDisplay.classList.remove("removed"); ironoreExtractTooltipIcon.classList.remove("removed");
      obsidianExtractTooltipChance = "0.001%"; obsidianExtractTooltipChanceDisplay.classList.remove("removed"); obsidianExtractTooltipIcon.classList.remove("removed");
      break;
    case 4:
      coalExtractTooltipChance = "40%"; coalExtractTooltipChanceDisplay.classList.remove("removed"); coalExtractTooltipIcon.classList.remove("removed");
      ironoreExtractTooltipChance = "9.99%"; ironoreExtractTooltipChanceDisplay.classList.remove("removed"); ironoreExtractTooltipIcon.classList.remove("removed");  
      obsidianExtractTooltipChance = "0.009%"; obsidianExtractTooltipChanceDisplay.classList.remove("removed"); obsidianExtractTooltipIcon.classList.remove("removed");
      chromiumoreExtractTooltipChance = "0.00001%"; chromiumoreExtractTooltipChanceDisplay.classList.remove("removed"); chromiumoreExtractTooltipIcon.classList.remove("removed");
      break;
    default:
      coalExtractTooltipChance = "40%"; coalExtractTooltipChanceDisplay.classList.remove("removed"); coalExtractTooltipIcon.classList.remove("removed");
      ironoreExtractTooltipChance = "9.99%"; ironoreExtractTooltipChanceDisplay.classList.remove("removed"); ironoreExtractTooltipIcon.classList.remove("removed");
      obsidianExtractTooltipChance = "0.009%"; obsidianExtractTooltipChanceDisplay.classList.remove("removed"); obsidianExtractTooltipIcon.classList.remove("removed");
      chromiumoreExtractTooltipChance = "0.000009%"; chromiumoreExtractTooltipChanceDisplay.classList.remove("removed"); chromiumoreExtractTooltipIcon.classList.remove("removed");
      aluminumExtractTooltipChance = "0.000000001%"; aluminumExtractTooltipChanceDisplay.classList.remove("removed"); aluminumExtractTooltipIcon.classList.remove("removed");
      break;
  }

  coalExtractTooltipChanceDisplay.innerHTML =  coalExtractTooltipChance;
  ironoreExtractTooltipChanceDisplay.innerHTML =  ironoreExtractTooltipChance;
  obsidianExtractTooltipChanceDisplay.innerHTML =  obsidianExtractTooltipChance;
  chromiumoreExtractTooltipChanceDisplay.innerHTML = chromiumoreExtractTooltipChance;
  aluminumExtractTooltipChanceDisplay.innerHTML = aluminumExtractTooltipChance;

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
    upgradePickaxe.costs.limestone.amount = ((upgradePickaxe.level - 1) * 3) + 11;
    limestoneDisplay.classList.remove("removed");
  } else if (upgradePickaxe.level <= 16) {
    upgradePickaxe.costs.limestone.amount = 512;
    upgradePickaxe.costs.steel.amount = (upgradePickaxe.level - 4) * 4;
    limestoneDisplay.classList.remove("removed");
    steelDisplay.classList.remove("removed");
  } else if (upgradePickaxe.level <= 64) {
    upgradePickaxe.costs.steel.amount = 1000;
    upgradePickaxe.costs.stainlesssteel.amount = Math.pow((upgradePickaxe.level - 16), 2);
    steelDisplay.classList.remove("removed");
    stainlesssteelDisplay.classList.remove("removed");
  } else {
    upgradePickaxe.costs.stainlesssteel.amount = 8192;
    upgradePickaxe.costs.chromium.amount = Math.pow(2, (upgradePickaxe.level - 64));
    stainlesssteelDisplay.classList.remove("removed");
    chromiumDisplay.classList.remove("removed");
  }

  document.querySelector('.purchased-total-pickaxe').innerHTML = upgradePickaxe.level - 1;
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
    gainResourceParticle(steel, globalPurchaseMultiplier);

    blast.level += globalPurchaseMultiplier;
    checkPurchasables();

    document.querySelector('.purchased-total-blast').innerHTML = blast.level - 1;
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

    pigiron.count += globalPurchaseMultiplier;
    gainResourceParticle(pigiron, globalPurchaseMultiplier);

    smelt.level += globalPurchaseMultiplier;
    checkPurchasables();

    document.querySelector('.purchased-total-smelt').innerHTML = smelt.level - 1;
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

    document.querySelector('.purchased-total-workers').innerHTML = hire.level - 1;
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
    gainResourceParticle(ferrochrome, globalPurchaseMultiplier);

    reduce.level += globalPurchaseMultiplier;
    checkPurchasables();

    document.querySelector('.purchased-total-reduce').innerHTML = reduce.level - 1;
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
    gainResourceParticle(stainlesssteel, globalPurchaseMultiplier);

    refine.level += globalPurchaseMultiplier;
    checkPurchasables();

    document.querySelector('.purchased-total-refine').innerHTML = refine.level - 1;
  }
}

function purchaseAerate() {
  if (
    limestone.count >= aerate.costs.limestone.amount * globalPurchaseMultiplier &&
    aluminum.count >= aerate.costs.aluminum.amount * globalPurchaseMultiplier &&
    stainlesssteel.count >= aerate.costs.stainlesssteel.amount * globalPurchaseMultiplier
  ) {
    limestone.count -= aerate.costs.limestone.amount * globalPurchaseMultiplier;
    aluminum.count -= aerate.costs.aluminum.amount * globalPurchaseMultiplier;
    stainlesssteel.count -= aerate.costs.stainlesssteel.amount * globalPurchaseMultiplier;

    concrete.count += globalPurchaseMultiplier;
    gainResourceParticle(concrete, globalPurchaseMultiplier);

    aerate.level += globalPurchaseMultiplier;
    checkPurchasables(); 

    document.querySelector('.purchased-total-aerate').innerHTML = aerate.level - 1;
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
    gainResourceParticle(chromium, globalPurchaseMultiplier);

    produce.level += globalPurchaseMultiplier;
    checkPurchasables();

    document.querySelector('.purchased-total-produce').innerHTML = produce.level - 1;
  }
}

function purchaseUpgradeWorker() {
  console.log(upgradeWorker.costs);
  if (
    obsidian.count >= upgradeWorker.costs.obsidian.amount * globalPurchaseMultiplier &&
    steel.count >= upgradeWorker.costs.steel.amount * globalPurchaseMultiplier
  ) {
    obsidian.count -= upgradeWorker.costs.obsidian.amount * globalPurchaseMultiplier;
    steel.count -= upgradeWorker.costs.steel.amount * globalPurchaseMultiplier;
    
    upgradeWorker.level += globalPurchaseMultiplier;
    checkPurchasables();

    document.querySelector('.purchased-total-promoted').innerHTML = upgradeWorker.level - 1;

  }
}

function purchaseHousing() {
  
  if (
    concrete.count >= housing.costs.concrete.amount * globalPurchaseMultiplier &&
    chromium.count >= housing.costs.chromium.amount * globalPurchaseMultiplier &&
    obsidian.count >= housing.costs.obsidian.amount * globalPurchaseMultiplier
  ) {
    concrete.count -= housing.costs.concrete.amount * globalPurchaseMultiplier;
    chromium.count -= housing.costs.chromium.amount * globalPurchaseMultiplier;
    obsidian.count -= housing.costs.obsidian.amount * globalPurchaseMultiplier;

    // *= ((Math.log10(globalPurchaseMultiplier) / 3) + 1) * 1.001; // 1, 2, 3, 4, 5, 6 * 1.001

    housing.level += globalPurchaseMultiplier;

    checkPurchasables();

     document.querySelector('.purchased-total-housing').innerHTML = housing.level - 1;

  }
}