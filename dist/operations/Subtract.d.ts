import Operation from '../Operation';
declare class Subtract extends Operation {
    static type: string;
    private _value;
    constructor({ value }: {
        value?: any;
    });
    static from(addOperation: any): Subtract;
    import(addOperation: any): void;
    export(): {
        type: string;
        value: any;
    };
    transform(value: any, resolver: any): number;
}
export default Subtract;
