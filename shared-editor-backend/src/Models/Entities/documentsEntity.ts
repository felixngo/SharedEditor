import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface documentsAttributes {
  id: number;
  title: string;
  content: JSON;
  createdAt?: Date;
  updatedAt?: Date;
}

export type documentsPk = 'id';
export type documentsId = DocumentsEntity[documentsPk];
export type documentsOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';
export type documentsCreationAttributes = Optional<
  documentsAttributes,
  documentsOptionalAttributes
>;

export class DocumentsEntity
  extends Model<documentsAttributes, documentsCreationAttributes>
  implements documentsAttributes
{
  id!: number;
  title!: string;
  content!: JSON;
  createdAt?: Date;
  updatedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof DocumentsEntity {
    return DocumentsEntity.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Date.now(),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Date.now(),
        },
      },
      {
        sequelize,
        tableName: 'documents',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'documents_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
