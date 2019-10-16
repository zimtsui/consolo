import { Kita, Filter, Modifier } from './kita';
declare class LoggerByLevel {
    [level: string]: (message: unknown) => void;
    constructor(kita: Kita, levels?: string[]);
}
declare const builtinFormatter: Modifier;
declare class FilterByLevel extends Filter {
    constructor(allowed: string);
}
export { LoggerByLevel, FilterByLevel, builtinFormatter, };
