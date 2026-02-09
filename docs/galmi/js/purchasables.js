// PURCHASABLE DEFINITIONS

const purchasables = {
  extract: {
    name: 'extract',
    level: PURCHASABLES_STARTING_LEVEL,
    costs: {
      rocks: {
        name: "rocks",
        cost: EXTRACT_COST_ROCKS,
        source: document.querySelector('.extract-cost'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value);
        }
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
        cost: UPGRADE_GALMI_BASE_COST_ROCKS,
        source: document.querySelector('.upgrade-galmi-cost-rocks'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumberWithCommas(value); 
        }
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
        cost: UPGRADE_PICKAXE_BASE_COST_LIMESTONE,
        source: document.querySelector('.upgrade-pickaxe-cost-limestone'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      steel: {
        name: "steel",
        cost: UPGRADE_PICKAXE_BASE_COST_STEEL,
        source: document.querySelector('.upgrade-pickaxe-cost-steel'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      stainlesssteel: {
        name: "stainlesssteel",
        cost: UPGRADE_PICKAXE_BASE_COST_STAINLESSSTEEL,
        source: document.querySelector('.upgrade-pickaxe-cost-stainlesssteel'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      chromium: {
        name: "chromium",
        cost: UPGRADE_PICKAXE_BASE_COST_CHROMIUM,
        source: document.querySelector('.upgrade-pickaxe-cost-chromium'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
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
        cost: BLAST_COST_COAL,
        source: document.querySelector('.blast-cost-coal'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      pigiron: {
        name: "pigiron",
        cost: BLAST_COST_PIGIRON,
        source: document.querySelector('.blast-cost-pigiron'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
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
        cost: SMELT_COST_IRONORE,
        source: document.querySelector('.smelt-cost-ironore'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      coal: {
        name: "coal",
        cost: SMELT_COST_COAL,
        source: document.querySelector('.smelt-cost-coal'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      limestone: {
        name: "limestone",
        cost: SMELT_COST_LIMESTONE,
        source: document.querySelector('.smelt-cost-limestone'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
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
        cost: HIRE_COST_PIGIRON,
        source: document.querySelector('.hire-cost-pigiron'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      limestone: {
        name: "limestone",
        cost: HIRE_COST_LIMESTONE,
        source: document.querySelector('.hire-cost-limestone'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
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
        cost: REDUCE_COST_CHROMIUMORE,
        source: document.querySelector('.reduce-cost-chromiumore'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      coal: {
        name: "coal",
        cost: REDUCE_COST_COAL,
        source: document.querySelector('.reduce-cost-coal'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      limestone: {
        name: "limestone",
        cost: REDUCE_COST_LIMESTONE,
        source: document.querySelector('.reduce-cost-limestone'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
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
        cost: REFINE_COST_FERROCHROME,
        source: document.querySelector('.refine-cost-ferrochrome'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      steel: {
        name: "steel",
        cost: REFINE_COST_STEEL,
        source: document.querySelector('.refine-cost-steel'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
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
        cost: MIX_COST_ALUMINUM,
        source: document.querySelector('.aerate-cost-aluminum'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      limestone: {
        name: "limestone",
        cost: MIX_COST_LIMESTONE,
        source: document.querySelector('.aerate-cost-limestone'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      stainlesssteel: {
        name: "stainlesssteel",
        cost: MIX_COST_STAINLESSSTEEL,
        source: document.querySelector('.aerate-cost-stainlesssteel'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
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
        cost: PRODUCE_COST_CHROMIUMORE,
        source: document.querySelector('.produce-cost-chromiumore'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      aluminum: {
        name: "aluminum",
        cost: PRODUCE_COST_ALUMINUM,
        source: document.querySelector('.produce-cost-aluminum'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
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
        cost: PROMOTE_COST_OBSIDIAN,
        source: document.querySelector('.upgrade-worker-cost-obsidian'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      steel: {
        name: "steel",
        cost: PROMOTE_COST_STEEL,
        source: document.querySelector('.upgrade-worker-cost-steel'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
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
        cost: HOUSING_COST_CONCRETE,
        source: document.querySelector('.housing-cost-concrete'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      chromium: {
        name: "chromium",
        cost: HOUSING_COST_CHROMIUM,
        source: document.querySelector('.housing-cost-chromium'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      },
      obsidian: {
        name: "obsidian",
        cost: HOUSING_COST_OBSIDIAN,
        source: document.querySelector('.housing-cost-obsidian'),
        get amount() { 
          return this.cost; 
        },
        set amount(value) { 
          this.cost = value;
          this.source.innerHTML = formatNumber(value); 
        }
      }
    },
    button: document.querySelector('.housing-button')
  }
}

const { extract, upgradeGalmi, upgradePickaxe, blast, smelt, hire, reduce, refine, aerate, produce, upgradeWorker, housing } = purchasables
