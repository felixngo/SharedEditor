import { Model, ModelStatic } from 'sequelize';
import {
  documentsAttributes,
  documentsCreationAttributes,
} from '../../Models/Entities/documentsEntity';

import { Logger, NotFoundException } from '@nestjs/common';
import { IObjectWithId } from '../../Models/IObjectWithId';
export class GenericRepository<
  TEntity extends Model<documentsAttributes, documentsCreationAttributes>,
  TModel extends IObjectWithId,
> {
  constructor(private readonly model: ModelStatic<TEntity>) {}

  async get(): Promise<TModel[]> {
    try {
      const entities = await this.model.findAll();
      return entities.map(
        (entity) => entity.toJSON() as IObjectWithId as TModel,
      );
    } catch (error) {
      Logger.error(
        '[Repository] Error occurred while fetching data from database',
        error,
      );
    }
  }

  async getById(id: number): Promise<TModel> {
    const entity = await this.model.findByPk(id);

    if (!entity) {
      Logger.error(`[Repository] Entity with id ${id} not found`);
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity?.toJSON() as IObjectWithId as TModel;
  }

  async create(modelEntity: any): Promise<TModel> {
    try {
      const entity = await this.model.create(modelEntity);
      return entity.toJSON() as IObjectWithId as TModel;
    } catch (error) {
      Logger.error(
        '[Repository] An error occurred while creating entity',
        error,
      );
      throw error;
    }
  }

  async update(modelEntity: TModel): Promise<TModel> {
    const entity = await this.model.findByPk(modelEntity.id);
    if (!entity) {
      Logger.error(`[Repository] Entity with id ${modelEntity.id} not found`);
      throw new NotFoundException(`Entity with id ${modelEntity.id} not found`);
    }

    for (const [key, value] of Object.entries(modelEntity)) {
      (entity as any)[key] = value;
    }

    const updatedEntity = await entity.save();

    return updatedEntity.toJSON() as IObjectWithId as TModel;
  }

  async delete(id: number): Promise<void> {
    const entity = await this.model.findByPk(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    await entity.destroy();
  }
}
