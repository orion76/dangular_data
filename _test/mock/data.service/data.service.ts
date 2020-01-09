import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IDataService, IRequest, TModelOperations} from '../../../types';
import {loadData} from './data/load';
import {IJsonApi} from '../../../formats/jsonapi/type';
import {loadMultipleData} from './data/loadMultiple';


@Injectable()
export class MockDataService implements IDataService {

  constructor() {

  }

  load(request: IRequest): Observable<any> {
    return this.send('load', request);
  }

  saveNew(request: IRequest): Observable<any> {
    return this.send('saveNew', request);
  }


  saveUpdate(request: IRequest): Observable<any> {
    return this.send('saveUpdate', request);
  }

  loadMultiple(request: IRequest): Observable<any> {
    return this.send('loadMultiple', request);
  }

  delete(request: IRequest): Observable<any> {
    return this.send('delete', request);
  }

  modelScheme(request: IRequest): Observable<any> {
    return undefined;
  }

  protected send(operation: TModelOperations, request: IRequest): Observable<IJsonApi> {
    const {url, params, data} = request;
    switch (operation) {
      case 'load':
        return of(loadData);
      case 'loadMultiple':
        return of(loadMultipleData);
      case 'saveNew':
        return of(null);
      case 'saveUpdate':
        return of(null);
    }
  }

}
