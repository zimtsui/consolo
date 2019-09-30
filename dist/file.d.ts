/// <reference types="node" />
import fs from 'fs';
declare function createFileStream(filePath: string, basePath?: string): fs.WriteStream;
export default createFileStream;
export { createFileStream, };
