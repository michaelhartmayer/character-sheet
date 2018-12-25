import Modifier from './Modifier';

class Inventory {
  _modifiers = [];
  _description = null;
  _active = true;

  describe(description) {
    this._description = description;
    return this;
  }

  static from(inventory = []) {
    // generate a new inventory
    let i = new Inventory();

    // import inventory from object
    i.import(inventory);

    // return inventory
    return i;
  }

  get modifiers() {
    return this._modifiers;
  }

  get description() {
    return this._description;
  }

  give(quantity = 1) {
    return {
      of: modifier => {
        while (quantity--) this._modifiers.push(modifier);
        return this;
      }
    };
  }

  /**
   * Prunes inventory. If the prune callback function
   * returns true, the modifier will remain present.
   * Otherwise it will be removed from the inventory.
   * 
   * @param {Function} fn callback functions
   * 
   */
  prune (fn = () => {}) {
    this._modifiers = this.modifiers.filter(modifier => {
      return fn(modifier);
    });

    return this;
  }

  forEach(fn = () => {}) {
    this._modifiers.forEach(fn);
    return this;
  }

  on() {
    this._active = true;
    return this;
  }

  off() {
    this._active = false;
    return this;
  }

  import(inventory = {}) {
    // apply defaults
    inventory = {
      modifiers: [],
      active: true,
      description: null,

      ...inventory
    };

    // if there are modifiers present
    // if (inventory.modifiers) {
      this._modifiers = inventory.modifiers.map(modifier =>
        Modifier.from(modifier)
      );
    // }

    // other static properties
    this._description = inventory.description;
    this._active = inventory.active;
  }

  export() {
    return {
      description: this._description,
      modifiers: this._modifiers.map(modifier => modifier.export()),
      active: this._active
    };
  }

  get size() {
    return this._modifiers.length;
  }
}

export default Inventory;
