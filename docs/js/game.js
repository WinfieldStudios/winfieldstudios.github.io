const COST_EXTRACT = 15
let rocksPerClick = 1

let rockResourceDisplay = document.querySelector('.rock-resource-display')
let rockCountSource = document.querySelector('.rock-count')
let rockCount = parseFloat(rockCountSource.innerHTML)

let limestoneResourceDisplay = document.querySelector('.limestone-resource-display')
let limestoneCountSource = document.querySelector('.limestone-count')
let limestoneCount = parseFloat(limestoneCountSource.innerHTML)

let coalResourceDisplay = document.querySelector('.coal-resource-display')
let coalCountSource = document.querySelector('.coal-count')
let coalCount = parseFloat(coalCountSource.innerHTML)

let ironoreResourceDisplay = document.querySelector('.ironore-resource-display')
let ironoreCountSource = document.querySelector('.ironore-count')
let ironoreCount = parseFloat(ironoreCountSource.innerHTML)

let extractButton = document.querySelector('.extract-button')
let extractCostSource = document.querySelector('.extract-cost')
let extractCost = parseFloat(extractCostSource.innerHTML)

let rockImageContainer = document.querySelector('.rock-image-container')








function updateRockCount() {
  rockCountSource.innerHTML = rockCount
  if (rockCount >= COST_EXTRACT) {
    extractButton.classList.remove("hidden")
    extractButton.classList.add("purchasable")
  } else {
    extractButton.classList.remove("purchasable")
  }
}

function incrementRocks(event) {
  rockCount += rocksPerClick
  updateRockCount()
  rockResourceDisplay.classList.remove("hidden")

  const x = event.offsetX + (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1)
  const y = event.offsetY - (80 + Math.floor(Math.random() * 30) + 1)

  const div = document.createElement('div')
  div.innerHTML = `+${Math.round(rocksPerClick)}`
  div.style.cssText = `color: var(--dark-color); position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
  rockImageContainer.appendChild(div)

  div.classList.add('fade-up')

  timeout(div)
}

const timeout = (div) => {
  setTimeout(() => {
    div.remove()
  }, 800)
}

function buyExtract() {
  if (rockCount >= extractCost) {
    rockCount -= extractCost
    updateRockCount()

    const roll = Math.floor(Math.random() * 10) + 1
    console.log(roll)
    if (roll <= 6) {
      limestoneCount += 1
      limestoneCountSource.innerHTML = limestoneCount
      limestoneResourceDisplay.classList.remove("hidden")
    } else if (roll <= 9) {
      coalCount += 1
      coalCountSource.innerHTML = coalCount
      coalResourceDisplay.classList.remove("hidden")
    } else {
      ironoreCount += 1
      ironoreCountSource.innerHTML = ironoreCount
      ironoreResourceDisplay.classList.remove("hidden")
    }
  }
}















function save() {
  localStorage.clear()

  localStorage.setItem('rockCount', JSON.stringify(rockCount))
  localStorage.setItem('limestoneCount', JSON.stringify(limestoneCount))
  localStorage.setItem('coalCount', JSON.stringify(coalCount))
  localStorage.setItem('ironoreCount', JSON.stringify(ironoreCount))
}

function load() {
  rockCount = JSON.parse(localStorage.getItem('rockCount'))
  limestoneCount = JSON.parse(localStorage.getItem('limestoneCount'))
  coalCount = JSON.parse(localStorage.getItem('coalCount'))
  ironoreCount = JSON.parse(localStorage.getItem('ironoreCount'))

  rockCountSource.innerHTML = Math.round(rockCount)
  limestoneCountSource.innerHTML = Math.round(limestoneCount)
  coalCountSource.innerHTML = Math.round(coalCount)
  ironoreCountSource.innerHTML = Math.round(ironoreCount)

  
  if (rockCount > 0) {
    rockResourceDisplay.classList.remove("hidden")
  } else {
    rockResourceDisplay.classList.add("hidden")
  }
  if (limestoneCount > 0) {
    limestoneResourceDisplay.classList.remove("hidden")
    extractButton.classList.remove("hidden")
  }
  if (coalCount > 0) {
    coalResourceDisplay.classList.remove("hidden")
    extractButton.classList.remove("hidden")
  }
  if (ironoreCount > 0) {
    ironoreResourceDisplay.classList.remove("hidden")
    extractButton.classList.remove("hidden")
  }
  if (ironoreCount + limestoneCount + coalCount == 0) {
    extractButton.classList.add("hidden")
  }
  if (rockCount >= COST_EXTRACT) {
    extractButton.classList.add("purchasable")
    extractButton.classList.remove("hidden")
  }
}

function reset() {
  localStorage.clear()
  load()
}