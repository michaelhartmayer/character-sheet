declare class Operation {
    private static _registeredOperations;
    static type: any;
    constructor(operationDefinition?: {
        type: string;
    });
    transform(value: any, resolver: any): number;
    static from(operationDefinition: any): any;
    static registerOperation(OperationClass: any): void;
}
export default Operation;
