import {Observable} from 'rxjs';
import {IConfigRequest, IConfigService, IConfigStore, IRequest} from '../types';

export abstract class ConfigService<T> implements IConfigService<T> {
  abstract source: string;

  constructor(config: T[], protected store: IConfigStore<T>) {
    config.forEach((item: T) => this.store.set(this.getPath(item), this.getId(item), item));
  }

  abstract getPath(item: T): string[];

  abstract getId(item: T): string;

  abstract load(request: IRequest): Observable<T>;

  get(config: IConfigRequest): Observable<T> {
    const {source, entity_type, bundle} = config;
    return this.store.get([source, entity_type], bundle);
  }


  has(config: IConfigRequest): boolean {
    const {source, entity_type, bundle} = config;
    return this.store.has([source, entity_type], bundle);
  }
}
