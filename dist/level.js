"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
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
class FilterByLevel extends _1.Filter {
    constructor(allowed) {
        super(r => r.level === allowed);
    }
}
exports.FilterByLevel = FilterByLevel;
//# sourceMappingURL=level.js.map