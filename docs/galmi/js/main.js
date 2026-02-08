// TIME LOOP
setInterval(() => {
  rocksPerSecond = hire.level - 1;
  if (rocksPerSecond > 0) {
    rocks.count += rocksPerSecond;
    checkPurchasables();
    gainResourceParticle(rocks, rocksPerSecond, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
  }
  baseResourcesPerSecond = upgradeWorker.level - 1;
  if (baseResourcesPerSecond > 0) {

    aluminumToAdd = 0;
    chromiumoreToAdd = 0;
    obsidianToAdd = 0;
    ironoreToAdd = 0;
    limestoneToAdd = 0;
    coalToAdd = 0;

    switch (upgradeGalmi.level) {
      case 5:
        aluminumToAdd += Math.max(0, Math.floor((baseResourcesPerSecond * 1e-9 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 1e-9) - (baseResourcesPerSecond * 1e-9 / 2))));
      case 4:
        chromiumoreToAdd += Math.max(0, Math.floor((baseResourcesPerSecond * 0.000001 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.0000005) - (baseResourcesPerSecond * 0.0000005 / 2))));
      case 3:
        obsidianToAdd += Math.max(0, Math.floor((baseResourcesPerSecond * 0.001 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.0005) - (baseResourcesPerSecond * 0.0005 / 2))));
      case 2:
        ironoreToAdd += Math.max(0, Math.floor((baseResourcesPerSecond * 0.1 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.05) - (baseResourcesPerSecond * 0.05 / 2))));
      default:
        limestoneToAdd += Math.max(0, Math.floor((baseResourcesPerSecond * 0.5 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.1) - (baseResourcesPerSecond * 0.1 / 2))));
        coalToAdd += Math.max(0, Math.floor((baseResourcesPerSecond * 0.4 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.1) - (baseResourcesPerSecond * 0.1 / 2))));
    }

    aluminum.count += aluminumToAdd;
    chromiumore.count += chromiumoreToAdd;
    obsidian.count += obsidianToAdd;
    ironore.count += ironoreToAdd;
    limestone.count += limestoneToAdd;
    coal.count += coalToAdd;

    if (aluminumToAdd > 0) gainResourceParticle(aluminum, aluminumToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (chromiumoreToAdd > 0) gainResourceParticle(chromiumore, chromiumoreToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (obsidianToAdd > 0) gainResourceParticle(obsidian, obsidianToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (ironoreToAdd > 0) gainResourceParticle(ironore, ironoreToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (limestoneToAdd > 0) gainResourceParticle(limestone, limestoneToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (coalToAdd > 0) gainResourceParticle(coal, coalToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
  
  resourcesPerSecond = housing.level - 1;
  if (resourcesPerSecond > 0) {

      pigironToAdd = 0;
      steelToAdd = 0;
      ferrochromeToAdd = 0;
      stainlesssteelToAdd = 0;
      concreteToAdd = 0;
      chromiumToAdd = 0;

      pigironToAdd += Math.max(0, Math.floor((resourcesPerSecond * 0.5 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.1) - (resourcesPerSecond * 0.1 / 2))));
      steelToAdd += Math.max(0, Math.floor((resourcesPerSecond * 0.25 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.08) - (resourcesPerSecond * 0.08 / 2))));
      ferrochromeToAdd += Math.max(0, Math.floor((resourcesPerSecond * 0.2 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.075) - (resourcesPerSecond * 0.075 / 2))));
      stainlesssteelToAdd += Math.max(0, Math.floor((resourcesPerSecond * 0.1 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.05) - (resourcesPerSecond * 0.05 / 2))));
      concreteToAdd += Math.max(0, Math.floor((resourcesPerSecond * 0.001 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.0005) - (resourcesPerSecond * 0.0005 / 2))));
      chromiumToAdd += Math.max(0, Math.floor((resourcesPerSecond * 0.0005 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.00025) - (resourcesPerSecond * 0.00025 / 2))));

    }
    
    pigiron.count += pigironToAdd;
    steel.count += steelToAdd;
    ferrochrome.count += ferrochromeToAdd;
    stainlesssteel.count += stainlesssteelToAdd;
    concrete.count += concreteToAdd;
    chromium.count += chromiumToAdd;

    if (pigironToAdd > 0) gainResourceParticle(pigiron, pigironToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (steelToAdd > 0) gainResourceParticle(steel, steelToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (ferrochromeToAdd > 0) gainResourceParticle(ferrochrome, ferrochromeToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (stainlesssteelToAdd > 0) gainResourceParticle(stainlesssteel, stainlesssteelToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (concreteToAdd > 0) gainResourceParticle(concrete, concreteToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);
    if (chromiumToAdd > 0) gainResourceParticle(chromium, chromiumToAdd, true, PASSIVE_PARTICLE_FONT_SIZE, PASSIVE_PARTICLE_RANGE);

    checkPurchasables();
  }
}, 1000);

// AUTO SAVE LOOP
setInterval(() => {
  save('AUTO-SAVE...');

}, 300000); // Every 5 minutes

// MULTIPLIER
function setGlobalPurchaseMultiplier(value) {
  globalPurchaseMultiplier = value;

  const display = document.querySelectorAll('.multiplier');
  for (const element of display) {
    switch (globalPurchaseMultiplier) {
      case 1: element.innerHTML = '1'; break;
      case 100: element.innerHTML = '100'; break;
      case 10000: element.innerHTML = '10K'; break;
      case 1000000: element.innerHTML = '1M'; break;
      case 1000000000: element.innerHTML = '1B'; break;
      case 1000000000000: element.innerHTML = '1T'; break;
      case 1000000000000000: element.innerHTML = '1Q'; break;
      default: element.innerHTML = `${globalPurchaseMultiplier}`; break;
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
  document.getElementById("dark-mode-toggle").innerText = targetTheme === "dark" ? "DARK" : "LIGHT";

  darkMode = targetTheme === "dark";
}

// TOGGLE SCIENTIFIC NOTATION
function toggleScientificNotation() {
  showingScientificNotation = !showingScientificNotation;
  const toggle = document.getElementById("scientific-notation-toggle");
  toggle.innerText = showingScientificNotation ? "SCIENTIFIC" : "ABBREVIATED";
  checkPurchasables();
  for (const resource of Object.values(resources)) {
    const span = resource.displayContainer.querySelector('.resource-count');
    if (span) {
      span.innerHTML = formatNumber(resource.count);
    }
  }
}

// FORMAT NUMBERS FOR DISPLAY (E.G. 1024 -> 1.024K, 123425899906842624 -> 123.4Q, 1234000000000000000 -> 1.126e18, ETC.)
// FOR NUMBERS 1E15 AND ABOVE, USE EXPONENTIAL NOTATION TO PREVENT DISPLAY ISSUES. FOR NUMBERS BELOW 1E15, USE SUFFIXES (K, M, B, T, Q) FOR BETTER READABILITY.
// ALSO, ONLY SHOW 4 TOTAL NUMBERS (E.G. 1.234K, 12.34M, 123.4B, ETC.) TO PREVENT DISPLAY ISSUES AND IMPROVE READABILITY.
function formatNumber(num) {
  if (num >= 1e18) {
    return num.toExponential(0).replace('+', '');
  }

  if (showingScientificNotation) {
    if (num > 999) {
      return num.toExponential(num % 1000 === 0 ? 0 : 3).replace('+', '');
    } else {
      return num.toString();
    }
  }

  const tiers = [
    { value: 1e15, suffix: 'Q' },
    { value: 1e12, suffix: 'T' },
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'K' }
  ];
  
  // For numbers in the thousands (1,000 - 9,999) show commas instead of abbreviation
  // if (num >= 1000 && num < 10000) {
  //   return formatNumberWithCommas(Math.round(num));
  // }

  for (const tier of tiers) {
    if (num >= tier.value) {
      const v = num / tier.value;
      let s = v.toPrecision(4);
      s = s.replace(/\.0+$/,'');
      s = s.replace(/(\.[0-9]*?)0+$/,'$1');
      s = s.replace(/\.$/, '');
      return s + tier.suffix;
    }
  }

  return num.toString();
}

// FORMAT NUMBERS FOR COMMAS
function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}