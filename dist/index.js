"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const fs_1 = __importDefault(require("fs"));
const process_1 = __importDefault(require("process"));
const path_1 = __importDefault(require("path"));
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
        this.push(this.f(r));
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
function createFileStream(filePath, basePath = process_1.default.cwd()) {
    return fs_1.default.createWriteStream(path_1.default.join(basePath, filePath), { flags: 'a' });
}
exports.createFileStream = createFileStream;
const defaultLevels = [
    'error',
    'warn',
    'info',
];
class LoggerByLevel {
    constructor(kita, levels = defaultLevels) {
        for (const level of levels)
            Reflect.defineProperty(this, level, {
                value: function (message) {
                    kita.write({
                        level,
                        message,
                    });
                }
            });
    }
}
exports.LoggerByLevel = LoggerByLevel;
class FilterByLevel extends Filter {
    constructor(allowed) {
        super(r => r.level === allowed);
    }
}
exports.FilterByLevel = FilterByLevel;
exports.default = Kita;
//# sourceMappingURL=index.js.map