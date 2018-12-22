/**
 * A decorator which wraps any Operation extending {@link Operation}
 *
 * @param {Operation} OperationBaseClass The base class which provides a means to look up modules using Operation.from()
 * @param {Operation} OperationToRegister The class of any operation to register.
 */
declare const RegisterWith: (OperationBaseClass: any) => (OperationToRegister: any) => any;
export default RegisterWith;
