// TIME LOOP
setInterval(() => {
  if (workers > 0) {
    rocks.count += workers;
    checkPurchasables();
    gainResourceParticle(rocks, workers);
  }
}, 1000);
