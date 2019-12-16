import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import {IEntity} from '../../../dangular-common/entity';
import {IEntrypointService, IRequest} from '../types';

export const ENTITY_ENTRYPOINT = new InjectionToken<IEntityEntrypoint>('ENTITY_ENTRYPOINT');
export const ENTITY_RESPONSE_CONVERTER = new InjectionToken<IEntityEntrypoint>('ENTITY_RESPONSE_CONVERTER');
export const ENTITY_REQUEST_FACTORY = new InjectionToken('ENTITY_REQUEST_FACTORY');

export interface IEntityEntrypoint extends IEntrypointService {
  create(source: string): Observable<IEntity>;

  getItem<T extends IEntity>(source: string, id: string): Observable<T>;

  getItems<T extends IEntity>(source: string, filters?: any): Observable<T[]>;

  save<T extends IEntity>(entity: T): Observable<T>;

  delete<T extends IEntity>(entity: T): Observable<T>;
}

export interface IEntityRequestFactory {
  create(source: string): Observable<IRequest>;

  delete(entity: IEntity): Observable<IRequest>;

  save(entity: IEntity): Observable<IRequest>;

  getItems(source: string, filters?: any): Observable<IRequest>;

  getItem(source: string, id: string): Observable<IRequest>;
}



