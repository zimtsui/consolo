import util from 'util';
import {
    Kita,
    Filter,
    Modifier,
} from './kita';

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
                value: function (data: unknown, ...args: unknown[]) {
                    kita.write({
                        level,
                        data,
                        args,
                    });
                }
            });
    }
}

const builtinFormatter = new Modifier(r => {
    r.message = util.format(r.data, ...r.args) + '\n';
});

class FilterByLevel extends Filter {
    constructor(allowed: string) {
        super(r => r.level === allowed);
    }
}

export {
    LoggerByLevel,
    FilterByLevel,
    builtinFormatter,
}