import { Kita } from './kita';
interface LevelObject {
    [key: string]: any;
    level: string;
    data: any;
    args: unknown[];
    message?: string;
}
declare class LevelKita extends Kita<LevelObject, LevelObject> {
    constructor();
    logger: LoggerByLevel;
}
declare class LoggerByLevel {
    [level: string]: (data: unknown, ...args: unknown[]) => void;
    constructor(kita: Kita<LevelObject, LevelObject>);
}
declare function addMessageInBuiltinFormat(r: LevelObject): LevelObject;
declare function filterByLevel(allowed: string): (r: LevelObject) => boolean;
declare function finalizeWithMessage(r: LevelObject): string;
export { LoggerByLevel, filterByLevel, addMessageInBuiltinFormat, LevelObject, finalizeWithMessage, LevelKita, };
