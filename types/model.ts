import {IResponseField} from './types';
import {IConfigRequest, IConfigRequestCommon} from './request';
import {ISourceKeys} from './config';

export interface IConfigModelFields {
  attributes: Record<string, IResponseField>;
  relationships?: Record<string, IResponseField>;
}

export type TModelOperations = 'load' | 'loadMultiple' | 'saveNew' | 'saveUpdate' | 'delete' | 'modelScheme';


// export type TModel= typeof IModel;

export interface IConfigModel extends ISourceKeys {
  fields: IConfigModelFields;
}

export interface IConfigModels {

  items: Record<string, IConfigModel>;
}

export type TModelRequestConfig = {
  [K in TModelOperations]?: IConfigRequest;
};
export type UModelRequestType = 'item' | 'collection';

export interface IModelEntrypointConfig {
  common: IConfigRequestCommon;
  items: Record<string, TModelRequestConfig>;
}

