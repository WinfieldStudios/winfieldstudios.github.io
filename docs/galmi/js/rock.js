// CLICKING THE ROCK
function clickOnRock(event) {
  rocks.count += rocksPerClick;
  totalClicksEver++;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;

  const x = event.offsetX + (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
  const y = event.offsetY - (50 + Math.floor(Math.random() * 30) + 1);

  const div = document.createElement('div');
  div.innerHTML = `+${Math.round(rocksPerClick)}`;
  div.style.cssText = `color: var(--primary-color); position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; font-weight: lighter; font-family: "Pixelated"; pointer-events: none;`;

  rockImageContainer.appendChild(div);
  div.classList.add('fade-up');
  timeout(div);
}
