import fs from 'fs';
import process from 'process';
import path from 'path';

function createFileStream(filePath: string, basePath = process.cwd()) {
    return fs.createWriteStream(
        path.join(basePath, filePath),
        { flags: 'a' },
    );
}

export default createFileStream;
export {
    createFileStream,
}