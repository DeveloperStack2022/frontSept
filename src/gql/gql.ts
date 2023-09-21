/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetAnalistaByUnidad($nombreUnidad: String!) {\n        getAnalistaByUnidad(nombre_unidad: $nombreUnidad) {\n            analistas {\n                zona {\n                    nombre_zona\n                }\n                unidad {\n                    nombre_unidad\n                }\n                direccion {\n                    nombre_direccion\n                }\n                nombres\n                grado\n                cedula\n                id\n            }\n        }\n    }\n": types.GetAnalistaByUnidadDocument,
    "\nquery GetAnalistaByNumCl($numeroCedula: String!) {\n    getAnalistaByNumCl(numero_cedula: $numeroCedula) {\n        id\n        cedula\n        grado\n        nombres\n        unidad {\n            nombre_unidad\n            _id\n        }\n        zona {\n            nombre_zona\n            _id\n        }\n        direccion {\n            nombre_direccion\n        }\n    }\n} ": types.GetAnalistaByNumClDocument,
    "query Analistas($grado: String!) {\n    getAnalistaByGrado(grado: $grado) {\n      analistas {\n        nombres\n        cedula\n        grado\n        id\n        direccion {\n          nombre_direccion\n        }\n        unidad {\n          _id\n          nombre_unidad\n        }\n        zona {\n          _id\n          nombre_zona\n        }\n      }\n    }\n  }": types.AnalistasDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAnalistaByUnidad($nombreUnidad: String!) {\n        getAnalistaByUnidad(nombre_unidad: $nombreUnidad) {\n            analistas {\n                zona {\n                    nombre_zona\n                }\n                unidad {\n                    nombre_unidad\n                }\n                direccion {\n                    nombre_direccion\n                }\n                nombres\n                grado\n                cedula\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetAnalistaByUnidad($nombreUnidad: String!) {\n        getAnalistaByUnidad(nombre_unidad: $nombreUnidad) {\n            analistas {\n                zona {\n                    nombre_zona\n                }\n                unidad {\n                    nombre_unidad\n                }\n                direccion {\n                    nombre_direccion\n                }\n                nombres\n                grado\n                cedula\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAnalistaByNumCl($numeroCedula: String!) {\n    getAnalistaByNumCl(numero_cedula: $numeroCedula) {\n        id\n        cedula\n        grado\n        nombres\n        unidad {\n            nombre_unidad\n            _id\n        }\n        zona {\n            nombre_zona\n            _id\n        }\n        direccion {\n            nombre_direccion\n        }\n    }\n} "): (typeof documents)["\nquery GetAnalistaByNumCl($numeroCedula: String!) {\n    getAnalistaByNumCl(numero_cedula: $numeroCedula) {\n        id\n        cedula\n        grado\n        nombres\n        unidad {\n            nombre_unidad\n            _id\n        }\n        zona {\n            nombre_zona\n            _id\n        }\n        direccion {\n            nombre_direccion\n        }\n    }\n} "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Analistas($grado: String!) {\n    getAnalistaByGrado(grado: $grado) {\n      analistas {\n        nombres\n        cedula\n        grado\n        id\n        direccion {\n          nombre_direccion\n        }\n        unidad {\n          _id\n          nombre_unidad\n        }\n        zona {\n          _id\n          nombre_zona\n        }\n      }\n    }\n  }"): (typeof documents)["query Analistas($grado: String!) {\n    getAnalistaByGrado(grado: $grado) {\n      analistas {\n        nombres\n        cedula\n        grado\n        id\n        direccion {\n          nombre_direccion\n        }\n        unidad {\n          _id\n          nombre_unidad\n        }\n        zona {\n          _id\n          nombre_zona\n        }\n      }\n    }\n  }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;