import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRPCEntrypoint, IRPCRequestFactory, RPC_REQUEST_FACTORY, RPC_RESPONSE_CONVERTER} from '@app-services/data/entrypoints/rpc/types';
import {IResponseConverter} from '@app-services/data';
import {ITransportService, TRANSPORT_SERVICE} from '@app-services/data/transport/types';
import {EntrypointAbstractService} from '@app-services/data/entrypoints/entrypoint.abstract';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class RPCEntrypointService extends EntrypointAbstractService implements IRPCEntrypoint {

  constructor(@Inject(RPC_REQUEST_FACTORY) protected request: IRPCRequestFactory,
              @Inject(RPC_RESPONSE_CONVERTER) protected converter: IResponseConverter,
              @Inject(TRANSPORT_SERVICE) protected transport: ITransportService,
  ) {
    super(converter);
  }

  execute(command: string): Observable<any> {
    return this.transport.request(this.request.execute(command)).pipe(
      switchMap((response: any) => this.converter.convert(response))
    );
  }

  get(source: string): Observable<any> {
    return this.transport.request(this.request.get(source)).pipe(
      switchMap((response: any) => this.converter.convert(response))
    );
  }
}
