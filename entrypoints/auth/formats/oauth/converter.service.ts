import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {IResponseConverter} from '@app-services/data';

@Injectable()
export class OauthResponseConverterService implements IResponseConverter {

  convert(event: any): Observable<any> {
    return of(event);
  }
}
