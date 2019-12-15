import {Injectable} from '@angular/core';
import {IResponseConverter} from '@app-services/data';
import {Observable, of} from 'rxjs';
import {
  itemToArray,
  normalizeReference,
  responseToEntity,
  setRelationships
} from './utils';

@Injectable()
export class ResponseJsonapiConverterService implements IResponseConverter {
  convert(response: any): Observable<any> {
    const entities = itemToArray(response.data);
    const includes = response.included ? response.included : [];
    const entitiesMap = normalizeReference(entities.concat(includes));
    setRelationships(entitiesMap);
    return of(responseToEntity(entities));
  }


}
