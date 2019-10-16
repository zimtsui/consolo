import util from 'util';
import {
    Kita,
} from './kita';

const defaultLevels: string[] = [
    'error',
    'warn',
    'info',
    'debug',
];

interface LevelObject {
    [key: string]: any;
    level: string;
    data: unknown;
    args: unknown[];
    message?: string;
}

class LoggerByLevel {
    [level: string]: (message: unknown) => void;

    constructor(
        kita: Kita,
        levels = defaultLevels,
    ) {
        for (const level of levels)
            Reflect.defineProperty(this, level, {
                value: function (data: unknown, ...args: unknown[]) {
                    const object: LevelObject = {
                        level,
                        data,
                        args,
                    };
                    kita.write(object);
                }
            });
    }
}

function addMessageInBuiltinFormat(r: LevelObject) {
    r.message = `${util.format(r.data, ...r.args)}\n`;
    return r;
};

function filterByLevel(allowed: string) {
    return (r: LevelObject) => r.level === allowed;
}

export {
    LoggerByLevel,
    filterByLevel,
    addMessageInBuiltinFormat,
    LevelObject,
}