import {IEntity} from '../../../dangular-common/entity';

export interface IMapEntities {
  get(type: string, id: string): IEntity;

  set(type: string, entity: IEntity);

  has(type: string, id: string): boolean;
}
