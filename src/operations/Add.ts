import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

@RegisterWith(Operation)
class Add extends Operation {
	static type = 'add';

	private _value = null;

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

export default Add;
