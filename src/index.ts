import { Transform } from 'stream';
import fs from 'fs';
import process from 'process';
import path from 'path';
import util from 'util';

class ObjectTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }
}

class Kita extends ObjectTransform {
    constructor() {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        this.push(r);
        cb();
    }
}

class Filter extends ObjectTransform {
    constructor(private f: (r: any) => boolean) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        if (this.f(r)) this.push(r);
        cb();
    }
}

class Modifier extends ObjectTransform {
    constructor(private f: (r: any) => unknown) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        this.push(this.f(r));
        cb();
    }
}

class Finalizer extends ObjectTransform {
    constructor(private f: (r: any) => string) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        this.push(util.format(this.f(r)));
        cb();
    }
}

function createFileStream(filePath: string, basePath = process.cwd()) {
    return fs.createWriteStream(
        path.join(basePath, filePath),
        { flags: 'a' },
    );
}

type Level = string;

const defaultLevels: Level[] = [
    'error',
    'warn',
    'info',
];

class LoggerByLevel {
    constructor(
        kita: Kita,
        levels = defaultLevels,
    ) {
        for (const level of levels)
            Reflect.defineProperty(this, level, {
                value: function (message: unknown) {
                    kita.write({
                        level,
                        message,
                    });
                }
            });
    }
}

class FilterByLevel extends Filter {
    constructor(allowed: Level) {
        super(r => r.level === allowed);
    }
}

export default Kita;
export {
    Kita,
    Filter,
    Modifier,
    Finalizer,
    createFileStream,
    LoggerByLevel,
    FilterByLevel,
}