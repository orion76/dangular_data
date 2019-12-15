import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ITransportService} from '@app-services/data/transport/types';
import {switchMap} from 'rxjs/operators';
import {IRequest} from '@app-services/data/entrypoints/types';


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
