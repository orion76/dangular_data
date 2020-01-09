import {Observable} from 'rxjs';

import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {IEntity} from '../../../dangular-common/entity';

import {
  IConfigModel,
  IConfigRequest,
  IConfigRequestService,
  IConfigService,
  IDataService,
  IModelService,
  IRequest,
  IRequestData,
  IRequestFactoryService,
  TModelOperations
} from '../../types';


export abstract class AbstractModelService implements IModelService {

  protected abstract source: string;

  constructor(protected data: IDataService,
              protected configRequest: IConfigRequestService,
              protected configModel: IConfigService<IConfigModel>,
              protected requestFactory: IRequestFactoryService
  ) {
  }

  request(entity_type: string, bundle: string,
          type: TModelOperations, requestData: IRequestData): Observable<IEntity | IEntity[]> {

    // const config=

    return this.getRequestConfig(this.source, entity_type, bundle).pipe(
      switchMap((config: IConfigRequest) => {
        const request: IRequest = this.requestFactory[type](requestData, config);
        return this.data[type](request).pipe(
          withLatestFrom(this.configModel.get(config))
        );
      }),
      map(([data, config]) => this.createEntities(data, config))
    );
  }


  getRequestConfig(source: string, entity_type: string, bundle: string): Observable<IConfigRequest> {
    return this.configRequest.get({source, entity_type, bundle});
  }

  abstract createEntities(response: any, config: IConfigModel): IEntity[];


  load<T extends IEntity>(entity_type: string, bundle: string, id: string): Observable<T> {
    const requestData: IRequestData = {params: {id}};
    return this.request(entity_type, bundle, 'load', requestData).pipe(
      (map((entities: T[]) => entities[0]))
    );
  }

  loadMultiple<T extends IEntity>(entity_type: string, bundle: string, filters: any): Observable<T[]> {
    const requestData: IRequestData = {params: filters};
    return this.request(entity_type, bundle, 'loadMultiple', requestData) as Observable<T[]>;
  }

  saveNew<T extends IEntity>(entity_type: string, bundle: string, entity: T): Observable<T> {
    const requestData: IRequestData = {data: entity.toRest()};
    return this.request(entity_type, bundle, 'saveNew', requestData).pipe(
      (map((entities: T[]) => entities[0]))
    );
  }

  saveUpdate<T extends IEntity>(entity_type: string, bundle: string, entity: T): Observable<T> {
    const requestData: IRequestData = {data: entity};
    return this.request(entity_type, bundle, 'saveUpdate', requestData).pipe(
      (map((entities: T[]) => entities[0]))
    );
  }

}
