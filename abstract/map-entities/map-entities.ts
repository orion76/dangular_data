import {IEntity} from '../../../dangular-common/entity';
import {IMapEntities} from './types';

export class MapEntities<E extends IEntity> implements IMapEntities {
  protected _entities: Map<string, Map<string, E>> = new Map();

  get(type: string, id: string): E {
    return this.getType(type).get(id);
  }

  getType(type: string) {
    if (!this._entities.has(type)) {
      this._entities.set(type, new Map());
    }
    return this._entities.get(type);
  }


  has(type: string, id: string): boolean {
    return this.getType(type).has(id);
  }

  set(type: string, entity: E) {
    this.getType(type).set(entity.id, entity);
  }

}
