import {IHTTPOptions} from '@app-services/data';
import {Observable} from 'rxjs';

export interface IEntrypointService {
  // handler: IEntrypointHandler;
}

export type UHTTPMethod = 'GET' | 'POST';

export interface IRequest extends IHTTPOptions {

  readonly method: UHTTPMethod;

  readonly url: string;
}

export interface IResponseConverter {
  convert(response: any): Observable<any>;
}