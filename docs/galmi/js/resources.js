// RESOURCE DEFINITIONS

const resources = {
  rocks: {
    name: 'rocks',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.rock-count'),
    displayContainer: document.querySelector('.rock-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        extract.button.classList.remove("hidden");
        upgradeGalmi.button.classList.remove("removed");

        if (upgradeGalmi.level === 5) upgradeGalmi.button.classList.add("removed");
        if (this.gross >= 200) upgradeGalmi.button.classList.remove("hidden");

        if (this.gross > 9999999999) document.querySelector('.scientific-notation-toggle-display').classList.remove("removed");
        
      } else {
        extract.button.classList.add("hidden");
        upgradeGalmi.button.classList.add("hidden");
        upgradePickaxe.button.classList.add("hidden");
        blast.button.classList.add("hidden");
        smelt.button.classList.add("hidden");
        hire.button.classList.add("hidden");
        this.displayContainer.classList.add("hidden");
      }
    }
  },

  limestone: {
    name: 'limestone',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.limestone-count'),
    displayContainer: document.querySelector('.limestone-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        if (this.gross >= 4) upgradePickaxe.button.classList.remove("hidden");
        else upgradePickaxe.button.classList.add("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
      }
    }
  },

  coal: {
    name: 'coal',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.coal-count'),
    displayContainer: document.querySelector('.coal-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        smelt.button.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
        smelt.button.classList.add("hidden");
      }
    }
  },

  ironore: {
    name: 'ironore',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.ironore-count'),
    displayContainer: document.querySelector('.ironore-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) this.displayContainer.classList.remove("hidden");
      else this.displayContainer.classList.add("hidden");
    }
  },

  pigiron: {
    name: 'pigiron',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.pigiron-count'),
    displayContainer: document.querySelector('.pigiron-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        hire.button.classList.remove("hidden");
        blast.button.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
        hire.button.classList.add("hidden");
        blast.button.classList.add("hidden");
      }
    }
  },

  steel: {
    name: 'steel',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.steel-count'),
    displayContainer: document.querySelector('.steel-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        upgradeWorker.button.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
        upgradeWorker.button.classList.add("hidden");
      }
    }
  },

  obsidian: {
    name: 'obsidian',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.obsidian-count'),
    displayContainer: document.querySelector('.obsidian-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
      }
    }
  },

  chromiumore: {
    name: 'chromiumore',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.chromiumore-count'),
    displayContainer: document.querySelector('.chromiumore-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        reduce.button.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
        reduce.button.classList.add("hidden");
      }
    }
  },

  ferrochrome: {
    name: 'ferrochrome',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.ferrochrome-count'),
    displayContainer: document.querySelector('.ferrochrome-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        refine.button.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
        refine.button.classList.add("hidden");
      }
    }
  },

  stainlesssteel: {
    name: 'stainlesssteel',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.stainlesssteel-count'),
    displayContainer: document.querySelector('.stainlesssteel-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) this.displayContainer.classList.remove("hidden");
      else this.displayContainer.classList.add("hidden");
    }
  },

  aluminum: {
    name: 'aluminum',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.aluminum-count'),
    displayContainer: document.querySelector('.aluminum-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        produce.button.classList.remove("hidden");
        aerate.button.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
        produce.button.classList.add("hidden");
        aerate.button.classList.add("hidden");
      }
    }
  },

  concrete: {
    name: 'concrete',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.concrete-count'),
    displayContainer: document.querySelector('.concrete-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.count) {
        this.gross += value - this.count;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) {
        this.displayContainer.classList.remove("hidden");
        housing.button.classList.remove("hidden");
      } else {
        this.displayContainer.classList.add("hidden");
        housing.button.classList.add("hidden");
      }
    }
  },

  chromium: {
    name: 'chromium',
    gross: 0,
    currentCount: 0,
    countSource: document.querySelector('.chromium-count'),
    displayContainer: document.querySelector('.chromium-resource-display'),
    get count() { return this.currentCount; },
    set count(value) {
      if (value > this.currentCount) {
        this.gross += value - this.currentCount;
      }
      this.currentCount = value;
      this.countSource.innerHTML = formatNumberWithCommas(value);

      if (this.gross > 0) this.displayContainer.classList.remove("hidden");
      else this.displayContainer.classList.add("hidden");
    }
  }
};

const { rocks, limestone, coal, ironore, pigiron, steel, obsidian, chromiumore, ferrochrome, stainlesssteel, aluminum, concrete, chromium } = resources;
