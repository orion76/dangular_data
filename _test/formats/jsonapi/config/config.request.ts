import {IConfigRequest, IConfigRequestPoints} from '../../../../types';


export const JsonApiPoints: IConfigRequestPoints = {
  schema: 'resource/schema',
  collection: '',
  item: ':id'
};

export const ConfigRequestDorionElement: IConfigRequest = {
  source: 'jsonapi',
  entity_type: 'dorion-element',
  bundle: 'dorion-element',
  base: 'dorion_element/dorion_element',
  points: JsonApiPoints
};

export const ConfigRequestDorionAttributes: IConfigRequest = {
  source: 'jsonapi',
  entity_type: 'dorion_attributes',
  bundle: 'dorion_attributes',
  base: 'dorion_attributes/dorion_attributes',
  points: JsonApiPoints
};

