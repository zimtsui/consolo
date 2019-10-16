import { Transform } from 'stream';
import util from 'util';

class Kita extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        this.push(r);
        cb();
    }

    public filter(f: (r: any) => boolean) {
        return this.pipe(new Filter(f));
    }

    public modifier(f: (r: any) => unknown) {
        return this.pipe(new Modifier(f));
    }

    public finalizer(f: (r: any) => string) {
        return this.pipe(new Finalizer(f));
    }
}

class Filter extends Kita {
    constructor(private f: (r: any) => boolean) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        if (this.f(r)) this.push(r);
        cb();
    }
}

class Modifier extends Kita {
    constructor(private f: (r: any) => unknown) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        const newR: unknown = this.f(r)
        this.push(newR || r);
        cb();
    }
}

class Finalizer extends Kita {
    constructor(private f: (r: any) => string) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        this.push(util.format(this.f(r)));
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