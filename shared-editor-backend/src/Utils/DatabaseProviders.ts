import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { initModels } from '../Models/Entities/init-models';

const configService = new ConfigService();

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
      });
      initModels(sequelize);
      await sequelize.sync();
      return sequelize;
    },
  },
];
