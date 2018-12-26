/**
 * A decorator which wraps any Operation extending {@link Operation}
 * 
 * @param {Operation} OperationBaseClass The base class which provides a means to look up modules using Operation.from()
 * @param {Operation} OperationToRegister The class of any operation to register.
 */
const RegisterWith = OperationBaseClass => OperationToRegister => {
  OperationBaseClass.registerOperation(OperationToRegister);
  return OperationToRegister;
};

export default RegisterWith;
