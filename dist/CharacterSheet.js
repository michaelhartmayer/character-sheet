"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = __importDefault(require("./Inventory"));
const Definition_1 = __importDefault(require("./Definition"));
const CharacterSheetFactory = () => {
    let _definitions = {};
    let _inventories = {};
    return class CharacterSheet {
        constructor() {
            this._modifiers = {};
            this._inventories = {};
        }
        static from(characterSheet) {
            let sheet = new CharacterSheet();
            sheet.import(characterSheet);
            return sheet;
        }
        _resolve(selector) {
            let computedValue = null;
            const selectOnCharacter = this._modifiers[selector];
            const selectOnSheet = _definitions[selector];
            const selectedDefinition = selectOnCharacter ? selectOnCharacter : selectOnSheet;
            if (!selectedDefinition) {
                throw Error(`No definition exists for ${selector}`);
                return;
            }
            computedValue = selectedDefinition.get();
            const sheetOperations = selectOnSheet.operations;
            const characterOperations = [];
            Object.keys(_inventories).forEach(key => {
                const inventory = this._inventories[key];
                if (!inventory)
                    return;
                const operations = inventory.modifiers.reduce((operations, modifier) => {
                    let affectsSelector = false;
                    const validOperations = modifier.operations.reduce((operations, operation) => {
                        if (operation.type === 'modifies') {
                            affectsSelector = operation.target === selector;
                        }
                        if (!affectsSelector)
                            return operations;
                        return [...operations, operation];
                    }, []);
                    return operations.concat(validOperations);
                }, []);
                characterOperations.push(...operations);
            });
            computedValue = [...sheetOperations, ...characterOperations].reduce((value, operation) => {
                return operation.transform(value, this._resolve.bind(this));
            }, computedValue);
            return computedValue;
        }
        _set(selector, value) {
            let d;
            if (this._modifiers[selector]) {
                d = this._modifiers[selector];
            }
            else {
                d = new Definition_1.default();
                this._modifiers[selector] = d;
            }
            d.set(value);
            return d;
        }
        get(selector) {
            return {
                is: (value) => {
                    if (!value)
                        return this._resolve(selector);
                    this._set(selector, value);
                }
            };
        }
        static define(key) {
            const d = new Definition_1.default();
            _definitions[key] = d;
            return d;
        }
        static inventory(key) {
            const i = new Inventory_1.default();
            _inventories[key] = i;
            return i;
        }
        inventory(key) {
            if (!(key in _inventories))
                throw Error(`${key} is not an inventory. You must define an inventory on the sheet.`);
            if (this._inventories[key]) {
                return this._inventories[key];
            }
            const i = new Inventory_1.default();
            this._inventories[key] = i;
            return i;
        }
        import(characterData) {
        }
        export() {
            const sheet = {};
            const character = {};
            const inventories = {};
            Object.keys(_definitions).forEach(key => (sheet[key] = _definitions[key].export()));
            Object.keys(this._modifiers).forEach(key => (character[key] = this._modifiers[key].export()));
            Object.keys(this._inventories).forEach(key => {
                inventories[key] = this._inventories[key].export();
            });
            return {
                version: 1,
                sheet,
                character,
                inventories
            };
        }
        getSheet() {
            const inventories = {};
            const stats = {};
            Object.keys(_inventories).forEach(key => {
                inventories[key] = this.inventory(key).map(modifier => modifier.description);
            });
            Object.keys(_definitions).forEach(key => {
                stats[key] = { value: this._resolve(key), description: _definitions[key].description };
            });
            return {
                inventories,
                stats
            };
        }
    };
};
exports.default = CharacterSheetFactory;
