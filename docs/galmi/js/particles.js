// PARTICLE TIMEOUT
const timeout = (div) => {
  setTimeout(() => div.remove(), 800);
  checkPurchasables();
};

// GAIN RESOURCE PARTICLES
function gainResourceParticle(resource, amount) {
  const x = resource.displayContainer.getBoundingClientRect().right * 1.01 + 5 + (Math.floor(Math.random() * 20) + 1 - 10);
  const y = resource.displayContainer.getBoundingClientRect().top + (Math.floor(Math.random() * 20) + 1);

  const div = document.createElement('div');
  div.innerHTML = `+${amount}`;
  div.style.cssText = `color: var(--dark-color); position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`;
  resource.displayContainer.appendChild(div);

  div.classList.add('gain-resource-animation');
  timeout(div);
}
