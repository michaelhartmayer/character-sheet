import Operation from '../Operation';
declare class Add extends Operation {
    static type: string;
    private _value;
    constructor({ value }: {
        value?: any;
    });
    static from(addOperation: any): Add;
    import(addOperation: any): void;
    export(): {
        type: string;
        value: any;
    };
    transform(value: any, resolver: any): any;
}
export default Add;
