// TIME LOOP
setInterval(() => {
  if (rocksPerSecond > 0) {
    rocksPerSecondTrue = parseInt(Math.ceil(Math.pow(parseFloat(rocksPerSecond) * upgradeWorker.level, rocksPerSecondExponent)));
    rocks.count += rocksPerSecondTrue;
    checkPurchasables();
    gainResourceParticle(rocks, rocksPerSecondTrue);
    /*
    gainResourceParticle(rocks, rocksPerSecond);
    if (rocksPerSecondTrue > rocksPerSecond) {
      gainResourceParticle(rocks, rocksPerSecondTrue - rocksPerSecond);
    }
      */
  }
}, 1000);
