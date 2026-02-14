import {
  EntityDataModuleConfig,
  EntityMetadataMap
} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Article: {}
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata
};
