"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = __importDefault(require("./operations"));
/**
 * Modifier
 *
 * A modifier modifies one or many stat definitions post-calculation.
 */
class Modifier {
    constructor() {
        this._description = 'This modifier has no descrition.';
        this._operations = [];
        this._active = true;
        this.currentlyModifying = null;
    }
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
        this._operations.push(new operations_1.default.Modifies(target));
        return this;
    }
    add(value) {
        this._operations.push(new operations_1.default.Add({ value }));
        return this;
    }
    subtract(value) {
        this._operations.push(new operations_1.default.Subtract({ value }));
        return this;
    }
    divideBy(value) {
        this._operations.push(new operations_1.default.DivideBy({ value }));
        return this;
    }
    roundUp() {
        this._operations.push(new operations_1.default.RoundUp());
        return this;
    }
    roundDown() {
        this._operations.push(new operations_1.default.RoundDown());
        return this;
    }
    calculate({ selectors = [], fn }) {
        this._operations.push(new operations_1.default.Calculate({ selectors, fn }));
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
exports.default = Modifier;
