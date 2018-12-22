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
var Modifies_1;
"use strict";
const RegisterWith_1 = __importDefault(require("./util/RegisterWith"));
const Operation_1 = __importDefault(require("../Operation"));
let Modifies = Modifies_1 = class Modifies extends Operation_1.default {
    constructor(target = '') {
        super(...arguments);
        this.type = 'modifies';
        this._target = null;
        this.modifies = true;
        this._target = target;
    }
    get target() {
        return this._target;
    }
    static from(operation) {
        let o = new Modifies_1();
        o.import(operation);
        return o;
    }
    import(operation) {
        this._target = operation.target;
    }
    export() {
        return {
            type: Modifies_1.type,
            target: this._target
        };
    }
    transform(value, resolver) {
        return Math.floor(value);
    }
};
Modifies.type = 'modifies';
Modifies = Modifies_1 = __decorate([
    RegisterWith_1.default(Operation_1.default),
    __metadata("design:paramtypes", [Object])
], Modifies);
exports.default = Modifies;
