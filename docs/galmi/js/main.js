// TIME LOOP
setInterval(() => {
  console.log(Math.max(1, Math.floor(Math.log2(rocks.gross))));
  rocksPerSecond = hire.level - 1;
  if (rocksPerSecond > 0) {
    rocks.count += rocksPerSecond;
    checkPurchasables();
    gainResourceParticle(rocks, rocksPerSecond);
  }
  ironorePerSecond = upgradeWorker.level - 1;
  if (ironorePerSecond > 0) {
    ironore.count += ironorePerSecond;
    checkPurchasables();
  }
  chromiumorePerSecond = housing.level - 1;
  if (chromiumorePerSecond > 0) {
    chromiumore.count += chromiumorePerSecond;
    checkPurchasables();
  }
}, 1000);
