import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

// @RegisterWith(Operation)
class Subtract extends Operation {
  static type = 'subtract';

  _value = null;

  constructor({ value = null }) {
    super(...arguments);
    this._value = value;
  }

  static from(subtractOperation) {
    let o = new Subtract({ value: subtractOperation.value });
    return o;
  }

  import(subtractOperation) {
    this._value = subtractOperation.value;
  }

  export() {
    return {
      type: Subtract.type,
      value: this._value
    };
  }

  transform(value, resolver) {
    if (typeof this._value === 'string') {
      return value - resolver(this._value);
    }

    return value - this._value;
  }
}

export default RegisterWith(Operation)(Subtract);
