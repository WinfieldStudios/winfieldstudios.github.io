// TIME LOOP
setInterval(() => {
  if (rocksPerSecond > 0) {
    rocksPerSecondTrue = parseInt(Math.floor(parseFloat(rocksPerSecond) * rocksPerSecondMultiplier))
    rocks.count += rocksPerSecondTrue;
    checkPurchasables();
    gainResourceParticle(rocks, rocksPerSecond);
    if (rocksPerSecondTrue > rocksPerSecond) {
      gainResourceParticle(rocks, rocksPerSecondTrue - rocksPerSecond);
    }
  }
}, 1000);
