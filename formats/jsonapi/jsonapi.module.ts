import {ModuleWithProviders, NgModule} from '@angular/core';
import {JSONAPI_SERVICE, JsonApiService} from './jsonapi.service';
import {JsonapiConfigRequestService} from './jsonapi-config-request.service';
import {JsonApiRequestFactoryService} from './jsonapi-request.factory';
import {
  CONFIG_MODEL_ITEMS,
  CONFIG_MODEL_SERVICE,
  CONFIG_REQUEST_ITEMS,
  CONFIG_REQUEST_SERVICE,
  REQUEST_FACTORY
} from '../../injection-tokens';
import {IConfigRequest, IConfigModel} from '../../types';
import {JsonapiConfigModelService} from './jsonapi-config-model.service';


@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [],
})
export class JsonApiModule {
  static init(
    configRequest: IConfigRequest[],
    configModel: IConfigModel[],
  ): ModuleWithProviders<JsonApiModule> {
    return {
      ngModule: JsonApiModule, providers: [
        {provide: CONFIG_REQUEST_ITEMS, useValue: configRequest},
        {provide: CONFIG_MODEL_ITEMS, useValue: configModel},
        {provide: CONFIG_REQUEST_SERVICE, useClass: JsonapiConfigRequestService},
        {provide: CONFIG_MODEL_SERVICE, useClass: JsonapiConfigModelService},
        {provide: REQUEST_FACTORY, useClass: JsonApiRequestFactoryService},
        {provide: JSONAPI_SERVICE, useClass: JsonApiService},
      ]
    };
  }
}
