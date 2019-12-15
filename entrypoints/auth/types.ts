import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {IRequest} from '@app-services/data/entrypoints/types';

export const AUTH_ENTRYPOINT = new InjectionToken<IEntrypointAuth>('AUTH_ENTRYPOINT');
export const AUTH_RESPONSE_CONVERTER = new InjectionToken<IEntrypointAuth>('AUTH_RESPONSE_CONVERTER');
export const AUTH_REQUEST_FACTORY = new InjectionToken('AUTH_REQUEST_FACTORY');

export interface IEntrypointAuth {
  auth(authData: any): Observable<IRequest>;

  login(authData: any): Observable<any>;
}

export interface IAuthRequestFactory {
  auth<T>(dataLogin: T): Observable<IRequest>;

  login<T>(authData: T): Observable<IRequest>;
}
