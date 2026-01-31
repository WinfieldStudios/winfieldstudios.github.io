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
        source: document.querySelector('.hire-cost'),
        get amount() { return parseFloat(document.querySelector('.hire-cost').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      },
      limestone: {
        name: "limestone",
        source: document.querySelector('.smelt-cost-limestone'),
        get amount() { return parseFloat(document.querySelector('.smelt-cost-limestone').innerHTML); },
        set amount(value) { this.source.innerHTML = value; }
      }
    },
    button: document.querySelector('.hire-button')
  }
};

const { extract, upgradeGalmi, upgradePickaxe, blast, smelt, hire } = purchasables;
