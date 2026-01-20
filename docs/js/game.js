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

let extractResourceDisplay = document.querySelector('.extract-resource-display')
let extractCostSource = document.querySelector('.extract-cost')
let extractCost = parseFloat(extractCostSource.innerHTML)

function updateRockCount() {
  rockCountSource.innerHTML = rockCount
  if (rockCount >= 15) {
    extractResourceDisplay.classList.remove("hidden")
  }
}

function incrementRocks() {
  rockCount += 1
  updateRockCount()
  rockResourceDisplay.classList.remove("hidden")
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
    extractResourceDisplay.classList.remove("hidden")
  } else {
    extractResourceDisplay.classList.add("hidden")
  }
  if (coalCount > 0) {
    coalResourceDisplay.classList.remove("hidden")
    extractResourceDisplay.classList.remove("hidden")
  } else {
    extractResourceDisplay.classList.add("hidden")
  }
  if (ironoreCount > 0) {
    ironoreResourceDisplay.classList.remove("hidden")
    extractResourceDisplay.classList.remove("hidden")
  } else {
    extractResourceDisplay.classList.add("hidden")
  }
  if (ironoreCount + limestoneCount + coalCount == 0) {
    extractResourceDisplay.classList.add("hidden")
  }
}

function reset() {
  localStorage.clear()
  load()
}