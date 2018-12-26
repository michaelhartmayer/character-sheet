import Inventory from './Inventory';
import Definition from './Definition';
import Modifier from './Modifier';

const CharacterSheetFactory = () => {
  let _definitions = {};
  let _inventories = {};

  return class CharacterSheet {
    _modifiers = {};
    _inventories = {};

    constructor() {
      const query = selector => {
        return this._query(selector);
      };

      // attach references to all methods
      Object.getOwnPropertyNames(this.constructor.prototype).forEach(name => {
        // skip 'private' methods
        if (/_/.test(name)) return;

        // bind scope
        query[name] = this[name].bind(this);
      });

      // return query
      return query;
    }

    static from(characterSheet) {
      // create a new character sheet
      let sheet = new CharacterSheet();

      // import the character sheet data
      sheet.import(characterSheet);

      // return the instance of that sheet
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
      // const selectedDefinition = selectOnSheet || selectOnCharacter;
      const selectedDefinition = selectOnCharacter
        ? selectOnCharacter
        : selectOnSheet;

      // no definition for that selector
      if (!selectedDefinition) {
        throw Error(`No definition exists for ${selector}`);
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
        if (!inventory) return;

        // reduce all operations from all modifiers in this inventory
        const operations = inventory.modifiers.reduce(
          (operations, modifier) => {
            let affectsSelector = false;

            // reduce all operations on this modifier
            const validOperations = modifier.operations.reduce(
              (operations, operation) => {
                // found a modifies operation
                if (operation.type === 'modifies') {
                  affectsSelector = operation.target === selector;
                }

                // not modifying the right selector
                if (!affectsSelector) return operations;

                return [...operations, operation];
              },
              []
            );

            return operations.concat(validOperations);
          },
          []
        );

        characterOperations.push(...operations);
      });

      // compute all operations
      computedValue = [...sheetOperations, ...characterOperations].reduce(
        (value, operation) => {
          return operation.transform(value, this._resolve.bind(this));
        },
        computedValue
      );

      // return computed value
      return computedValue;
    }

    _set(selector, value) {
      let d;

      if (this._modifiers[selector]) {
        d = this._modifiers[selector];
      } else {
        d = new Definition();
        this._modifiers[selector] = d;
      }

      // set the value
      d.set(value);

      // return it
      return d;
    }

    _query(selector) {
      return {
        is: value => {
          // get
          if (!value) return this._resolve(selector);

          // set
          this._set(selector, value);
        }
      };
    }

    static define(key) {
      // new definition
      const d = new Definition();

      // attach to sheet
      _definitions[key] = d;

      // return definition reference
      return d;
    }

    static inventory(key) {
      const i = new Inventory();

      _inventories[key] = i;

      return i;
    }

    inventory(key) {
      // inventory does not exist
      if (!(key in _inventories))
        throw Error(
          `${key} is not an inventory. You must define an inventory on the sheet.`
        );

      // if the inventory already exists, return it
      if (this._inventories[key]) {
        return this._inventories[key];
      }

      // generate an inventory on the character
      const i = new Inventory();

      // store it
      this._inventories[key] = i;

      // return it
      return i;
    }

    import(characterData) {
      const { character, inventories } = characterData;

      // this._inventories = inventories.map(inventory => Inventory.from(inventory));
      // this._modifiers = character.map(definition => Definition.from(definition));
      Object.keys(inventories).map(name => this._inventories[name] = Inventory.from(inventories[name]));
      Object.keys(character).map(stat => this._modifiers[stat] = Definition.from(character[stat]));
    }

    export() {
      // @TODO: Export
      const sheet = {};
      const character = {};
      const inventories = {};

      // sheet
      Object.keys(_definitions).forEach(
        key => (sheet[key] = _definitions[key].export())
      );

      // character
      Object.keys(this._modifiers).forEach(
        key => (character[key] = this._modifiers[key].export())
      );

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
        inventories[key] = this.inventory(key).map(
          modifier => modifier.description
        );
      });

      // render definitions
      Object.keys(_definitions).forEach(key => {
        stats[key] = {
          value: this._resolve(key),
          description: _definitions[key].description
        };
      });

      return {
        inventories,
        stats
      };
    }
  };
};

// bind this here for easy consumption later
CharacterSheetFactory.Modifier = Modifier;

export default CharacterSheetFactory;
