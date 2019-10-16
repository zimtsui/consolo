"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const kita_1 = require("./kita");
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
                    kita.write({
                        level,
                        data,
                        args,
                    });
                }
            });
    }
}
exports.LoggerByLevel = LoggerByLevel;
const builtinFormatter = new kita_1.Modifier(r => {
    r.message = util_1.default.format(r.data, ...r.args) + '\n';
});
exports.builtinFormatter = builtinFormatter;
class FilterByLevel extends kita_1.Filter {
    constructor(allowed) {
        super(r => r.level === allowed);
    }
}
exports.FilterByLevel = FilterByLevel;
//# sourceMappingURL=level.js.map