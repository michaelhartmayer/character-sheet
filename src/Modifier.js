import Op from './operations';
import Definition from './Definition';

/**
 * Modifier
 *
 * A modifier modifies one or many stat definitions post-calculation.
 */
class Modifier {
	_description = 'This modifier has no descrition.';
	_operations = [];
	_active = true;

	currentlyModifying = null;

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

	modifies(target) {
	  this._operations.push(new Op.Modifies(target));
	  return this;
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

	static from(modifier) {
	  // make a new modifier
	  let m = new Modifier();

	  // import modifier from object
	  m.import(modifier);

	  // return modifier
	  return m;
	}

	import(modifier) {
	  this._description = modifier.description;
	  this._operations = modifier.operations;
	  this._active = modifier.active;

	  return this;
	}

	export() {
	  return {
	    description: this._description,
	    operations: this._operations,
	    active: this._active
	  };
	}
}

export default Modifier;
