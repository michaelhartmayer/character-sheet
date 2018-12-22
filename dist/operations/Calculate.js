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
var Calculate_1;
"use strict";
const RegisterWith_1 = __importDefault(require("./util/RegisterWith"));
const Operation_1 = __importDefault(require("../Operation"));
let Calculate = Calculate_1 = class Calculate extends Operation_1.default {
    constructor({ selectors = [], fn }) {
        super(...arguments);
        this._selectors = [];
        this._fn = null;
        this._selectors = selectors;
        this._fn = fn;
    }
    static from(addOperation) {
        let o = new Calculate_1(addOperation.fn);
        return o;
    }
    import(addOperation) {
        this._fn = addOperation.fn;
    }
    export() {
        return {
            type: Calculate_1.type,
            selectors: this._selectors,
            fn: Function(this._fn)
        };
    }
    transform(value, resolver) {
        return this._fn(value, ...this._selectors.map(resolver));
        return value;
    }
};
Calculate.type = 'calculate';
Calculate = Calculate_1 = __decorate([
    RegisterWith_1.default(Operation_1.default),
    __metadata("design:paramtypes", [Object])
], Calculate);
exports.default = Calculate;
