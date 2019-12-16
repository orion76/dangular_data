import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import {IRequest} from '../entrypoints/types';

export const TRANSPORT_SERVICE = new InjectionToken<ITransportService>('TRANSPORT_SERVICE');

export interface IResponseConverter {
  convert(response: any): Observable<any>;
}

export interface ITransportService {
  request(request$: Observable<IRequest>): Observable<any>;
}
