/// <reference types="node" />
export * from './level';
export * from './file';
import { Transform } from 'stream';
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
export default Kita;
export { Kita, Filter, Modifier, Finalizer, };
