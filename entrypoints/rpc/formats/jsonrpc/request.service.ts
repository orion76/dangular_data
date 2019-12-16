import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRPCRequestFactory} from '../../types';
import {IRequest} from '../../../types';


@Injectable()
export class JsonRPCRequestFactoryService implements IRPCRequestFactory {
  execute(command: string): Observable<IRequest> {
    return undefined;
  }

  get(source: string): Observable<IRequest> {
    return undefined;
  }

}
