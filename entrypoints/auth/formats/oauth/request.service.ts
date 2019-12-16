import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IAuthRequestFactory} from '../../types';
import {APP_CONFIG_SERVICE, IAppConfigService, IEntryPointConfig} from '../../../../../dangular-config';
import {IRequest, UHTTPMethod} from '../../../types';

@Injectable()
export class OauthRequestFactoryService implements IAuthRequestFactory {

  constructor(@Inject(APP_CONFIG_SERVICE) private config: IAppConfigService) {
  }

  auth(dataLogin: any): Observable<IRequest> {
    const method: UHTTPMethod = 'POST';

    return this.config.getEntrypoint( 'auth').pipe(
      map((config: IEntryPointConfig) => {


        return {method, url: this.config.createUrl(config), dataLogin} as IRequest;
      })
    );
  }

  login(authData: any): Observable<IRequest> {
    const method: UHTTPMethod = 'POST';
    return this.config.getEntrypoint( 'login').pipe(
      map((config: IEntryPointConfig) => {

        const data: any = {

          grant_type: 'password',
          scope: 'jsonapi',
          client_id: this.config.oauthId,
          client_secret: this.config.oauthId,
          ...authData
        };

        const body = new FormData();
        Object.keys(data).forEach((fieldName: string) => {
          body.set(fieldName, data[fieldName]);
        });
        return {
          method,
          url: this.config.createUrl(config),
          body,
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // },
          // withCredentials: true,
          // responseType: 'arraybuffer'
        } as IRequest;
      })
    );
  }
}
