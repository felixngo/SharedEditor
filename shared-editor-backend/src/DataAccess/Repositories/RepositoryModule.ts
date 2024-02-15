// documents.module.ts

import { Module } from '@nestjs/common';
import { DocumentsRepository } from './DocumentsRepository';

@Module({
  providers: [DocumentsRepository],
  exports: [DocumentsRepository],
})
export class RepositoryModule {}
