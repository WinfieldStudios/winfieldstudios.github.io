let rockCount = document.querySelector('.rock-count')
let parsedRockCount = parseFloat(rockCount.innerHTML)

let extractCost = document.querySelector('.extract-cost')
let parsedExtractCost = parseFloat(extractCost.innerHTML)

function updateRockCount() {
  rockCount.innerHTML = parsedRockCount
}

function incrementRocks() {
  parsedRockCount += 1
  updateRockCount()
}

function buyExtract() {
  if (parsedRockCount >= parsedExtractCost) {
    parsedRockCount -= parsedExtractCost
    updateRockCount()
  }
}