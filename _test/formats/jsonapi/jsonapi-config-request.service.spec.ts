import {IConfigRequest, IConfigRequestService, ISourceKeys} from '../../../types';
import {TestBed} from '@angular/core/testing';
import {JsonapiConfigRequestService} from '../../../formats/jsonapi/jsonapi-config-request.service';
import {ConfigStore} from '../../../config.store';
import {ConfigRequestDorionAttributes, ConfigRequestDorionElement} from './config/config.request';
import {CONFIG_REQUEST_ITEMS, CONFIG_REQUEST_SERVICE, CONFIG_REQUEST_STORE, DATA_SERVICE} from '../../../injection-tokens';
import {DataService} from '../../../data.service';
import {MockDataService} from '../../mock/data.service/data.service';

describe('JsonapiConfigRequestService', () => {
  let service: IConfigRequestService;
  const source = 'jsonapi';
  const entity_type = 'dorion-element';
  const bundle = 'dorion-element';

  const config: IConfigRequest[] = [
    ConfigRequestDorionElement,
    ConfigRequestDorionAttributes
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CONFIG_REQUEST_STORE, useClass: ConfigStore},
        {provide: CONFIG_REQUEST_ITEMS, useValue: config},
        {provide: DATA_SERVICE, useClass: MockDataService},
        {provide: CONFIG_REQUEST_SERVICE, useClass: JsonapiConfigRequestService},
      ]
    });
    service = TestBed.get(CONFIG_REQUEST_SERVICE);
  });
  it('Сервис должен быть создан', () => {
    expect(service instanceof JsonapiConfigRequestService).toBeTruthy();
  });


  it('метод get должен возвратить соответствующий конфиг', (done) => {

    const keys: ISourceKeys = {source, entity_type, bundle};
    service.get(keys).subscribe((_config: IConfigRequest) => {
      expect(_config).toEqual(ConfigRequestDorionElement);
      done();
    });
  });

  it('метод get должен возвратить null', (done) => {
    const keys: ISourceKeys = {source: 'fake_source', entity_type, bundle};
    service.get(keys).subscribe((_config: IConfigRequest) => {
      expect(_config).toEqual(null);
      done();
    });
  });

});
