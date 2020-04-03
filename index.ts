/**
 * @overview
 * @example
 * [
 *  {
 *    path: 'resolved/path/to/source',
 *    imports: [...],
 *    exports: [...]
 *  }, {...}
 * ]
 */
/* eslint-env node */
import { readFile as fsReadFile } from 'fs';
import { promisify } from 'util';
import { sourceParse } from './src/parser';

const readFile = promisify(fsReadFile);

// import {}
// import { resolveExtension } from './utils/resolver';
// import _ from 'lodash';

// TODO cli or api path for source file #
const absolutePathToSourceFile = './stubs/some.pipe.ts';

(async function() {
  const fileContent = await readFile(absolutePathToSourceFile, 'utf8');
  const pp = sourceParse(fileContent);
  console.log(pp);
})();
