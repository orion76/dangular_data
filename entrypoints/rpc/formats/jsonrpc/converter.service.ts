import {Injectable} from '@angular/core';

import {IResponseConverter} from '@app-services/data';
import {Observable} from 'rxjs';
import {convert} from '@app-services/data/entrypoints/rpc/formats/jsonrpc/converter';

@Injectable()
export class JsonRPCResponseConverterService implements IResponseConverter {

  convert(data: any): Observable<any> {
    return convert(data);
  }
}
