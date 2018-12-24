import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

// @RegisterWith(Operation)
class Modifies extends Operation {
  static type = 'modifies';
  type = 'modifies';

  _target = null;

  // @TODO this is a hack for not being able to check the type on an instance.
  // need something smarter here. this is being used in CharacterSheet.prototype._resolve
  modifies = true;

  get target() {
    return this._target;
  }

  constructor(target = '') {
    super(...arguments);
    this._target = target;
  }

  static from(operation) {
    let o = new Modifies();
    o.import(operation);
    return o;
  }

  import(operation) {
    this._target = operation.target;
  }

  export() {
    return {
      type: Modifies.type,
      target: this._target
    };
  }

  transform(value, resolver) {
    return Math.floor(value);
  }
}

export default RegisterWith(Operation)(Modifies);
