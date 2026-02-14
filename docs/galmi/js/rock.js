// CLICKING THE ROCK
function clickOnRock(event) {
  rocks.count += rocksPerClick;
  totalClicksEver++;
  document.querySelector('.total-clicks-ever').innerHTML = totalClicksEver;

  const x = event.offsetX + (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
  const y = event.offsetY - (50 + Math.floor(Math.random() * 30) + 1);

  const div = document.createElement('div');
  div.innerHTML = `+${formatNumber(Math.round(rocksPerClick))}`;
  div.style.cssText = `color: var(--primary-color); position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; font-weight: lighter; font-family: "Pixelated"; pointer-events: none;`;

  rockImageContainer.appendChild(div);
  div.classList.add('fade-up');
  timeout(div);
}

function galmiTalks() {
  const galmiTalks = document.querySelector('.galmi-talks');
  galmiTalks.style.display = 'block';
  setTimeout(() => {
    galmiTalks.style.display = 'none';
  }, 3000);

  const div = document.createElement('div');
  div.innerHTML = `${sign}${formatNumber(amount)}`;
  div.style.cssText = `color: var(--primary-color); position: absolute; top: ${y}px; left: ${x}px; font-size: ${fontSize}px; font-weight: lighter; font-family: "Pixelated"; pointer-events: none;`;
  if (isPassive) div.style.color = 'var(--primary-color-faded)';
  resource.displayContainer.appendChild(div);

  div.classList.add('gain-resource-animation');
  timeout(div);
}