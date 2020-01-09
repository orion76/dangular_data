import {AbstractModelService} from '../base/model.service';
import {IDataService, IModelService, IRequestFactoryService} from '../../types/types';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CONFIG_MODEL_SERVICE, CONFIG_REQUEST_SERVICE, DATA_SERVICE, REQUEST_FACTORY} from '../../injection-tokens';
import {IConfigModel} from '../../types/model';
import {Entity, IEntity} from '../../../dangular-common/entity';
import {IJsonApi, IJsonApiEntity} from './type';
import {JsonApiEntity} from './jsonapi.entity';
import {IConfigRequestService, IConfigService} from '../../types';
import {MapEntities} from '../../abstract/map-entities/map-entities';

export const JSONAPI_SERVICE = new InjectionToken<IModelService>('JSONAPI_SERVICE');
export const JSONAPI_CONFIG_SERVICE = new InjectionToken<IConfigRequestService>('JSONAPI_CONFIG_SERVICE');
export const JSONAPI_REQUEST_FACTORY_SERVICE = new InjectionToken<IRequestFactoryService>('JSONAPI_REQUEST_FACTORY_SERVICE');

@Injectable()
export class JsonApiService extends AbstractModelService implements IModelService {
  protected source = 'jsonapi';

  constructor(@Inject(DATA_SERVICE) protected data: IDataService,
              @Inject(CONFIG_REQUEST_SERVICE) protected configRequest: IConfigRequestService,
              @Inject(CONFIG_MODEL_SERVICE) protected configModel: IConfigService<IConfigModel>,
              @Inject(REQUEST_FACTORY) protected requestFactory: IRequestFactoryService) {

    super(data, configRequest, configModel, requestFactory);
  }


  createEntities(response: IJsonApi, config: IConfigModel): IEntity[] {
    const included = new MapEntities<Entity<IJsonApi>>();
    response.included.forEach((item: IJsonApiEntity) => included.set(item.type, new JsonApiEntity(config, item, included)));

    return response.data.map((data: IJsonApiEntity) => new JsonApiEntity(config, data, included));
  }

}
