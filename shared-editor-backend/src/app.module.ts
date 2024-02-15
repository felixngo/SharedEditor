import { Module } from '@nestjs/common';
import { DatabaseModule } from './Utils/DatabaseModule';
import { DatabaseProviders } from './Utils/DatabaseProviders';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './Presentation/GatewayModule';
import { DocumentController } from './Presentation/Controllers/DocumentController';
import { ControllerModule } from './Presentation/Controllers/ControllerModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GatewayModule,
    ControllerModule,
  ],
  providers: [...DatabaseProviders],
})
export class AppModule {}
