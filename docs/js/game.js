// 
// DATA

let rockLevel = 1
let pickaxeLevel = 1
let rocksPerClick = 1
let workers = 0
let globalPurchaseMultiplier = 1

let rockImageContainer = document.querySelector('.rock-image-container')

/* how to iterate through this dataset in javascript:
for (const res of Object.values(resources)) {
  console.log(res.name)
}
*/
const purchasables = {
  extract: {
    name: 'extract',
    level: 0,
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
    level: 0,
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
    level: 0,
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
    level: 0,
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
          return parseFloat(document.querySelector('.smelt-cost-coke').innerHTML)
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
    level: 0,
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
      this.displayContainer.classList.remove("hidden")
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      extract.button.classList.remove("hidden")
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
      this.displayContainer.classList.remove("hidden")
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      reinvest.button.classList.remove("hidden")
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
      this.displayContainer.classList.remove("hidden")
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      roast.button.classList.remove("hidden")
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
      this.displayContainer.classList.remove("hidden")
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      smelt.button.classList.remove("hidden")
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
      this.displayContainer.classList.remove("hidden")
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
      hire.button.classList.remove("hidden")
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
      this.displayContainer.classList.remove("hidden")
      if (value > this.count) {
        this.gross += value - this.count
      }
      this.countSource.innerHTML = value
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
        if (resource.count < cost.amount) {
          purchasable.button.classList.remove("enabled")
        }
      }
    }
  }
}

function purchaseExtract() {
  if (rocks.count >= extract.costs.rocks.amount * globalPurchaseMultiplier) {
    rocks.count -= extract.costs.rocks.amount * globalPurchaseMultiplier

    const roll = Math.floor(Math.random() * 10) + 1
    
    if (globalPurchaseMultiplier < 10000) {
      for (let i = 0; i < globalPurchaseMultiplier; i++) {
        if (roll <= 6) {
          limestone.count++
        } else if (roll <= 9) {
          coal.count++
        } else {
          ironore.count++
        }
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
  if (limestone.count >= reinvest.costs.limestone.amount * globalPurchaseMultiplier && steel.count >= reinvest.costs.steel.amount * globalPurchaseMultiplier) {
    limestone.count -= reinvest.costs.limestone.amount * globalPurchaseMultiplier
    if (reinvest.costs.steel.amount > 0) {
      steel.count -= reinvest.costs.steel.amount * globalPurchaseMultiplier
    }

    reinvest.costs.limestone.amount += 10 * globalPurchaseMultiplier
    reinvest.costs.steel.amount += globalPurchaseMultiplier
    rocksPerClick += globalPurchaseMultiplier

    reinvest.level += globalPurchaseMultiplier
    checkPurchasables()
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
    extract.button.classList.add("enabled")
    extract.button.classList.remove("hidden")
  } else {
    extract.button.classList.remove("enabled")
  }
  checkPurchasables()
}

function reset() {
  localStorage.clear()
  load()
}