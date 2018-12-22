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
declare class Operation {
    /**
   * Key-value store of modules and their types
   *
   * @property {object} _registeredOperations
   */
    private static _registeredOperations;
    /**
   * Operation Type
   *
   * Identifies the operation in its definition.
   */
    static type: any;
    /**
    * @constructor
    * @param operationDefinition {OperationDefinition}
    */
    constructor(operationDefinition?: {
        type: string;
    });
    /**
     * Operational transformation
     *
     * @param value
     * @param character
     *
     * @returns {Number | String | Boolean}
     */
    transform(value: any, resolver: any): number;
    /**
   * Generate a operation instance from its definition.
   *
   * @param {OperationDefinition} operationDefinition A operation definition
   */
    static from(operationDefinition: any): any;
    /**
   * Registeres a operation so that its definitions may be used dynamically.
   *
   * @param {Operation} OperationClass Any operation
   */
    static registerOperation(OperationClass: any): void;
}
export default Operation;
