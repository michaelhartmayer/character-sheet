import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

/**
 * Transform the value by adding to it. 
 */
class Add extends Operation {
  /**
   * @static
   * @param type {String}
   */
  static type = 'add';

  _value = null;

  /**
   * @constructor 
   * @param {Object} Settings Configuration for the operation.
   * @param {String | Number} Settings.value Adds a number or the calculated value of another selector
   */
  constructor({ value = null }) {
    super(...arguments);
    this._value = value;
  }

  static from(addOperation) {
    let o = new Add({ value: addOperation.value });
    return o;
  }

  import(addOperation) {
    this._value = addOperation.value;
  }

  export() {
    return {
      type: Add.type,
      value: this._value
    };
  }

  transform(value, resolver) {
    if (typeof this._value === 'string') {
      return value + resolver(this._value);
    }

    return value + this._value;
  }
}

export default RegisterWith(Operation)(Add);
