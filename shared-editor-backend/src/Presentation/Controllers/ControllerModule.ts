import { Module } from '@nestjs/common';
import { BusinessModule } from '../../Business/BusinessModule';
import { DocumentController } from './DocumentController';

@Module({
  imports: [BusinessModule],
  providers: [DocumentController],
  exports: [DocumentController],
  controllers: [DocumentController],
})
export class ControllerModule {}
