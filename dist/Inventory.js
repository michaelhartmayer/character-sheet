"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modifier_1 = __importDefault(require("./Modifier"));
class Inventory {
    constructor() {
        this._modifiers = [];
        this._description = null;
        this._active = true;
    }
    describe(description) {
        this._description = description;
        return this;
    }
    static from(inventory) {
        let i = new Inventory();
        i.import(inventory);
        return i;
    }
    get modifiers() {
        return this._modifiers;
    }
    give(quantity) {
        return {
            of: modifier => {
                while (quantity--)
                    this._modifiers.push(modifier);
                return this;
            }
        };
    }
    filter(fn) {
        this._modifiers.filter(fn);
    }
    map(fn) {
        return this._modifiers.map(fn);
    }
    forEach(fn) {
        this._modifiers.forEach(fn);
    }
    on() {
        this._active = true;
    }
    off() {
        this._active = false;
    }
    import(inventory) {
        this._modifiers = inventory.modifiers.map(modifier => Modifier_1.default.from(modifier));
        this._description = inventory.description;
        this._active = inventory.active;
    }
    export() {
        return {
            description: this._description,
            modifiers: this._modifiers.map(modifier => modifier.export()),
            active: this._active
        };
    }
}
exports.default = Inventory;
