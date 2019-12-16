import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';
import {IEntrypointAuth} from '../auth/types';
import {IRequest} from '../types';


export const RPC_ENTRYPOINT = new InjectionToken<IRPCEntrypoint>('RPC_ENTRYPOINT');
export const RPC_RESPONSE_CONVERTER = new InjectionToken<IEntrypointAuth>('RPC_RESPONSE_CONVERTER');
export const RPC_REQUEST_FACTORY = new InjectionToken('RPC_REQUEST_FACTORY');

export interface IRPCEntrypoint {
  get(source: string): Observable<any>;

  execute(command: string): Observable<any>;
}

export interface IRPCRequestFactory {
  get(source: string): Observable<IRequest>;

  execute(command: string): Observable<IRequest>;

}
