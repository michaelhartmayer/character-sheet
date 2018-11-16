import Ops from "./util/operations";

const { define, modifier, inventory } = Ops;

const CharacterSheetFactory = () => {
  const _sheetDefinitions = {};

  class CharacterSheet {
    _characterDefinitions = {};
    _subscriptions = [];

    static define(name) {
      const def = {};
      _sheetDefinitions[name] = def;

      return define(def)(name);
    }

    constructor(json = {}) {
      this._characterDefinitions = json;

      const query = name => {
        if (name) return this.query(name);

        return this;
      };

      ["subscribe", "unsubscribe", "modifier", "debug", "getSheet"].forEach(
        fnName => {
          query[fnName] = (...args) => this[fnName](...args);
        }
      );

      return query;
    }

    getDescription(name) {
      const sheetDefinition = _sheetDefinitions[name] || {};
      const characterDefinition = this._characterDefinitions[name] || {};

      return (
        characterDefinition.description || sheetDefinition.description || null
      );
    }

    getValue(name) {
      // numbers are
      if (typeof name === "number") return name;

      // inventory of values
      if (this.isInventory(name)) {
        const inventory = [
          ...((_sheetDefinitions[name] && _sheetDefinitions[name].inventory) ||
            []),
          ...((this._characterDefinitions[name] &&
            this._characterDefinitions[name].inventory) ||
            [])
        ];

        return inventory.map(invName => this.getValue(invName));
      }

      // start with a defined default value
      let definition =
        _sheetDefinitions[name] || this._characterDefinitions[name];

      // if this is a modifier, return as is, for now
      if (definition.type === "modifier") {
        return definition;
      }

      // false is a value we want to use, but ordinary || would be falsey
      let value =
        this._characterDefinitions[name] === null ||
        this._characterDefinitions[name] === undefined
          ? _sheetDefinitions[name].defaultValue
          : this._characterDefinitions[name];

      // next apply an overridden value
      if (
        this._characterDefinitions[name] &&
        this._characterDefinitions[name].value
      ) {
        value = this._characterDefinitions[name].value;
      }

      let using = [];
      let modifies = null;

      // sheet operations
      const operations = _sheetDefinitions[name].operations || [];

      // next add character modifications
      Object.keys(this._characterDefinitions).map(defName => {
        const definition = this._characterDefinitions[defName];

        // find only inventories
        if (this.isInventory(defName)) {
          // go through each item and apply its operations
          definition.inventory.forEach(inv => {
            // definition of item in inventory
            const invDef = this._characterDefinitions[inv];

            // remember what's being modified
            let allowModification = false;

            // go through every operation and add it to operations if it's modifying the definition in question
            invDef.operations.forEach(operation => {
              // determine if modifications are allowed
              if (operation.type === "modifies") {
                if (operation.target === name) {
                  allowModification = true;
                } else {
                  allowModification = false;
                }
              }

              // if no modifications are allowed, do nothing
              if (!allowModification) return;

              // seems like they're allowed, add operation
              operations.push(operation);
            });
          });
        }
      });

      // apply all operations
      value = this._operations(operations, value);

      return value;
    }

    _operations(operations, startValue) {
      let value = startValue;
      let using = null;
      let modifies = [];

      operations.forEach(operation => {
        switch (operation.type) {
          case "using":
            using = operation.targets.map(value => this.getValue(value));
            break;
          case "calculate":
            // value = new Function("return " + operation.fn.toString())(...using);
            value = operation.fn(...using);
            break;
          case "addOneForEvery":
            value += Math.floor(this.getValue(operation.target) / operation.n);
            break;
          case "subtractOneForEvery":
            value += Math.floor(this.getValue(operation.target) / operation.n);
            break;
          case "add":
            value += this.getValue(operation.value);
            break;
          case "subtract":
            value -= this.getValue(operation.value);
            break;
        }
      });

      return value;
    }

    _processOperation(value, operation) {
      console.log(operation.type);
      switch (operation.type) {
      }
    }

    getSheetDefinition(name) {
      return _sheetDefinitions[name];
    }

    getSheet() {
      let sheet = {};

      Object.keys(_sheetDefinitions).forEach(name => {
        sheet[name] = this.getValue(name);
      });

      return sheet;
    }

    getCharacterDefinition(name) {
      const def = this._characterDefinitions[name];
      this._characterDefinitions[name] = def;

      return def;
    }

    isInventory(name) {
      const sheetDefinition = _sheetDefinitions[name] || {};
      const characterDefinition = this._characterDefinitions[name] || {};
      const defaultValue =
        characterDefinition.defaultValue || sheetDefinition.defaultValue;

      return Boolean(defaultValue && Array.isArray(defaultValue));
    }

    query(name) {
      if (this.isInventory(name)) {
        const def = this.getCharacterDefinition(name);
        return inventory(def);
      } else {
        return {
          set: value => {
            this._characterDefinitions[name] = value;
            this._publish();
          },
          description: () => this.getDescription(name),
          value: () => this.getValue(name)
        };
      }
    }

    _publish() {
      this._subscriptions.forEach(f => f());
    }

    subscribe(f) {
      this._subscriptions.push(f);
    }

    unsubscribe(f) {
      this._subscriptions = this._subscriptions.filter(s => s !== f);
    }

    modifier(name) {
      const def = {};

      this._characterDefinitions[name] = def;

      return modifier(def)(name);
    }

    debug() {
      console.log("=== Sheet Definitions ===");
      console.log(JSON.stringify(_sheetDefinitions, null, 2));

      console.log("=== Character Definitions ===");
      console.log(JSON.stringify(this._characterDefinitions, null, 2));
    }
  }

  return CharacterSheet;
};

module.exports = CharacterSheetFactory;
