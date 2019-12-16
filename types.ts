import {HttpHeaders, HttpParams} from '@angular/common/http';

export interface IHTTPOptions {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

// export enum EEntityDeleted {
//   NOT_DELETED = 0,
//   DELETED_MARK = 1,
//   DELETED_ALLOWED = 10,
//   DELETED = 20,
// }
//
// export interface IEntity {
//   id: string;
//   source: string;
//   title?: string;
//   is_new?: boolean;
//   deleted?: EEntityDeleted;
//   drupal_internal__id?: string;
// }


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
