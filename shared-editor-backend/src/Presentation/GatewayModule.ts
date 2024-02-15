import { Module } from '@nestjs/common';
import { Gateway } from './Gateway';
import { DatabaseModule } from '../Utils/DatabaseModule';
import { RepositoryModule } from '../DataAccess/Repositories/RepositoryModule';
import { BusinessModule } from '../Business/BusinessModule';

@Module({
  imports: [DatabaseModule, BusinessModule],
  providers: [Gateway],
})
export class GatewayModule {}
