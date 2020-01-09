import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IConfigRequest, IRequest, IRequestData} from './request';
import {IEntity} from '../../dangular-common/entity';
import {IConfigModel} from './model';


export interface IDataService {
  load(request: IRequest): Observable<any>;

  loadMultiple(request: IRequest): Observable<any[]>;

  saveNew(request: IRequest): Observable<any>;

  saveUpdate(request: IRequest): Observable<any>;

  delete(request: IRequest): Observable<any>;

  modelScheme(request: IRequest): Observable<any>;
}

export interface IResponseField {
  label: string;
  type: string;
  multiple?: boolean;
}


export type HttpMethods = 'get' | 'path' | 'post';

export interface IResponseFactoryService {
  create<T>(data: any): Observable<T>;
}

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


export interface IDataConfigService {
  load<T>(source: string, entity_type: string, bundle: string): Observable<T>;

  loadMultiple<T>(source: string, filters: any): Observable<T[]>;
}

export interface IRequestFactoryService {
  load(requestData: IRequestData, config: IConfigRequest): IRequest;

  loadMultiple(requestData: IRequestData, config: IConfigRequest): IRequest;

  saveNew(requestData: IRequestData, config: IConfigRequest): IRequest;

  saveUpdate(requestData: IRequestData, config: IConfigRequest): IRequest;

  delete(requestData: IRequestData, config: IConfigRequest): IRequest;

  modelScheme(requestData: IRequestData, config: IConfigRequest): IRequest;
}

export interface IModelService {
  load<T>(entity_type: string, bundle: string, id: string): Observable<IEntity>;

  createEntities(response: any, config: IConfigModel): IEntity[];

  loadMultiple<T>(entity_type: string, bundle: string, filters?: any): Observable<IEntity[]>;


  saveUpdate<T>(entity_type: string, bundle: string, entity: IEntity): Observable<IEntity>;

  saveNew<T>(entity_type: string, bundle: string, entity: IEntity): Observable<IEntity>;
}
