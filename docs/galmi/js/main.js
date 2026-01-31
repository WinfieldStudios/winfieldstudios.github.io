// TIME LOOP
setInterval(() => {
  if (rocksPerSecond > 0) {
    rocks.count += rocksPerSecond;
    checkPurchasables();
    gainResourceParticle(rocks, rocksPerSecond);
  }
}, 1000);
