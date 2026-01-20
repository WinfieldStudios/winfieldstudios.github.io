let rockCountSource = document.querySelector('.rock-count')
let rockCount = parseFloat(rockCountSource.innerHTML)

let limestoneCountSource = document.querySelector('.limestone-count')
let limestoneCount = parseFloat(limestoneCountSource.innerHTML)

let coalCountSource = document.querySelector('.coal-count')
let coalCount = parseFloat(coalCountSource.innerHTML)

let ironCountSource = document.querySelector('.iron-count')
let ironCount = parseFloat(ironCountSource.innerHTML)

let extractCostSource = document.querySelector('.extract-cost')
let extractCost = parseFloat(extractCostSource.innerHTML)

function updateRockCount() {
  rockCountSource.innerHTML = rockCount
}

function incrementRocks() {
  rockCount += 1
  updateRockCount()
}

function buyExtract() {
  if (rockCount >= extractCost) {
    rockCount -= extractCost
    updateRockCount()

    const roll = Math.floor(Math.random() * 10) + 1
    if (roll < 6) {
      limestoneCount += 1
      limestoneCountSource.innerHTML = limestoneCount
    } else if (roll < 9) {
      coalCount += 1
      coalCountSource.innerHTML = coalCount
    } else {
      ironCount += 1
      ironCountSource.innerHTML = ironCount
    }
  }
}