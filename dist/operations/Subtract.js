"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Subtract_1;
"use strict";
const RegisterWith_1 = __importDefault(require("./util/RegisterWith"));
const Operation_1 = __importDefault(require("../Operation"));
let Subtract = Subtract_1 = class Subtract extends Operation_1.default {
    constructor({ value = null }) {
        super(...arguments);
        this._value = null;
        this._value = value;
    }
    static from(addOperation) {
        let o = new Subtract_1({ value: addOperation.value });
        return o;
    }
    import(addOperation) {
        this._value = addOperation.value;
    }
    export() {
        return {
            type: Subtract_1.type,
            value: this._value
        };
    }
    transform(value, resolver) {
        if (typeof this._value === 'string') {
            return value - resolver(this._value);
        }
        return value - this._value;
    }
};
Subtract.type = 'subtract';
Subtract = Subtract_1 = __decorate([
    RegisterWith_1.default(Operation_1.default),
    __metadata("design:paramtypes", [Object])
], Subtract);
exports.default = Subtract;
