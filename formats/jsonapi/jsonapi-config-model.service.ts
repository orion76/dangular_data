import {Inject, Injectable} from '@angular/core';
import {CONFIG_MODEL_ITEMS, CONFIG_MODEL_STORE, DATA_SERVICE} from '../../injection-tokens';

import {ConfigModelService} from '../../abstract/config-model.service';
import {IConfigModel, IConfigService, IConfigStore, IDataService} from '../../types';

@Injectable()
export class JsonapiConfigModelService extends ConfigModelService implements IConfigService<IConfigModel> {
  source = 'jsonapi';

  constructor(
    @Inject(CONFIG_MODEL_ITEMS) config: IConfigModel[],
    @Inject(CONFIG_MODEL_STORE) protected store: IConfigStore<IConfigModel>,
    @Inject(DATA_SERVICE) data: IDataService
  ) {
    super(config, store, data);
  }


}
