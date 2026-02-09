// SAVE / LOAD / RESET

function save(textPlayed = "SAVED!") {
  localStorage.clear();

  localStorage.setItem('totalClicksEver', JSON.stringify(totalClicksEver));
  localStorage.setItem('rocksPerClick', JSON.stringify(rocksPerClick));
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  localStorage.setItem('showingScientificNotation', JSON.stringify(showingScientificNotation));

  for (const purchasable of Object.values(purchasables)) {
    const key = `${purchasable.name}Level`;
    localStorage.setItem(key, JSON.stringify(purchasable.level));
  }

  for (const resource of Object.values(resources)) {
    localStorage.setItem(`${resource.name}Count`, JSON.stringify(resource.count));
    localStorage.setItem(`${resource.name}Gross`, JSON.stringify(resource.gross));
  }

  const div = document.createElement('div');
  div.innerHTML = textPlayed;
  div.style.cssText = `color: var(--dark-color); position: absolute; top: 6vh; left: 0.5vw; font-size: 15px; font-weight: bold; pointer-events: none;`;
  saveIcon.appendChild(div);

  div.classList.add('gain-resource-animation');
  timeout(div);
}

function load() {
  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT);

  const savedTotalClicksEver = JSON.parse(localStorage.getItem('totalClicksEver'));
  if (savedTotalClicksEver !== null) totalClicksEver = savedTotalClicksEver;

  const savedRocksPerClick = JSON.parse(localStorage.getItem('rocksPerClick'));
  if (savedRocksPerClick !== null) rocksPerClick = savedRocksPerClick;

  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  if (savedDarkMode !== null) {
    darkMode = savedDarkMode;
    document.getElementById("dark-mode-toggle").innerText = darkMode ? "DARK" : "LIGHT";
    if (darkMode) toggleDarkMode();
  }

  const savedNotation = JSON.parse(localStorage.getItem('showingScientificNotation'));
  if (savedNotation !== null) {
    showingScientificNotation = savedNotation;
    document.getElementById("scientific-notation-toggle").innerText = showingScientificNotation ? "SCIENTIFIC" : "ABBREVIATED";
    if (showingScientificNotation) {
      showingScientificNotation = false;
      toggleScientificNotation();
    }
  }

  for (const purchasable of Object.values(purchasables)) {
    const savedLevel = JSON.parse(localStorage.getItem(`${purchasable.name}Level`));
    if (savedLevel !== null) purchasable.level = savedLevel;
  }

  for (const resource of Object.values(resources)) {
    const savedGross = JSON.parse(localStorage.getItem(`${resource.name}Gross`));
    if (savedGross !== null) resource.gross = savedGross;

    const savedCount = JSON.parse(localStorage.getItem(`${resource.name}Count`));
    if (savedCount !== null) {
      resource.count = savedCount;
    }
  }

  updateUpgradeGalmi();
  updateUpgradePickaxe();
  checkPurchasables();
  document.querySelector('.purchased-total-extract').innerHTML = extract.level - 1;
  document.querySelector('.purchased-total-blast').innerHTML = blast.level - 1;
  document.querySelector('.purchased-total-smelt').innerHTML = smelt.level - 1;
  document.querySelector('.purchased-total-reduce').innerHTML = reduce.level - 1;
  document.querySelector('.purchased-total-refine').innerHTML = refine.level - 1;
  document.querySelector('.purchased-total-aerate').innerHTML = aerate.level - 1;
  document.querySelector('.purchased-total-produce').innerHTML = produce.level - 1;
  document.querySelector('.purchased-total-workers').innerHTML = hire.level - 1;
  document.querySelector('.purchased-total-housing').innerHTML = housing.level - 1;
  document.querySelector('.purchased-total-promoted').innerHTML = upgradeWorker.level - 1;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;
}

function restart() {
  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT);

  if (localStorage.getItem('totalClicksEver') !== null) totalClicksEver = TOTAL_CLICKS_EVER_STARTING_AMOUNT;
  if (localStorage.getItem('rocksPerClick') !== null) rocksPerClick = ROCKS_PER_CLICK_STARTING_AMOUNT;

  for (const purchasable of Object.values(purchasables)) {
    if (localStorage.getItem(`${purchasable.name}Level`) !== null) {
      purchasable.level = PURCHASABLES_STARTING_LEVEL;
    }
  }

  for (const resource of Object.values(resources)) {
    if (localStorage.getItem(`${resource.name}Gross`) !== null) {
      resource.gross = RESOURCES_STARTING_GROSS;
      resource.displayContainer.classList.add("hidden");
    }
    if (localStorage.getItem(`${resource.name}Count`) !== null) {
      resource.count = RESOURCES_STARTING_COUNT;
    }
  }

  updateUpgradeGalmi();
  updateUpgradePickaxe();
  checkPurchasables();
  document.querySelector('.purchased-total-extract').innerHTML = extract.level - 1;
  document.querySelector('.purchased-total-blast').innerHTML = blast.level - 1;
  document.querySelector('.purchased-total-smelt').innerHTML = smelt.level - 1;
  document.querySelector('.purchased-total-reduce').innerHTML = reduce.level - 1;
  document.querySelector('.purchased-total-refine').innerHTML = refine.level - 1;
  document.querySelector('.purchased-total-aerate').innerHTML = aerate.level - 1;
  document.querySelector('.purchased-total-produce').innerHTML = produce.level - 1;
  document.querySelector('.purchased-total-workers').innerHTML = hire.level - 1;
  document.querySelector('.purchased-total-housing').innerHTML = housing.level - 1;
  document.querySelector('.purchased-total-promoted').innerHTML = upgradeWorker.level - 1;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;
}

function clearSave() {
  localStorage.clear();

  localStorage.setItem('totalClicksEver', JSON.stringify(TOTAL_CLICKS_EVER_STARTING_AMOUNT));
  localStorage.setItem('rocksPerClick', JSON.stringify(ROCKS_PER_CLICK_STARTING_AMOUNT));

  for (const purchasable of Object.values(purchasables)) {
    localStorage.setItem(`${purchasable.name}Level`, JSON.stringify(PURCHASABLES_STARTING_LEVEL));
  }
  for (const resource of Object.values(resources)) {
    localStorage.setItem(`${resource.name}Count`, JSON.stringify(RESOURCES_STARTING_COUNT));
    localStorage.setItem(`${resource.name}Gross`, JSON.stringify(RESOURCES_STARTING_GROSS));
  }
  updateUpgradeGalmi();
  updateUpgradePickaxe();
  checkPurchasables();
  document.querySelector('.purchased-total-extract').innerHTML = extract.level - 1;
  document.querySelector('.purchased-total-blast').innerHTML = blast.level - 1;
  document.querySelector('.purchased-total-smelt').innerHTML = smelt.level - 1;
  document.querySelector('.purchased-total-reduce').innerHTML = reduce.level - 1;
  document.querySelector('.purchased-total-refine').innerHTML = refine.level - 1;
  document.querySelector('.purchased-total-aerate').innerHTML = aerate.level - 1;
  document.querySelector('.purchased-total-produce').innerHTML = produce.level - 1;
  document.querySelector('.purchased-total-workers').innerHTML = hire.level - 1;
  document.querySelector('.purchased-total-housing').innerHTML = housing.level - 1;
  document.querySelector('.purchased-total-promoted').innerHTML = upgradeWorker.level - 1;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;
}
