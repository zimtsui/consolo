"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const util_1 = __importDefault(require("util"));
class ObjectTransform extends stream_1.Transform {
    constructor() {
        super({ objectMode: true });
    }
}
class Kita extends ObjectTransform {
    constructor() {
        super();
    }
    _transform(r, encoding, cb) {
        this.push(r);
        cb();
    }
}
exports.Kita = Kita;
class Filter extends ObjectTransform {
    constructor(f) {
        super();
        this.f = f;
    }
    _transform(r, encoding, cb) {
        if (this.f(r))
            this.push(r);
        cb();
    }
}
exports.Filter = Filter;
class Modifier extends ObjectTransform {
    constructor(f) {
        super();
        this.f = f;
    }
    _transform(r, encoding, cb) {
        const newR = this.f(r);
        this.push(newR || r);
        cb();
    }
}
exports.Modifier = Modifier;
class Finalizer extends ObjectTransform {
    constructor(f) {
        super();
        this.f = f;
    }
    _transform(r, encoding, cb) {
        this.push(util_1.default.format(this.f(r)));
        cb();
    }
}
exports.Finalizer = Finalizer;
exports.default = Kita;
//# sourceMappingURL=index.js.map