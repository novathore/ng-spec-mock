import { accessSync, constants } from 'fs';

export function resolveExtension(path) {
  try {
    accessSync(`${path}.ts`, constants.F_OK);

    return `${path}.ts`;
  } catch (e) {
    return `${path}.js`;
  }
}
