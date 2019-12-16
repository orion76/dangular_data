import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {IResponseConverter} from '../../../types';

@Injectable()
export class OauthResponseConverterService implements IResponseConverter {

  convert(event: any): Observable<any> {
    return of(event);
  }
}
