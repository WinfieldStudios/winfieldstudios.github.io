// 
// DATA

let rocksPerClick = 1
let globalPurchaseMultiplier = 1

let rockImageContainer = document.querySelector('.rock-image-container')

/* how to iterate through this dataset in javascript:
for (const res of Object.values(resources)) {
  console.log(res.name)
}
*/
const resources = {
  rocks: {
    name: 'rocks',
    countSource: document.querySelector('.rock-count'),
    displayContainer: document.querySelector('.rock-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.rock-count').innerHTML)
    },
    set count(value) {
      this.countSource.innerHTML = value
    }
  },
  limestone: {
    name: 'limestone',
    countSource: document.querySelector('.limestone-count'),
    displayContainer: document.querySelector('.limestone-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.limestone-count').innerHTML)
    },
    set count(value) {
      this.countSource.innerHTML = value
    }
  },
  coal: {
    name: 'coal',
    countSource: document.querySelector('.coal-count'),
    displayContainer: document.querySelector('.coal-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.coal-count').innerHTML)
    },
    set count(value) {
      this.countSource.innerHTML = value
    }
  },
  ironore: {
    name: 'ironore',
    countSource: document.querySelector('.ironore-count'),
    displayContainer: document.querySelector('.ironore-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.ironore-count').innerHTML)
    },
    set count(value) {
      this.countSource.innerHTML = value
    }
  }
}

const { rocks, limestone, coal, ironore } = resources

const purchasables = {
  extract: {
    name: 'extract',
    level: 0,
    costSource: document.querySelector('.extract-cost'),
    button: document.querySelector('.extract-button'),
    get cost() {
      return parseFloat(document.querySelector('.extract-cost').innerHTML)
    },
    set cost(value) {
      this.costSource.innerHTML = value
    }
  }
}

const { extract } = purchasables

//
// CLICKING THE ROCK

function updateRockCount() {
  rocks.countSource.innerHTML = rocks.count
  if (rocks.count >= extract.cost * globalPurchaseMultiplier) {
    extract.button.classList.remove("hidden")
    extract.button.classList.add("purchasable")
  } else {
    extract.button.classList.remove("purchasable")
  }
}

function incrementRocks(event) {
  rocks.count += rocksPerClick
  updateRockCount()
  rocks.displayContainer.classList.remove("hidden")

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

//
// PURCHASABLES

function buyExtract() {
  if (rocks.count >= extract.cost * globalPurchaseMultiplier) {
    rocks.count -= extract.cost * globalPurchaseMultiplier
    updateRockCount()

    const roll = Math.floor(Math.random() * 10) + 1
    
    if (roll <= 6) {
      limestone.count += 1
      limestone.countSource.innerHTML = limestone.count
      limestone.displayContainer.classList.remove("hidden")
    } else if (roll <= 9) {
      coal.count += 1
      coal.countSource.innerHTML = coal.count
      coal.displayContainer.classList.remove("hidden")
    } else {
      ironore.count += 1
      ironore.countSource.innerHTML = ironore.count
      ironore.displayContainer.classList.remove("hidden")
    }
  }
}

//
// SAVE AND LOAD

function save() {
  localStorage.clear()

  localStorage.setItem('rockCount', JSON.stringify(rocks.count))
  localStorage.setItem('limestoneCount', JSON.stringify(limestone.count))
  localStorage.setItem('coalCount', JSON.stringify(coal.count))
  localStorage.setItem('ironoreCount', JSON.stringify(ironore.count))
}

function load() {
  rocks.count = JSON.parse(localStorage.getItem('rockCount'))
  limestone.count = JSON.parse(localStorage.getItem('limestoneCount'))
  coal.count = JSON.parse(localStorage.getItem('coalCount'))
  ironore.count = JSON.parse(localStorage.getItem('ironoreCount'))

  rocks.countSource.innerHTML = Math.round(rocks.count)
  limestone.countSource.innerHTML = Math.round(limestone.count)
  coal.countSource.innerHTML = Math.round(coal.count)
  ironore.countSource.innerHTML = Math.round(ironore.count)

  
  if (rocks.count > 0) {
    rocks.displayContainer.classList.remove("hidden")
  } else {
    rocks.displayContainer.classList.add("hidden")
  }
  if (limestone.count > 0) {
    limestone.displayContainer.classList.remove("hidden")
    extract.button.classList.remove("hidden")
  }
  if (coal.count > 0) {
    coal.displayContainer.classList.remove("hidden")
    extract.button.classList.remove("hidden")
  }
  if (ironore.count > 0) {
    ironore.displayContainer.classList.remove("hidden")
    extract.button.classList.remove("hidden")
  }
  if (ironore.count + limestone.count + coal.count == 0) {
    extract.button.classList.add("hidden")
  }
  if (rocks.count >= extract.cost) {
    extract.button.classList.add("purchasable")
    extract.button.classList.remove("hidden")
  } else {
    extract.button.classList.remove("purchasable")
  }
}

function reset() {
  localStorage.clear()
  load()
}