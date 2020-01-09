import {BehaviorSubject, Observable} from 'rxjs';
import {IConfigRequest, IRequest} from './request';

export interface IConfigStore<T> {
  has(path: string[], id: string): boolean;

  get(path: string[], id: string): Observable<T>;

  set(path: string[], id: string, item: T);
}

export interface IConfigService<T> {
  has(config: ISourceKeys): boolean;

  get(config: ISourceKeys): Observable<T>;

  load(request: IRequest): Observable<T>;
}

export interface ISourceKeys {
  source: string;
  entity_type: string;
  bundle: string;
}

export type TConfigBundles<T> = Map<string, BehaviorSubject<T>>;
export type TConfigEntityTypes<T> = Map<string, TConfigBundles<T>>;
export type TConfigSources<T> = Map<string, TConfigEntityTypes<T>>;
export type UConfigLevels<T> = T | TConfigSources<T> | TConfigEntityTypes<T> | TConfigBundles<T>;
