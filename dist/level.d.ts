import { Kita, Filter } from './kita';
declare class LoggerByLevel {
    [level: string]: (message: unknown) => void;
    constructor(kita: Kita, levels?: string[]);
}
declare class FilterByLevel extends Filter {
    constructor(allowed: string);
}
export { LoggerByLevel, FilterByLevel, };
