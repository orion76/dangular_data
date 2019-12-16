import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {IResponseConverter} from '../../../types';
import {convert} from './converter';

@Injectable()
export class JsonRPCResponseConverterService implements IResponseConverter {

  convert(data: any): Observable<any> {
    return convert(data);
  }
}
