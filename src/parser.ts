
import traverse from '@babel/traverse';

import { parse } from '@babel/parser';
import { isImportDeclaration } from '@babel/types';
import { getImports, ImportMap } from './traverse-methods/import-declaration';
import { getDependencyInjection } from "./traverse-methods/class-declaration";

export function sourceParse(fileContent: string) {

  // TODO move to config
  const ast = parse(fileContent, {
    sourceType: 'module',
    plugins: ['typescript', 'decorators-legacy', 'classProperties', 'objectRestSpread', 'optionalCatchBinding']
  });

  const imports: Array<ImportMap> = [] as Array<ImportMap>;

  traverse(ast, {
    ImportDeclaration(path) {
      const Node = path.node;
      if (isImportDeclaration(Node)) {
        const importMap = getImports(Node);
        imports.push(importMap);
      }
    },

    // TODO make issue to babel types or pull request for ClassDeclaration, it doesn't have types;
    ClassDeclaration(path) {
      const Node = path.node;
      // @ts-ignore
      const dependencyInjection = getDependencyInjection(Node);
      console.log(dependencyInjection);
    }
  });

  return imports;
}
