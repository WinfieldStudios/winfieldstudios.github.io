// SAVE / LOAD / RESET

function save(textPlayed = "SAVED!") {
  localStorage.clear();

  localStorage.setItem('totalPowerupsGolden', JSON.stringify(totalPowerupsGolden));
  localStorage.setItem('totalClicksEver', JSON.stringify(totalClicksEver));
  localStorage.setItem('clicksPerSecondRecordedMax', JSON.stringify(clicksPerSecondRecordedMax));
  localStorage.setItem('rocksPerClick', JSON.stringify(rocksPerClick));
  localStorage.setItem('hasExtractedAfterUpgradingPickaxe', JSON.stringify(hasExtractedAfterUpgradingPickaxe));

  localStorage.setItem('switchVolumeMusicIndex', JSON.stringify(switchVolumeMusicIndex));
  localStorage.setItem('switchVolumeSfxIndex', JSON.stringify(switchVolumeSfxIndex));

  localStorage.setItem('darkMode', JSON.stringify(darkMode));
  localStorage.setItem('showingScientificNotation', JSON.stringify(showingScientificNotation));

  localStorage.setItem('timeWhenPlayerSaved', JSON.stringify(Date.now()));

  for (let i = 0; i < timeStats.length; i++) {
    const key = `timeStat${i}`;
    localStorage.setItem(key, JSON.stringify(timeStats[i]));
  }

  for (const purchasable of Object.values(purchasables)) {
    localStorage.setItem(`${purchasable.name}Level`, JSON.stringify(purchasable.level));
    localStorage.setItem(`${purchasable.name}Clicked`, JSON.stringify(purchasable.clicked));
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
  deactivateSonBonus();

  const savedTotalPowerupsGolden = JSON.parse(localStorage.getItem('totalPowerupsGolden'));
  if (savedTotalPowerupsGolden !== null) totalPowerupsGolden = savedTotalPowerupsGolden;

  const savedTotalClicksEver = JSON.parse(localStorage.getItem('totalClicksEver'));
  if (savedTotalClicksEver !== null) totalClicksEver = savedTotalClicksEver;

  const savedClicksPerSecondRecordedMax = JSON.parse(localStorage.getItem('clicksPerSecondRecordedMax'));
  if (savedClicksPerSecondRecordedMax !== null) clicksPerSecondRecordedMax = savedClicksPerSecondRecordedMax;

  const savedRocksPerClick = JSON.parse(localStorage.getItem('rocksPerClick'));
  if (savedRocksPerClick !== null) rocksPerClick = savedRocksPerClick; 

  const savedHasExtractedAfterUpgradingPickaxe = JSON.parse(localStorage.getItem('hasExtractedAfterUpgradingPickaxe'));
  if (savedHasExtractedAfterUpgradingPickaxe !== null) hasExtractedAfterUpgradingPickaxe = savedHasExtractedAfterUpgradingPickaxe;

  const savedSwitchVolumeMusicIndex = JSON.parse(localStorage.getItem('switchVolumeMusicIndex'));
  if (savedSwitchVolumeMusicIndex !== null) switchVolumeMusicIndex = savedSwitchVolumeMusicIndex;
  const savedSwitchVolumeSfxIndex = JSON.parse(localStorage.getItem('switchVolumeSfxIndex'));
  if (savedSwitchVolumeSfxIndex !== null) switchVolumeSfxIndex = savedSwitchVolumeSfxIndex;
  if (switchVolumeMusicIndex + switchVolumeSfxIndex > 0) loadVolumes();

  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  darkMode = true;
  if (savedDarkMode !== null) {
    if (savedDarkMode == false) toggleDarkMode();
    document.getElementById("dark-mode-toggle").innerText = darkMode ? "DARK" : "LIGHT";
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

    const savedClicked = JSON.parse(localStorage.getItem(`${purchasable.name}Clicked`));
    if (savedClicked !== null) purchasable.clicked = savedClicked;
  }

  for (const resource of Object.values(resources)) {
    const savedGross = JSON.parse(localStorage.getItem(`${resource.name}Gross`));
    if (savedGross !== null) resource.gross = savedGross;

    const savedCount = JSON.parse(localStorage.getItem(`${resource.name}Count`));
    if (savedCount !== null) resource.count = savedCount;
  }

  updateUI();

  const timeWhenPlayerSaved = JSON.parse(localStorage.getItem('timeWhenPlayerSaved'));
  if (timeWhenPlayerSaved !== null) {
    currentTime = Date.now();
    if (timeWhenPlayerSaved < currentTime - AUTOSAVE_INTERVAL_MILLISECONDS) {
      generateIncome(Math.ceil((currentTime - timeWhenPlayerSaved) / 1000));
    }
    timeStats[2] += Math.floor(currentTime - timeWhenPlayerSaved);
    document.getElementById('stats-total-seconds-offline').innerHTML = timestamp(timeStats[2]);
  }
  save("HELLO!");
}

function restart() {
  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT);
  deactivateSonBonus();
  document.getElementById('galmi-voiceline').innerHTML = "";
  playClickSave();

  if (localStorage.getItem('totalPowerupsGolden') !== null) totalPowerupsGolden = TOTAL_POWERUPS_GOLDEN_STARTING_AMOUNT;
  if (localStorage.getItem('totalClicksEver') !== null) totalClicksEver = TOTAL_CLICKS_EVER_STARTING_AMOUNT;
  if (localStorage.getItem('clicksPerSecondRecordedMax') !== null) clicksPerSecondRecordedMax = CLICKS_PER_SECOND_RECORDED_MAX_STARTING_AMOUNT;
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
    if (localStorage.getItem(`${purchasable.name}Clicked`) !== null) {
      purchasable.clicked = PURCHASABLES_STARTING_CLICKED;
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

  updateUI();
  scheduleNextSon();
}

function updateUI() {

  updateUpgradeGalmi();
  updateUpgradePickaxe();
  checkPurchasables();
  document.getElementById('upgrade-pickaxe-rocksperclick-increase').innerHTML = formatNumberWithCommas(getUpgradePickaxeRocksPerClickIncrease(upgradePickaxe.level + 1));
  document.querySelector('.purchased-total-extract').innerHTML = formatNumberWithCommas(extract.level - 1);
  document.getElementById('purchased-clicked-extract').innerHTML = formatNumberWithCommas(extract.clicked);
  document.querySelector('.purchased-total-blast').innerHTML = formatNumberWithCommas(blast.level - 1);
  document.getElementById('purchased-clicked-blast').innerHTML = formatNumberWithCommas(blast.clicked);
  document.querySelector('.purchased-total-smelt').innerHTML = formatNumberWithCommas(smelt.level - 1);
  document.getElementById('purchased-clicked-smelt').innerHTML = formatNumberWithCommas(smelt.clicked);
  document.querySelector('.purchased-total-reduce').innerHTML = formatNumberWithCommas(reduce.level - 1);
  document.getElementById('purchased-clicked-reduce').innerHTML = formatNumberWithCommas(reduce.clicked);
  document.querySelector('.purchased-total-refine').innerHTML = formatNumberWithCommas(refine.level - 1);
  document.getElementById('purchased-clicked-refine').innerHTML = formatNumberWithCommas(refine.clicked);
  document.querySelector('.purchased-total-mix').innerHTML = formatNumberWithCommas(mix.level - 1);
  document.getElementById('purchased-clicked-mix').innerHTML = formatNumberWithCommas(mix.clicked);
  document.querySelector('.purchased-total-produce').innerHTML = formatNumberWithCommas(produce.level - 1);
  document.getElementById('purchased-clicked-produce').innerHTML = formatNumberWithCommas(produce.clicked);
  document.querySelector('.purchased-total-workers').innerHTML = formatNumberWithCommas(hire.level - 1);
  document.getElementById('purchased-clicked-workers').innerHTML = formatNumberWithCommas(hire.clicked);
  document.querySelector('.purchased-total-housing').innerHTML = formatNumberWithCommas(housing.level - 1);
  document.getElementById('purchased-clicked-housing').innerHTML = formatNumberWithCommas(housing.clicked);
  document.querySelector('.purchased-total-promoted').innerHTML = formatNumberWithCommas(upgradeWorker.level - 1);
  document.getElementById('purchased-clicked-promoted').innerHTML = formatNumberWithCommas(upgradeWorker.clicked);
  document.getElementById('stats-total-seconds-played').innerHTML = timestamp(timeStats[1]);
  document.getElementById('stats-timestamp-grow1').innerHTML = timestamp(timeStats[3])
  document.getElementById('stats-timestamp-grow2').innerHTML = timestamp(timeStats[4])
  document.getElementById('stats-timestamp-grow3').innerHTML = timestamp(timeStats[5])
  document.getElementById('stats-timestamp-grow4').innerHTML = timestamp(timeStats[6])
  document.getElementById('stats-timestamp-grow5').innerHTML = timestamp(timeStats[7])
  document.getElementById('stats-timestamp-toolt4').innerHTML = timestamp(timeStats[8])
  document.getElementById('stats-clicking-power').innerHTML = formatNumberWithCommas(rocksPerClick);
  document.querySelector('.total-clicks-ever').innerHTML = formatNumberWithCommas(totalClicksEver);
  document.getElementById('stats-total-powerups-golden').innerHTML = totalPowerupsGolden;
  document.getElementById('stats-powerups-golden-multiplier').innerHTML = getPowerupRocksPerClickMultiplier();
  document.getElementById('stats-powerups-golden-duration').innerHTML = Math.floor(getPowerupGoldenDuration() / 1000);
  document.getElementById('stats-cps-max').innerHTML = getClicksPerSecondRecord();
}
