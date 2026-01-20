let rockCount = document.querySelector('.rock-count')
let parsedRockCount = parseFloat(rockCount.innerHTML)

let extractCost = document.querySelector('.extract-cost')
let parsedExtractCost = parseFloat(extractCost.innerHTML)

function incrementRocks() {
  parsedRockCount += 1
  rockCount.innerHTML = parsedRockCount
}

function buyExtract() {
  if (parsedRockCount >= parsedExtractCost) {
    parsedRockCount -= parsedExtractCost
    rockCount.innerHTML = parsedRockCount
  }
}