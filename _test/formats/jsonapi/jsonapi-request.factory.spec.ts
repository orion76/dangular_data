import {JsonApiRequestFactoryService} from '../../../formats/jsonapi/jsonapi-request.factory';
import {IConfigRequest, IRequestData} from '../../../types';

xdescribe('JsonApiRequestFactoryService', () => {
  const config: IConfigRequest = {
    source: 'source_test',
    entity_type: 'entity_type_test',
    bundle: 'bundle_test',
    base: 'base_test',
    points: {
      schema: '',
      collection: '',
      item: ':id'
    }
  };

  it('метод load должен возвращать IRequest - {url:"config.base/id"}', () => {
    const factory = new JsonApiRequestFactoryService();
    const requestData: IRequestData = {params: {id: '111'}};

    const load = factory.load(requestData, config);
    const url = `${config.base}/${requestData.params.id}`;
    expect(load.url).toEqual(url);
  });

  it('метод load должен возвращать IRequest - {url:"config.base",params:FILTERS}', () => {
    const factory = new JsonApiRequestFactoryService();
    const requestData: IRequestData = {filters: {filter1: '111', filter2: '222', filter3: '333'}};

    const load = factory.loadMultiple(requestData, config);
    const url = `${config.base}`;

    expect(load.url).toEqual(url);

    Object.keys(requestData.filters).forEach((key: string) => {
      expect(load.params.get(key)).toEqual(requestData.filters[key]);
    });

  });

  it('метод saveUpdate должен возвращать IRequest - {url:"config.base/id",data:DATA}', () => {
    const factory = new JsonApiRequestFactoryService();
    const requestData: IRequestData = {params: {id: '111', data: {field1: 1, field2: 2}}};

    const load = factory.saveUpdate(requestData, config);
    const url = `${config.base}/${requestData.params.id}`;
    expect(load.url).toEqual(url);
    expect(load.data).toEqual(requestData.data);

  });

  it('метод saveNew должен возвращать IRequest - {url:"config.base",data:DATA}', () => {
    const factory = new JsonApiRequestFactoryService();
    const requestData: IRequestData = {params: {id: '111', data: {field1: 1, field2: 2}}};

    const load = factory.saveNew(requestData, config);
    const url = `${config.base}`;
    expect(load.url).toEqual(url);
    expect(load.data).toEqual(requestData.data);
  });

});
