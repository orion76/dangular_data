import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {ITransportService} from './types';
import {IRequest} from '../entrypoints/types';



@Injectable()
export class TransportService implements ITransportService {

  constructor(private http: HttpClient) {

  }

  send(request: IRequest) {
    let response$: Observable<any>;
    switch (request.method) {

      case 'GET':
        response$ = this.http.get(request.url, request);
        break;

      case 'POST':
        response$ = this.http.post(request.url, request.body, request);
        break;
    }

    return response$;
  }

  request(request$: Observable<IRequest>) {

    return request$.pipe(
      switchMap((request: IRequest) => {

        return this.send(request);
      })
    );

  }

}
