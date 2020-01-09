import {IConfigModel, IConfigRequest, IConfigService, IModelService} from '../../../types';
import {TestBed} from '@angular/core/testing';
import {ConfigStore} from '../../../config.store';
import {
  CONFIG_MODEL_ITEMS,
  CONFIG_MODEL_SERVICE,
  CONFIG_MODEL_STORE,
  CONFIG_REQUEST_ITEMS, CONFIG_REQUEST_SERVICE,
  CONFIG_REQUEST_STORE,
  DATA_SERVICE, REQUEST_FACTORY
} from '../../../injection-tokens';
import {JsonapiConfigModelService} from '../../../formats/jsonapi/jsonapi-config-model.service';
import {ConfigModelDorionAttributes, ConfigModelDorionElement} from './config/config.model';
import {MockDataService} from '../../mock/data.service/data.service';
import {JSONAPI_SERVICE, JsonApiService} from '../../../formats/jsonapi/jsonapi.service';
import {ConfigRequestDorionAttributes, ConfigRequestDorionElement} from './config/config.request';
import {JsonapiConfigRequestService} from '../../../formats/jsonapi/jsonapi-config-request.service';
import {JsonApiRequestFactoryService} from '../../../formats/jsonapi/jsonapi-request.factory';
import {Entity, IEntity} from '../../../../dangular-common/entity';

fdescribe('JsonApiService', () => {
  let service: IModelService;

  const entity_type = 'dorion-element';
  const bundle = 'dorion-element';

  const configModel: IConfigModel[] = [
    ConfigModelDorionElement,
    ConfigModelDorionAttributes
  ];

  const configRequest: IConfigRequest[] = [
    ConfigRequestDorionElement,
    ConfigRequestDorionAttributes
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: REQUEST_FACTORY, useClass: JsonApiRequestFactoryService},
        {provide: CONFIG_MODEL_STORE, useClass: ConfigStore},
        {provide: CONFIG_REQUEST_STORE, useClass: ConfigStore},
        {provide: CONFIG_MODEL_ITEMS, useValue: configModel},
        {provide: CONFIG_REQUEST_ITEMS, useValue: configRequest},
        {provide: DATA_SERVICE, useClass: MockDataService},
        {provide: CONFIG_REQUEST_SERVICE, useClass: JsonapiConfigRequestService},
        {provide: CONFIG_MODEL_SERVICE, useClass: JsonapiConfigModelService},
        {provide: JSONAPI_SERVICE, useClass: JsonApiService},
      ]
    });
    service = TestBed.get(JSONAPI_SERVICE);
  });
  it('Сервис должен быть создан', () => {
    expect(service instanceof JsonApiService).toBeTruthy();
  });

  it('метод load должен возвратить entity', (done) => {
    const id = 'item_id';
    service.load(entity_type, bundle, id).subscribe((entity: IEntity) => {
      expect(entity instanceof Entity).toBeTruthy();
      done();
    });
  });

  it('метод loadMultiple должен возвратить массив entity', (done) => {
    const id = 'item_id';
    service.loadMultiple(entity_type, bundle).subscribe((entities: IEntity[]) => {
      expect(Array.isArray(entities)).toBeTruthy();
      expect(entities.length).toEqual(3);
      done();
    });
  });

});
