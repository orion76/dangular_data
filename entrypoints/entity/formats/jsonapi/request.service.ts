import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {IEntityRequestFactory} from '../../types';
import {IRequest, UHTTPMethod} from '../../../types';
import {APP_CONFIG_SERVICE, IAppConfigService, IEntryPointConfig} from '../../../../../dangular-config';
import {EEntityDeleted, IEntity} from '../../../../../dangular-common/entity';

@Injectable()
export class JsonAPIRequestFactoryService implements IEntityRequestFactory {

  constructor(@Inject(APP_CONFIG_SERVICE) private config: IAppConfigService) {
  }

  create(source: string): Observable<IRequest> {
    const method: UHTTPMethod = 'POST';

    return this.config.getEntrypoint(source).pipe(
      map((config: IEntryPointConfig) => {
        return {method, url: this.config.createUrl(config), body: {}} as IRequest;
      })
    );
  }

  delete(entity: IEntity): Observable<IRequest> {
    const method: UHTTPMethod = 'POST';

    entity.deleted = EEntityDeleted.DELETED_MARK;

    return this.config.getEntrypoint(entity.source).pipe(
      map((config: IEntryPointConfig) => {
        return {method, url: this.config.createUrl(config), body: entity} as IRequest;
      })
    );
  }

  getItem(source: string, id: string): Observable<IRequest> {
    const method: UHTTPMethod = 'GET';

    return this.config.getEntrypoint(source).pipe(
      map((config: IEntryPointConfig) => {
        return {method, url: this.config.createUrl(config, id)} as IRequest;
      })
    );
  }

  getItems(source: string, filters?: any): Observable<IRequest> {
    const method: UHTTPMethod = 'GET';

    return this.config.getEntrypoint(source).pipe(
      map((config: IEntryPointConfig) => {
        return {method, url: this.config.createUrl(config), params: this._createFilters(filters)} as IRequest;
      })
    );
  }

  save(entity: IEntity): Observable<IRequest> {
    const method: UHTTPMethod = 'POST';

    return this.config.getEntrypoint( entity.source).pipe(
      map((config: IEntryPointConfig) => {
        return {method, url: this.config.createUrl(config), body: entity} as IRequest;
      })
    );
  }

  private _createFilters(filters: any): HttpParams | { [param: string]: string | string[] } {
    const params = {};
    if (filters) {
      Object.keys(filters).forEach((fieldName: string) => {
        params[`filter[${fieldName}]`] = filters[fieldName];
      });
    }
    return params;
  }

  private createUrl(url: string, id: string): string {
    return `${url}/${id}`;
  }


}
