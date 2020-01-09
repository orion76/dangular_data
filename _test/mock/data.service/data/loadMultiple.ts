import {IJsonApi} from '../../../../formats/jsonapi/type';

export const loadMultipleData: IJsonApi = {
  data: [
    {
      type: 'item_type_1', id: 'item_id_1',
      attributes: {
        attribute_1: 'value_attribute_1',
        attribute_2: 'value_attribute_2',
        attribute_3: 'value_attribute_3',
      },
      relationships: {
        rel_1: {data: [{type: 'type_rel_1', id: 'id_rel_1'}]},
        rel_2: {data: [{type: 'type_rel_2', id: 'id_rel_2'}]},
        rel_3: {data: [{type: 'type_rel_3', id: 'id_rel_3'}]}
      }
    },
    {
      type: 'item_type_2', id: 'item_id_2',
      attributes: {
        attribute_1: 'value_attribute_1',
        attribute_2: 'value_attribute_2',
        attribute_3: 'value_attribute_3',
      },
      relationships: {
        rel_1: {data: [{type: 'type_rel_1', id: 'id_rel_1'}]},
        rel_2: {data: [{type: 'type_rel_2', id: 'id_rel_2'}]},
        rel_3: {data: [{type: 'type_rel_3', id: 'id_rel_3'}]}
      }
    },
    {
      type: 'item_type_3', id: 'item_id_3',
      attributes: {
        attribute_1: 'value_attribute_1',
        attribute_2: 'value_attribute_2',
        attribute_3: 'value_attribute_3',
      },
      relationships: {
        rel_1: {data: [{type: 'type_rel_1', id: 'id_rel_1'}]},
        rel_2: {data: [{type: 'type_rel_2', id: 'id_rel_2'}]},
        rel_3: {data: [{type: 'type_rel_3', id: 'id_rel_3'}]}
      }
    }
  ],
  included: [
    {
      type: 'type_rel_1', id: 'id_rel_1',
      attributes: {label: 'label_rel_1'}
    },
    {
      type: 'type_rel_2', id: 'id_rel_2',
      attributes: {label: 'label_rel_2'}
    },
    {
      type: 'type_rel_3', id: 'id_rel_3',
      attributes: {label: 'label_rel_3'}
    },
  ]

};
