"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class Kita extends stream_1.Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(r, encoding, cb) {
        this.push(r);
        cb();
    }
    filter(f) {
        return this.pipe(new Filter(f));
    }
    modifier(f) {
        return this.pipe(new Modifier(f));
    }
    finalizer(f) {
        return this.pipe(new Finalizer(f));
    }
}
exports.Kita = Kita;
class Filter extends Kita {
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
class Modifier extends Kita {
    constructor(f) {
        super();
        this.f = f;
    }
    _transform(r, encoding, cb) {
        this.push(this.f(r));
        cb();
    }
}
exports.Modifier = Modifier;
class Finalizer extends Kita {
    constructor(f) {
        super();
        this.f = f;
    }
    _transform(r, encoding, cb) {
        this.push(this.f(r));
        cb();
    }
}
exports.Finalizer = Finalizer;
exports.default = Kita;
//# sourceMappingURL=kita.js.map