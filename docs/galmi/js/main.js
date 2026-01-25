// 
// DATA

const TOTAL_ROCK_IMAGES = 4
const PICKAXE_STARTING_LEVEL = 1
const ROCKS_PER_CLICK_STARTING_AMOUNT = 1
const WORKERS_STARTING_AMOUNT = 0
const GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT = 1
const PURCHASABLES_STARTING_LEVEL = 1
const RESOURCES_STARTING_COUNT = 0
const RESOURCES_STARTING_GROSS = 0

let pickaxeLevel = PICKAXE_STARTING_LEVEL
let rocksPerClick = ROCKS_PER_CLICK_STARTING_AMOUNT
let workers = WORKERS_STARTING_AMOUNT
let globalPurchaseMultiplier = GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT
let darkMode = false

let rockImageContainer = document.querySelector('.rock-image-container')

/* how to iterate through this dataset in javascript:
for (const res of Object.values(resources)) {
  console.log(res.name)
}
*/
const purchasables = {
  extract: {
    name: 'extract',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      rocks: {
        name: "rocks",
        source: document.querySelector('.extract-cost'),
        get amount() {
          return parseFloat(document.querySelector('.extract-cost').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      }
    },
    button: document.querySelector('.extract-button')
  },
  reinvest: {
    name: 'reinvest',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      limestone: {
        name: "limestone",
        source: document.querySelector('.reinvest-cost-limestone'),
        get amount() {
          return parseFloat(document.querySelector('.reinvest-cost-limestone').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      },
      steel: {
        name: "steel",
        source: document.querySelector('.reinvest-cost-steel'),
        get amount() {
          return parseFloat(document.querySelector('.reinvest-cost-steel').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      }
    },
    button: document.querySelector('.reinvest-button'),
  },
  blast: {
    name: 'blast',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      coal: {
        name: "coal",
        source: document.querySelector('.blast-cost-coal'),
        get amount() {
          return parseFloat(document.querySelector('.blast-cost-coal').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      },
      pigiron: {
        name: "pigiron",
        source: document.querySelector('.blast-cost-pigiron'),
        get amount() {
          return parseFloat(document.querySelector('.blast-cost-pigiron').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      }
    },
    button: document.querySelector('.blast-button'),
  },
  smelt: {
    name: 'smelt',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      ironore: {
        name: "ironore",
        source: document.querySelector('.smelt-cost-ironore'),
        get amount() {
          return parseFloat(document.querySelector('.smelt-cost-ironore').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      },
      coal: {
        name: "coal",
        source: document.querySelector('.smelt-cost-coal'),
        get amount() {
          return parseFloat(document.querySelector('.smelt-cost-coal').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      },
      limestone: {
        name: "limestone",
        source: document.querySelector('.smelt-cost-limestone'),
        get amount() {
          return parseFloat(document.querySelector('.smelt-cost-limestone').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      }
    },
    button: document.querySelector('.smelt-button'),
  },
  hire: {
    name: 'hire',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      pigiron: {
        name: "pigiron",
        source: document.querySelector('.hire-cost'),
        get amount() {
          return parseFloat(document.querySelector('.hire-cost').innerHTML)
        },
        set amount(value) {
          this.source.innerHTML = value
        }
      }
    },
    button: document.querySelector('.hire-button')
  }
}

const { extract, reinvest, roast, blast, smelt, hire } = purchasables

const resources = {
  rocks: {
    name: 'rocks',
    gross: 0,
    countSource: document.querySelector('.rock-count'),
    displayContainer: document.querySelector('.rock-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.rock-count').innerHTML)
    },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden")
        extract.button.classList.remove("hidden")
      } else {
        this.displayContainer.classList.add("hidden")
        extract.button.classList.add("hidden")
      }
    }
  },
  limestone: {
    name: 'limestone',
    gross: 0,
    countSource: document.querySelector('.limestone-count'),
    displayContainer: document.querySelector('.limestone-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.limestone-count').innerHTML)
    },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden")
        reinvest.button.classList.remove("hidden")
      } else {
        this.displayContainer.classList.add("hidden")
        reinvest.button.classList.add("hidden")
      }
    }
  },
  coal: {
    name: 'coal',
    gross: 0,
    countSource: document.querySelector('.coal-count'),
    displayContainer: document.querySelector('.coal-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.coal-count').innerHTML)
    },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden")
        blast.button.classList.remove("hidden")
      } else {
        this.displayContainer.classList.add("hidden")
        blast.button.classList.add("hidden")
      }
    }
  },
  ironore: {
    name: 'ironore',
    gross: 0,
    countSource: document.querySelector('.ironore-count'),
    displayContainer: document.querySelector('.ironore-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.ironore-count').innerHTML)
    },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden")
        smelt.button.classList.remove("hidden")
      } else {
        this.displayContainer.classList.add("hidden")
        smelt.button.classList.add("hidden")
      }
    }
  },
  pigiron: {
    name: 'pigiron',
    gross: 0,
    countSource: document.querySelector('.pigiron-count'),
    displayContainer: document.querySelector('.pigiron-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.pigiron-count').innerHTML)
    },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      if (this.gross > 0)  {
        this.displayContainer.classList.remove("hidden")
        hire.button.classList.remove("hidden")
      } else {
        this.displayContainer.classList.add("hidden")
        hire.button.classList.add("hidden")
      }
    }
  },
  steel: {
    name: 'steel',
    gross: 0,
    countSource: document.querySelector('.steel-count'),
    displayContainer: document.querySelector('.steel-resource-display'),
    get count() {
      return parseFloat(document.querySelector('.steel-count').innerHTML)
    },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden")
      } else {
        this.displayContainer.classList.add("hidden")
      }
    }
  }
}

