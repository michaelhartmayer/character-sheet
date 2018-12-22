"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RoundDown_1;
"use strict";
const RegisterWith_1 = __importDefault(require("./util/RegisterWith"));
const Operation_1 = __importDefault(require("../Operation"));
let RoundDown = RoundDown_1 = class RoundDown extends Operation_1.default {
    static from(addOperation) {
        let o = new RoundDown_1();
        return o;
    }
    import() { }
    export() {
        return {
            type: RoundDown_1.type
        };
    }
    transform(value, resolver) {
        return Math.floor(value);
    }
};
RoundDown.type = 'round-down';
RoundDown = RoundDown_1 = __decorate([
    RegisterWith_1.default(Operation_1.default)
], RoundDown);
exports.default = RoundDown;
