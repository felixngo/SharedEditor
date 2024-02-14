import { Module } from '@nestjs/common';
import { DatabaseModule } from './Utils/DatabaseModule';
import { DatabaseProviders } from './Utils/DatabaseProviders';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [...DatabaseProviders],
})
export class AppModule {}
