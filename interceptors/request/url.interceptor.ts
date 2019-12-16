import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_CONFIG_SERVICE, IAppConfigService} from '../../../dangular-config';
import {clearDoubleSlash} from '../../utils';


@Injectable()
export class UrlRequestInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_CONFIG_SERVICE) private config: IAppConfigService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = [];
    if (this.config.urlPrefix && this.config.urlPrefix.length > 0) {
      url.push(this.config.urlPrefix);
    }


    if (url.length > 0) {
      url.push(req.url);

      const paramReq = req.clone({
        url: clearDoubleSlash(url.join('/'))
      });
      return next.handle(paramReq);
    } else {
      return next.handle(req);
    }
  }
}
