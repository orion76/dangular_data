import {IConfigModel, IConfigService} from '../../../types';
import {TestBed} from '@angular/core/testing';
import {ConfigStore} from '../../../config.store';
import {CONFIG_MODEL_ITEMS, CONFIG_MODEL_SERVICE, CONFIG_MODEL_STORE, DATA_SERVICE} from '../../../injection-tokens';
import {JsonapiConfigModelService} from '../../../formats/jsonapi/jsonapi-config-model.service';
import {ConfigModelDorionAttributes, ConfigModelDorionElement} from './config/config.model';
import {MockDataService} from '../../mock/data.service/data.service';

describe('JsonapiConfigModelService', () => {
  let service: IConfigService<IConfigModel>;

  const entity_type = 'dorion-element';
  const bundle = 'dorion-element';

  const config: IConfigModel[] = [
    ConfigModelDorionElement,
    ConfigModelDorionAttributes
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CONFIG_MODEL_STORE, useClass: ConfigStore},
        {provide: CONFIG_MODEL_ITEMS, useValue: config},
        {provide: DATA_SERVICE, useClass: MockDataService},
        {provide: CONFIG_MODEL_SERVICE, useClass: JsonapiConfigModelService},
      ]
    });
    service = TestBed.get(CONFIG_MODEL_SERVICE);
  });
  it('Сервис должен быть создан', () => {
    expect(service instanceof JsonapiConfigModelService).toBeTruthy();
  });


  it('метод get должен возвратить соответствующий конфиг', (done) => {
    const source = 'jsonapi';
    service.get({source, entity_type, bundle}).subscribe((_config: IConfigModel) => {
      expect(_config).toEqual(ConfigModelDorionElement);
      done();
    });
  });

  it('метод get должен возвратить null', (done) => {
    const source = 'fake_source';
    service.get({source, entity_type, bundle}).subscribe((_config: IConfigModel) => {
      expect(_config).toEqual(null);
      done();
    });
  });

});
