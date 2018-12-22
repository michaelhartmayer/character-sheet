"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterWith = OperationBaseClass => OperationToRegister => {
    OperationBaseClass.registerOperation(OperationToRegister);
    return OperationToRegister;
};
exports.default = RegisterWith;
