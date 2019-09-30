import { Kita, Filter } from './';
declare type Level = string;
declare class LoggerByLevel {
    constructor(kita: Kita, levels?: string[]);
}
declare class FilterByLevel extends Filter {
    constructor(allowed: Level);
}
export { LoggerByLevel, FilterByLevel, };
