let rockResourceDisplay = document.querySelector('.rock-resource-display')
let rockCountSource = document.querySelector('.rock-count')
let rockCount = parseFloat(rockCountSource.innerHTML)

let limestoneCountSource = document.querySelector('.limestone-count')
let limestoneCount = parseFloat(limestoneCountSource.innerHTML)

let coalCountSource = document.querySelector('.coal-count')
let coalCount = parseFloat(coalCountSource.innerHTML)

let ironoreCountSource = document.querySelector('.ironore-count')
let ironoreCount = parseFloat(ironoreCountSource.innerHTML)

let extractCostSource = document.querySelector('.extract-cost')
let extractCost = parseFloat(extractCostSource.innerHTML)

function updateRockCount() {
  rockCountSource.innerHTML = rockCount
}

function incrementRocks() {
  rockCount += 15
  updateRockCount()
}

function buyExtract() {
  if (rockCount >= extractCost) {
    rockCount -= extractCost
    updateRockCount()

    const roll = Math.floor(Math.random() * 10) + 1
    console.log(roll)
    if (roll < 6) {
      limestoneCount += 1
      limestoneCountSource.innerHTML = limestoneCount
    } else if (roll < 9) {
      coalCount += 1
      coalCountSource.innerHTML = coalCount
    } else {
      ironoreCount += 1
      ironoreCountSource.innerHTML = ironoreCount
    }
  }
}