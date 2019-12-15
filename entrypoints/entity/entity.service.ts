import {Inject, Injectable} from '@angular/core';
import {IEntity} from '@xangular-common/entity';
import {Observable} from 'rxjs';
import {ENTITY_REQUEST_FACTORY, ENTITY_RESPONSE_CONVERTER, IEntityEntrypoint, IEntityRequestFactory} from './types';
import {IResponseConverter} from '@app-services/data';
import {EntrypointAbstractService} from '@app-services/data/entrypoints/entrypoint.abstract';
import {ITransportService, TRANSPORT_SERVICE} from '@app-services/data/transport/types';
import {switchMap, tap} from 'rxjs/operators';
import {rxLog} from '@app/libraries/logger/rxjs/log';

@Injectable()
export class EntityEntrypointService extends EntrypointAbstractService implements IEntityEntrypoint {

  constructor(
    @Inject(ENTITY_REQUEST_FACTORY) protected request: IEntityRequestFactory,
    @Inject(ENTITY_RESPONSE_CONVERTER) protected converter: IResponseConverter,
    @Inject(TRANSPORT_SERVICE) protected transport: ITransportService,
  ) {
    super(converter);
  }

  create<T extends IEntity>(source: string): Observable<T> {
    return this.transport.request(this.request.create(source)).pipe(
      switchMap((response: any) => this.converter.convert(response))
    );
  }

  save<T extends IEntity>(entity: T): Observable<T> {
    return this.transport.request(this.request.save(entity)).pipe(
      switchMap((response: any) => this.converter.convert(response))
    );
  }

  delete<T extends IEntity>(entity: IEntity): Observable<T> {
    return this.transport.request(this.request.delete(entity)).pipe(
      switchMap((response: any) => this.converter.convert(response))
    );
  }

  getItem<T extends IEntity>(source: string, id: string): Observable<T> {
    return this.transport.request(this.request.getItem(source, id)).pipe(
      rxLog('getItem', source, id),
      switchMap((response: any) => this.converter.convert(response))
    );
  }

  getItems<T extends IEntity>(source: string, filters?: any): Observable<T[]> {

    return this.transport.request(this.request.getItems(source, filters)).pipe(
      switchMap((response: any) => this.converter.convert(response))
    );
  }

}

