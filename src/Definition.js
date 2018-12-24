import Op from './operations';
import Operation from './Operation';

class Definition {
  _operations = [];
  _description = null;
  _initially = null;
  _set = null;

  get operations() {
    return this._operations;
  }

  describe(description) {
    this._description = description;
    return this;
  }

  get description() {
    return this._description;
  }

  initially(initialValue) {
    this._initially = initialValue;
    return this;
  }

  using(...selectors) {
    return {
      calculate: fn => {
        this._operations.push(new Op.Calculate({ selectors, fn }));
        return this;
      }
    };
  }

  set(value) {
    this._set = value;
  }

  get() {
    return this._set || this._initially;
  }

  add(value) {
    this._operations.push(new Op.Add({ value }));
    return this;
  }

  subtract(value) {
    this._operations.push(new Op.Subtract({ value }));
    return this;
  }

  divideBy(value) {
    this._operations.push(new Op.DivideBy({ value }));
    return this;
  }

  roundUp() {
    this._operations.push(new Op.RoundUp());
    return this;
  }

  roundDown() {
    this._operations.push(new Op.RoundDown());
    return this;
  }

  calculate({ selectors = [], fn }) {
    this._operations.push(new Op.Calculate({ selectors, fn }));
    return this;
  }

  import(definition) {
    this._initially = definition.initally;
    this._description = definition.description;
    this._set = definition.set;
    this._operations = definition.operations.map(o => Operation.from(o));
  }

  export() {
    return {
      initally: this._initially,
      description: this._description,
      set: this._set,
      operations: this._operations.map(o => o.export())
    };
  }

  static from(definition) {
    // new definition
    const d = new Definition();

    // import the definition object
    d.import(definition);

    // return the new definition
    return d;
  }
}

export default Definition;
