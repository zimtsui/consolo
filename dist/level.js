"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class FilterByLevel extends kita_1.Filter {
    constructor(allowed) {
        super(r => r.level === allowed);
    }
}
exports.FilterByLevel = FilterByLevel;
//# sourceMappingURL=level.js.map