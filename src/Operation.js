/**
 * The basic definition of any operation.
 *
 * @typedef OperationDefinition {object}
 * @param OperationDefinition.type {string} Represents the type. (ex: 'add')
 */

/**
 * Operation Base Class
 *
 * Represents a dynamic modification to a character sheet property.
 */
class Operation {
  /**
   * Key-value store of modules and their types
   *
   * @property {object} _registeredOperations
   */
  static _registeredOperations = {};

  /**
   * Operation Type
   *
   * Identifies the operation in its definition.
   */
  static type = null;

  /**
   * @constructor
   * @param operationDefinition {OperationDefinition}
   */
  constructor(operationDefinition = { type: 'missing-type' }) {}

  /**
   * Operational transformation
   *
   * @param value
   * @param character
   *
   * @returns {Number | String | Boolean}
   */
  transform(value, resolver) {
    throw Error('Must Override Operation.prototype.transform()');
    return 0;
  }

  /**
   * Generate a operation instance from its definition.
   *
   * @param {OperationDefinition} operationDefinition A operation definition
   */
  static from(operationDefinition) {
    const { type } = operationDefinition;

    if (this.type === type) {
      return new this(operationDefinition);
    } else if (Operation._registeredOperations[type]) {
      return Operation._registeredOperations[type].from(operationDefinition);
    }

    return null;
  }

  /**
   * Registeres a operation so that its definitions may be used dynamically.
   *
   * @param {Operation} OperationClass Any operation
   */
  static registerOperation(OperationClass) {
    Operation._registeredOperations[OperationClass.type] = OperationClass;
  }
}

export default Operation;