const { rocks, limestone, coal, coke, ironore, pigiron, steel } = resources

//
// CLICKING THE ROCK

function clickOnRock(event) {
  rocks.count += rocksPerClick

  const x = event.offsetX + (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1)
  const y = event.offsetY - (50 + Math.floor(Math.random() * 30) + 1)

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
  
  checkPurchasables()
}

//
// PURCHASABLES

function checkPurchasables() {
  for (const purchasable of Object.values(purchasables)) {
    purchasable.button.classList.add("enabled")
    for (const cost of Object.values(purchasable.costs)) {
      const resource = resources[cost.name]
      if (!resource) {
        console.log("Unknown resource: ", cost.name)
      } else {
        if (resource.count < cost.amount * globalPurchaseMultiplier) {
          purchasable.button.classList.remove("enabled")
        }
      }
    }
  }
}

function purchaseExtract() {
  if (rocks.count >= extract.costs.rocks.amount * globalPurchaseMultiplier) {
    rocks.count -= extract.costs.rocks.amount * globalPurchaseMultiplier

    let roll = Math.floor(Math.random() * 10) + 1
    
    if (globalPurchaseMultiplier <= 10000) {
      for (let i = 0; i < globalPurchaseMultiplier; i++) {
        if (roll <= 6) {
          limestone.count++
        } else if (roll <= 9) {
          coal.count++
        } else {
          ironore.count++
        }
        roll = Math.floor(Math.random() * 10) + 1
      }
    } else {
      limestone.count += parseInt(0.6 * globalPurchaseMultiplier)
      coal.count += parseInt(0.3 * globalPurchaseMultiplier)
      ironore.count += parseInt(0.1 * globalPurchaseMultiplier)
    }

    extract.level += globalPurchaseMultiplier
    checkPurchasables()
  }
}

