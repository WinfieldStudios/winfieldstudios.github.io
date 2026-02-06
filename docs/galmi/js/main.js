// TIME LOOP
setInterval(() => {
  rocksPerSecond = hire.level - 1;
  if (rocksPerSecond > 0) {
    if (housing.level - 1 > 0) {
      rocksPerSecond = Math.floor(rocksPerSecond * (1 + (housing.level - 1) * 0.2));
    }
    rocks.count += rocksPerSecond;
    checkPurchasables();
    gainResourceParticle(rocks, rocksPerSecond);
  }
  extractsPerSecond = upgradeWorker.level - 1;
  if (extractsPerSecond > 0) {

    switch (upgradeGalmi.level) {
      case 5:
        aluminum.count += Math.max(0, Math.floor((extractsPerSecond * 1e-9 + 0.5) + Math.floor(Math.random() * (extractsPerSecond * 1e-9) - (extractsPerSecond * 1e-9 / 2))));
      case 4:
        chromiumore.count += Math.max(0, Math.floor((extractsPerSecond * 0.000001 + 0.5) + Math.floor(Math.random() * (extractsPerSecond * 0.0000005) - (extractsPerSecond * 0.0000005 / 2))));
      case 3:
        obsidian.count += Math.max(0, Math.floor((extractsPerSecond * 0.001 + 0.5) + Math.floor(Math.random() * (extractsPerSecond * 0.0005) - (extractsPerSecond * 0.0005 / 2))));
      case 2:
        ironore.count += Math.max(0, Math.floor((extractsPerSecond * 0.1 + 0.5) + Math.floor(Math.random() * (extractsPerSecond * 0.05) - (extractsPerSecond * 0.05 / 2))));
      default:
        limestone.count += Math.max(0, Math.floor((extractsPerSecond * 0.5 + 0.5) + Math.floor(Math.random() * (extractsPerSecond * 0.1) - (extractsPerSecond * 0.1 / 2))));
        coal.count += Math.max(0, Math.floor((extractsPerSecond * 0.4 + 0.5) + Math.floor(Math.random() * (extractsPerSecond * 0.1) - (extractsPerSecond * 0.1 / 2))));
    }
    
    checkPurchasables();
  }
}, 1000);

// AUTO SAVE LOOP
setInterval(() => {
  save('AUTO-SAVE...');

}, 300000); // Every 5 minutes