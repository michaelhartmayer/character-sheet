import RegisterWith from './util/RegisterWith';
import Operation from '../Operation';

@RegisterWith(Operation)
class Subtract extends Operation {
	static type = 'subtract';

	private _value = null;

	constructor({ value = null }) {
		super(...arguments);
		this._value = value;
	}

	static from(addOperation) {
		let o = new Subtract({ value: addOperation.value });
		return o;
	}

	import(addOperation) {
		this._value = addOperation.value;
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

export default Subtract;
