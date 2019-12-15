import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRPCRequestFactory} from '@app-services/data/entrypoints/rpc/types';
import {IRequest} from '@app-services/data/entrypoints/types';

@Injectable()
export class JsonRPCRequestFactoryService implements IRPCRequestFactory{
  execute(command: string): Observable<IRequest> {
    return undefined;
  }

  get(source: string): Observable<IRequest> {
    return undefined;
  }

}
