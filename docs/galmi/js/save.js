// SAVE / LOAD / RESET

function save() {
  localStorage.clear();

  localStorage.setItem('rocksPerClick', JSON.stringify(rocksPerClick));
  localStorage.setItem('rocksPerSecond', JSON.stringify(rocksPerSecond));
  localStorage.setItem('darkMode', JSON.stringify(darkMode));

  for (const purchasable of Object.values(purchasables)) {
    const key = `${purchasable.name}Level`;
    localStorage.setItem(key, JSON.stringify(purchasable.level));
  }

  for (const resource of Object.values(resources)) {
    localStorage.setItem(`${resource.name}Count`, JSON.stringify(resource.count));
    localStorage.setItem(`${resource.name}Gross`, JSON.stringify(resource.gross));
  }

  const div = document.createElement('div');
  div.innerHTML = 'Saved!';
  div.style.cssText = `color: var(--dark-color); position: absolute; top: 6vh; left: 0.5vw; font-size: 15px; font-weight: bold; pointer-events: none;`;
  saveIcon.appendChild(div);

  div.classList.add('gain-resource-animation');
  timeout(div);
}

function load() {
  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT);

  const savedRocksPerClick = JSON.parse(localStorage.getItem('rocksPerClick'));
  if (savedRocksPerClick !== null) rocksPerClick = savedRocksPerClick;

  const savedRocksPerSecond = JSON.parse(localStorage.getItem('rocksPerSecond'));
  if (savedRocksPerSecond !== null) rocksPerSecond = savedRocksPerSecond;

  // Load workers as rocksPerSecond - this is for backwards compatibility
  const savedWorkers = JSON.parse(localStorage.getItem('workers'));
  if (savedWorkers !== null) { 
    rocksPerSecond += savedWorkers;
  }

  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
  if (savedDarkMode !== null) {
    darkMode = savedDarkMode;
    if (darkMode) toggleDarkMode();
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
      if (resource.name === 'rocks') gainResourceParticle(resource, savedCount);
    }
  }

  updateUpgradeGalmi();
  updateUpgradePickaxe();
  checkPurchasables();
}

function restart() {
  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT);

  if (localStorage.getItem('rocksPerClick') !== null) rocksPerClick = ROCKS_PER_CLICK_STARTING_AMOUNT;
  if (localStorage.getItem('rocksPerSecond') !== null) rocksPerSecond = ROCKS_PER_SECOND_STARTING_AMOUNT;
  if (localStorage.getItem('workers') !== null) rocksPerSecond -= JSON.parse(localStorage.getItem('workers'));

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
}

function clearSave() {
  localStorage.clear();

  localStorage.setItem('rocksPerClick', JSON.stringify(ROCKS_PER_CLICK_STARTING_AMOUNT));
  localStorage.setItem('rocksPerSecond', JSON.stringify(ROCKS_PER_SECOND_STARTING_AMOUNT));
  localStorage.setItem('globalPurchaseMultiplier', JSON.stringify(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT));

  for (const purchasable of Object.values(purchasables)) {
    localStorage.setItem(`${purchasable.name}Level`, JSON.stringify(PURCHASABLES_STARTING_LEVEL));
  }
  for (const resource of Object.values(resources)) {
    localStorage.setItem(`${resource.name}Count`, JSON.stringify(RESOURCES_STARTING_COUNT));
    localStorage.setItem(`${resource.name}Gross`, JSON.stringify(RESOURCES_STARTING_GROSS));
  }
}
