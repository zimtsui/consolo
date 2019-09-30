import {
    Kita,
    Filter,
} from './';

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

export {
    LoggerByLevel,
    FilterByLevel,
}