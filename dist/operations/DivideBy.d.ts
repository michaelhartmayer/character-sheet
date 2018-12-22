import Operation from '../Operation';
declare class DivideBy extends Operation {
    static type: string;
    private _value;
    constructor({ value }: {
        value?: any;
    });
    static from(addOperation: any): DivideBy;
    import(addOperation: any): void;
    export(): {
        type: string;
        value: any;
    };
    transform(value: any, resolver: any): number;
}
export default DivideBy;
