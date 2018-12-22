import Inventory from './Inventory';
import Definition from './Definition';
declare const CharacterSheetFactory: () => {
    new (): {
        _modifiers: {};
        _inventories: {};
        _resolve(selector: any): any;
        _set(selector: any, value: any): any;
        get(selector: any): {
            is: (value?: any) => any;
        };
        inventory(key: any): any;
        import(characterData: any): void;
        export(): {
            version: number;
            sheet: {};
            character: {};
            inventories: {};
        };
        getSheet(): {
            inventories: {};
            stats: {};
        };
    };
    from(characterSheet: any): {
        _modifiers: {};
        _inventories: {};
        _resolve(selector: any): any;
        _set(selector: any, value: any): any;
        get(selector: any): {
            is: (value?: any) => any;
        };
        inventory(key: any): any;
        import(characterData: any): void;
        export(): {
            version: number;
            sheet: {};
            character: {};
            inventories: {};
        };
        getSheet(): {
            inventories: {};
            stats: {};
        };
    };
    define(key: any): Definition;
    inventory(key: any): Inventory;
};
export default CharacterSheetFactory;
