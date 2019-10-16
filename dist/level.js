"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const kita_1 = require("./kita");
class LevelKita extends kita_1.Kita {
    constructor() {
        super();
        this.logger = new LoggerByLevel(this);
    }
}
exports.LevelKita = LevelKita;
class LoggerByLevel {
    constructor(kita) {
        return new Proxy(this, {
            get: function (target, field, receiver) {
                return function (data, ...args) {
                    const object = {
                        level: field,
                        data,
                        args,
                    };
                    kita.write(object);
                };
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
function finalizeWithMessage(r) {
    return r.message;
}
exports.finalizeWithMessage = finalizeWithMessage;
//# sourceMappingURL=level.js.map