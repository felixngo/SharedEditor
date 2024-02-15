import { Injectable } from '@nestjs/common';
import { GenericRepository } from './GenericRepository';
import { DocumentsEntity } from '../../Models/Entities/documentsEntity';
import { DocumentsDto } from '../../Models/Dto/documentsDto';

@Injectable()
export class DocumentsRepository extends GenericRepository<
  DocumentsEntity,
  DocumentsDto
> {
  constructor() {
    super(DocumentsEntity);
  }
}
