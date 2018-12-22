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
            // initial computed value
            let computedValue = null;
            // find definition on the character sheet
            const selectOnCharacter = this._modifiers[selector];
            // find definitions (set) on the characte
            const selectOnSheet = _definitions[selector];
            // select from whatever is available
            const selectedDefinition = selectOnSheet || selectOnCharacter;
            // no definition for that selector
            if (!selectedDefinition) {
                throw Error(`No definitions exist for ${selector}`);
                return;
            }
            // get the value from either the sheet or the character - set or initialValue
            computedValue = selectedDefinition.get();
            // all sheet operations
            const sheetOperations = selectOnSheet.operations;
            // all character operations
            const characterOperations = [];
            // find all character operations
            Object.keys(_inventories).forEach(key => {
                // an inventory
                const inventory = this._inventories[key];
                // untouched inventories may be skipped
                if (!inventory)
                    return;
                // reduce all operations from all modifiers in this inventory
                const operations = inventory.modifiers.reduce((operations, modifier) => {
                    let affectsSelector = false;
                    // reduce all operations on this modifier
                    const validOperations = modifier.operations.reduce((operations, operation) => {
                        // found a modifies operation
                        if (operation.type === 'modifies') {
                            affectsSelector = operation.target === selector;
                        }
                        // not modifying the right selector
                        if (!affectsSelector)
                            return operations;
                        return [...operations, operation];
                    }, []);
                    return operations.concat(validOperations);
                }, []);
                characterOperations.push(...operations);
            });
            // compute all operations
            computedValue = [...sheetOperations, ...characterOperations].reduce((value, operation) => {
                return operation.transform(value, this._resolve.bind(this));
            }, computedValue);
            // return computed value
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
            // set the value
            d.set(value);
            // return it
            return d;
        }
        get(selector) {
            return {
                is: (value) => {
                    // get
                    if (!value)
                        return this._resolve(selector);
                    // set
                    this._set(selector, value);
                }
            };
        }
        static define(key) {
            // new definition
            const d = new Definition_1.default();
            // attach to sheet
            _definitions[key] = d;
            // return definition reference
            return d;
        }
        static inventory(key) {
            const i = new Inventory_1.default();
            _inventories[key] = i;
            return i;
        }
        inventory(key) {
            // inventory does not exist
            if (!(key in _inventories))
                throw Error(`${key} is not an inventory. You must define an inventory on the sheet.`);
            // if the inventory already exists, return it
            if (this._inventories[key]) {
                return this._inventories[key];
            }
            // generate an inventory on the character
            const i = new Inventory_1.default();
            // store it
            this._inventories[key] = i;
            // return it
            return i;
        }
        import(characterData) {
            // @TODO: Import
        }
        export() {
            // @TODO: Export
            const sheet = {};
            const character = {};
            const inventories = {};
            // sheet
            Object.keys(_definitions).forEach(key => (sheet[key] = _definitions[key].export()));
            // character
            Object.keys(this._modifiers).forEach(key => (character[key] = this._modifiers[key].export()));
            // inventories
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
            // render inventories
            Object.keys(_inventories).forEach(key => {
                inventories[key] = this.inventory(key).map(modifier => modifier.description);
            });
            // render definitions
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
// const CS = CharacterSheetFactory();
// const cs = new CS();
// CS.define('constitution')
// 	.describe('Your physical healthiness.')
// 	.initially(10);
// // 100 + 10 * 10 = 200
// CS.define('health')
// 	.describe('Your health, based on your constitution')
// 	.initially(100)
// 	.using('constitution')
// 	.calculate((v, c) => v + c * 10);
// // inventory: equipment
// CS.inventory('equipment').describe('Everything you have equipped');
// const shieldOfPower = new Modifier()
// 	.describe({
// 		name: 'Shield of Power',
// 		description: 'A powerful shield'
// 	})
// 	.modifies('health')
// 	.add(45)
// 	.modifies('someotherthing');
// cs
// 	.inventory('equipment')
// 	.give(1)
// 	.of(shieldOfPower);
// console.log(JSON.stringify(cs.export(), null, 2));
// console.log('Your health is:', cs.get('health').is());
// console.log(JSON.stringify(cs.getSheet(), null, 2));
// console.log(JSON.stringify(cs.export(), null, 2));
exports.default = CharacterSheetFactory;
