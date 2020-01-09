import {EEntityDeleted, Entity, IEntity} from '../../../dangular-common/entity';

import {IJsonApi, IJsonApiEntity} from './type';
import {IConfigModel} from '../../types';
import {MapEntities} from '../../abstract/map-entities/map-entities';


export class JsonApiEntity extends Entity<IJsonApi> implements IEntity {

  protected data: IJsonApiEntity;

  constructor(config: IConfigModel,
              data: IJsonApiEntity,
              protected included: MapEntities<Entity<IJsonApi>>) {
    super(config, data);
  }

  get deleted(): EEntityDeleted {
    return undefined;
  }

  get id(): string {
    return this.data.id;
  }

  get type() {
    return `${this.config.entity_type}--${this.config.bundle}`;
  }

  getDefaultConfig(): IConfigModel {
    return {...this.config, fields: {attributes: {}, relationships: {}}};
  }

  getAttributes() {
    return this.data.attributes;
  }

  getRelationships() {
    return this.data.relationships;
  }

  getIncluded() {
    // return Array.from(this._included.values()).map((entity: IJsonApiModel) => entity.toRestEntity());
    return null;
  }

  toRestEntity(): IJsonApiEntity {
    return {
      id: this.id,
      type: this.type,
      attributes: this.getAttributes(),
      relationships: this.getRelationships()
    };
  }

  toRest(): IJsonApi {
    return {
      data: [this.toRestEntity()],
      included: this.getIncluded()
    };
  }

  getAttribute(name: string): string {
    return this.data.attributes[name];
  }

  getRelationship(name): any {
    const items: IJsonApiEntity[] = [];
    this.data.relationships[name].data.forEach((item: IJsonApiEntity) => {
      if (!this.included.has(item.type, item.id)) {
        this.included.set(item.type, new JsonApiEntity(this.getDefaultConfig(), item, this.included));
      }
      items.push(this.included.get(item.type, item.id));
    });
    return items;
  }

  setAttribute(name: string, value: string): string {
    return this.data.attributes[name] = value;
  }

  setRelationship(name: string, value: any) {
    return this.data.relationships[name] = value;
  }
}
