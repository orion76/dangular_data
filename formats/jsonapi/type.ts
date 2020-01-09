export interface IJsonApiEntityCommon {
  id: string;
  type: string;
}

export interface IJsonApiRelationship {
  data: IJsonApiEntity[];
}

export interface IJsonApiEntity extends IJsonApiEntityCommon {
  attributes?: Record<string, string>;
  relationships?: Record<string, IJsonApiRelationship>;
}

export interface IJsonApi {
  data: IJsonApiEntity[];
  included: IJsonApiEntity[];
}
