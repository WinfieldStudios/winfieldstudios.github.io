// CLICKING THE ROCK
function clickOnRock(event) {
  rocks.count += rocksPerClick;
  totalClicksEver++;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;

  const x = event.offsetX + (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
  const y = event.offsetY - (50 + Math.floor(Math.random() * 30) + 1);

  const div = document.createElement('div');
  div.innerHTML = `+${formatNumber(Math.round(rocksPerClick))}`;
  div.style.cssText = `color: ${window.sonBonusActive ? "#FFD24A" : "var(--primary-color)"}; text-shadow: ${window.sonBonusActive ? "0 0 12px rgba(255,200,80,1)" : "none"}; position: absolute; top: ${y}px; left: ${x}px; font-size: ${window.sonBonusActive ? (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 42 : 24) : (window.matchMedia("(min-aspect-ratio: 21/9)").matches ? 30 : 15)}px; font-weight: ${window.sonBonusActive ? "bold" : "lighter"}; font-family: "Pixelated"; pointer-events: none;`;

  rockImageContainer.appendChild(div);
  div.classList.add('fade-up');
  timeout(div);
}
