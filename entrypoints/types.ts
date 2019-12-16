
import {Observable} from 'rxjs';
import {IHTTPOptions} from '../types';

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
