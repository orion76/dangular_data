import {InjectionToken} from '@angular/core';
import {
  IConfigModel,
  IConfigRequest,
  IConfigRequestService, IConfigService,
  IConfigStore,
  IDataService,
  IModelService,
  IRequestFactoryService,
  TConfigSource
} from './types';



export const CONFIG_DATA_SERVICE = new InjectionToken<IDataService>('CONFIG_DATA_SERVICE');

export const CONFIG_MODEL_STORE = new InjectionToken<IConfigStore<any>>('CONFIG_MODEL_STORE');
export const CONFIG_MODEL_ITEMS = new InjectionToken<IConfigModel[]>('CONFIG_MODEL_ITEMS');
export const CONFIG_MODEL_SERVICE = new InjectionToken<IConfigService<IConfigModel>>('CONFIG_MODEL_SERVICE');


export const CONFIG_REQUEST_STORE = new InjectionToken<IConfigStore<IConfigRequest>>('CONFIG_REQUEST_STORE');
export const CONFIG_REQUEST_ITEMS = new InjectionToken<IConfigRequest[]>('CONFIG_REQUEST_ITEMS');
export const CONFIG_REQUEST_SERVICE = new InjectionToken<IConfigRequestService>('CONFIG_REQUEST_SERVICE');

export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');



export const REQUEST_FACTORY = new InjectionToken<IRequestFactoryService>('REQUEST_FACTORY');
export const RESPONSE_FACTORY = new InjectionToken<IDataService>('RESPONSE_FACTORY');
export const MODEL_SERVICE = new InjectionToken<IModelService>('MODEL_SERVICE');

export const ENTRYPOINT_CONFIG = new InjectionToken<TConfigSource>('ENTRYPOINT_CONFIG');
