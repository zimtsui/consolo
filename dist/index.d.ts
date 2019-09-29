/// <reference types="node" />
import { Transform } from 'stream';
import fs from 'fs';
declare class ObjectTransform extends Transform {
    constructor();
}
declare class Kita extends ObjectTransform {
    constructor();
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
}
declare class Filter extends ObjectTransform {
    private f;
    constructor(f: (r: any) => boolean);
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
}
declare class Modifier extends ObjectTransform {
    private f;
    constructor(f: (r: any) => unknown);
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
}
declare class Finalizer extends ObjectTransform {
    private f;
    constructor(f: (r: any) => string);
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
}
declare function createFileStream(filePath: string, basePath?: string): fs.WriteStream;
declare type Level = string;
declare class LoggerByLevel {
    constructor(kita: Kita, levels?: string[]);
}
declare class FilterByLevel extends Filter {
    constructor(allowed: Level);
}
export default Kita;
export { Kita, Filter, Modifier, Finalizer, createFileStream, LoggerByLevel, FilterByLevel, };
