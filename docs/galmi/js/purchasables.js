// PURCHASABLE DEFINITIONS

const purchasables = {
  extract: {
    name: 'extract',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      rocks: {
        name: "rocks",
        source: document.querySelector('.extract-cost'),
        get amount() { return parseFloat(document.querySelector('.extract-cost').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.extract-button')
  },

  upgradeGalmi: {
    name: 'upgrade-galmi',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      rocks: {
        name: "rocks",
        source: document.querySelector('.upgrade-galmi-cost-rocks'),
        get amount() { return parseFloat(document.querySelector('.upgrade-galmi-cost-rocks').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.upgrade-galmi-button')
  },

  upgradePickaxe: {
    name: 'upgrade-pickaxe',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      limestone: {
        name: "limestone",
        source: document.querySelector('.upgrade-pickaxe-cost-limestone'),
        get amount() { return parseFloat(document.querySelector('.upgrade-pickaxe-cost-limestone').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      steel: {
        name: "steel",
        source: document.querySelector('.upgrade-pickaxe-cost-steel'),
        get amount() { return parseFloat(document.querySelector('.upgrade-pickaxe-cost-steel').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      stainlesssteel: {
        name: "stainlesssteel",
        source: document.querySelector('.upgrade-pickaxe-cost-stainlesssteel'),
        get amount() { return parseFloat(document.querySelector('.upgrade-pickaxe-cost-stainlesssteel').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      chromium: {
        name: "chromium",
        source: document.querySelector('.upgrade-pickaxe-cost-chromium'),
        get amount() { return parseFloat(document.querySelector('.upgrade-pickaxe-cost-chromium').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.upgrade-pickaxe-button'),
  },

  blast: {
    name: 'blast',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      coal: {
        name: "coal",
        source: document.querySelector('.blast-cost-coal'),
        get amount() { return parseFloat(document.querySelector('.blast-cost-coal').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      pigiron: {
        name: "pigiron",
        source: document.querySelector('.blast-cost-pigiron'),
        get amount() { return parseFloat(document.querySelector('.blast-cost-pigiron').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
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
        get amount() { return parseFloat(document.querySelector('.smelt-cost-ironore').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      coal: {
        name: "coal",
        source: document.querySelector('.smelt-cost-coal'),
        get amount() { return parseFloat(document.querySelector('.smelt-cost-coal').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      limestone: {
        name: "limestone",
        source: document.querySelector('.smelt-cost-limestone'),
        get amount() { return parseFloat(document.querySelector('.smelt-cost-limestone').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
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
        source: document.querySelector('.hire-cost-pigiron'),
        get amount() { return parseFloat(document.querySelector('.hire-cost-pigiron').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      limestone: {
        name: "limestone",
        source: document.querySelector('.hire-cost-limestone'),
        get amount() { return parseFloat(document.querySelector('.hire-cost-limestone').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.hire-button')
  },

  reduce: {
    name: 'reduce',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      chromiumore: {
        name: "chromiumore",
        source: document.querySelector('.reduce-cost-chromiumore'),
        get amount() { return parseFloat(document.querySelector('.reduce-cost-chromiumore').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      coal: {
        name: "coal",
        source: document.querySelector('.reduce-cost-coal'),
        get amount() { return parseFloat(document.querySelector('.reduce-cost-coal').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      limestone: {
        name: "limestone",
        source: document.querySelector('.reduce-cost-limestone'),
        get amount() { return parseFloat(document.querySelector('.reduce-cost-limestone').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
    },
    button: document.querySelector('.reduce-button')
  },

  refine: {
    name: 'refine',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      ferrochrome: {
        name: "ferrochrome",
        source: document.querySelector('.refine-cost-ferrochrome'),
        get amount() { return parseFloat(document.querySelector('.refine-cost-ferrochrome').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      steel: {
        name: "steel",
        source: document.querySelector('.refine-cost-steel'),
        get amount() { return parseFloat(document.querySelector('.refine-cost-steel').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.refine-button')
  },

  aerate: {
    name: 'aerate',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      aluminum: {
        name: "aluminum",
        source: document.querySelector('.aerate-cost-aluminum'),
        get amount() { return parseFloat(document.querySelector('.aerate-cost-aluminum').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      limestone: {
        name: "limestone",
        source: document.querySelector('.aerate-cost-limestone'),
        get amount() { return parseFloat(document.querySelector('.aerate-cost-limestone').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.aerate-button')
  },

  produce: {
    name: 'produce',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      chromiumore: {
        name: "chromiumore",
        source: document.querySelector('.produce-cost-chromiumore'),
        get amount() { return parseFloat(document.querySelector('.produce-cost-chromiumore').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      aluminum: {
        name: "aluminum",
        source: document.querySelector('.produce-cost-aluminum'),
        get amount() { return parseFloat(document.querySelector('.produce-cost-aluminum').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.produce-button')
  },

  upgradeWorker: {
    name: 'upgrade-worker',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      obsidian: {
        name: "obsidian",
        source: document.querySelector('.upgrade-worker-cost-obsidian'),
        get amount() { return parseFloat(document.querySelector('.upgrade-worker-cost-obsidian').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      steel: {
        name: "steel",
        source: document.querySelector('.upgrade-worker-cost-steel'),
        get amount() { return parseFloat(document.querySelector('.upgrade-worker-cost-steel').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.upgrade-worker-button')
  },

  housing: {
    name: 'housing',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      concrete: {
        name: "concrete",
        source: document.querySelector('.housing-cost-concrete'),
        get amount() { return parseFloat(document.querySelector('.housing-cost-concrete').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      chromium: {
        name: "chromium",
        source: document.querySelector('.housing-cost-chromium'),
        get amount() { return parseFloat(document.querySelector('.housing-cost-chromium').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      obsidian: {
        name: "obsidian",
        source: document.querySelector('.housing-cost-obsidian'),
        get amount() { return parseFloat(document.querySelector('.housing-cost-obsidian').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.housing-button')
  }
}

const { extract, upgradeGalmi, upgradePickaxe, blast, smelt, hire, reduce, refine, aerate, produce, upgradeWorker, housing } = purchasables
