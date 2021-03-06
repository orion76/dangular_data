import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IDataService, IRequest, TModelOperations} from './types';


@Injectable()
export class DataService implements IDataService {

  constructor(private http: HttpClient) {

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

  protected send<R>(operation: TModelOperations, request: IRequest): Observable<R> {
    const {url, params, data} = request;
    switch (operation) {
      case 'load':
        return this.http.get<R>(url, {params});
      case 'saveNew':
        return this.http.post<R>(url, data);
      case 'saveUpdate':
        return this.http.patch<R>(url, data);
    }
  }

  modelScheme(request: IRequest): Observable<any> {
    return undefined;
  }

}
