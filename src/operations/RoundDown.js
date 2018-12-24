import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

// @RegisterWith(Operation)
class RoundDown extends Operation {
  static type = 'round-down';

  static from(addOperation) {
    let o = new RoundDown();
    return o;
  }

  import() {}

  export() {
    return {
      type: RoundDown.type
    };
  }

  transform(value, resolver) {
    return Math.floor(value);
  }
}

export default RegisterWith(Operation)(RoundDown);
