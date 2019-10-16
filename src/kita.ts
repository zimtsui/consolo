import { Transform } from 'stream';
import util from 'util';

class ObjectTransform extends Transform {
    constructor() {
        super({ objectMode: true });
    }
}

class Kita extends ObjectTransform {
    constructor() {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        this.push(r);
        cb();
    }
}

class Filter extends ObjectTransform {
    constructor(private f: (r: any) => boolean) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        if (this.f(r)) this.push(r);
        cb();
    }
}

class Modifier extends ObjectTransform {
    constructor(private f: (r: any) => unknown) {
        super();
    }

    _transform(r: unknown, encoding: unknown, cb: () => void) {
        const newR: unknown = this.f(r)
        this.push(newR || r);
        cb();
    }
}

class Finalizer extends ObjectTransform {
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