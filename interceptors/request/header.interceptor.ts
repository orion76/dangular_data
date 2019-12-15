import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Log} from '@app/logger/logger';

@Injectable()
export class HeaderRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    Log.INTERCEPTOR('(HEADER)', req);
    const headers = req.headers;

    // headers = headers.set('', '');

    const paramReq = req.clone({
      headers,
      withCredentials: true
    });

    return next.handle(paramReq);
  }
}