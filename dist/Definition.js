"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = __importDefault(require("./operations"));
const Operation_1 = __importDefault(require("./Operation"));
class Definition {
    constructor() {
        this._operations = [];
        this._description = null;
        this._initially = null;
        this._set = null;
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
    initially(initialValue) {
        this._initially = initialValue;
        return this;
    }
    using(...selectors) {
        return {
            calculate: fn => {
                this._operations.push(new operations_1.default.Calculate({ selectors, fn }));
                return this;
            }
        };
    }
    set(value) {
        this._set = value;
    }
    get() {
        return this._set || this._initially;
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
    import(definition) {
        this._initially = definition.initally;
        this._description = definition.description;
        this._set = definition.set;
        this._operations = definition.operations.map(o => Operation_1.default.from(o));
    }
    export() {
        return {
            initally: this._initially,
            description: this._description,
            set: this._set,
            operations: this._operations.map(o => o.export())
        };
    }
    static from(definition) {
        const d = new Definition();
        d.import(definition);
        return d;
    }
}
exports.default = Definition;
