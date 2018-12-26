import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

// @RegisterWith(Operation)
class RoundUp extends Operation {
  static type = 'round-up';

  static from(addOperation) {
    let o = new RoundUp();
    return o;
  }

  import() {}

  export() {
    return {
      type: RoundUp.type
    };
  }

  transform(value, resolver) {
    return Math.ceil(value);
  }
}

export default RegisterWith(Operation)(RoundUp);
