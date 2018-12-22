import Operation from '../Operation';
declare class Modifies extends Operation {
    static type: string;
    type: string;
    _target: any;
    modifies: boolean;
    readonly target: any;
    constructor(target?: string);
    static from(operation: any): Modifies;
    import(operation: any): void;
    export(): {
        type: string;
        target: any;
    };
    transform(value: any, resolver: any): number;
}
export default Modifies;
