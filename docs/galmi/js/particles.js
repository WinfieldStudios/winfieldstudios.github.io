// PARTICLE TIMEOUT
const timeout = (div) => {
  setTimeout(() => div.remove(), 800);
  checkPurchasables();
};

// GAIN RESOURCE PARTICLES
function gainResourceParticle(resource, amount, isPassive = false, fontSize = 18, range = 20) {
  const rect = resource.displayContainer.getBoundingClientRect();

  const x = rect.right + 5 + (window.innerWidth < 900 ? 18 : 10) + (Math.floor(Math.random() * range) + 1 - 10);
  const y = rect.top + (Math.floor(Math.random() * range) + 1);

  const div = document.createElement('div');
  const sign = amount > 0 ? "+" : "";

  div.innerHTML = `${sign}${formatNumber(amount)}`;
  div.style.cssText = `color: var(--primary-color); position: fixed; top: ${y}px; left: ${x}px; font-size: ${fontSize}px; font-weight: lighter; font-family: "Pixelated"; pointer-events: none;`;

  if (isPassive) div.style.color = 'var(--primary-color-faded)';

  document.getElementById("particle-layer").appendChild(div);

  div.classList.add('gain-resource-animation');
  timeout(div);
}

