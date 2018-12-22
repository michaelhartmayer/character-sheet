"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Add_1 = __importDefault(require("../Add"));
const stubImportableNumber = {
    type: 'add',
    value: 5
};
const stubImportableSelector = {
    type: 'add',
    value: 'selector'
};
const mockResolver = name => (name === 'selector' ? 5 : null);
describe('Operation: Add', () => {
    it('has been wrapped with the RegisterWith decorator', () => {
        // @TODO: whats a good way to test this?
        console.warn('Operation: Add - Missing Test');
    });
    it('has the correct static type', () => {
        expect(Add_1.default.type).toEqual('add');
    });
    it('it imports correctly', () => {
        const add = Add_1.default.from(stubImportableSelector);
        expect(add.export()).toMatchObject(stubImportableSelector);
    });
    it('it exports correctly', () => {
        const add = new Add_1.default({ value: stubImportableNumber.value });
        expect(add.export()).toMatchObject(stubImportableNumber);
    });
    it('transforms the value properly when adding a number', () => {
        const add = new Add_1.default({ value: 10 });
        const transformedValue = add.transform(5, mockResolver);
        expect(transformedValue).toEqual(15);
    });
    it('transforms the value properly when adding a selector', () => {
        const add = new Add_1.default({ value: 'selector' });
        const transformedValue = add.transform(10, mockResolver);
        expect(transformedValue).toEqual(15);
    });
});
