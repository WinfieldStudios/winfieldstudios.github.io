// TIME LOOP
setInterval(() => {
  rocksPerSecond = hire.level - 1;
  if (rocksPerSecond > 0) {
    rocks.count += rocksPerSecond;
    checkPurchasables();
    gainResourceParticle(rocks, rocksPerSecond);
  }
  baseResourcesPerSecond = upgradeWorker.level - 1;
  if (baseResourcesPerSecond > 0) {

    switch (upgradeGalmi.level) {
      case 5:
        aluminum.count += Math.max(0, Math.floor((baseResourcesPerSecond * 1e-9 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 1e-9) - (baseResourcesPerSecond * 1e-9 / 2))));
      case 4:
        chromiumore.count += Math.max(0, Math.floor((baseResourcesPerSecond * 0.000001 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.0000005) - (baseResourcesPerSecond * 0.0000005 / 2))));
      case 3:
        obsidian.count += Math.max(0, Math.floor((baseResourcesPerSecond * 0.001 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.0005) - (baseResourcesPerSecond * 0.0005 / 2))));
      case 2:
        ironore.count += Math.max(0, Math.floor((baseResourcesPerSecond * 0.1 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.05) - (baseResourcesPerSecond * 0.05 / 2))));
      default:
        limestone.count += Math.max(0, Math.floor((baseResourcesPerSecond * 0.5 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.1) - (baseResourcesPerSecond * 0.1 / 2))));
        coal.count += Math.max(0, Math.floor((baseResourcesPerSecond * 0.4 + 0.5) + Math.floor(Math.random() * (baseResourcesPerSecond * 0.1) - (baseResourcesPerSecond * 0.1 / 2))));
    }
  
  resourcesPerSecond = housing.level - 1;
  if (resourcesPerSecond > 0) {

      pigiron.count += Math.max(0, Math.floor((resourcesPerSecond * 0.5 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.1) - (resourcesPerSecond * 0.1 / 2))));
      steel.count += Math.max(0, Math.floor((resourcesPerSecond * 0.25 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.08) - (resourcesPerSecond * 0.08 / 2))));
      ferrochrome.count += Math.max(0, Math.floor((resourcesPerSecond * 0.2 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.075) - (resourcesPerSecond * 0.075 / 2))));
      stainlesssteel.count += Math.max(0, Math.floor((resourcesPerSecond * 0.1 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.05) - (resourcesPerSecond * 0.05 / 2))));
      concrete.count += Math.max(0, Math.floor((resourcesPerSecond * 0.001 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.0005) - (resourcesPerSecond * 0.0005 / 2))));
      chromium.count += Math.max(0, Math.floor((resourcesPerSecond * 0.0005 + 0.5) + Math.floor(Math.random() * (resourcesPerSecond * 0.00025) - (resourcesPerSecond * 0.00025 / 2))));

    }
    
    checkPurchasables();
  }
}, 1000);

// AUTO SAVE LOOP
setInterval(() => {
  save('AUTO-SAVE...');

}, 300000); // Every 5 minutes