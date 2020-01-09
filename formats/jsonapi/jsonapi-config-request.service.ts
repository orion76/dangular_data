import {Inject, Injectable} from '@angular/core';
import {CONFIG_REQUEST_ITEMS, CONFIG_REQUEST_STORE, DATA_SERVICE} from '../../injection-tokens';
import {ConfigRequestService} from '../../abstract/config-request.service';
import {IConfigRequest, IConfigRequestService, IConfigStore, IDataService, IRequest} from '../../types';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class JsonapiConfigRequestService extends ConfigRequestService implements IConfigRequestService {

  source = 'jsonapi';

  constructor(@Inject(CONFIG_REQUEST_ITEMS)  request: IConfigRequest[],
              @Inject(CONFIG_REQUEST_STORE) store: IConfigStore<IConfigRequest>,
              @Inject(DATA_SERVICE) protected data: IDataService
  ) {
    super(request, store);
  }


  load(request: IRequest): Observable<IConfigRequest> {
    return this.data.load(request).pipe(
      tap((item) => this.store.set(this.getPath(item), this.getId(item), item))
    );
  }

}
