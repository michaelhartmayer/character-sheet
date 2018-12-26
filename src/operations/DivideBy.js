import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

// @RegisterWith(Operation)
class DivideBy extends Operation {
  static type = 'divide-by';

  _value = null;

  constructor({ value = null }) {
    super(...arguments);
    this._value = value;
  }

  static from(addOperation) {
    let o = new DivideBy({ value: addOperation.value });
    return o;
  }

  import(addOperation) {
    this._value = addOperation.value;
  }

  export() {
    return {
      type: DivideBy.type,
      value: this._value
    };
  }

  transform(value, resolver) {
    if (typeof this._value === 'string') {
      return value / resolver(this._value);
    }

    return value / this._value;
  }
}

export default RegisterWith(Operation)(DivideBy);
