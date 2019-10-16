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

interface DefaultObject {
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
                    const object: DefaultObject = {
                        level,
                        data,
                        args,
                    };
                    kita.write(object);
                }
            });
    }
}

function addMessageInBuiltinFormat(r: DefaultObject) {
    r.message = `${util.format(r.data, ...r.args)}\n`;
    return r;
};

function filterByLevel(allowed: string) {
    return (r: DefaultObject) => r.level === allowed;
}

export {
    LoggerByLevel,
    filterByLevel,
    addMessageInBuiltinFormat,
}