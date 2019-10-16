import test from 'ava';
import {
    Kita,
    Modifier,
    Finalizer,
    LoggerByLevel,
    FilterByLevel,
    builtinFormatter,
} from '../../';
import { createFileStream } from '../../dist/file';
import process from 'process';
import EventEmitter from 'events';

test.serial('1', async t => {
    const kita = new Kita();
    const infoLog = kita
        .pipe(new FilterByLevel('info'))
        .pipe(new Modifier(r => {
            r.timestamp = Date.now();
        }))
        .pipe(builtinFormatter)
        .pipe(new Finalizer(r =>
            `[${r.timestamp}] ${r.message}\n`))
        .pipe(process.stdout);

    const jsonLog = kita
        .pipe(new FilterByLevel('json'))
        .pipe(new Finalizer(r =>
            `${JSON.stringify(r.data)}\n`))
        .pipe(createFileStream('./json.log', __dirname));

    const errorLog = kita
        .pipe(new FilterByLevel('error'))
        .pipe(new Finalizer(r =>
            `${r.data.stack}\n`))
        .pipe(process.stderr);

    const logger: any = new LoggerByLevel(kita, [
        'error',
        'json',
        'info',
    ]);

    logger.error(new Error());
    logger.json({ a: 1 });
    logger.info('haha');
    logger.error(new Error());
    logger.json({ b: 2 });
    logger.info('xixi');

    kita.end();

    await EventEmitter.once(jsonLog, 'finish');
});