function purchaseReinvest() {

  for (let i = 0; i < globalPurchaseMultiplier; i++) {
    if (limestone.count >= reinvest.costs.limestone.amount && steel.count >= reinvest.costs.steel.amount) {

      limestone.count -= reinvest.costs.limestone.amount
      if (reinvest.costs.steel.amount > 0) {
        steel.count -= reinvest.costs.steel.amount
      }

      rocksPerClick += 1

      reinvest.level += 1
      reinvest.costs.limestone.amount += 10
      if (reinvest.level >= 4) {
        reinvest.costs.steel.amount += 1
      }
      checkPurchasables()

      let rockImage = document.querySelector('.rock-image')
      if (reinvest.level <= TOTAL_ROCK_IMAGES) {
        rockImage.src = `/galmi/img/rocks/${reinvest.level}.png`
      } else {
        rockImage.src = `/galmi/img/rocks/${TOTAL_ROCK_IMAGES}.png`
      }
    }
  }
}

function purchaseBlast() {
  if (coal.count >= blast.costs.coal.amount * globalPurchaseMultiplier && pigiron.count >= blast.costs.pigiron.amount * globalPurchaseMultiplier) {
    coal.count -= blast.costs.coal.amount * globalPurchaseMultiplier
    pigiron.count -= blast.costs.pigiron.amount
    
    steel.count += globalPurchaseMultiplier

    blast.level += globalPurchaseMultiplier
    checkPurchasables()
  }
}

function purchaseSmelt() {
  if (ironore.count >= smelt.costs.ironore.amount * globalPurchaseMultiplier && coal.count >= smelt.costs.coal.amount * globalPurchaseMultiplier && limestone.count >= smelt.costs.limestone.amount * globalPurchaseMultiplier) {
    ironore.count -= smelt.costs.ironore.amount * globalPurchaseMultiplier
    coal.count -= smelt.costs.coal.amount * globalPurchaseMultiplier
    limestone.count -= smelt.costs.limestone.amount * globalPurchaseMultiplier

    pigiron.count += 2 * globalPurchaseMultiplier

    smelt.level += globalPurchaseMultiplier
    checkPurchasables()
  }
}

function purchaseHire() {
  if (pigiron.count >= hire.costs.pigiron.amount * globalPurchaseMultiplier) {
    pigiron.count -= hire.costs.pigiron.amount * globalPurchaseMultiplier

    workers += globalPurchaseMultiplier

    hire.level += globalPurchaseMultiplier
    checkPurchasables()
  }
}

//
// TIME
setInterval(() => {
  if (workers > 0) {
    rocks.count += workers
    checkPurchasables()
  }
}, 1000)

//
// PURCHASE MULTIPLIER

function setGlobalPurchaseMultiplier(value) {
  globalPurchaseMultiplier = value

  const display = document.querySelectorAll('.multiplier')
  for (const element of display) {
    element.innerHTML = globalPurchaseMultiplier
  }

  document.getElementById(`option${globalPurchaseMultiplier}`).checked = true

  checkPurchasables()
}

//
// DARK MODE
function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const targetTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", targetTheme);
  document.getElementById("dark-mode-toggle").innerText = targetTheme === "dark" ? "Light" : "Dark";
  darkMode = targetTheme === "dark" ? true : false
}

//
// SAVE AND LOAD

function save() {
  localStorage.clear()

  localStorage.setItem('pickaxeLevel', JSON.stringify(pickaxeLevel))
  localStorage.setItem('rocksPerClick', JSON.stringify(rocksPerClick))
  localStorage.setItem('workers', JSON.stringify(workers))
  localStorage.setItem('darkMode', JSON.stringify(darkMode))

  for (const purchasable of Object.values(purchasables)) {
    const key = `${purchasable.name}Level`
    localStorage.setItem(key, JSON.stringify(purchasable.level))
  }
  for (const resource of Object.values(resources)) {
    const countKey = `${resource.name}Count`
    localStorage.setItem(countKey, JSON.stringify(resource.count))
    const grossKey = `${resource.name}Gross`
    localStorage.setItem(grossKey, JSON.stringify(resource.gross))
  }
}

