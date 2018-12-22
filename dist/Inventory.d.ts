declare class Inventory {
    private _modifiers;
    private _description;
    private _active;
    describe(description: any): this;
    static from(inventory: any): Inventory;
    readonly modifiers: any[];
    give(quantity: any): {
        of: (modifier: any) => Inventory;
    };
    filter(fn: any): void;
    map(fn: any): {}[];
    forEach(fn: any): void;
    on(): void;
    off(): void;
    import(inventory: any): void;
    export(): {
        description: any;
        modifiers: any[];
        active: boolean;
    };
}
export default Inventory;
