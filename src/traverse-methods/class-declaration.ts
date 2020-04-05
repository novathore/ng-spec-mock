import {
    isTSTypeAnnotation,
    isTSTypeReference,
    isTSParameterProperty,
    isIdentifier,
    isClassMethod,
    isClassBody, ClassDeclaration
} from '@babel/types';
import { find, map } from 'lodash';

export interface DependencyInjectionMap {
    classDeclaration: string;
    variableName: string;
}

// TODO check that classDeclaration wrapped into angular injector decorator;
export function getDependencyInjection(Node: ClassDeclaration): Array<DependencyInjectionMap> | false | Array<any> {
    const constructorBody = isClassBody(Node?.body) && find(Node.body.body, node => {
        return isClassMethod(node) && node.kind === 'constructor';
    });

    if (constructorBody && isClassMethod(constructorBody)) {
        return map(constructorBody.params, param => {
            if (
                isTSParameterProperty(param) &&
                isTSTypeAnnotation(param?.parameter?.typeAnnotation) &&
                isTSTypeReference(param?.parameter?.typeAnnotation?.typeAnnotation) &&
                isIdentifier(param?.parameter?.typeAnnotation?.typeAnnotation?.typeName)
            ) {
                const classDeclaration = param.parameter.typeAnnotation.typeAnnotation.typeName.name;
                const variableName = isIdentifier(param?.parameter) && param.parameter.name;

                return {
                    classDeclaration, variableName
                }
            }
        });
    }

    return false;
}
