import { size } from 'lodash';

import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import { isClassDeclaration, isImportDeclaration } from '@babel/types';
import { getImports, ImportMap } from './traverse-methods/import-declaration';
import { getDependencyInjection, DependencyInjectionMap } from './traverse-methods/class-declaration';

export function sourceParse(fileContent: string) {

  // TODO move to config
  const ast = parse(fileContent, {
    sourceType: 'module',
    plugins: ['typescript', 'decorators-legacy', 'classProperties', 'objectRestSpread', 'optionalCatchBinding']
  });

  let imports: Array<ImportMap> = [] as Array<ImportMap>;
  let dependencies: Array<DependencyInjectionMap> = [] as Array<DependencyInjectionMap>;
  traverse(ast, {
    ImportDeclaration(path) {
      const Node = path.node;
      if (isImportDeclaration(Node)) {
        const resolvedImports = getImports(Node);
        if (resolvedImports) {
          imports.push(resolvedImports);
        }
      }
    },

    ClassDeclaration(path) {
      const Node = path.node;
      if (isClassDeclaration(Node)) {
        const dependencyInjections = getDependencyInjection(Node);
        if (dependencyInjections && size(dependencyInjections)) {
          dependencies = dependencyInjections;
        }
      }
    }
  });

  return {
    imports,
    dependencies
  };
}
