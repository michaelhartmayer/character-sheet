import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

// @RegisterWith(Operation)
class Calculate extends Operation {
	static type = 'calculate';

	_selectors = [];
	_fn = null;

	constructor({ selectors = [], fn }) {
	  super(...arguments);

	  this._selectors = selectors;
	  this._fn = fn;
	}

	static from(addOperation) {
	  let o = new Calculate(addOperation.fn);
	  return o;
	}

	import(addOperation) {
	  this._fn = addOperation.fn;
	}

	export() {
	  return {
	    type: Calculate.type,
	    selectors: this._selectors,
	    fn: Function(this._fn)
	  };
	}

	transform(value, resolver) {
	  return this._fn(value, ...this._selectors.map(resolver));
	  return value;
	}
}

export default RegisterWith(Operation)(Calculate);
