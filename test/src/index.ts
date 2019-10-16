import test from 'ava';
import {
    Kita,
    LoggerByLevel,
    createFileStream,
    filterByLevel,
    addMessageInBuiltinFormat,
} from '../../';
import process from 'process';
import EventEmitter from 'events';

test.serial('1', async t => {
    const kita = new Kita();
    const infoLog = kita
        .filter(filterByLevel('info'))
        .modifier(r => {
            r.timestamp = Date.now();
        })
        .modifier(addMessageInBuiltinFormat)
        .finalizer(r =>
            `[${r.timestamp}] ${r.message}\n`)
        .pipe(process.stdout);

    const jsonLog = kita
        .filter(filterByLevel('json'))
        .finalizer(r =>
            `${JSON.stringify(r.data)}\n`)
        .pipe(createFileStream('./json.log', __dirname));

    const errorLog = kita
        .filter(filterByLevel('error'))
        .finalizer(r =>
            `${r.data.stack}\n`)
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