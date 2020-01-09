import {Inject} from '@angular/core';
import {ConfigService} from './config.service';
import {IConfigRequest, IConfigService, IConfigStore} from '../types';


export abstract class ConfigRequestService extends ConfigService<IConfigRequest> implements IConfigService<IConfigRequest> {
  constructor(
    @Inject('CONFIG_REQUEST_ITEMS') config: IConfigRequest[],
    @Inject('CONFIG_MODEL_STORE') protected store: IConfigStore<IConfigRequest>) {
    super(config, store);
  }

  getId(item: IConfigRequest): string {
    return item.bundle;
  }

  getPath(item: IConfigRequest): string[] {
    return [item.source, item.entity_type];
  }


}
