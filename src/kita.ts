import { Transform } from 'stream';

class Kita<TIn, TOut> extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        this.push(r);
        cb();
    }

    public filter<TNew extends TOut>(f: (r: TOut) => boolean) {
        return this.pipe(new Filter<TOut, TNew>(f));
    }

    public modifier<TNew>(f: (r: TOut) => TNew) {
        return this.pipe(new Modifier<TOut, TNew>(f));
    }

    public finalizer(f: (r: TOut) => string) {
        return this.pipe(new Finalizer<TOut>(f));
    }
}

class Filter<TIn, TOut extends TIn> extends Kita<TIn, TOut> {
    constructor(private f: (r: TIn) => boolean) {
        super();
    }

    _transform(r: TIn, encoding: unknown, cb: () => void) {
        if (this.f(r)) this.push(r);
        cb();
    }
}

class Modifier<TIn, TOut> extends Kita<TIn, TOut> {
    constructor(private f: (r: TIn) => TOut) {
        super();
    }

    _transform(r: TIn, encoding: unknown, cb: () => void) {
        this.push(this.f(r));
        cb();
    }
}

class Finalizer<TIn> extends Kita<TIn, string> {
    constructor(private f: (r: TIn) => string) {
        super();
    }

    _transform(r: TIn, encoding: unknown, cb: () => void) {
        this.push(this.f(r));
        cb();
    }
}

export default Kita;
export {
    Kita,
    Filter,
    Modifier,
    Finalizer,
}