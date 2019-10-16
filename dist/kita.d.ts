/// <reference types="node" />
import { Transform } from 'stream';
declare class Kita extends Transform {
    constructor();
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
    filter(f: (r: any) => boolean): Filter;
    modifier(f: (r: any) => unknown): Modifier;
    finalizer(f: (r: any) => string): Finalizer;
}
declare class Filter extends Kita {
    private f;
    constructor(f: (r: unknown) => boolean);
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
}
declare class Modifier extends Kita {
    private f;
    constructor(f: (r: unknown) => unknown);
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
}
declare class Finalizer extends Kita {
    private f;
    constructor(f: (r: unknown) => string);
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
}
export default Kita;
export { Kita, Filter, Modifier, Finalizer, };
