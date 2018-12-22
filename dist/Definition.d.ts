declare class Definition {
    _operations: any[];
    _description: any;
    _initially: any;
    _set: any;
    readonly operations: any[];
    describe(description: any): this;
    readonly description: any;
    initially(initialValue: any): this;
    using(...selectors: any[]): {
        calculate: (fn: any) => Definition;
    };
    set(value: any): void;
    get(): any;
    add(value: any): this;
    subtract(value: any): this;
    divideBy(value: any): this;
    roundUp(): this;
    roundDown(): this;
    calculate({ selectors, fn }: {
        selectors?: any[];
        fn: any;
    }): this;
    import(definition: any): void;
    export(): {
        initally: any;
        description: any;
        set: any;
        operations: any[];
    };
    static from(definition: any): Definition;
}
export default Definition;
