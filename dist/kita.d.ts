/// <reference types="node" />
import { Transform } from 'stream';
declare class Kita<TIn, TOut> extends Transform {
    constructor();
    _transform(r: unknown, encoding: unknown, cb: () => void): void;
    filter<TNew extends TOut>(f: (r: TOut) => boolean): Filter<TOut, TNew>;
    modifier<TNew>(f: (r: TOut) => TNew): Modifier<TOut, TNew>;
    finalizer(f: (r: TOut) => string): Finalizer<TOut>;
}
declare class Filter<TIn, TOut extends TIn> extends Kita<TIn, TOut> {
    private f;
    constructor(f: (r: TIn) => boolean);
    _transform(r: TIn, encoding: unknown, cb: () => void): void;
}
declare class Modifier<TIn, TOut> extends Kita<TIn, TOut> {
    private f;
    constructor(f: (r: TIn) => TOut);
    _transform(r: TIn, encoding: unknown, cb: () => void): void;
}
declare class Finalizer<TIn> extends Kita<TIn, string> {
    private f;
    constructor(f: (r: TIn) => string);
    _transform(r: TIn, encoding: unknown, cb: () => void): void;
}
export default Kita;
export { Kita, Filter, Modifier, Finalizer, };