function load() {

  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT)
  
  const savedPickaxeLevel = JSON.parse(localStorage.getItem('pickaxeLevel'))
  if (savedPickaxeLevel !== null) {
    pickaxeLevel = savedPickaxeLevel
  }

  const savedRocksPerClick = JSON.parse(localStorage.getItem('rocksPerClick'))
  if (savedRocksPerClick !== null) {
    rocksPerClick = savedRocksPerClick
  }

  const savedWorkers = JSON.parse(localStorage.getItem('workers'))
  if (savedWorkers !== null) {
    workers = savedWorkers
  }

  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'))
  if (savedDarkMode !== null) {
    darkMode = savedDarkMode
    if (darkMode) {
      toggleDarkMode()
    }
  }

  for (const purchasable of Object.values(purchasables)) {

    const key = `${purchasable.name}Level`
    const savedLevel = JSON.parse(localStorage.getItem(key))
    if (savedLevel !== null) {
      purchasable.level = savedLevel
    }
  }
  for (const resource of Object.values(resources)) {
    const grossKey = `${resource.name}Gross`
    const savedGross = JSON.parse(localStorage.getItem(grossKey))
    if (savedGross !== null) {
      resource.gross = savedGross
    }
    const countKey = `${resource.name}Count`
    const savedCount = JSON.parse(localStorage.getItem(countKey))
    if (savedCount !== null) {
      resource.count = savedCount
    }
  }
  checkPurchasables()
}

function restart() {

  setGlobalPurchaseMultiplier(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT)
  
  const savedPickaxeLevel = JSON.parse(localStorage.getItem('pickaxeLevel'))
  if (savedPickaxeLevel !== null) {
    pickaxeLevel = PICKAXE_STARTING_LEVEL
  }

  const savedRocksPerClick = JSON.parse(localStorage.getItem('rocksPerClick'))
  if (savedRocksPerClick !== null) {
    rocksPerClick = ROCKS_PER_CLICK_STARTING_AMOUNT
  }

  const savedWorkers = JSON.parse(localStorage.getItem('workers'))
  if (savedWorkers !== null) {
    workers = WORKERS_STARTING_AMOUNT
  }

  for (const purchasable of Object.values(purchasables)) {

    const key = `${purchasable.name}Level`
    const savedLevel = JSON.parse(localStorage.getItem(key))
    if (savedLevel !== null) {
      purchasable.level = PURCHASABLES_STARTING_LEVEL
    }
  }
  for (const resource of Object.values(resources)) {
    const grossKey = `${resource.name}Gross`
    const savedGross = JSON.parse(localStorage.getItem(grossKey))
    if (savedGross !== null) {
      resource.gross = RESOURCES_STARTING_GROSS
      resource.displayContainer.classList.add("hidden")
    }
    const countKey = `${resource.name}Count`
    const savedCount = JSON.parse(localStorage.getItem(countKey))
    if (savedCount !== null) {
      resource.count = RESOURCES_STARTING_COUNT
    }
  }
  checkPurchasables()

}

function clearSave() {
  localStorage.clear()

  localStorage.setItem('pickaxeLevel', JSON.stringify(PICKAXE_STARTING_LEVEL))
  localStorage.setItem('rocksPerClick', JSON.stringify(ROCKS_PER_CLICK_STARTING_AMOUNT))
  localStorage.setItem('workers', JSON.stringify(WORKERS_STARTING_AMOUNT))
  localStorage.setItem('globalPurchaseMultiplier', JSON.stringify(GLOBAL_PURCHASE_MULTIPLIER_STARTING_AMOUNT))

  for (const purchasable of Object.values(purchasables)) {
    const key = `${purchasable.name}Level`
    localStorage.setItem(key, JSON.stringify(PURCHASABLES_STARTING_LEVEL))
  }
  for (const resource of Object.values(resources)) {
    const countKey = `${resource.name}Count`
    localStorage.setItem(countKey, JSON.stringify(RESOURCES_STARTING_COUNT))
    const grossKey = `${resource.name}Gross`
    localStorage.setItem(grossKey, JSON.stringify(RESOURCES_STARTING_GROSS))
  }
}