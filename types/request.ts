import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISourceKeys} from './config';

export interface IConfigRequestCommon {
  prefix?: string;
}

export interface IConfigRequestPoints {
  schema: string;
  collection: string;
  item: string;
}

export interface IConfigRequest extends ISourceKeys {
  base: string;
  points?: IConfigRequestPoints;
}


export type TConfigSource = Record<string, IConfigRequest>;

export interface IConfigRequestService {
  get(keys: ISourceKeys): Observable<IConfigRequest>;
}


export interface IRequest {
  url: string;
  params?: HttpParams;
  data?: any;
}

export interface IRequestData {
  filters?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export enum EFilterOperator {
  EQUAL = '=',
  NOT_EQUAL = '<>',
  LARGE = '>',
  LARGE_OR_EQUAL = '>=',
  LESS = '<',
  LESS_OR_EQUAL = '<=',
  STARTS_WITH = 'STARTS_WITH',
  CONTAINS = 'CONTAINS',
  ENDS_WITH = 'ENDS_WITH',
  IN = 'IN',
  NOT_IN = 'NOT IN',
  BETWEEN = 'BETWEEN',
  NOT_BETWEEN = 'NOT BETWEEN',
  IS_NULL = 'IS NULL',
  IS_NOT_NULL = 'IS NOT NULL',
}

export interface IEntityRequestFilterCondition {
  path: string[];
  value: string | string[];
  operator: EFilterOperator;
}

export interface IEntityRequestFilter {
  name: string;
  condition: IEntityRequestFilterCondition;

}

export interface IEntityRequest {
  source: string;
  id?: string;
  filters?: IEntityRequestFilter[];
}
