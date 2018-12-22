declare class Modifier {
    private _description;
    private _operations;
    private _active;
    private currentlyModifying;
    readonly operations: any[];
    describe(description: any): this;
    readonly description: string;
    modifies(target: any): this;
    add(value: any): this;
    subtract(value: any): this;
    divideBy(value: any): this;
    roundUp(): this;
    roundDown(): this;
    calculate({ selectors, fn }: {
        selectors?: any[];
        fn: any;
    }): this;
    static from(modifier: any): Modifier;
    import(modifier: any): this;
    export(): {
        description: string;
        operations: any[];
        active: boolean;
    };
}
export default Modifier;
