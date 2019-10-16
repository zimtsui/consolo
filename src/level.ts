import {
    Kita,
    Filter,
} from './';

const defaultLevels: string[] = [
    'error',
    'warn',
    'info',
    'debug',
];

class LoggerByLevel {
    [level: string]: (message: unknown) => void;

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
    constructor(allowed: string) {
        super(r => r.level === allowed);
    }
}

export {
    LoggerByLevel,
    FilterByLevel,
}