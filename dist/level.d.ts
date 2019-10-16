import { Kita } from './kita';
interface LevelObject {
    level: string;
    data: unknown;
    args: unknown[];
    message?: string;
}
declare class LoggerByLevel {
    [level: string]: (message: unknown) => void;
    constructor(kita: Kita, levels?: string[]);
}
declare function addMessageInBuiltinFormat(r: LevelObject): LevelObject;
declare function filterByLevel(allowed: string): (r: LevelObject) => boolean;
export { LoggerByLevel, filterByLevel, addMessageInBuiltinFormat, LevelObject, };
