import Modifier from './Modifier';

class Inventory {
  _modifiers = [];
  _description = null;
  _active = true;

  describe(description) {
    this._description = description;
    return this;
  }

  static from(inventory) {
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

  give(quantity) {
    return {
      of: modifier => {
        while (quantity--) this._modifiers.push(modifier);
        return this;
      }
    };
  }

  filter(fn) {
    this._modifiers.filter(fn);
  }

  map(fn) {
    return this._modifiers.map(fn);
  }

  forEach(fn) {
    this._modifiers.forEach(fn);
  }

  on() {
    this._active = true;
  }

  off() {
    this._active = false;
  }

  import(inventory) {
    this._modifiers = inventory.modifiers.map(modifier =>
      Modifier.from(modifier)
    );
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
}

export default Inventory;
