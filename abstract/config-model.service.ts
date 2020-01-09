import {Inject} from '@angular/core';
import {ConfigService} from './config.service';

import {Observable} from 'rxjs';
import {IConfigModel, IConfigService, IConfigStore, IDataService, IRequest} from '../types';
import {tap} from 'rxjs/operators';
import {CONFIG_MODEL_ITEMS, CONFIG_MODEL_STORE, DATA_SERVICE} from '../injection-tokens';


export abstract class ConfigModelService extends ConfigService<IConfigModel> implements IConfigService<IConfigModel> {
  constructor(
    @Inject(CONFIG_MODEL_ITEMS) config: IConfigModel[],
    @Inject(CONFIG_MODEL_STORE) protected store: IConfigStore<IConfigModel>,
    @Inject(DATA_SERVICE) protected data: IDataService
  ) {
    super(config, store);
  }


  getId(item: IConfigModel): string {
    return item.bundle;
  }

  getPath(item: IConfigModel): string[] {
    return [item.source, item.entity_type];
  }

  load(request: IRequest): Observable<any> {
    return this.data.modelScheme(request).pipe(
      tap((item) => this.store.set(this.getPath(item), this.getId(item), item))
    );
  }

}
