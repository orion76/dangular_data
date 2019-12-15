import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAuthRequestFactory} from '@app-services/data/entrypoints/auth/types';
import {APP_CONFIG_SERVICE, IAppConfigService, IEntrypointSourceConfig} from '@app-library/app-config';
import {map} from 'rxjs/operators';
import {IRequest, UHTTPMethod} from '@app-services/data/entrypoints/types';
import {ITokenRequest} from '@app-library/user/auth';

@Injectable()
export class OauthRequestFactoryService implements IAuthRequestFactory {

  constructor(@Inject(APP_CONFIG_SERVICE) private config: IAppConfigService) {
  }

  auth(dataLogin: any): Observable<IRequest> {
    const method: UHTTPMethod = 'POST';

    return this.config.get('auth', 'auth').pipe(
      map((config: IEntrypointSourceConfig<any>) => {


        return {method, url: this.config.createUrl(config), dataLogin} as IRequest;
      })
    );
  }

  login(authData: any): Observable<IRequest> {
    const method: UHTTPMethod = 'POST';
    return this.config.get('auth', 'login').pipe(
      map((config: IEntrypointSourceConfig<any>) => {

        const data: ITokenRequest = {

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
