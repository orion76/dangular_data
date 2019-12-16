import {HttpClient} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {IRequest} from './entrypoints/types';
import {APP_CONFIG_SERVICE, IAppConfigService, ISourceConfigEntity} from '../dangular-config';
import {IEntity, IEntityFieldConfig} from '../dangular-common/entity';
import {IEntityRequest} from './types';
import {IUniqueIdService, UNIQUE_ID_SERVICE} from '../dangular-common/services/unique-id.service';
import {GetSet} from '../dangular-common/metadata';


export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');


export interface IDataService {
  request(request: IRequest); // : Observable<any>;

  getItem<T extends IEntity>(request: IEntityRequest); // : Observable<T>;

  getItems<T extends IEntity>(request: IEntityRequest); // : Observable<T[]>;

  save(entity: IEntity); // : Observable<IEntity>;

  createNew(request: IEntityRequest); // : Observable<IEntity>;

  // getUser(uid: string): Observable<IUser>;
}

@Injectable()
export class DataService implements IDataService {

  requestCount = 0;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG_SERVICE) protected config: IAppConfigService,
    @Inject(UNIQUE_ID_SERVICE) protected uniqueId: IUniqueIdService,
  ) {

  }

  createNew(request: IEntityRequest) {
    return this.config.getEntrypoint(request.source)
      .pipe(
        // map((config: IEntryPointConfig) => this._createNew(request, config))
      );
  }

  getItem<T extends IEntity>(request: IEntityRequest) {
    // return this.config.getEntrypoint(request.source)
    //   .pipe(
    //     map((config: IEntryPointConfig) => new RequestJsonApi(request, config)),
    //     switchMap((request: IRequest) => {
    //       return this.request('jsonapi', 'GET', request.url(), request.options())
    //         .pipe(take(1));
    //     }),
    //     map((data: IEntity) => data[0] ? data[0] : null)
    //   );
  }

  getItems<T extends IEntity>(request: IEntityRequest) {

    // return this.config.get(request.source)
    //   .pipe(
    //     tap((config: ISourceConfig<T>) => Log.DATA('(getItems)', {request, config})),
    //     map((config: ISourceConfig<T>) => new RequestJsonApi(request, config)),
    //     switchMap((request: IRequest) => {
    //       return this.request<T[]>('jsonapi', 'GET', request.url(), request.options())
    //         .pipe(take(1));
    //     })
    //   );
  }

  save<T extends IEntity>(entity: T) {
    const request: IEntityRequest = {source: entity.source};
    // return this.config.get(request.source)
    //   .pipe(
    //     map((config: ISourceConfig<T>) => new RequestJsonApi(request, config)),
    //     switchMap((request: IRequest) => {
    //       return this.request('jsonapi', 'POST', request.url(), request.options());
    //     }),
    //   );

  }

  // public request<T>(entrypoint: TEntrypoint, method: string, url: string, params?: HttpParams, data?: any): Observable<T> {
  public request<T>(request: IRequest) {

    this.requestCount++;

    // const entrypointConfig = this.config.entrypoints[request.entrypoint];

    // let url: string;
    // if (entrypointConfig.root && entrypointConfig.root.length > 0) {
    //   url = `${entrypointConfig.root}/${request.url}`;
    // } else {
    //   url = request.url;
    // }
    //

    // let response: any;

    // switch (request.method) {
    //   case 'get':
    //     response = this.http.get(url, request.options);
    //     break;
    //   case 'post':
    //     response = this.http.post(url, request.body, request.options);
    //     break;
    // }

    // return response.pipe(take(1));
  }


  private _getDefaultValues<E>(fields: { [K: string]: IEntityFieldConfig }, parentPath: string[]) {

    const values: any[] = [];

    Object.keys(fields).forEach((fieldName: string) => {
      const config = fields[fieldName];
      const path = [...parentPath, fieldName];
      if ((config as any).node) {
        this._getDefaultValues((config as any).node, path)
          .forEach((value) => values.push(value));

      } else {
        const value = config.defaultValue;
        values.push({path, value});
      }
    });

    return values;
  }

  private _addFields<T>(entity: T, fields: { [K: string]: IEntityFieldConfig }) {

    this._getDefaultValues(fields, []).forEach((data: any) => {
      GetSet.setIn(entity, data.url, data.value);
    });
  }

  private _createNew<T extends IEntity>(request: IEntityRequest, config: ISourceConfigEntity<T>) {
    const {id, source} = request;
    const entity: IEntity = {id, source};

    this._addFields(entity as T, config.fields);
    return entity;
  }
}
