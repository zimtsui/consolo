"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const process_1 = __importDefault(require("process"));
const path_1 = __importDefault(require("path"));
function createFileStream(filePath, basePath = process_1.default.cwd()) {
    return fs_1.default.createWriteStream(path_1.default.join(basePath, filePath), { flags: 'a' });
}
exports.createFileStream = createFileStream;
exports.default = createFileStream;
//# sourceMappingURL=file.js.map