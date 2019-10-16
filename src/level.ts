import util from 'util';
import {
    Kita,
} from './kita';

interface LevelObject {
    [key: string]: any;
    level: string;
    data: any;
    args: unknown[];
    message?: string;
}

class LevelKita extends Kita<LevelObject, LevelObject> {
    constructor() {
        super();
    }

    public logger = new LoggerByLevel(this);
}

class LoggerByLevel {
    [level: string]: (data: unknown, ...args: unknown[]) => void;

    constructor(kita: Kita<LevelObject, LevelObject>) {
        return new Proxy(this, {
            get: function (target, field, receiver) {
                return function (data: unknown, ...args: unknown[]) {
                    const object: LevelObject = {
                        level: <string>field,
                        data,
                        args,
                    };
                    kita.write(object);
                }
            }
        });
    }
}

function addMessageInBuiltinFormat(r: LevelObject): LevelObject {
    r.message = `${util.format(r.data, ...r.args)}\n`;
    return r;
};

function filterByLevel(allowed: string) {
    return (r: LevelObject) => r.level === allowed;
}

function finalizeWithMessage(r: LevelObject): string {
    return r.message!;
}

export {
    LoggerByLevel,
    filterByLevel,
    addMessageInBuiltinFormat,
    LevelObject,
    finalizeWithMessage,
    LevelKita,
}