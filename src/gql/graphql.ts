/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  accessToken: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Analistas = {
  __typename?: 'Analistas';
  analistas?: Maybe<Array<AnlistaResult>>;
};

export type AnlistaResult = {
  __typename?: 'AnlistaResult';
  cedula: Scalars['String']['output'];
  direccion: Direccion;
  grado: Scalars['String']['output'];
  id: Scalars['String']['output'];
  nombres: Scalars['String']['output'];
  unidad: Unidad;
  zona: Zona;
};

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isCurrentAccountAnswer: Scalars['Boolean']['output'];
  percent: Scalars['Int']['output'];
};

export type Direccion = {
  __typename?: 'Direccion';
  nombre_direccion: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']['output']>;
  saveSurveyResult: SurveyResult;
  signUp: Account;
};


export type MutationSaveSurveyResultArgs = {
  answer: Scalars['String']['input'];
  surveyId: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']['output']>;
  getAnalistaByGrado?: Maybe<Analistas>;
  getAnalistaByNumCl?: Maybe<AnlistaResult>;
  getAnalistaByUnidad?: Maybe<Analistas>;
  login: Account;
  surveyResult: SurveyResult;
  surveys: Array<Survey>;
};


export type QueryGetAnalistaByGradoArgs = {
  grado: Scalars['String']['input'];
};


export type QueryGetAnalistaByNumClArgs = {
  numero_cedula: Scalars['String']['input'];
};


export type QueryGetAnalistaByUnidadArgs = {
  nombre_unidad: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QuerySurveyResultArgs = {
  surveyId: Scalars['String']['input'];
};

export type Survey = {
  __typename?: 'Survey';
  answers: Array<SurveyAnswer>;
  date: Scalars['DateTime']['output'];
  didAnswer?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  question: Scalars['String']['output'];
};

export type SurveyAnswer = {
  __typename?: 'SurveyAnswer';
  answer: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
};

export type SurveyResult = {
  __typename?: 'SurveyResult';
  answers: Array<Answer>;
  date: Scalars['DateTime']['output'];
  question: Scalars['String']['output'];
  surveyId: Scalars['String']['output'];
};

export type Unidad = {
  __typename?: 'Unidad';
  _id: Scalars['String']['output'];
  nombre_unidad: Scalars['String']['output'];
};

export type Zona = {
  __typename?: 'Zona';
  _id: Scalars['String']['output'];
  nombre_zona: Scalars['Int']['output'];
};

export type GetAnalistaByUnidadQueryVariables = Exact<{
  nombreUnidad: Scalars['String']['input'];
}>;


export type GetAnalistaByUnidadQuery = { __typename?: 'Query', getAnalistaByUnidad?: { __typename?: 'Analistas', analistas?: Array<{ __typename?: 'AnlistaResult', nombres: string, grado: string, cedula: string, id: string, zona: { __typename?: 'Zona', nombre_zona: number }, unidad: { __typename?: 'Unidad', nombre_unidad: string }, direccion: { __typename?: 'Direccion', nombre_direccion: string } }> | null } | null };

export type GetAnalistaByNumClQueryVariables = Exact<{
  numeroCedula: Scalars['String']['input'];
}>;


export type GetAnalistaByNumClQuery = { __typename?: 'Query', getAnalistaByNumCl?: { __typename?: 'AnlistaResult', id: string, cedula: string, grado: string, nombres: string, unidad: { __typename?: 'Unidad', nombre_unidad: string, _id: string }, zona: { __typename?: 'Zona', nombre_zona: number, _id: string }, direccion: { __typename?: 'Direccion', nombre_direccion: string } } | null };

export type AnalistasQueryVariables = Exact<{
  grado: Scalars['String']['input'];
}>;


export type AnalistasQuery = { __typename?: 'Query', getAnalistaByGrado?: { __typename?: 'Analistas', analistas?: Array<{ __typename?: 'AnlistaResult', nombres: string, cedula: string, grado: string, id: string, direccion: { __typename?: 'Direccion', nombre_direccion: string }, unidad: { __typename?: 'Unidad', _id: string, nombre_unidad: string }, zona: { __typename?: 'Zona', _id: string, nombre_zona: number } }> | null } | null };


export const GetAnalistaByUnidadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnalistaByUnidad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nombreUnidad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAnalistaByUnidad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nombre_unidad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nombreUnidad"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analistas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre_zona"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unidad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre_unidad"}}]}},{"kind":"Field","name":{"kind":"Name","value":"direccion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre_direccion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nombres"}},{"kind":"Field","name":{"kind":"Name","value":"grado"}},{"kind":"Field","name":{"kind":"Name","value":"cedula"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnalistaByUnidadQuery, GetAnalistaByUnidadQueryVariables>;
export const GetAnalistaByNumClDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnalistaByNumCl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numeroCedula"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAnalistaByNumCl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"numero_cedula"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numeroCedula"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cedula"}},{"kind":"Field","name":{"kind":"Name","value":"grado"}},{"kind":"Field","name":{"kind":"Name","value":"nombres"}},{"kind":"Field","name":{"kind":"Name","value":"unidad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre_unidad"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"zona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre_zona"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"direccion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre_direccion"}}]}}]}}]}}]} as unknown as DocumentNode<GetAnalistaByNumClQuery, GetAnalistaByNumClQueryVariables>;
export const AnalistasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Analistas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"grado"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAnalistaByGrado"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"grado"},"value":{"kind":"Variable","name":{"kind":"Name","value":"grado"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analistas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombres"}},{"kind":"Field","name":{"kind":"Name","value":"cedula"}},{"kind":"Field","name":{"kind":"Name","value":"grado"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"direccion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre_direccion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unidad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"nombre_unidad"}}]}},{"kind":"Field","name":{"kind":"Name","value":"zona"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"nombre_zona"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AnalistasQuery, AnalistasQueryVariables>;