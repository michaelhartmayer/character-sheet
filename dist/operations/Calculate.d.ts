import Operation from '../Operation';
declare class Calculate extends Operation {
    static type: string;
    private _selectors;
    private _fn;
    constructor({ selectors, fn }: {
        selectors?: any[];
        fn: any;
    });
    static from(addOperation: any): Calculate;
    import(addOperation: any): void;
    export(): {
        type: string;
        selectors: any[];
        fn: Function;
    };
    transform(value: any, resolver: any): any;
}
export default Calculate;
