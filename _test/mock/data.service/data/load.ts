import {IJsonApi} from '../../../../formats/jsonapi/type';

export const loadData: IJsonApi = {
  data: [
    {
      type: 'item_type', id: 'item_id',
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
