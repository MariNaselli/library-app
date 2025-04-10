import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ResourceModule } from './resource/resource.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    // 1️⃣ Habilitamos el uso de variables de entorno globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2️⃣ Configuramos la conexión con PostgreSQL usando TypeORM y variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true, // busca las entidades automáticamente
        synchronize: true, // SOLO para desarrollo
      }),
    }),

    // 3️⃣ Tu módulo de recursos
    ResourceModule,

    CategoryModule,
  ],
})
export class AppModule {}
