import type { Sequelize } from 'sequelize';
import { DocumentsEntity as _documents } from './documentsEntity';
import type {
  documentsAttributes,
  documentsCreationAttributes,
} from './documentsEntity';

export { _documents as documents };

export type { documentsAttributes, documentsCreationAttributes };

export function initModels(sequelize: Sequelize) {
  const documents = _documents.initModel(sequelize);

  return {
    documents: documents,
  };
}
