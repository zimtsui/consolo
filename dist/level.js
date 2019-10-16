"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const defaultLevels = [
    'error',
    'warn',
    'info',
    'debug',
];
class LoggerByLevel {
    constructor(kita, levels = defaultLevels) {
        for (const level of levels)
            Reflect.defineProperty(this, level, {
                value: function (data, ...args) {
                    const object = {
                        level,
                        data,
                        args,
                    };
                    kita.write(object);
                }
            });
    }
}
exports.LoggerByLevel = LoggerByLevel;
function addMessageInBuiltinFormat(r) {
    r.message = `${util_1.default.format(r.data, ...r.args)}\n`;
    return r;
}
exports.addMessageInBuiltinFormat = addMessageInBuiltinFormat;
;
function filterByLevel(allowed) {
    return (r) => r.level === allowed;
}
exports.filterByLevel = filterByLevel;
//# sourceMappingURL=level.js.map