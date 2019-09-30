"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const __1 = require("../../");
const level_1 = require("../../dist/level");
const file_1 = require("../../dist/file");
const process_1 = __importDefault(require("process"));
const events_1 = __importDefault(require("events"));
ava_1.default.serial('1', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const kita = new __1.Kita();
    const infoLog = kita
        .pipe(new level_1.FilterByLevel('info'))
        .pipe(new __1.Modifier(r => {
        r.timestamp = Date.now();
    }))
        .pipe(new __1.Finalizer(r => `[${r.timestamp}] ${r.message}\n`))
        .pipe(process_1.default.stdout);
    const jsonLog = kita
        .pipe(new level_1.FilterByLevel('json'))
        .pipe(new __1.Finalizer(r => `${JSON.stringify(r.message)}\n`))
        .pipe(file_1.createFileStream('./json.log', __dirname));
    const errorLog = kita
        .pipe(new level_1.FilterByLevel('error'))
        .pipe(new __1.Finalizer(r => `${r.message.stack}\n`))
        .pipe(process_1.default.stderr);
    const logger = new level_1.LoggerByLevel(kita, [
        'error',
        'json',
        'info',
    ]);
    logger.error(new Error());
    logger.json({ a: 1 });
    logger.info('haha');
    logger.error(new Error());
    logger.json({ b: 2 });
    logger.info('xixi');
    kita.end();
    yield events_1.default.once(jsonLog, 'finish');
}));
//# sourceMappingURL=index.js.map