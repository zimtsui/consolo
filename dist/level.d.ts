import { Kita } from './kita';
interface DefaultObject {
    level: string;
    data: unknown;
    args: unknown[];
    message?: string;
}
declare class LoggerByLevel {
    [level: string]: (message: unknown) => void;
    constructor(kita: Kita, levels?: string[]);
}
declare function addMessageInBuiltinFormat(r: DefaultObject): DefaultObject;
declare function filterByLevel(allowed: string): (r: DefaultObject) => boolean;
export { LoggerByLevel, filterByLevel, addMessageInBuiltinFormat, };
