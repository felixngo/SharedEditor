import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface documentsAttributes {
  id: number;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export type documentsPk = 'id';
export type documentsId = DocumentsEntity[documentsPk];
export type documentsOptionalAttributes = 'id' | 'created_at' | 'updated_at';
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
  content!: string;
  created_at?: Date;
  updated_at?: Date;

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
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'documents',
        schema: 'public',
        timestamps: true,
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
