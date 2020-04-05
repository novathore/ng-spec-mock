import { ImportDeclaration } from "@babel/types";
import { map } from 'lodash';

export interface ImportMap {
    path: string;
    specifiers: Array<string>;
}

export function getImports(node: ImportDeclaration): ImportMap {
    const specifiers = map(node?.specifiers, specifier => specifier?.local?.name);
    const path = `${node?.source?.value}`;

    return { path, specifiers };
}
