// SAVE / LOAD / RESET

function save(textPlayed = "SAVED!") {
  localStorage.clear();

  localStorage.setItem('totalClicksEver', JSON.stringify(totalClicksEver));
  localStorage.setItem('rocksPerClick', JSON.stringify(rocksPerClick));
  localStorage.setItem('hasExtractedAfterUpgradingPickaxe', JSON.stringify(hasExtractedAfterUpgradingPickaxe));
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  localStorage.setItem('showingScientificNotation', JSON.stringify(showingScientificNotation));

  localStorage.setItem('timeWhenPlayerSaved', JSON.stringify(Date.now()));

  for (let i = 0; i < timeStats.length; i++) {
    const key = `timeStat${i}`;
    localStorage.setItem(key, JSON.stringify(timeStats[i]));
  }

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
  div.style.cssText = `color: var(--primary-color); position: absolute; top: 6vh; left: 0.5vw; font-size: 15px; font-weight: bold; pointer-events: none;`;
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

  const savedHasExtractedAfterUpgradingPickaxe = JSON.parse(localStorage.getItem('hasExtractedAfterUpgradingPickaxe'));
  if (savedHasExtractedAfterUpgradingPickaxe !== null) hasExtractedAfterUpgradingPickaxe = savedHasExtractedAfterUpgradingPickaxe;

  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  if (savedDarkMode !== null) {
    darkMode = savedDarkMode;
    document.getElementById("dark-mode-toggle").innerText = darkMode ? "DARK" : "LIGHT";
    if (!darkMode) toggleDarkMode();
  }

  for (let i = 0; i < timeStats.length; i++) {
    const savedTimeStat = JSON.parse(localStorage.getItem(`timeStat${i}`));
    if (savedTimeStat !== null) timeStats[i] = savedTimeStat;
  }
  if (timeStats[0] == 0) timeStats[0] = Date.now();

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
  document.querySelector('.purchased-total-mix').innerHTML = mix.level - 1;
  document.querySelector('.purchased-total-produce').innerHTML = produce.level - 1;
  document.querySelector('.purchased-total-workers').innerHTML = hire.level - 1;
  document.querySelector('.purchased-total-housing').innerHTML = housing.level - 1;
  document.querySelector('.purchased-total-promoted').innerHTML = upgradeWorker.level - 1;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;
  document.getElementById('stats-total-seconds-played').innerHTML = timestamp(timeStats[1]);
  document.getElementById('stats-timestamp-grow1').innerHTML = timestamp(timeStats[3])
  document.getElementById('stats-timestamp-grow2').innerHTML = timestamp(timeStats[4])
  document.getElementById('stats-timestamp-grow3').innerHTML = timestamp(timeStats[5])
  document.getElementById('stats-timestamp-grow4').innerHTML = timestamp(timeStats[6])

  const timeWhenPlayerSaved = JSON.parse(localStorage.getItem('timeWhenPlayerSaved'));
  if (timeWhenPlayerSaved !== null) {
    currentTime = Date.now();
    if (timeWhenPlayerSaved < currentTime - AUTOSAVE_INTERVAL_SECONDS) {
      generateIncome(currentTime - timeWhenPlayerSaved);
      save("WELCOME BACK!");
    }
    timeStats[2] += Math.floor(currentTime - timeWhenPlayerSaved);
    document.getElementById('stats-total-seconds-offline').innerHTML = formatSeconds(timeStats[2] / 1000);
  }
}

function restart() {
  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT);

  if (localStorage.getItem('totalClicksEver') !== null) totalClicksEver = TOTAL_CLICKS_EVER_STARTING_AMOUNT;
  if (localStorage.getItem('rocksPerClick') !== null) rocksPerClick = ROCKS_PER_CLICK_STARTING_AMOUNT;
  if (localStorage.getItem('hasExtractedAfterUpgradingPickaxe') !== null) hasExtractedAfterUpgradingPickaxe = false;
  
  for (let i = 0; i < timeStats.length; i++) {
    timeStats[i] = 0;
  }
  timeStats[0] = Date.now();

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
  document.querySelector('.purchased-total-mix').innerHTML = mix.level - 1;
  document.querySelector('.purchased-total-produce').innerHTML = produce.level - 1;
  document.querySelector('.purchased-total-workers').innerHTML = hire.level - 1;
  document.querySelector('.purchased-total-housing').innerHTML = housing.level - 1;
  document.querySelector('.purchased-total-promoted').innerHTML = upgradeWorker.level - 1;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;
  document.getElementById('stats-total-seconds-played').innerHTML = timestamp(timeStats[1]);
  document.getElementById('stats-total-seconds-offline').innerHTML = formatSeconds(timeStats[2] / 1000);
  document.getElementById('stats-timestamp-grow1').innerHTML = timestamp(timeStats[3])
  document.getElementById('stats-timestamp-grow2').innerHTML = timestamp(timeStats[4])
  document.getElementById('stats-timestamp-grow3').innerHTML = timestamp(timeStats[5])
  document.getElementById('stats-timestamp-grow4').innerHTML = timestamp(timeStats[6])
}

function clearSave() {
  localStorage.clear();

  localStorage.setItem('totalSecondsPlayed', JSON.stringify(TOTAL_SECONDS_PLAYED_STARTING_AMOUNT));
  localStorage.setItem('totalClicksEver', JSON.stringify(TOTAL_CLICKS_EVER_STARTING_AMOUNT));
  localStorage.setItem('rocksPerClick', JSON.stringify(ROCKS_PER_CLICK_STARTING_AMOUNT));
  localStorage.getItem('hasExtractedAfterUpgradingPickaxe', JSON.stringify(false));

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
  document.querySelector('.purchased-total-mix').innerHTML = mix.level - 1;
  document.querySelector('.purchased-total-produce').innerHTML = produce.level - 1;
  document.querySelector('.purchased-total-workers').innerHTML = hire.level - 1;
  document.querySelector('.purchased-total-housing').innerHTML = housing.level - 1;
  document.querySelector('.purchased-total-promoted').innerHTML = upgradeWorker.level - 1;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;
  document.getElementById('stats-total-seconds-played').innerHTML = totalSecondsPlayed;
}
