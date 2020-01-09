import {IConfigModel} from '../../../types';
import {JsonApiEntity} from '../../../formats/jsonapi/jsonapi.entity';
import {IJsonApi, IJsonApiEntity} from '../../../formats/jsonapi/type';
import {Entity, EntityFactory, IEntity} from '../../../../dangular-common/entity';
import {MapEntities} from '../../../abstract/map-entities/map-entities';

export interface ITestEntity extends IEntity {
  attribute_1: string;
  attribute_2: string;
  attribute_3: string;
  relationship_1: IEntity | IEntity[];
  relationship_2: IEntity | IEntity[];
}


xdescribe('JsonApiEntity', () => {

  const test_config: IConfigModel = {
    source: 'test_source',
    entity_type: 'test_entity_type_root',
    bundle: 'test_bundle_root',
    fields: {
      attributes: {
        attribute_1: {type: 'string', label: 'attribute_1'},
        attribute_2: {type: 'string', label: 'attribute_2'},
        attribute_3: {type: 'string', label: 'attribute_3'},
      },
      relationships: {
        relationship_1: {type: 'type_relationship_1', label: 'relationship_1'},
        relationship_2: {type: 'type_relationship_2', label: 'relationship_2'},
      }
    }
  };

  const test_data: IJsonApiEntity = {
    type: 'test_entity_type_root--test_bundle_root',
    id: '999',
    attributes: {
      attribute_1: 'value_attribute_1',
      attribute_2: 'value_attribute_2',
      attribute_3: 'value_attribute_3',
    },
    relationships: {
      relationship_1: {data: [{type: 'type_relationship_1', id: '111'}]},
      relationship_2: {data: [{type: 'type_relationship_2', id: '222'}]},
    }
  };

  const included: MapEntities<Entity<IJsonApi>> = new MapEntities();


  describe('Properties', () => {

    it('объект JsonApiEntity Должна быть создан', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity instanceof JsonApiEntity).toBeTruthy();
    });

    it('свойство id должно быть равно test_data.id', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity.id).toEqual(test_data.id);
    });

    it('свойство "is_new" должно быть равно false', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity.is_new).toBeFalsy();
    });

    it('свойство "deleted" должно быть равно false', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity.deleted).toBeFalsy();
    });

    it('свойство "type" должно быть равно "entity_type--bundle"', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity.type).toEqual(`${test_config.entity_type}--${test_config.bundle}`);
    });

    it('свойство "source" должно быть равно "test_config.source"', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity.source).toEqual(test_config.source);
    });


    it('свойство "label" должно быть равно "source:type:id"', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity.label).toEqual(`${entity.source}:${entity.type}:${entity.id}`);
    });

  });


  describe('Attributes', () => {
    it('объект JsonApiEntity Должна быть создан', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity instanceof JsonApiEntity).toBeTruthy();
    });


    it('свойство "имя аттрибута" должено быть равно его значению', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity.attribute_1).toEqual('value_attribute_1');
    });

    it('установка значения аттрибута "имя аттрибута" должено изменять его значение', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      const new_value = 'attribute_1_new_value';
      entity.attribute_1 = new_value;
      expect(entity.attribute_1).toEqual(new_value);
    });
  });

  describe('Relationships', () => {
    it('объект JsonApiEntity Должна быть создан', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      expect(entity instanceof JsonApiEntity).toBeTruthy();
    });

    it('свойство "имя поля" должено быть типа Entity', () => {
      const entity = EntityFactory<ITestEntity>(JsonApiEntity, test_config, test_data, included);
      console.log(entity.relationship_1);
      const field = test_data.relationships['relationship_1'].data[0].id;
      expect(entity.relationship_1 instanceof JsonApiEntity).toBeTruthy();
    });


    // it('установка значения аттрибута "имя аттрибута" должено изменять его значение', () => {
    //   const new_value = 'attribute_1_new_value';
    //   entity.attribute_1 = new_value;
    //   expect(entity.attribute_1).toEqual(new_value);
    // });
  });

});
