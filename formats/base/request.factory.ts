import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {IConfigRequest, IConfigRequestPoints, IRequest, IRequestData, IRequestFactoryService} from '../../types';


@Injectable()
export class RequestFactoryService implements IRequestFactoryService {

  constructor() {
  }

  load(requestData: IRequestData, config: IConfigRequest): IRequest {
    const url = this.urlFromTemplate(this.createUrl('item', config), requestData.params);

    return {url};
  }

  loadMultiple(requestData: IRequestData, config: IConfigRequest): IRequest {
    const {filters} = requestData;
    const params = new HttpParams({fromObject: filters});
    const url = this.createUrl('collection', config);

    return {url, params};
  }

  saveUpdate(requestData: IRequestData, config: IConfigRequest): IRequest {
    const {data} = requestData;
    const url = this.urlFromTemplate(this.createUrl('item', config), requestData.params);

    return {url, data};
  }

  saveNew(requestData: IRequestData, config: IConfigRequest): IRequest {
    const {data} = requestData;
    const url = config.base;

    return {url, data};
  }

  delete(requestData: IRequestData, config: IConfigRequest): IRequest {
    const url = this.urlFromTemplate(this.createUrl('item', config), requestData.params);
    return {url};
  }

  modelScheme(requestData: IRequestData, config: IConfigRequest): IRequest {
    const url = config.points.schema;
    return {url};
  }

  protected createUrl(type: keyof IConfigRequestPoints, config: IConfigRequest) {
    const url = [config.base];

    if (config.points[type]) {
      url.push(config.points[type]);
    }
    return url.join('/');
  }

  protected urlFromTemplate(url: string, values: Record<string, string>) {
    return Object.keys(values).reduce((result: string, key: string) => result.replace(`:${key}`, values[key]), url);
  }
}
