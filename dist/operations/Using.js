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
var Using_1;
"use strict";
const RegisterWith_1 = __importDefault(require("./util/RegisterWith"));
const Operation_1 = __importDefault(require("../Operation"));
let Using = Using_1 = class Using extends Operation_1.default {
    constructor({ value = null }) {
        super(...arguments);
        this._value = null;
        this._value = value;
    }
    static from(addOperation) {
        let o = new Using_1({ value: addOperation.value });
        return o;
    }
    import(addOperation) {
        this._value = addOperation.value;
    }
    export() {
        return {
            type: Using_1.type,
            value: this._value
        };
    }
    transform(value, resolver) {
        console.info('@@ Using - Not implemented');
        return value;
    }
};
Using.type = 'using';
Using = Using_1 = __decorate([
    RegisterWith_1.default(Operation_1.default),
    __metadata("design:paramtypes", [Object])
], Using);
exports.default = Using;
