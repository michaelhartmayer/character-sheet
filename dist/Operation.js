"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Operation {
    constructor(operationDefinition = { type: 'missing-type' }) { }
    transform(value, resolver) {
        throw Error('Must Override Operation.prototype.transform()');
        return 0;
    }
    static from(operationDefinition) {
        const { type } = operationDefinition;
        if (this.type === type) {
            return new this(operationDefinition);
        }
        else if (Operation._registeredOperations[type]) {
            return Operation._registeredOperations[type].from(operationDefinition);
        }
        return null;
    }
    static registerOperation(OperationClass) {
        Operation._registeredOperations[OperationClass.type] = OperationClass;
    }
}
Operation._registeredOperations = {};
Operation.type = null;
exports.default = Operation;
