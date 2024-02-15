import { Module } from '@nestjs/common';
import { DocumentsBusiness } from './DocumentsBusiness';
import { RepositoryModule } from '../DataAccess/Repositories/RepositoryModule';

@Module({
  imports: [RepositoryModule],
  providers: [DocumentsBusiness],
  exports: [DocumentsBusiness],
})
export class BusinessModule {}
