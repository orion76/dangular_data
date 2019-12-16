import {Inject, Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {EntrypointAbstractService} from '../entrypoint.abstract';
import {AUTH_REQUEST_FACTORY, AUTH_RESPONSE_CONVERTER, IAuthRequestFactory, IEntrypointAuth} from './types';
import {IResponseConverter} from '../types';
import {ITransportService, TRANSPORT_SERVICE} from '../../transport/types';

@Injectable()
export class AuthEntrypointService extends EntrypointAbstractService implements IEntrypointAuth {

  constructor(@Inject(AUTH_REQUEST_FACTORY) protected request: IAuthRequestFactory,
              @Inject(AUTH_RESPONSE_CONVERTER) protected converter: IResponseConverter,
              @Inject(TRANSPORT_SERVICE) protected transport: ITransportService,
  ) {
    super(converter);
  }

  auth(dataLogin: any): Observable<any> {
    return this.transport.request(this.request.auth(dataLogin)).pipe(
      switchMap((response: any) => this.converter.convert(response))
    );
  }

  login(authData: any): Observable<any> {
    // console.log('[auth.service]',authData);
    return this.transport.request(this.request.login(authData)).pipe(
      switchMap((response: any) => {
        return this.converter.convert(response);
      }),
      take(1)
    );
  }

}
