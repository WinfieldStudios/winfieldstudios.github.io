// PARTICLE TIMEOUT
const timeout = (div) => {
  setTimeout(() => div.remove(), 800);
  checkPurchasables();
};

// GAIN RESOURCE PARTICLES
function gainResourceParticle(resource, amount, isPassive = false, fontSize = 18, range = 20) {
  const x = resource.displayContainer.getBoundingClientRect().right * 1.01 + 5 + (Math.floor(Math.random() * range) + 1 - 10);
  const y = resource.displayContainer.getBoundingClientRect().top + (Math.floor(Math.random() * range) + 1);

  const div = document.createElement('div');
  sign = "";
  if (amount > 0) sign = "+";
  div.innerHTML = `${sign}${formatNumber(amount)}`;
  div.style.cssText = `color: var(--primary-color); position: absolute; top: ${y}px; left: ${x}px; font-size: ${fontSize}px; font-weight: lighter; font-family: "Pixelated"; pointer-events: none;`;
  if (isPassive) div.style.color = 'var(--primary-color-faded)';
  resource.displayContainer.appendChild(div);

  div.classList.add('gain-resource-animation');
  timeout(div);
}
